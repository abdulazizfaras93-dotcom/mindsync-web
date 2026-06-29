// Contract data — one entry per client. Add a client → it's signable at /sign/<id>.
// MindSync's side (PROVIDER + the drawn signature) is shared across all contracts.

export const PROVIDER = {
  name: 'عبدالعزيز شاكر فرس',
  license: '٢٠٢٦/٨٠٢٤',
  email: 'admin@mindsynckw.com',
  phone: '٩٩٥٣٩٠٠٦',
}

export type ContractData = {
  businessName: string // e.g. صالون «ماتشا سبا»
  ownerLabel: string // المالكة / صاحب المشروع
  whatsapp: string // Arabic-indic digits
  channelsAr: string // واتساب وإنستقرام
  tierAr: string // المنسّق
  pricing: [string, string, string][] // [item, amount, note]
}

export function scopeFor(channelsAr: string): string[] {
  return [
    `وكيل ذكاء اصطناعي يعمل ٢٤/٧ باللهجة الكويتية على ${channelsAr}`,
    'نظام حجز كامل: استقبال الحجز، تأكيده، وحساب رسوم التوصيل والعربون',
    'تذكير العملاء قبل مواعيدهم تلقائياً واستعادة المواعيد الملغاة',
    'تعديل وإلغاء حجوزات العملاء العائدين',
    'قاعدة بيانات العملاء + لوحة تحكم لمتابعة الحجوزات',
    'ما يصل إلى ٣٬٠٠٠ محادثة شهرياً',
    'المراقبة والصيانة وتحديث الأسعار والردود عند الطلب',
  ]
}

// Article 1 (needs channels). Articles 4–11 are generic legal text.
export function article1(channelsAr: string): string {
  return `يلتزم الطرف الأول بتزويد الطرف الثاني بخدمة «وكيل ذكاء اصطناعي» ضمن باقة الخدمة المتفق عليها، يعمل على قنوات الطرف الثاني (${channelsAr}) للرد على العملاء وإدارة الحجوزات وجمع بيانات العملاء، وفقاً للمواصفات الواردة في هذا العقد.`
}

export const REST_ARTICLES: [string, string][] = [
  ['مدفوعات عملاء الطرف الثاني', 'تذهب مبالغ العربون والمدفوعات من عملاء الطرف الثاني مباشرةً إلى حساب الطرف الثاني الخاص، ولا تمر عبر الطرف الأول، والطرف الأول غير مسؤول عن تحصيلها.'],
  ['التزامات الطرف الأول (MindSync)', 'بناء الوكيل وتشغيله وصيانته، وتقديم الدعم والتحديثات، والحفاظ على سرية بيانات الطرف الثاني وعملائه واستخدامها فقط لتشغيل الخدمة.'],
  ['التزامات الطرف الثاني', 'تزويد الطرف الأول بحساب واتساب بزنس الرسمي وإتمام التوثيق، وتوفير حساب الدفع لاستلام العربون، وتزويد المعلومات الصحيحة (الخدمات والأسعار والمناطق)، وأي تعاون لازم لتفعيل الخدمة.'],
  ['المدة والتجديد', 'يبدأ العقد بفترة تجربة مدتها ٣٠ يوماً، ثم يتجدد تلقائياً لمدد شهرية متتالية ما لم يخطر أحد الطرفين الآخر برغبته في عدم التجديد.'],
  ['الإنهاء', 'يحق لأي من الطرفين إنهاء العقد بإشعار كتابي مسبق مدته ١٤ يوماً. الرسوم المدفوعة عن الفترة المستخدمة غير قابلة للاسترداد، وعند الإنهاء يسلّم الطرف الأول للطرف الثاني بيانات عملائه.'],
  ['البيانات والملكية', 'بيانات العملاء التي يجمعها الوكيل هي ملك للطرف الثاني، ويحتفظ الطرف الأول بملكية النظام والبرمجيات والتقنية المستخدمة في تقديم الخدمة.'],
  ['حدود المسؤولية', 'يبذل الطرف الأول أقصى جهد لضمان عمل الخدمة بكفاءة، إلا أنه لا يضمن استمراريتها دون انقطاع نتيجة أعطال خارجة عن إرادته (مثل انقطاع خدمات واتساب أو مزوّدي الذكاء الاصطناعي)، وتقتصر مسؤوليته على قيمة الاشتراك الشهري.'],
  ['أحكام عامة', 'يخضع هذا العقد لقوانين دولة الكويت، وتُحل أي نزاعات ودياً، وإلا فعبر المحاكم الكويتية المختصة. لا يجوز تعديل العقد إلا كتابةً وبموافقة الطرفين.'],
]

export const CONTRACTS: Record<string, ContractData> = {
  matcha: {
    businessName: 'صالون «ماتشا سبا»',
    ownerLabel: 'المالكة',
    whatsapp: '٦٧٦٥٧١٧٦',
    channelsAr: 'واتساب وإنستقرام',
    tierAr: 'المنسّق',
    pricing: [
      ['التجربة (٣٠ يوماً)', '١٥٠ د.ك', 'تُحتسب من رسوم التأسيس عند الاستمرار'],
      ['رسوم التأسيس (مرة واحدة)', '٢٨٥ د.ك', 'يتبقى ١٣٥ د.ك بعد خصم مبلغ التجربة'],
      ['الاشتراك الشهري', '١٠٠ د.ك', 'يشمل ٣٬٠٠٠ محادثة شهرياً'],
      ['محادثات إضافية', '٣٠ د.ك', 'لكل ١٬٠٠٠ محادثة إضافية تتجاوز الحد'],
    ],
  },
}

