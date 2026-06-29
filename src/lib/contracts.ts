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
  const scope = scopeFor(data.channelsAr).map((x) => `<li>${x}</li>`).join('')
  const price = data.pricing.map(([a, b, c]) => `<tr><td>${a}</td><td style="font-weight:700;color:#153E2D">${b}</td><td style="color:#6B7570">${c}</td></tr>`).join('')
  const rest = REST_ARTICLES.map(([t, b], i) => `<div class="art"><h3>المادة ${REST_NUM[i]}: ${t}</h3><p>${b}</p></div>`).join('')
  const msSig = msSignatureDataUrl ? `<img src="${msSignatureDataUrl}" style="max-height:72px"/>` : '<div>التوقيع: ______________</div>'
  return `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><style>
    body{font-family:'Segoe UI',Tahoma,Arial,sans-serif;color:#0E1512;padding:34px;line-height:1.75}
    h1{color:#153E2D;font-size:22px;margin:0}.sub{color:#6B7570;font-size:12px}
    .art{margin:14px 0}.art h3{color:#153E2D;font-size:15px;margin:0 0 4px}.art p{margin:0;font-size:13px}
    table{width:100%;border-collapse:collapse;margin:8px 0}td,th{border:1px solid #E2DDCF;padding:8px;text-align:right;font-size:13px}
    th{background:#F0F6F3;color:#153E2D}ul{padding-right:20px;margin:6px 0}li{margin:3px 0;font-size:13px}
    .parties{background:#F5F3EC;padding:12px;border-radius:8px;font-size:13px;margin:12px 0}
    .sigrow{display:flex;gap:28px;margin-top:30px}.sigbox{flex:1;border-top:2px solid #153E2D;padding-top:10px}.role{color:#6B7570;font-size:12px}.nm{font-weight:700;margin:4px 0}
  </style></head><body>
    <h1>عقد تقديم خدمة — وكيل ذكاء اصطناعي</h1><div class="sub">MindSync · مايند سينك — حلول الذكاء الاصطناعي</div>
    <div class="parties"><b>الطرف الأول (مزوّد الخدمة):</b> MindSync — رقم الرخصة: ${PROVIDER.license} · ${PROVIDER.email} · ${PROVIDER.phone}<br/><b>الطرف الثاني (العميل):</b> ${data.businessName} — واتساب: ${data.whatsapp}</div>
    <div class="art"><h3>المادة ١: موضوع العقد</h3><p>${article1(data.channelsAr)}</p></div>
    <div class="art"><h3>المادة ٢: نطاق الخدمة</h3><ul>${scope}</ul></div>
    <div class="art"><h3>المادة ٣: الرسوم والدفع</h3><table><tr><th>البند</th><th>المبلغ</th><th>ملاحظات</th></tr>${price}</table></div>
    ${rest}
    <div class="sigrow">
      <div class="sigbox"><div class="role">الطرف الأول — MindSync</div><div class="nm">${PROVIDER.name}</div>${msSig}</div>
      <div class="sigbox"><div class="role">الطرف الثاني — ${data.businessName}</div><div class="nm">${signerName}</div><img src="${signatureDataUrl}" style="max-height:72px"/><div class="sub">موقّع إلكترونياً · ${fmtDateAr(signedAt)}</div></div>
    </div>
  </body></html>`
}
