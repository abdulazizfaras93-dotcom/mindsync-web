# MindSync n8n Workflows — Claude Code Build Prompt

You are working on the MindSync n8n automation system. MindSync is a Kuwaiti AI automation agency (mindsynckw.com). You have access to the n8n MCP tool. Your job is to build, fix, and connect all workflows correctly.

## n8n Instance
URL: https://ifaras911.app.n8n.cloud
Project: MindSync Manager

## Credentials (already exist in n8n — use exact names)
- Telegram: "MindSync Manager Agent Telegram" (Bot: @Ifarasaibot, Founder Chat ID: 6775247154)
- Anthropic: "MindSync Manager Agent Anthropic" (Model: claude-sonnet-4-5)
- Google Sheets: "Google Sheets" (Sheet ID: 10LvdypB8ZHCTFeDM2IPadoLfaA0muxDJExZGqaD_KzU)
- Google Calendar: "Google Calendar"
- Gmail: "Gmail"
- PDFShift: "PDFShift" (Header Auth — Authorization header)
- Apify: HTTP Request nodes with Bearer token in Authorization header

## Google Sheet Tabs & Columns
Sheet: "MindSync Manager Agent"

**leads:** lead_id, created_at, full_name, phone, whatsapp, email, website, channel, business_name, industry, location, num_employees, current_tools, pain_point, interested_bundle, budget_signal, lead_score, status, last_contact_at, next_action, next_action_date, notes, assigned_to, won_bundle, won_value_kwd, lost_reason

**clients:** client_id, created_at, full_name, business_name, industry, phone, whatsapp, email, website, location, bundle, build_fee_kwd, monthly_retainer_kwd, status, start_date, go_live_date, renewal_date, contract_number, whatsapp_number_approved, agent_status, last_contact_at, last_action, last_action_at, satisfaction_score, churn_reason, notes, referred_by

**payments:** invoice_number, created_at, client_id, client_name, business_name, client_phone, client_whatsapp, client_email, invoice_type, bundle, amount_kwd, due_date, status, paid_at, payment_method, payment_reference, reminder_day1_sent, reminder_day5_sent, reminder_day10_sent, notes

**conversations:** session_id, timestamp, channel, sender_id, sender_name, role, message, intent, department_routed

**content_calendar:** content_id, approved_at, topic, instagram_ar, instagram_en, instagram_hashtags_ar, instagram_hashtags_en, linkedin_ar, linkedin_en, whatsapp_ar, whatsapp_en, email_subject_ar, email_body_ar, email_subject_en, email_body_en, best_post_time, scheduled_date, posted_instagram, posted_linkedin, posted_whatsapp, status

**kpi_snapshots:** snapshot_date, active_clients, onboarding_clients, churned_this_week, mrr_kwd, collected_this_week_kwd, pending_invoices_kwd, overdue_kwd, new_leads_this_week, total_leads_pipeline, hot_leads, leads_won_this_week, revenue_won_kwd

**audit_log:** timestamp, workflow, action, entity_id, entity_name, result, detail, error

## MindSync Pricing (KWD)
- Clinic AI Bundle: Build 640 / Essential 240 / Advanced 380 / Full-Stack 520
- Salon AI Bundle: Build 480 / Essential 160 / Advanced 260 / Full-Stack 360
- Gym AI Bundle: Build 560 / Essential 200 / Advanced 320 / Full-Stack 440
- Garage AI Bundle: Build 520 / Essential 180 / Advanced 290 / Full-Stack 400
- Restaurant AI Bundle: Build 560 / Essential 220 / Advanced 360 / Full-Stack 500
- Real Estate AI Bundle: Build 680 / Essential 260 / Advanced 420 / Full-Stack 580

## Founder Info
- Name: Abdulaziz Faras
- Telegram Chat ID: 6775247154
- Email: admin@mindsynckw.com
- WhatsApp: +96599539006

---

## WORKFLOW 1: MindSync — Manager Agent

### Purpose
The Manager Agent is Abdulaziz's personal AI brain. Only he can talk to it via Telegram. It reads Google Sheets directly before answering, so it always has real business data.

### Node Flow
```
Telegram Trigger
      ↓
Verify Founder (Code)
      ↓
Is Founder? (IF) — if skip=true → stop, if false → continue
      ↓
Read Clients (Google Sheets — read clients tab)
      ↓
Read Leads (Google Sheets — read leads tab)
      ↓
Read Payments (Google Sheets — read payments tab)
      ↓
Merge (Merge node — Combine by Position — waits for all 3 reads)
      ↓
Merge Business Data (Code)
      ↓
AI Agent (claude-sonnet-4-5 + Simple Memory session key: manager_{{ $json.chat_id }})
      ↓
Extract Reply (Code)
      ↓
Contains PDF Request? (IF — checks if $json.reply contains "doc_type")
   TRUE → Generate PDF (HTTP Request POST to PDF Generator webhook) → Reply to Founder
   FALSE → Reply to Founder
      ↓
Audit Log (Google Sheets — append audit_log)
```

### Verify Founder Code
```javascript
const msg = $input.first().json;
const text = msg?.message?.text || '';
const chatId = msg?.message?.chat?.id?.toString() || '';
const from = msg?.message?.from || {};
if (chatId !== '6775247154') {
  return [{ json: { skip: true } }];
}
return [{ json: {
  skip: false,
  text: text,
  chat_id: chatId,
  sender_name: (from.first_name || 'Founder'),
  timestamp: new Date().toISOString()
} }];
```

