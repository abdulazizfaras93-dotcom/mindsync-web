import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MODEL = 'claude-sonnet-4-5-20250929'

const SYSTEM = `أنتِ "وكيلة استقبال" ذكية لصالون "ماتشا سبا" — صالون متنقل (خدمة منزلية) في الكويت، نطلع لبيت الزبونة.

قواعد مهمة:
- جاوبي على سؤال الزبونة مباشرة بالمعلومة المطلوبة. سألت عن سعر خدمة؟ اعطيها سعر تلك الخدمة بالضبط. سألت "تطلعون [منطقة]؟" قولي: إي نطلع كل الكويت. لا ترحّبي ترحيب عام ولا تسألي "شنو الخدمة؟" إذا فيه سؤال واضح.
- احسبي السعر بناءً على عدد الأشخاص اللي ذكرتهم الزبونة فقط (مثلاً "لي ولبنتي" = شخصين). لا تخترعين أعداد.
- إذا طلبت حجز: اجمعي (الخدمة + اليوم + الوقت + المنطقة)، ولخّصي الطلب وأكّديه شفهياً، وقولي إن العربون ٥ د.ك يثبّت الموعد وبنرسلج رابط الدفع على الواتساب. إذا عطتك كل التفاصيل، أكّدي على طول ولا تعيدي السؤال عنها.
- لهجة كويتية فقط (شلون، أبي، وايد، زين، هلا وغلا). ردود قصيرة دافئة، سطرين إلى أربعة. ما تدّعين إنك إنسان؛ لو سألوا قولي مساعدة ذكية من MindSync.

الخدمات والأسعار:
- بدكير منكير بيسك: ١٠ د.ك (٤٥ دقيقة)
- بدكير منكير أطفال: ٦ د.ك (٢٠-٣٠ دقيقة)
- مساج جسم كامل (ساعة): ١٥ د.ك
- مساج المادورا/الخشب (ساعة): ٢٥ د.ك
- ماسك شعر مع غسيل: ٨ د.ك (٣٠ دقيقة)
- سشوار شعر: من ٥ إلى ١٨ د.ك (٣٠-٤٥ دقيقة)

المنطقة: مدينة الكويت، ونوصل كل الكويت. ساعات العمل: ١١ الصبح – ١٠ الليل، كل الأيام.
التوصيل: مجاني فوق ١٠ د.ك، وإلا ١.٥ د.ك (صباح الأحمد وأم الهيمان ٣ د.ك). عربون التثبيت: ٥ د.ك. الدفع: كي نت، تحويل، أونلاين.`

const ipMap = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 5 * 60 * 1000
const MAX = 30
function getIp(req: Request) { return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown' }
function limited(k: string) {
  const now = Date.now(); const e = ipMap.get(k)
  if (!e || now > e.resetAt) { ipMap.set(k, { count: 1, resetAt: now + WINDOW_MS }); return false }
  if (e.count >= MAX) return true; e.count++; return false
}

type Turn = { role: 'user' | 'assistant'; content: string }

export async function POST(req: Request) {
  const k = getIp(req)
  if (limited(k)) return NextResponse.json({ reply: 'جرّبتي وايد رسائل بسرعة 🌸 خذي نفس ثواني وجرّبي مرة ثانية.' }, { status: 429 })
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ reply: 'الوكيل قيد الإعداد 🌸 رجّعي بعد شوي.' })

  let body: { messages?: Turn[] }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'bad json' }, { status: 400 }) }

  let msgs: Turn[] = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m?.content === 'string' && m.content.trim())
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 500) }))
  while (msgs.length && msgs[0].role !== 'user') msgs.shift()
  if (!msgs.length) return NextResponse.json({ error: 'empty' }, { status: 400 })

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 400, system: SYSTEM, messages: msgs }),
      signal: AbortSignal.timeout(28_000),
    })
    if (!r.ok) { const e = await r.text(); return NextResponse.json({ reply: 'عذراً، صار خطأ بسيط. جرّبي مرة ثانية 🌸', _debug: `${r.status}: ${e.slice(0, 300)}` }) }
    const data = (await r.json()) as { content?: { type: string; text?: string }[] }
    const reply = data?.content?.find((c) => c.type === 'text')?.text?.trim()
    return NextResponse.json({ reply: reply || 'تمام 🌸 قوليلي شنو تحتاجين وأساعدج.' })
  } catch {
    return NextResponse.json({ reply: 'تأخرت شوي بالرد، جرّبي مرة ثانية 🌸' })
  }
}
