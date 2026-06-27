import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const WEBHOOK = 'https://ifaras911.app.n8n.cloud/webhook/matcha-try'

// Directives FIRST (so the model follows them), then the facts. Server-side so prices can't be tampered.
const BUSINESS_CONTEXT = `=== قواعد الرد (مهمة جداً) ===
أنتِ وكيلة استقبال ذكية لماتشا سبا.
١) جاوبي على سؤال الزبونة مباشرة بالمعلومة المطلوبة. سألت عن سعر خدمة؟ اعطيها سعر تلك الخدمة بالضبط (مو كل القائمة). سألت "تطلعون [منطقة]؟" قولي: إي نطلع كل الكويت + رسوم التوصيل.
٢) لا ترحّبي ترحيب عام ولا تسألي "شنو الخدمة اللي تبين؟" إذا فيه سؤال واضح — جاوبي على السؤال أول شي.
٣) تذكّري كل شي قالته الزبونة بالمحادثة. عطتك الخدمة + اليوم + الوقت + المنطقة؟ أكّدي الحجز فوراً واطلبي عربون ٥ د.ك لتثبيت الموعد. لا تعيدي السؤال عن شي عطتك إياه.
٤) لهجة كويتية فقط (شلون، أبي، وايد، زين، هلا وغلا). ردود قصيرة دافئة، سطرين إلى أربعة.

=== معلومات ماتشا سبا ===
صالون متنقل (خدمة منزلية) في الكويت، نطلع لبيت الزبونة. المنطقة الأساسية: مدينة الكويت (العاصمة)، ونوصل لكل الكويت.
ساعات العمل: من ١١ الصبح إلى ١٠ الليل، كل الأيام (السبت إلى الجمعة).

الخدمات والأسعار:
- بدكير منكير بيسك: ١٠ د.ك (٤٥ دقيقة)
- بدكير منكير أطفال: ٦ د.ك (٢٠-٣٠ دقيقة)
- مساج جسم كامل (ساعة): ١٥ د.ك
- مساج المادورا/الخشب (ساعة): ٢٥ د.ك
- ماسك شعر مع غسيل: ٨ د.ك (٣٠ دقيقة)
- سشوار شعر: من ٥ إلى ١٨ د.ك (٣٠-٤٥ دقيقة)

التوصيل: مجاني للطلبات فوق ١٠ د.ك. إذا الطلب أقل من ١٠ د.ك، التوصيل ١.٥ د.ك (صباح الأحمد وأم الهيمان ٣ د.ك).
الحجز عن طريق الواتساب. عربون لتثبيت الموعد: ٥ د.ك. طرق الدفع: كي نت، تحويل، أونلاين.`

const ipMap = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 5 * 60 * 1000
const MAX = 25
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
      body: JSON.stringify({ message, sessionId, businessName: 'ماتشا سبا', lang: 'ar', businessContext: BUSINESS_CONTEXT }),
      cache: 'no-store',
      signal: AbortSignal.timeout(28_000),
    })
    if (!r.ok) return NextResponse.json({ reply: 'عذراً، صار خطأ بسيط. جرّبي مرة ثانية 🌸' })
    const data = (await r.json()) as { output?: string }
    return NextResponse.json({ reply: data.output?.trim() || 'عفواً، ما فهمت — ممكن توضحين أكثر؟' })
  } catch {
    return NextResponse.json({ reply: 'تأخرت شوي بالرد، جرّبي مرة ثانية 🌸' })
  }
}
