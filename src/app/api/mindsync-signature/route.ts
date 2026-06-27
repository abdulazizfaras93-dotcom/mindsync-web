import { getStore } from '@netlify/blobs'

export const dynamic = 'force-dynamic'

const DEFAULT_NAME = 'عبدالعزيز شاكر فرس'
const KEY = 'signature'

// Save MindSync's default provider signature (draw-once).
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { name?: string; signature?: string }
    const signature = String(body.signature ?? '')
    const name = String(body.name ?? DEFAULT_NAME).trim().slice(0, 120) || DEFAULT_NAME
    if (!signature.startsWith('data:image/')) return Response.json({ error: 'no signature' }, { status: 400 })
    if (signature.length > 600_000) return Response.json({ error: 'signature too large' }, { status: 413 })

    const store = getStore({ name: 'mindsync' })
    await store.set(KEY, JSON.stringify({ name, signature, savedAt: new Date().toISOString() }))
    return Response.json({ ok: true })
  } catch (e: any) {
    return Response.json({ error: e?.message || 'save failed' }, { status: 500 })
  }
}

// Serve the default signature for contract/sign pages.
export async function GET() {
  try {
    const store = getStore({ name: 'mindsync' })
    const raw = await store.get(KEY, { type: 'text' })
    if (!raw) return Response.json({ name: DEFAULT_NAME, signature: null })
    return Response.json(JSON.parse(raw))
  } catch {
    return Response.json({ name: DEFAULT_NAME, signature: null })
  }
}