### Merge Business Data Code
```javascript
const clients  = $('Read Clients').all().map(i => i.json);
const leads    = $('Read Leads').all().map(i => i.json);
const payments = $('Read Payments').all().map(i => i.json);
const input    = $('Verify Founder').first().json;

const activeClients  = clients.filter(c => c.status === 'Active').length;
const onboarding     = clients.filter(c => c.status === 'Onboarding').length;
const mrr            = clients.filter(c => c.status === 'Active').reduce((s,c) => s+(parseFloat(c.monthly_retainer_kwd)||0),0);
const newLeads       = leads.filter(l => l.status === 'New').length;
const hotLeads       = leads.filter(l => (parseInt(l.lead_score)||0)>=7 && l.status!=='Won').length;
const overdueAmount  = payments.filter(p => p.status==='Pending' && new Date(p.due_date)<new Date()).reduce((s,p) => s+(parseFloat(p.amount_kwd)||0),0);
const pendingAmount  = payments.filter(p => p.status==='Pending').reduce((s,p) => s+(parseFloat(p.amount_kwd)||0),0);

return [{ json: {
  text: input.text,
  chat_id: input.chat_id,
  timestamp: input.timestamp,
  business_data: JSON.stringify({
    clients: { total: clients.length, active: activeClients, onboarding, mrr_kwd: mrr, list: clients.slice(0,20) },
    leads: { total: leads.length, new: newLeads, hot: hotLeads, list: leads.slice(0,20) },
    payments: { pending_kwd: pendingAmount, overdue_kwd: overdueAmount, list: payments.slice(0,20) }
  })
} }];
```

### AI Agent System Prompt
```
You are the MindSync Manager Agent — the digital brain of Abdulaziz Faras, founder of MindSync Kuwait AI automation agency.

CRITICAL RULES:
1. When the founder asks for a PDF invoice or contract, output the request as JSON with doc_type field. n8n will automatically detect and call the PDF generator. Do NOT say "call the webhook" or "send this to the API". Just output the JSON and say the PDF is being generated.
2. Always reply in the same language the founder used — Arabic = Kuwaiti dialect ONLY, English = English.
3. Be direct, concise, act like a smart business partner.

MindSync Pricing (KWD):
Clinic AI Bundle: Build 640 / Essential 240 / Advanced 380 / Full-Stack 520
Salon AI Bundle: Build 480 / Essential 160 / Advanced 260 / Full-Stack 360
Gym AI Bundle: Build 560 / Essential 200 / Advanced 320 / Full-Stack 440
Garage AI Bundle: Build 520 / Essential 180 / Advanced 290 / Full-Stack 400
Restaurant AI Bundle: Build 560 / Essential 220 / Advanced 360 / Full-Stack 500
Real Estate AI Bundle: Build 680 / Essential 260 / Advanced 420 / Full-Stack 580

Bank details (for invoices):
bank_name: بنك الكويت الوطني
bank_iban: KW81CBKU0000000000001234560101

When generating an invoice, output this exact JSON structure:
{
  "doc_type": "invoice",
  "lang": "ar or en based on client",
  "invoice_number": "MS-2026-XXX",
  "client_name": "from sheets data",
  "client_company": "from sheets data",
  "client_phone": "from sheets data",
  "client_email": "from sheets data",
  "service_name": "bundle and tier name",
  "service_desc": "brief description",
  "service_type": "One-time or Monthly Retainer",
  "amount": "0.000",
  "due_date": "DD/MM/YYYY",
  "bank_name": "بنك الكويت الوطني",
  "bank_iban": "KW81CBKU0000000000001234560101"
}

When generating a contract, output this exact JSON structure:
{
  "doc_type": "contract",
  "lang": "ar or en based on client",
  "contract_number": "MS-AR-2026-XXX",
  "client_name": "from sheets data",
  "client_company": "from sheets data",
  "client_phone": "from sheets data",
  "client_email": "from sheets data",
  "bundle_name": "bundle name",
  "bundle_and_tier": "Clinic AI — Advanced",
  "tier_name": "Advanced",
  "build_fee": "640",
  "monthly_retainer": "380",
  "due_at_signing": "1020",
  "start_date": "DD/MM/YYYY",
  "bank_iban": "KW81CBKU0000000000001234560101"
}

You have full access to real business data passed to you below. Use it to answer questions, generate reports, draft invoices, give business advice.
```

### AI Agent User Message (Prompt)
```
={{ 'Founder: ' + $json.text + '\n\nBusiness Data:\n' + $json.business_data }}
```

### Extract Reply Code
```javascript
const raw = $input.first().json?.output || $input.first().json?.text || $input.first().json?.content || '';
const reply = raw.toString().trim();
return [{ json: { reply: reply } }];
```

### Contains PDF Request IF Condition
- Value 1: `={{ $json.reply }}`
- Operation: Contains
- Value 2: `doc_type`

### Generate PDF HTTP Request Node
- Method: POST
- URL: `https://ifaras911.app.n8n.cloud/webhook/generate-pdf`
- Body Content Type: JSON
- Body (expression mode):
```
={{ (() => { try { const match = $json.reply.match(/\{[\s\S]*?"doc_type"[\s\S]*?\}/); return match ? match[0] : '{}'; } catch(e) { return '{}'; } })() }}
```

### Reply to Founder Telegram Node
- Chat ID: `6775247154`
- Text: `={{ $('AI Agent').first().json.output.replace(/\{[\s\S]*?"doc_type"[\s\S]*?\}/g, '').trim() || $('Extract Reply').first().json.reply }}`

