import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

// In-memory rate limit: max 5 messages per IP per session window
const ipMap = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 5 * 60 * 1000  // 5 min
const MAX_MSGS   = 5

function getIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipMap.get(ip)
  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= MAX_MSGS) return true
  entry.count++
  return false
}

type ChatRequest = {
  message: string
  category: string
  lang?: 'en' | 'ar'
}

export async function POST(req: Request) {
  const ip = getIp(req)
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  let body: ChatRequest
  try {
    body = (await req.json()) as ChatRequest
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const { message, category, lang = 'ar' } = body
  if (!message || message.length > 400 || !category) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 })
  }

  // Webhook is public — no token required. Uses same endpoint as ReceptionistChat.tsx.
  const WEBHOOK = 'https://ifaras911.app.n8n.cloud/webhook/receptionist-website'

  try {
    const r = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        text: message,
        name: 'Demo Visitor',
        user_id: `demo_${ip}`,
        channel: 'website',
        language: lang,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(28_000),
    })

    if (!r.ok) {
      const stub = lang === 'ar'
        ? 'عذراً، واجهنا مشكلة تقنية. تواصل معنا مباشرة على واتساب!'
        : 'Sorry, we hit a technical issue. Reach us directly on WhatsApp!'
      return NextResponse.json({ reply: stub })
    }

    const data = (await r.json()) as { reply?: string; text?: string }
    return NextResponse.json({ reply: data.reply ?? data.text ?? '' })
  } catch {
    const stub = lang === 'ar'
      ? 'واجهت صعوبة في الرد الآن. جرب مرة أخرى أو تواصل معنا!'
      : 'Had trouble responding. Try again or contact us directly!'
    return NextResponse.json({ reply: stub })
  }
}