// Full signed-contract HTML for server-side PDF generation (PDFShift) — emailed after signing.
const REST_NUM = ['٤', '٥', '٦', '٧', '٨', '٩', '١٠', '١١']
function fmtDateAr(iso: string): string {
  const d = iso ? new Date(iso) : new Date()
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
}
export function buildContractHtml(data: ContractData, signerName: string, signatureDataUrl: string, msSignatureDataUrl: string | null, signedAt: string): string {
  // Mirrors the branded /sign/[client] page exactly (sign.module.css) so the emailed PDF == the contract the client signed.
  const feats = scopeFor(data.channelsAr).map((x) => `<li>${x}</li>`).join('')
  const price = data.pricing.map(([a, b, c]) => `<tr><td>${a}</td><td class="amt">${b}</td><td class="nt">${c}</td></tr>`).join('')
  const rest = REST_ARTICLES.map(([t, b], i) => `<div class="art"><h3>المادة ${REST_NUM[i]}: ${t}</h3><p>${b}</p></div>`).join('')
  const msSig = msSignatureDataUrl
    ? `<img class="sigimg" src="${msSignatureDataUrl}" alt="توقيع MindSync"/><div class="signedMeta">موقّع مسبقاً عن MindSync</div>`
    : `<div class="sigline">التوقيع: ______________</div>`
  return `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root{--green:#0F2E22;--green2:#153E2D;--gold:#BF8D38;--gold2:#9a7320;--ivory:#FBFAF5;--ink:#1d2a22}
    *{box-sizing:border-box}
    @page{margin:14mm}
    body{direction:rtl;font-family:'Noto Kufi Arabic',sans-serif;color:var(--ink);margin:0;background:#fff;font-size:14px;line-height:1.85}
    .hd{display:flex;align-items:center;gap:13px;border-bottom:2.5px solid var(--gold);padding-bottom:12px}
    .hd img{width:60px;height:auto}
    .hd h1{color:var(--green2);font-size:20px;font-weight:700;line-height:1.3;margin:0}
    .hd .s{color:var(--gold2);font-size:12px;margin-top:3px}
    .parties{background:#F6F3EA;border:1px solid #E7E0CF;border-radius:8px;padding:12px 15px;margin:14px 0 4px;font-size:13px}
    .parties b{color:var(--green2)}
    .art{margin-top:15px;page-break-inside:avoid}
    .art h3{color:var(--gold);font-size:14.5px;font-weight:700;margin:0 0 5px}
    .art p{text-align:justify;margin:0}
    .feat{margin:0 18px 0 0;padding:0}
    .feat li{margin-bottom:4px}
    .price{width:100%;border-collapse:collapse;margin:8px 0;font-size:13px}
    .price th{background:var(--green);color:var(--ivory);padding:8px 10px;text-align:right;font-weight:600}
    .price td{padding:8px 10px;border-bottom:1px solid #E7E0CF}
    .amt{color:var(--gold2);font-weight:700;white-space:nowrap}
    .nt{color:#5c6657;font-size:12px}
    .signrow{display:flex;gap:28px;margin-top:28px;page-break-inside:avoid}
    .sigbox{flex:1;border-top:1.5px solid var(--ink);padding-top:8px;font-size:12.5px}
    .sigrole{color:var(--gold2);font-weight:700;margin-bottom:10px}
    .sigline{margin-bottom:8px;color:#444}
    .signedName{font-size:16px;font-weight:700;color:var(--green2)}
    .sigimg{display:block;max-width:180px;max-height:70px;margin:4px 0}
    .signedMeta{font-size:11.5px;color:var(--gold2)}
  </style></head><body>
    <div class="hd">
      <img src="https://www.mindsynckw.com/logo.png" alt="MindSync"/>
      <div><h1>عقد تقديم خدمة</h1><div class="s">MindSync · مايند سينك — حلول الذكاء الاصطناعي</div></div>
    </div>
    <div class="parties">
      أُبرم هذا العقد بين:<br/>
      <b>الطرف الأول (مزوّد الخدمة):</b> MindSync (مايند سينك) — رقم الرخصة التجارية: ${PROVIDER.license} · البريد الإلكتروني: ${PROVIDER.email} · رقم التواصل: ${PROVIDER.phone}<br/>
      <b>الطرف الثاني (العميل):</b> ${data.businessName} — رقم واتساب العمل: ${data.whatsapp}
    </div>
    <div class="art"><h3>المادة ١: موضوع العقد</h3><p>${article1(data.channelsAr)}</p></div>
    <div class="art"><h3>المادة ٢: نطاق الخدمة</h3><ul class="feat">${feats}</ul></div>
    <div class="art"><h3>المادة ٣: الرسوم والدفع</h3>
      <table class="price"><tbody>
        <tr><th>البند</th><th>المبلغ</th><th>ملاحظات</th></tr>
        ${price}
      </tbody></table>
      <p>تُدفع رسوم الاشتراك الشهري مقدماً في بداية كل دورة. جميع المبالغ بالدينار الكويتي وغير شاملة أي رسوم خارجية لمزوّدي الخدمات (مثل واتساب الرسمي) إن وُجدت.</p>
    </div>
    ${rest}
    <div class="signrow">
      <div class="sigbox">
        <div class="sigrole">الطرف الأول — MindSync</div>
        <div class="signedName">${PROVIDER.name}</div>
        ${msSig}
      </div>
      <div class="sigbox">
        <div class="sigrole">الطرف الثاني — ${data.businessName}</div>
        <div class="signedName">${signerName}</div>
        <img class="sigimg" src="${signatureDataUrl}" alt="التوقيع"/>
        <div class="signedMeta">موقّع إلكترونياً · ${fmtDateAr(signedAt)}</div>
      </div>
    </div>
  </body></html>`
}
