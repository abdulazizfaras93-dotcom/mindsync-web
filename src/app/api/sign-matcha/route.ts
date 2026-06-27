import { getStore } from '@netlify/blobs'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { name?: string; signature?: string; agreed?: boolean }
    const name = String(body.name ?? '').trim().slice(0, 120)
    const signature = String(body.signature ?? '')
    if (!name || !body.agreed || !signature.startsWith('data:image/')) {
      return Response.json({ error: 'missing name, agreement, or signature' }, { status: 400 })
    }
    if (signature.length > 600_000) return Response.json({ error: 'signature too large' }, { status: 413 })

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    const ua = req.headers.get('user-agent') ?? 'unknown'
    const signedAt = new Date().toISOString()
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    const record = { client: 'matcha', name, signedAt, ip, ua, signature }
    const store = getStore({ name: 'signed-contracts' })
    await store.set(`matcha-${id}`, JSON.stringify(record), {
      metadata: { client: 'matcha', name, signedAt, ip },
    })

    return Response.json({ ok: true, id, signedAt })
  } catch (e: any) {
    return Response.json({ error: e?.message || 'sign failed' }, { status: 500 })
  }
}
