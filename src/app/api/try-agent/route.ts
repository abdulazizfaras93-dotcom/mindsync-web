import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

// ONE client agent — the same engine the portal + (later) the live channel use.
// It reads the client's brain (agent_brain) by slug. Works for ANY onboarded client.
const WEBHOOK = 'https://ifaras911.app.n8n.cloud/webhook/client/agent'
const SB = 'https://kymdwwuujmsaojzetigd.supabase.co'
// Public anon key (read-only, RLS-gated; agent_brain is a SECURITY DEFINER RPC granted to anon).
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bWR3d3V1am1zYW9qemV0aWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNDU4NDMsImV4cCI6MjA5NDYyMTg0M30.qNwM5UJrhsM5f9xQnc0hT_0DhP6wYUB6FR760N-zfdI'

const slugRe = /^[a-z0-9-]{1,40}$/

const ipMap = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 5 * 60 * 1000
const MAX = 40
function getIp(req: Request) { return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown' }
function limited(k: string) {
  const now = Date.now(); const e = ipMap.get(k)
  if (!e || now > e.resetAt) { ipMap.set(k, { count: 1, resetAt: now + WINDOW_MS }); return false }
  if (e.count >= MAX) return true; e.count++; return false
}

// Brand lookup for the demo header (business name) — by slug.
export async function GET(req: Request) {
  const slug = (new URL(req.url).searchParams.get('slug') ?? '').toLowerCase()
  if (!slugRe.test(slug)) return NextResponse.json({ found: false })
  try {
    const r = await fetch(`${SB}/rest/v1/rpc/agent_brain`, {
      method: 'POST',
      headers: { apikey: ANON, Authorization: `Bearer ${ANON}`, 'content-type': 'application/json' },
      body: JSON.stringify({ p_slug: slug }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    })
    const b = (await r.json().catch(() => ({}))) as { found?: boolean; business_name?: string; business_model?: string }
    return NextResponse.json({ found: !!b?.found, name: b?.business_name ?? '', model: b?.business_model ?? '' })
  } catch { return NextResponse.json({ found: false }) }
}

export async function POST(req: Request) {
  const k = getIp(req)
  if (limited(k)) return NextResponse.json({ reply: 'جرّبت وايد رسائل بسرعة 🌸 خذي نفس ثواني وجرّبي مرة ثانية.' }, { status: 429 })

  let body: { message?: string; slug?: string; sessionId?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'bad json' }, { status: 400 }) }

  const message = String(body.message ?? '').trim().slice(0, 500)
  const slug = String(body.slug ?? '').toLowerCase()
  const sessionId = String(body.sessionId ?? `try_${k}`)
  if (!message) return NextResponse.json({ error: 'empty' }, { status: 400 })
  if (!slugRe.test(slug)) return NextResponse.json({ error: 'bad slug' }, { status: 400 })

  try {
    const r = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message, sessionId, slug }),
      cache: 'no-store',
      signal: AbortSignal.timeout(28_000),
    })
    if (!r.ok) return NextResponse.json({ reply: 'عذراً، صار خطأ بسيط. جرّبي مرة ثانية 🌸' })
    const data = (await r.json()) as { reply?: string; output?: string }
    return NextResponse.json({ reply: (data.reply || data.output)?.trim() || 'تمام 🌸 قوليلي شنو تحتاجين وأساعدج.' })
  } catch {
    return NextResponse.json({ reply: 'تأخرت شوي بالرد، جرّبي مرة ثانية 🌸' })
  }
}