### Audit Log Google Sheets Node
- Operation: Append
- Sheet: `audit_log`
- Columns:
  - timestamp: `={{ new Date().toISOString() }}`
  - workflow: `manager-agent`
  - action: `founder_message`
  - entity_id: `founder`
  - entity_name: `Abdulaziz`
  - result: `success`
  - detail: `={{ $('Verify Founder').first().json.text.substring(0,100) }}`
  - error: (empty)

---

## WORKFLOW 2: MindSync — Receptionist Agent

### Purpose
The Receptionist faces the outside world — website, Instagram, WhatsApp. It talks to leads and clients, qualifies them, collects contact info, books Google Calendar calls, logs everything to Sheets, and notifies the founder for hot leads.

### Node Flow
```
Website Webhook (POST /receptionist-website) ──┐
Instagram Webhook (POST /receptionist-instagram)┼──→ Normalize Input (Code)
WhatsApp Webhook (POST /receptionist-whatsapp) ──┘          ↓
                                                    Receptionist Brain (AI Agent)
                                                             ↓
                                                      Parse Response (Code)
                                                    ↓      ↓       ↓        ↓
                                               Log Lead  Log    Wants    Notify
                                               (Sheets) Conv   Call?    Manager?
                                                        (Sheets)  ↓         ↓
                                                               Book Cal  Notify Mgr
                                                                         (Telegram)
                                                                              ↓
                                                                         Audit Log
                                                                              ↓
                                                                       Send Response
                                                                    (Respond to Webhook)
```

### Normalize Input Code
```javascript
const input = $input.first().json;
const body = input?.body || input;
const isInstagram = !!body?.instagram_user_id;
const isWebsite = !!body?.session_id && !isInstagram;

let text, senderId, senderName, senderPhone, senderEmail, senderWebsite, channel;

if (isInstagram) {
  text = body?.message?.text || body?.text || '';
  senderId = body?.instagram_user_id || body?.sender_id || '';
  senderName = body?.sender_name || 'Instagram User';
  channel = 'instagram';
} else if (isWebsite) {
  text = body?.text || body?.message || '';
  senderId = body?.user_id || body?.session_id || ('web_' + Date.now());
  senderName = body?.name || 'Website Visitor';
  senderPhone = body?.phone || '';
  senderEmail = body?.email || '';
  senderWebsite = body?.website || '';
  channel = 'website';
} else {
  text = body?.text || body?.message || '';
  senderId = body?.sender_id || ('anon_' + Date.now());
  senderName = body?.name || body?.sender_name || 'Visitor';
  senderPhone = body?.phone || '';
  senderEmail = body?.email || '';
  channel = 'webhook';
}

const arabicPattern = /[\u0600-\u06FF]/;
const language = arabicPattern.test(text) ? 'ar' : 'en';

return [{ json: {
  text, sender_name: senderName, sender_phone: senderPhone || body?.phone || '',
  sender_email: senderEmail || body?.email || '', sender_website: senderWebsite || body?.website || '',
  sender_id: senderId, channel, language,
  session_id: channel + '_' + senderId, timestamp: new Date().toISOString()
} }];
```

### Receptionist Brain AI Agent System Prompt
```
You are the MindSync Receptionist — the face of MindSync, a Kuwaiti AI automation agency.

LANGUAGE RULE (CRITICAL):
- Arabic message → reply ONLY in Kuwaiti Gulf dialect (not Saudi, not Egyptian, not formal)
- English message → reply ONLY in English
- Never mix languages

Your personality: Warm, confident, helpful. Sound human — never robotic.

MindSync services:
- AI agents for Kuwaiti SMBs: clinics, salons, gyms, garages, restaurants, real-estate
- WhatsApp AI answers customers 24/7, books appointments, sends reminders
- Build fee from 480 KWD + monthly retainer from 160 KWD/month
- 7 business day delivery. Made in Kuwait, Arabic-first.

Your goals:
1. Understand what they want
2. Qualify them — what type of business? what is their main problem?
3. Collect their WhatsApp and Email if not already known
4. If interested in moving forward — offer to book a discovery call
5. Answer questions about MindSync confidently

After your reply, always append this JSON on a new line:
{"reply":"your message","intent":"new_lead or existing_client or pricing_question or booking_request or general_question or spam","industry":"clinic or salon or gym or garage or restaurant or real-estate or unknown","lead_score":5,"pain_point":"brief or empty","wants_call":false,"collected_phone":null,"collected_whatsapp":null,"collected_email":null,"notify_manager":false,"manager_note":null}
```

### Receptionist Brain AI Agent User Message
```
={{ 'Channel: ' + $json.channel + '\nSender: ' + $json.sender_name + '\nPhone: ' + $json.sender_phone + '\nEmail: ' + $json.sender_email + '\nLanguage: ' + $json.language + '\n\nMessage: ' + $json.text }}
```

### Receptionist Brain Memory
- Session Key: `={{ $json.session_id }}`
- Window Size: 10

### Parse Response Code
```javascript
const raw = $input.first().json?.output || $input.first().json?.text || $input.first().json?.content || '';
let p;
try {
  const match = raw.match(/\{[\s\S]*?\}/);
  p = match ? JSON.parse(match[0]) : {};
} catch(e) {
  p = { reply: raw, intent: 'general_question', industry: 'unknown', lead_score: 5, pain_point: '', wants_call: false, collected_phone: null, collected_whatsapp: null, collected_email: null, notify_manager: false, manager_note: null };
}
const prev = $('Normalize Input').first().json;
return [{ json: {
  text: prev.text, sender_name: prev.sender_name, sender_phone: prev.sender_phone,
  sender_email: prev.sender_email, sender_website: prev.sender_website,
  sender_id: prev.sender_id, channel: prev.channel, language: prev.language,
  session_id: prev.session_id, timestamp: prev.timestamp,
  reply: p.reply || raw, intent: p.intent || 'general_question',
  industry: p.industry || 'unknown', lead_score: p.lead_score || 5,
  pain_point: p.pain_point || '', wants_call: p.wants_call || false,
  collected_phone: p.collected_phone || prev.sender_phone || null,
  collected_whatsapp: p.collected_whatsapp || null,
  collected_email: p.collected_email || prev.sender_email || null,
  notify_manager: p.notify_manager || false, manager_note: p.manager_note || null
} }];
```

