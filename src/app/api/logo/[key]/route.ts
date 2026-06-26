import { getStore } from '@netlify/blobs'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, { params }: { params: { key: string } }) {
  try {
    const store = getStore({ name: 'logos' })
    const res = await store.getWithMetadata(params.key, { type: 'arrayBuffer' })
    if (!res) return new Response('Not found', { status: 404 })
    const ct = (res.metadata?.contentType as string) || 'application/octet-stream'
    return new Response(res.data as ArrayBuffer, {
      headers: { 'Content-Type': ct, 'Cache-Control': 'public, max-age=31536000, immutable' },
    })
  } catch {
    return new Response('Not found', { status: 404 })
  }
}
