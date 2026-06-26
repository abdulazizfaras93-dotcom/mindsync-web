import { getStore } from '@netlify/blobs'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) return Response.json({ error: 'no file' }, { status: 400 })
    if (!file.type.startsWith('image/')) return Response.json({ error: 'images only' }, { status: 415 })
    if (file.size > 5 * 1024 * 1024) return Response.json({ error: 'too large (max 5MB)' }, { status: 413 })

    const ext = (file.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '') || 'png'
    const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const buf = await file.arrayBuffer()

    const store = getStore({ name: 'logos' })
    await store.set(key, buf, { metadata: { contentType: file.type || 'image/png', name: file.name } })

    return Response.json({ url: `/api/logo/${key}` })
  } catch (e: any) {
    return Response.json({ error: e?.message || 'upload failed' }, { status: 500 })
  }
}