### Log Lead Google Sheets Node
- Operation: Append
- Sheet: `leads`
- Columns:
  - lead_id: `={{ 'LEAD-' + Date.now() }}`
  - created_at: `={{ $json.timestamp }}`
  - full_name: `={{ $json.sender_name }}`
  - phone: `={{ $json.collected_phone || $json.sender_phone }}`
  - whatsapp: `={{ $json.collected_whatsapp || $json.sender_phone }}`
  - email: `={{ $json.collected_email || $json.sender_email }}`
  - website: `={{ $json.sender_website }}`
  - channel: `={{ $json.channel }}`
  - industry: `={{ $json.industry }}`
  - pain_point: `={{ $json.pain_point }}`
  - budget_signal: `unknown`
  - lead_score: `={{ $json.lead_score }}`
  - status: `New`
  - last_contact_at: `={{ $json.timestamp }}`
  - next_action: `={{ $json.wants_call ? 'Discovery call booked' : 'Follow up' }}`
  - notes: `={{ $json.text }}`
  - assigned_to: `Abdulaziz`

### Log Conversation Google Sheets Node
- Operation: Append
- Sheet: `conversations`
- Columns:
  - session_id: `={{ $json.session_id }}`
  - timestamp: `={{ $json.timestamp }}`
  - channel: `={{ $json.channel }}`
  - sender_id: `={{ $json.sender_id }}`
  - sender_name: `={{ $json.sender_name }}`
  - role: `user`
  - message: `={{ $json.text }}`
  - intent: `={{ $json.intent }}`
  - department_routed: `receptionist`

### Wants Call IF Node
- Condition: `={{ $json.wants_call }}` equals `true`
- TRUE → Book Calendar
- FALSE → nothing

### Book Calendar Google Calendar Node
- Operation: Create Event
- Calendar: primary
- Start: `={{ new Date(Date.now() + 2*24*60*60*1000).toISOString().split('T')[0] }}T10:00:00`
- End: `={{ new Date(Date.now() + 2*24*60*60*1000).toISOString().split('T')[0] }}T10:30:00`
- Summary: `=MindSync Discovery Call — {{ $json.sender_name }}`
- Description: `=Name: {{ $json.sender_name }}\nPhone: {{ $json.collected_phone }}\nWhatsApp: {{ $json.collected_whatsapp }}\nEmail: {{ $json.collected_email }}\nIndustry: {{ $json.industry }}\nScore: {{ $json.lead_score }}/10`

### Notify Manager IF Node
- Condition: `={{ $json.notify_manager }}` equals `true`
- TRUE → Notify Manager Telegram node
- FALSE → Audit Log

### Notify Manager Telegram Node
- Chat ID: `6775247154`
- Text:
```
=🔔 New Lead — {{ $json.channel }}

Name: {{ $json.sender_name }}
Phone: {{ $json.collected_phone || $json.sender_phone || 'Not collected' }}
WhatsApp: {{ $json.collected_whatsapp || 'Not collected' }}
Email: {{ $json.collected_email || 'Not collected' }}
Industry: {{ $json.industry }}
Score: {{ $json.lead_score }}/10
Call booked: {{ $json.wants_call ? 'Yes' : 'No' }}

Note: {{ $json.manager_note }}
Message: {{ $json.text }}
```

### Audit Log Google Sheets Node
- Operation: Append
- Sheet: `audit_log`
- Columns:
  - timestamp: `={{ new Date().toISOString() }}`
  - workflow: `receptionist-agent`
  - action: `={{ $json.intent }}`
  - entity_id: `={{ $json.sender_id }}`
  - entity_name: `={{ $json.sender_name }}`
  - result: `success`
  - detail: `={{ 'score:' + $json.lead_score + ' channel:' + $json.channel }}`
  - error: (empty)

### Send Response Node
- Type: Respond to Webhook
- Respond With: JSON
- Body: `={{ JSON.stringify({ success: true, reply: $('Parse Response').first().json.reply }) }}`

---

## WORKFLOW 3: MindSync — Receptionist Crons

### Purpose
4 independent scheduled chains that run automatically without any trigger from the founder.

### Chain 1 — Every 6h Client Ops
```
Every 6h (Schedule Trigger)
      ↓
Read Clients (Google Sheets)
      ↓
Check Clients (Code)
      ↓
Has Client Alert (IF — alert != 'none')
   YES → Alert Manager Client (Telegram to 6775247154) → Update Client (Google Sheets)
   NO  → nothing
```

