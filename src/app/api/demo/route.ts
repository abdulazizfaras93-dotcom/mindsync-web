import { NextResponse } from 'next/server'

/**
 * POST /api/demo
 *
 * Proxies the "Ask your own" live question from DemoChat.tsx to the
 * n8n receptionist demo webhook. Keeps tokens + the n8n base URL off
 * the client bundle.
 *
 * Required env:
 *   N8N_BASE   — e.g. https://ifaras911.app.n8n.cloud
 *   N8N_TOKEN  — bearer for the demo webhook
 *
 * Rate limiting: do NOT rely on this route as the sole guard.
 * Add Netlify Edge rate-limit or IP-based throttle before going live.
 */

export const runtime = 'nodejs'

type DemoRequest = {
  industry: string
  message: string
  lang?: 'en' | 'ar'
}

export async function POST(req: Request) {
  let body: DemoRequest
  try {
    body = (await req.json()) as DemoRequest
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  if (!body?.industry || !body?.message || body.message.length > 500) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 })
  }

  const base = process.env.N8N_BASE
  const token = process.env.N8N_TOKEN
  if (!base || !token) {
    return NextResponse.json(
      { reply: '[demo webhook not wired — set N8N_BASE + N8N_TOKEN]' },
      { status: 200 },
    )
  }

  try {
    const r = await fetch(`${base}/webhook/receptionist/demo`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    })
    if (!r.ok) return NextResponse.json({ error: 'upstream' }, { status: 502 })
    const data = (await r.json()) as { reply?: string }
    return NextResponse.json({ reply: data.reply ?? '' })
  } catch {
    return NextResponse.json({ error: 'upstream' }, { status: 502 })
  }
}
