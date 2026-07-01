import { getStore } from '@netlify/blobs'
import { CONTRACTS, buildContractHtml, type ContractData } from '@/lib/contracts'

export const dynamic = 'force-dynamic'

const SB = 'https://kymdwwuujmsaojzetigd.supabase.co'
// Public anon key (RLS-gated; admin_onboarding_sign is a SECURITY DEFINER RPC granted to anon).
const ANON = process.env.SUPABASE_ANON_KEY!
const N8N = 'https://ifaras911.app.n8n.cloud'

export async function POST(req: Request) {
  try {
    const origin = new URL(req.url).origin
    const body = (await req.json()) as { client?: string; name?: string; signature?: string; agreed?: boolean }
    const client = String(body.client ?? '').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '')
    const name = String(body.name ?? '').trim().slice(0, 120)
    const signature = String(body.signature ?? '')
    if (!client) return Response.json({ error: 'unknown client' }, { status: 400 })
    if (!name || !body.agreed || !signature.startsWith('data:image/')) {
      return Response.json({ error: 'missing name, agreement, or signature' }, { status: 400 })
    }
    if (signature.length > 600_000) return Response.json({ error: 'signature too large' }, { status: 413 })

    // Validate the client exists — static map OR the live onboarding record (any onboarded client at offer+ status).
    let contract: ContractData | undefined = CONTRACTS[client]
    if (!contract) {
      try {
        const cd = await fetch(`${origin}/api/contract?slug=${encodeURIComponent(client)}`, { cache: 'no-store' }).then((r) => r.json())
        if (cd?.found && cd.contract) contract = cd.contract as ContractData
      } catch {}
    }
    if (!contract) return Response.json({ error: 'unknown client' }, { status: 400 })

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    const ua = req.headers.get('user-agent') ?? 'unknown'
    const signedAt = new Date().toISOString()
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    // Signature record (source of truth for the drawn signature).
    const record = { client, name, signedAt, ip, ua, signature }
    const store = getStore({ name: 'signed-contracts' })
    await store.set(`${client}-${id}`, JSON.stringify(record), { metadata: { client, name, signedAt, ip } })

    // Record the signed flag back onto the admin onboarding record (best-effort; no-op until the RPC is applied).
    let clientEmail = ''
    let bizName = contract.businessName
    try {
      const rj = await fetch(`${SB}/rest/v1/rpc/admin_onboarding_sign`, {
        method: 'POST',
        headers: { apikey: ANON, Authorization: `Bearer ${ANON}`, 'content-type': 'application/json' },
        body: JSON.stringify({ p_slug: client, p_name: name, p_signed_at: signedAt, p_signed_ip: ip }),
      }).then((r) => r.json())
      if (rj?.email) clientEmail = String(rj.email)
      if (rj?.business_name) bizName = String(rj.business_name)
    } catch {}

    // Build the signed contract PDF + email it to admin + the client (best-effort — never blocks signing).
    try {
      const ms = await fetch(`${origin}/api/mindsync-signature`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({} as { signature?: string }))
      const html = buildContractHtml(contract, name, signature, ms?.signature || null, signedAt)
      const pdf = await fetch(`${N8N}/webhook/generate-pdf`, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ html, filename: `${client}-contract-signed.pdf` }),
      }).then((r) => r.json()).catch(() => ({} as { url?: string }))
      await fetch(`${N8N}/webhook/admin/contract/signed`, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug: client, name, pdf_url: pdf?.url || '', business_name: bizName, signed_at: signedAt, client_email: clientEmail }),
      }).catch(() => {})
    } catch {}

    return Response.json({ ok: true, id, signedAt })
  } catch (e: any) {
    return Response.json({ error: e?.message || 'sign failed' }, { status: 500 })
  }
}