### Check Clients Code
```javascript
const clients = $input.all().map(i => i.json);
const now = new Date();
const alerts = [];
for (const c of clients) {
  if (!c.status || c.status === 'Churned') continue;
  const start = c.start_date ? new Date(c.start_date) : null;
  const last = c.last_contact_at ? new Date(c.last_contact_at) : null;
  const renewal = c.renewal_date ? new Date(c.renewal_date) : null;
  const dStart   = start   ? Math.floor((now-start)/86400000)   : 999;
  const dContact = last    ? Math.floor((now-last)/86400000)     : 999;
  const dRenewal = renewal ? Math.floor((renewal-now)/86400000)  : 999;
  if (c.status==='Onboarding' && dStart===0)  alerts.push(Object.assign({},c,{alert:'welcome'}));
  if (c.status==='Onboarding' && dStart===3)  alerts.push(Object.assign({},c,{alert:'day3_checkin'}));
  if (c.status==='Onboarding' && dStart===7)  alerts.push(Object.assign({},c,{alert:'day7_golive'}));
  if (c.status==='Active' && dContact>=14)    alerts.push(Object.assign({},c,{alert:'no_contact_14d'}));
  if (dRenewal===7)                           alerts.push(Object.assign({},c,{alert:'renewal_in_7d'}));
  if (dRenewal<=0 && c.status==='Active')     alerts.push(Object.assign({},c,{alert:'renewal_overdue'}));
}
if (alerts.length===0) return [{json:{alert:'none'}}];
return alerts.map(a=>({json:a}));
```

### Alert Manager Client Telegram Text
```
=⚙️ Client Alert: {{ $json.alert }}

Client: {{ $json.full_name }}
Business: {{ $json.business_name }}
Bundle: {{ $json.bundle }}
Phone: {{ $json.phone }}
WhatsApp: {{ $json.whatsapp }}
Email: {{ $json.email }}
Renewal: {{ $json.renewal_date }}
Retainer: {{ $json.monthly_retainer_kwd }} KWD
```

### Update Client Google Sheets Node
- Operation: Update
- Sheet: `clients`
- Column to match: `client_id` = `={{ $json.client_id }}`
- Values to update:
  - last_action: `={{ $json.alert }}`
  - last_action_at: `={{ new Date().toISOString() }}`

---

### Chain 2 — Daily Finance Check
```
Daily (Schedule Trigger)
      ↓
Read Payments (Google Sheets)
      ↓
Check Overdue (Code)
      ↓
Has Overdue (IF — reminder != 'none')
   YES → Alert Manager Finance (Telegram) → Update Reminder (Google Sheets)
   NO  → nothing
```

### Check Overdue Code
```javascript
const payments = $input.all().map(i => i.json);
const now = new Date();
const actions = [];
for (const p of payments) {
  if (p.status==='Paid'||p.status==='Cancelled') continue;
  const due = p.due_date ? new Date(p.due_date) : null;
  if (!due) continue;
  const days = Math.floor((now-due)/86400000);
  if (days<1) continue;
  if (days>=1  && p.reminder_day1_sent !=='Yes') { actions.push(Object.assign({},p,{days,reminder:'day1'}));  continue; }
  if (days>=5  && p.reminder_day5_sent !=='Yes') { actions.push(Object.assign({},p,{days,reminder:'day5'}));  continue; }
  if (days>=10 && p.reminder_day10_sent!=='Yes') { actions.push(Object.assign({},p,{days,reminder:'day10'})); continue; }
  if (days>=14) { actions.push(Object.assign({},p,{days,reminder:'escalate'})); }
}
if (actions.length===0) return [{json:{reminder:'none'}}];
return actions.map(a=>({json:a}));
```

### Alert Manager Finance Telegram Text
```
=💸 Payment Overdue — Day {{ $json.days }}

Client: {{ $json.client_name }}
Business: {{ $json.business_name }}
Phone: {{ $json.client_phone }}
WhatsApp: {{ $json.client_whatsapp }}
Email: {{ $json.client_email }}
Invoice: {{ $json.invoice_number }}
Type: {{ $json.invoice_type }}
Amount: {{ $json.amount_kwd }} KWD
Due: {{ $json.due_date }}
```

### Update Reminder Google Sheets Node
- Operation: Update
- Sheet: `payments`
- Column to match: `invoice_number` = `={{ $json.invoice_number }}`
- Values to update:
  - reminder_day1_sent: `={{ $json.reminder==='day1' ? 'Yes' : ($json.reminder_day1_sent||'No') }}`
  - reminder_day5_sent: `={{ $json.reminder==='day5' ? 'Yes' : ($json.reminder_day5_sent||'No') }}`
  - reminder_day10_sent: `={{ $json.reminder==='day10' ? 'Yes' : ($json.reminder_day10_sent||'No') }}`

---

### Chain 3 — Sunday 8am Weekly Report
```
Sunday 8am (Cron: 0 0 8 * * 0)
      ↓        ↓        ↓
Read        Read      Read
Clients     Payments  Leads
(Sheets)    (Sheets)  (Sheets)
      ↓        ↓        ↓
      └────────┴────────┘
               ↓
          Merge (Combine by Position)
               ↓
          Compile KPIs (Code)
               ↓
        Generate Report (AI Agent)
               ↓
         Send Report (Telegram to 6775247154)
               ↓
       Save KPI Snapshot (Google Sheets append kpi_snapshots)
```

