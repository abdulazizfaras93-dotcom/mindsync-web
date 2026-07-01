import { NextResponse } from 'next/server'

// Reads a client's contract fields from the onboarding record (via n8n) so /sign/<slug>
// auto-populates without a per-client contracts.ts entry. Returns the ContractData shape.
const N8N = 'https://ifaras911.app.n8n.cloud/webhook/contract-data'
const AR = '٠١٢٣٤٥٦٧٨٩'
const toAr = (v: unknown) => String(v ?? '').replace(/[0-9]/g, (d) => AR[+d])
const TIER_AR: Record<string, string> = {
  receptionist: 'موظف الاستقبال', coordinator: 'المنسّق', manager: 'المدير', pilot: 'تجربة ٣٠ يوم',
}

export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get('slug') || ''
  try {
    const r = await fetch(N8N, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug }),
    })
    const rec = await r.json()
    if (!rec?.found) return NextResponse.json({ found: false })

    const p = rec.pricing || {}
    const setup = Number(p.setup ?? 285), monthly = Number(p.monthly ?? 149), pilot = Number(p.pilot ?? 150)
    const convos = Number(p.conversations ?? 3000), overage = Number(p.overage ?? 30)
    const wa = toAr(String(rec.whatsapp || '').replace(/\D/g, '').replace(/^965/, ''))
    const channelsAr = (rec.channels && String(rec.channels).trim())
      || [rec.whatsapp ? 'واتساب' : '', rec.instagram ? 'إنستقرام' : ''].filter(Boolean).join(' و')
      || 'واتساب'

    const contract = {
      businessName: rec.business_name || '',
      ownerLabel: 'صاحب/ة المشروع',
      whatsapp: wa,
      channelsAr,
      tierAr: TIER_AR[rec.tier as string] || 'المنسّق',
      crNumber: rec.cr_number ? toAr(String(rec.cr_number)) : undefined,
      pricing: [
        ['التجربة (٣٠ يوماً)', `${toAr(pilot)} د.ك`, 'تُحتسب من رسوم التأسيس عند الاستمرار'],
        ['رسوم التأسيس (مرة واحدة)', `${toAr(setup)} د.ك`, `يتبقى ${toAr(Math.max(0, setup - pilot))} د.ك بعد خصم مبلغ التجربة`],
        ['الاشتراك الشهري', `${toAr(monthly)} د.ك`, `يشمل ${toAr(convos)} محادثة شهرياً`],
        ['محادثات إضافية', `${toAr(overage)} د.ك`, 'لكل ١٬٠٠٠ محادثة إضافية تتجاوز الحد'],
      ],
    }
    return NextResponse.json({ found: true, contract })
  } catch {
    return NextResponse.json({ found: false })
  }
}
