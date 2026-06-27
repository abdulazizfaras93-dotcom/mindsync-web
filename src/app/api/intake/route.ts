import { NextResponse } from 'next/server'

// Proxies the discovery (intake) form → n8n, which creates the onboarding record
// (status=discovery) so leads land straight in the admin pipeline.
const N8N = 'https://ifaras911.app.n8n.cloud/webhook/client-intake'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const r = await fetch(N8N, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const text = await r.text()
    return new NextResponse(text || '{"ok":true}', {
      status: r.ok ? 200 : r.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return NextResponse.json({ ok: false, error: 'intake_failed' }, { status: 500 })
  }
}