### Compile KPIs Code
```javascript
const clients  = $('Report Read Clients').all().map(i=>i.json);
const payments = $('Report Read Payments').all().map(i=>i.json);
const leads    = $('Report Read Leads').all().map(i=>i.json);
const now = new Date();
const weekAgo = new Date(now-7*86400000);
const active     = clients.filter(c=>c.status==='Active').length;
const onboarding = clients.filter(c=>c.status==='Onboarding').length;
const churned    = clients.filter(c=>c.status==='Churned'&&new Date(c.last_action_at)>weekAgo).length;
const mrr        = clients.filter(c=>c.status==='Active').reduce((s,c)=>s+(parseFloat(c.monthly_retainer_kwd)||0),0);
const collected  = payments.filter(p=>p.status==='Paid'&&new Date(p.paid_at)>weekAgo).reduce((s,p)=>s+(parseFloat(p.amount_kwd)||0),0);
const pending    = payments.filter(p=>p.status==='Pending').reduce((s,p)=>s+(parseFloat(p.amount_kwd)||0),0);
const overdue    = payments.filter(p=>p.status==='Pending'&&new Date(p.due_date)<now).reduce((s,p)=>s+(parseFloat(p.amount_kwd)||0),0);
const newLeads   = leads.filter(l=>new Date(l.created_at)>weekAgo).length;
const hotLeads   = leads.filter(l=>(parseInt(l.lead_score)||0)>=7&&l.status!=='Won').length;
const openLeads  = leads.filter(l=>!['Won','Lost'].includes(l.status)).length;
const wonLeads   = leads.filter(l=>l.status==='Won'&&new Date(l.last_contact_at)>weekAgo).length;
const wonValue   = leads.filter(l=>l.status==='Won'&&new Date(l.last_contact_at)>weekAgo).reduce((s,l)=>s+(parseFloat(l.won_value_kwd)||0),0);
return [{json:{
  date:now.toISOString().split('T')[0],
  active,onboarding,churned,mrr,collected,pending,overdue,
  new_leads:newLeads,hot_leads:hotLeads,open_leads:openLeads,won_leads:wonLeads,won_value:wonValue
}}];
```

### Generate Report AI Agent System Prompt
```
You are the MindSync Receptionist writing a weekly business report for the founder Abdulaziz in Kuwaiti dialect Arabic. Be direct, concise, actionable. Max 200 words.

Structure:
1. صحة الأعمال (زين / تمام / في مشاكل)
2. الإيرادات هذا الأسبوع
3. وضع العملاء
4. العملاء المحتملون
5. أهم إجراءين مطلوبين هذا الأسبوع
```

### Generate Report AI Agent User Message
```
={{ 'Active: '+$json.active+'\nOnboarding: '+$json.onboarding+'\nChurned: '+$json.churned+'\nMRR: '+$json.mrr+' KWD\nCollected: '+$json.collected+' KWD\nPending: '+$json.pending+' KWD\nOverdue: '+$json.overdue+' KWD\nNew leads: '+$json.new_leads+'\nHot leads: '+$json.hot_leads+'\nPipeline: '+$json.open_leads+'\nWon: '+$json.won_leads+' worth '+$json.won_value+' KWD' }}
```

### Send Report Telegram Text
```
={{ '📊 تقرير مايندسينك — '+$('Compile KPIs').first().json.date+'\n\n'+$('Generate Report').first().json.output+'\n\n---\n💰 MRR: '+$('Compile KPIs').first().json.mrr+' د.ك\n✅ نشطين: '+$('Compile KPIs').first().json.active+'\n⚠️ متأخر: '+$('Compile KPIs').first().json.overdue+' د.ك\n🔥 ساخنون: '+$('Compile KPIs').first().json.hot_leads }}
```

### Save KPI Snapshot Google Sheets Node
- Operation: Append
- Sheet: `kpi_snapshots`
- Map all columns from Compile KPIs node output using exact column names

---

### Chain 4 — Every 12h Lead Followup
```
Every 12h (Schedule Trigger)
      ↓
Read Cold Leads (Google Sheets — read leads)
      ↓
Find Cold Leads (Code)
      ↓
Has Cold Leads (IF — skip != true)
   YES → Alert Cold Lead (Telegram) → Update Lead (Google Sheets)
   NO  → nothing
```

### Find Cold Leads Code
```javascript
const leads = $input.all().map(i=>i.json);
const now = new Date();
const cold = [];
for (const l of leads) {
  if (l.status!=='New') continue;
  const last = l.last_contact_at ? new Date(l.last_contact_at) : null;
  if (!last) continue;
  if ((now-last)/3600000>=48) cold.push(l);
}
if (cold.length===0) return [{json:{skip:true}}];
return cold.map(l=>({json:l}));
```

### Alert Cold Lead Telegram Text
```
=🥶 Cold Lead — 48h No Reply

Name: {{ $json.full_name }}
Industry: {{ $json.industry }}
Phone: {{ $json.phone }}
WhatsApp: {{ $json.whatsapp }}
Email: {{ $json.email }}
Score: {{ $json.lead_score }}/10
Channel: {{ $json.channel }}
Message: {{ $json.notes }}
```

### Update Lead Google Sheets Node
- Operation: Update
- Sheet: `leads`
- Column to match: `lead_id` = `={{ $json.lead_id }}`
- Values to update:
  - status: `followed_up`
  - last_contact_at: `={{ new Date().toISOString() }}`
  - next_action: `Await reply or mark Lost`

---

## WORKFLOW 4: MindSync — Apify Lead Scraper

### Purpose
Triggered by a POST webhook. Scrapes Google Maps or Instagram using Apify based on keyword and location. Deduplicates against existing leads. Logs new leads to Sheets. Notifies founder on Telegram.

### Node Flow
```
Scrape Webhook (POST /apify-scrape)
      ↓
Parse Request (Code) + Ack Webhook (Respond to Webhook — immediate)
      ↓
Platform Check (IF — platform == 'google_maps')
   YES → Run Google Maps → Wait 90s → Fetch GMaps Results
   NO  → Run Instagram → Wait 90s → Fetch Instagram Results
                ↓                          ↓
                └──────────┬───────────────┘
                           ↓
                  Normalize Results (Code)
                           ↓
                  Read Existing Leads (Google Sheets)
                           ↓
                  Deduplicate (Code)
                           ↓
                  Has New Leads (IF — no_new != true)
                    YES ↓           NO ↓
               Log Leads         Notify Done
               (Sheets)          (Telegram)
                   ↓
               Notify Done
               (Telegram)
```

