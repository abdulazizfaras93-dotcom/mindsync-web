import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Generic, reusable demo: role-plays ANY prospect's business agent.
// The agent itself (rules, dialect, neutral gender) lives in the n8n "MindSync Demo Agent" workflow.
const WEBHOOK = 'https://ifaras911.app.n8n.cloud/webhook/demo-agent'

const ipMap = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 5 * 60 * 1000
const MAX = 40
function getIp(req: Request) { return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown' }
function limited(k: string) {
  const now = Date.now(); const e = ipMap.get(k)
  if (!e || now > e.resetAt) { ipMap.set(k, { count: 1, resetAt: now + WINDOW_MS }); return false }
  if (e.count >= MAX) return true; e.count++; return false
}

export async function POST(req: Request) {
  const k = getIp(req)
  if (limited(k)) return NextResponse.json({ reply: 'رسائل وايد بسرعة — خذوا نفس وجرّبوا بعد شوي 🌿' }, { status: 429 })

  let body: { message?: string; sessionId?: string; businessName?: string; businessContext?: string; lang?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'bad json' }, { status: 400 }) }

  const message = String(body.message ?? '').trim().slice(0, 500)
  const sessionId = String(body.sessionId ?? `demo_${k}`)
  const businessName = String(body.businessName ?? 'MindSync').slice(0, 120)
  const businessContext = String(body.businessContext ?? '').slice(0, 4000)
  const lang = body.lang === 'en' ? 'en' : 'ar'
  if (!message) return NextResponse.json({ error: 'empty' }, { status: 400 })

  try {
    const r = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message, sessionId, businessName, businessContext, lang }),
      cache: 'no-store',
      signal: AbortSignal.timeout(28_000),
    })
    if (!r.ok) return NextResponse.json({ reply: lang === 'en' ? 'Sorry, a small glitch — try again.' : 'صار خطأ بسيط، جرّبوا مرة ثانية 🌿' })
    const data = (await r.json()) as { output?: string }
    const fallback = lang === 'en' ? 'How can I help?' : 'تمام 🌿 شنو تحتاجون وأساعدكم؟'
    return NextResponse.json({ reply: data.output?.trim() || fallback })
  } catch {
    return NextResponse.json({ reply: lang === 'en' ? 'Took too long — try again.' : 'تأخرت شوي، جرّبوا مرة ثانية 🌿' })
  }
}
