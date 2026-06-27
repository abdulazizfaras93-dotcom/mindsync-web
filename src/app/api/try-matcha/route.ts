import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

// The agent (system prompt, flow, words) lives in the n8n "Matcha Demo Agent" workflow.
// Edit it there — no code change needed.
const WEBHOOK = 'https://ifaras911.app.n8n.cloud/webhook/matcha-try'

const ipMap = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 5 * 60 * 1000
const MAX = 30
function getIp(req: Request) { return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown' }
function limited(k: string) {
  const now = Date.now(); const e = ipMap.get(k)
  if (!e || now > e.resetAt) { ipMap.set(k, { count: 1, resetAt: now + WINDOW_MS }); return false }
  if (e.count >= MAX) return true; e.count++; return false
}

export async function POST(req: Request) {
  const k = getIp(req)
  if (limited(k)) return NextResponse.json({ reply: 'جرّبتي وايد رسائل بسرعة 🌸 خذي نفس ثواني وجرّبي مرة ثانية.' }, { status: 429 })

  let body: { message?: string; sessionId?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'bad json' }, { status: 400 }) }

  const message = String(body.message ?? '').trim().slice(0, 500)
  const sessionId = String(body.sessionId ?? `try_${k}`)
  if (!message) return NextResponse.json({ error: 'empty' }, { status: 400 })

  try {
    const r = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message, sessionId, businessName: 'ماتشا سبا', lang: 'ar' }),
      cache: 'no-store',
      signal: AbortSignal.timeout(28_000),
    })
    if (!r.ok) return NextResponse.json({ reply: 'عذراً، صار خطأ بسيط. جرّبي مرة ثانية 🌸' })
    const data = (await r.json()) as { output?: string }
    return NextResponse.json({ reply: data.output?.trim() || 'تمام 🌸 قوليلي شنو تحتاجين وأساعدج.' })
  } catch {
    return NextResponse.json({ reply: 'تأخرت شوي بالرد، جرّبي مرة ثانية 🌸' })
  }
}