### Parse Request Code
```javascript
const body = $input.first().json?.body || $input.first().json;
return [{json:{
  keyword:  body?.keyword  || 'dental clinic',
  location: body?.location || 'Kuwait City, Kuwait',
  platform: body?.platform || 'google_maps',
  max_results: parseInt(body?.max_results)||30,
  timestamp: new Date().toISOString()
}}];
```

### Run Google Maps HTTP Request
- URL: `https://api.apify.com/v2/acts/compass~crawler-google-places/runs`
- Method: POST
- Headers: `Authorization: Bearer YOUR_APIFY_TOKEN`
- Body: `={{ JSON.stringify({ searchStringsArray: [$json.keyword], locationQuery: $json.location, maxCrawledPlacesPerSearch: $json.max_results, language: 'en', countryCode: 'kw' }) }}`

### Run Instagram HTTP Request
- URL: `https://api.apify.com/v2/acts/apify~instagram-scraper/runs`
- Method: POST
- Headers: `Authorization: Bearer YOUR_APIFY_TOKEN`
- Body: `={{ JSON.stringify({ searchType: 'hashtag', searchLimit: $('Parse Request').first().json.max_results, hashtags: [$('Parse Request').first().json.keyword.replace(/\s+/g,'').toLowerCase()] }) }}`

### Fetch GMaps Results HTTP Request
- URL: `=https://api.apify.com/v2/acts/compass~crawler-google-places/runs/{{ $json.data?.id }}/dataset/items?limit=100`
- Headers: `Authorization: Bearer YOUR_APIFY_TOKEN`

### Fetch Instagram Results HTTP Request
- URL: `=https://api.apify.com/v2/acts/apify~instagram-scraper/runs/{{ $json.data?.id }}/dataset/items?limit=100`
- Headers: `Authorization: Bearer YOUR_APIFY_TOKEN`

### Normalize Results Code
```javascript
const items = $input.all().map(i=>i.json);
const req = $('Parse Request').first().json;
return items.map(item=>({json:{
  lead_id:'LEAD-'+Date.now()+'-'+Math.random().toString(36).slice(2,5),
  created_at:new Date().toISOString(),
  full_name:item.name||item.fullName||item.username||'',
  phone:item.phone||item.phoneUnformatted||'',
  whatsapp:'',
  email:item.email||'',
  website:item.website||item.url||'',
  channel:req.platform==='google_maps'?'apify_google_maps':'apify_instagram',
  business_name:item.name||item.fullName||'',
  industry:req.keyword,
  location:item.city||item.address||'',
  num_employees:'',current_tools:'',pain_point:'',interested_bundle:'',
  budget_signal:'unknown',
  lead_score:item.totalScore?Math.min(10,Math.round(item.totalScore*2)):5,
  status:'New',
  last_contact_at:new Date().toISOString(),
  next_action:'Cold outreach',next_action_date:'',
  notes:req.platform==='google_maps'?('GMaps: '+(item.address||'')+' | Rating: '+(item.totalScore||'')):('Instagram: @'+(item.username||'')+' | Followers: '+(item.followersCount||'')),
  assigned_to:'Abdulaziz',
  won_bundle:'',won_value_kwd:'',lost_reason:''
}})).filter(i=>i.json.full_name||i.json.business_name);
```

### Deduplicate Code
```javascript
const newLeads = $('Normalize Results').all().map(i=>i.json);
const existing = $input.all().map(i=>i.json);
const phones = new Set(existing.map(l=>l.phone).filter(Boolean));
const emails = new Set(existing.map(l=>l.email).filter(Boolean));
const names  = new Set(existing.map(l=>(l.business_name||l.full_name||'').toLowerCase()).filter(Boolean));
const deduped = newLeads.filter(l=>{
  if (l.phone&&phones.has(l.phone)) return false;
  if (l.email&&emails.has(l.email)) return false;
  if ((l.business_name||l.full_name)&&names.has((l.business_name||l.full_name).toLowerCase())) return false;
  return true;
});
const stats={total:newLeads.length,new_count:deduped.length,skipped:newLeads.length-deduped.length};
if (deduped.length===0) return [{json:Object.assign({no_new:true},stats)}];
return deduped.map(l=>({json:Object.assign({},l,{_stats:stats})}));
```

### Notify Done Telegram Text
```
=🔍 Scrape Done

Keyword: {{ $('Parse Request').first().json.keyword }}
Location: {{ $('Parse Request').first().json.location }}
Platform: {{ $('Parse Request').first().json.platform }}

Total scraped: {{ $json._stats?.total || $json.total }}
New logged: {{ $json._stats?.new_count || $json.new_count }}
Duplicates skipped: {{ $json._stats?.skipped || $json.skipped }}

Check leads tab in Google Sheets.
```

---

## WORKFLOW 5: MindSync — PDF Generator

### Purpose
Generates PDF invoices and contracts using PDFShift API. Sends PDF to founder on Telegram AND to admin@mindsynckw.com AND to the client via Gmail. Triggered by webhook or by the Manager Agent.

### Node Flow
```
PDF Request Webhook (POST /generate-pdf) ──┐
When Called by Another Workflow ────────────┘
                    ↓
              Parse Request (Code)
                    ↓
          Invoice or Contract? (IF doc_type == 'invoice')
            YES (invoice) ↓              NO (contract) ↓
        Invoice AR or EN?               Fill Contract (Code)
          YES (ar) ↓  NO (en) ↓               ↓
      Fill         Fill            PDF from Contract (PDFShift HTTP Request)
    Invoice AR   Invoice EN               ↓
    (Code)       (Code)          TG Send Contract (Telegram doc to 6775247154)
         ↓            ↓               ↓
   PDF from     PDF from      Email Contract to Founder (Gmail admin@mindsynckw.com)
   Invoice AR  Invoice EN             ↓
         ↓            ↓      Email Contract to Client (Gmail client_email)
    TG Send     TG Send               ↓
   Invoice AR  Invoice EN       Webhook Response
         ↓            ↓
Email Inv AR  Email Inv EN
  to Founder  to Founder
  (Gmail)     (Gmail)
         ↓            ↓
Email Inv AR  Email Inv EN
  to Client   to Client
  (Gmail)     (Gmail)
         ↓            ↓
    Webhook   Webhook
    Response  Response
```

### Parse Request Code
```javascript
const body = $input.first().json?.body || $input.first().json;
const now = new Date();
const due = new Date(now.getTime()+7*86400000);
const get=(a,b)=>body?.[a]||body?.[b]||'';
return [{json:{
  doc_type:(get('doc_type','doctype')||'invoice').toLowerCase(),
  lang:(get('lang','lang')||'ar').toLowerCase(),
  invoice_number:get('invoice_number','invoicenumber')||('MS-'+now.getFullYear()+'-'+String(Date.now()).slice(-4)),
  issue_date:get('issue_date','issuedate')||now.toLocaleDateString('en-GB'),
  due_date:get('due_date','duedate')||due.toLocaleDateString('en-GB'),
  client_name:get('client_name','clientname'),
  client_company:get('client_company','clientcompany'),
  client_phone:get('client_phone','clientphone'),
  client_email:get('client_email','clientemail').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1'),
  client_id:get('client_id','clientid'),
  client_address:get('client_address','clientaddress')||'Kuwait City, Kuwait',
  service_name:get('service_name','servicename'),
  service_desc:get('service_desc','servicedesc'),
  service_type:get('service_type','servicetype')||'One-time',
  amount:get('amount','amount')||'0.000',
  amount_words_ar:get('amount_words_ar','amountwordsar'),
  payment_ref:get('payment_ref','paymentref')||'TBD',
  bank_name:get('bank_name','bankname')||'بنك الكويت الوطني',
  bank_iban:get('bank_iban','bankiban')||'KW81CBKU0000000000001234560101',
  contract_number:get('contract_number','contractnumber')||('MS-AR-'+now.getFullYear()+'-'+String(Date.now()).slice(-3)),
  bundle_name:get('bundle_name','bundlename'),
  bundle_and_tier:get('bundle_and_tier','bundleandtier'),
  tier_name:get('tier_name','tiername'),
  build_fee:get('build_fee','buildfee')||'0',
  monthly_retainer:get('monthly_retainer','monthlyretainer')||'0',
  due_at_signing:get('due_at_signing','dueatsigning')||'0',
  start_date:get('start_date','startdate')||now.toLocaleDateString('en-GB'),
  contract_date:get('contract_date','contractdate')||now.toLocaleDateString('en-GB')
}}];
```

### Fill Invoice AR / Fill Invoice EN / Fill Contract Code Nodes
These nodes contain the full HTML templates with variable replacement. The HTML templates use `{{VARIABLE}}` placeholders that get replaced with real data. The code does `.replace(/{{VARIABLE}}/g, d.variable)` for every placeholder. The HTML templates are the full premium MindSync branded designs with deep green #153E2D, gold #BF8D38, ivory #FBFAF5 colors.

### PDFShift HTTP Request Nodes (3 total)
- Method: POST
- URL: `https://api.pdfshift.io/v3/convert/pdf`
- Authentication: PDFShift credential (Header Auth)
- Body: `={{ JSON.stringify({ source: $json.html, landscape: false }) }}`
- Response Format: File
- Output Property Name: `pdf_data`

### Telegram Send Document Nodes (3 total)
- Resource: Document
- Binary Data: ON
- Binary Property Name: `pdf_data`
- Chat ID: `6775247154`

### Gmail Send to Founder Nodes (3 total)
- To: `admin@mindsynckw.com`
- Subject: descriptive with invoice/contract number
- Attachments: Binary property `pdf_data`

### Gmail Send to Client Nodes (3 total)
- To: `={{ $json.client_email }}`
- Subject: descriptive with invoice/contract number
- Attachments: Binary property `pdf_data`

### When Called by Another Workflow Trigger
- Input Data Mode: Define using fields below
- Fields (all String): doc_type, lang, invoice_number, client_name, client_company, client_phone, client_email, service_name, service_desc, service_type, amount, due_date, bank_name, bank_iban, contract_number, bundle_and_tier, tier_name, build_fee, monthly_retainer, due_at_signing, start_date
- Connects to: Parse Request

---

## IMPORTANT NOTES

1. All 5 workflows must be separate workflows in n8n
2. Use exact credential names as listed
3. Merge nodes must be set to "Combine by Position"
4. Google Sheets column names must use underscores exactly as listed
5. All Telegram nodes sending to founder use Chat ID `6775247154`
6. Activate order: PDF Generator → Apify Scraper → Receptionist Crons → Receptionist Agent → Manager Agent
7. Test Manager Agent: message @Ifarasaibot on Telegram with "هلا"
8. Test PDF: send "ابي فاتورة PDF لخالد الراشدي — Clinic Advanced — رسم بناء 640 — الاستحقاق بعد أسبوع"
9. The Contains PDF Request IF node intercepts Claude's JSON output and calls the PDF webhook automatically — Claude does not need to call it directly
10. Replace YOUR_APIFY_TOKEN with the real Apify API token in all 4 Apify HTTP Request nodes
