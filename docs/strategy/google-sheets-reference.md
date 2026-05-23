# MindSync Google Sheets — Complete Reference

> **Last updated:** 2026-05-03  
> Source of truth for every tab, column, and data type used across all n8n workflows and the admin dashboard.
> Covers: Admin Dashboard · Client Portal (mobile app) · Manager Agent · Receptionist Agent · Receptionist Crons · Apify Lead Scraper · Universal Receptionist Template  
> Does NOT use sheets: Discovery Form · PDF Generator

---

## Two Separate Sheets

| Sheet | ID | Purpose |
|---|---|---|
| **Admin Sheet** | `1DmM8nUaGBe8ydgLHSxp1S8HxnrGg_4qIThdB4DQWlkU` | Admin dashboard data — clients, leads, invoices, agents |
| **Manager Sheet** | `10LvdypB8ZHCTFeDM2IPadoLfaA0muxDJExZGqaD_KzU` | Agent runtime data — conversations, payments, KPI logs |

---

## Admin Sheet Tabs

### `Clients` tab

Used by: admin dashboard, all portal (mobile app) workflows, admin mobile workflows.

| Column | Type | Example | Notes |
|---|---|---|---|
| `id` | string | `CLIENT-1714900000000` | Auto-generated as `'CLIENT-' + Date.now()` on creation |
| `name` | string | `Ahmed Al-Rashidi` | Owner / contact person name |
| `business` | string | `Smile Dental Clinic` | Business name — used everywhere as the display name |
| `industry` | string | `clinic` | Lowercase slug |
| `bundleName` | string | `Clinic AI` | Human-readable bundle label |
| `tier` | string | `pro` | `smart` / `pro` / `full-auto` — **never** `basic` |
| `mrrKwd` | number | `340` | Monthly recurring revenue in KWD |
| `buildFeeKwd` | number | `400` | One-time build fee in KWD |
| `buildFeePaid` | boolean | `TRUE` | `TRUE` or `FALSE` (exact caps) |
| `phone` | string | `+96599999999` | Client's WhatsApp / phone |
| `email` | string | `owner@clinic.com` | Optional |
| `startDate` | string | `2025-01-01` | ISO date YYYY-MM-DD |
| `nextRenewal` | string | `2026-06-01` | ISO date YYYY-MM-DD |
| `agentStatus` | string | `online` | `online` / `paused` / `error` / `offline` — lowercase |
| `portalToken` | string | `a3f9bc21...` | 32-char hex — unique per client — used as app login code |
| `contractUrl` | string | `https://...` | Optional PDF link |
| `modules` | string | `WhatsApp Bot,Booking` | Comma-separated, no spaces around commas |
| `addons` | string | `website-design` | Comma-separated, can be empty |
| `notes` | string | | Internal notes, optional |
| `workingHours` | string (JSON) | `{"mon":true,...}` | Written by agent-settings workflow |
| `services` | string | `Teeth Cleaning,Whitening` | Written by agent-settings workflow, comma-separated |
| `greetingAr` | string | `أهلاً بكم` | Written by agent-settings workflow |
| `greetingEn` | string | `Welcome!` | Written by agent-settings workflow |
| `whatsappToken` | string | `EAABwz...` | Meta WhatsApp Cloud API token — used by broadcast workflow |
| `phoneNumberId` | string | `1234567890` | Meta WhatsApp phone number ID — used by broadcast workflow |

---

### `Leads` tab

Used by: admin dashboard Pipeline and Overview workflows.

| Column | Type | Example | Notes |
|---|---|---|---|
| `id` | string | `LEAD-1714900000000` | Auto-generated |
| `name` | string | `Sara Al-Mansouri` | Lead / contact name |
| `business` | string | `Beauty Palace` | Business name |
| `industry` | string | `salon` | Lowercase slug |
| `stage` | string | `demo` | `lead` / `demo` / `proposal` / `active` / `churned` — lowercase |
| `estimatedValueKwd` | number | `240` | Monthly value estimate in KWD |
| `source` | string | `WhatsApp` | Where lead came from |
| `createdAt` | string | `2026-05-01` | ISO date |

---

### `Invoices` tab

Used by: admin dashboard Billing workflow, portal-data workflow.

| Column | Type | Example | Notes |
|---|---|---|---|
| `id` | string | `INV-001` | Invoice ID |
| `clientId` | string | `CLIENT-1714900000000` | Must match `Clients.id` exactly |
| `clientName` | string | `Smile Dental Clinic` | Display only |
| `amountKwd` | number | `340` | Amount in KWD |
| `status` | string | `paid` | `draft` / `sent` / `paid` / `overdue` — lowercase |
| `issuedAt` | string | `2026-05-01` | ISO date |
| `dueAt` | string | `2026-05-15` | ISO date |

---

### `Agents` tab

Used by: admin dashboard Agents Status and Overview workflows, portal-data workflow.

| Column | Type | Example | Notes |
|---|---|---|---|
| `id` | string | `AGT-001` | Agent ID |
| `clientId` | string | `CLIENT-1714900000000` | Must match `Clients.id` exactly |
| `name` | string | `Smile Clinic Agent` | Agent display name |
| `status` | string | `online` | `online` / `paused` / `error` / `offline` — lowercase |
| `model` | string | `haiku-4-5` | `haiku-4-5` / `sonnet-4-6` / `opus-4-7` |
| `tier` | string | `pro` | `smart` / `pro` / `full-auto` |
| `conversationsToday` | number | `12` | Daily counter |
| `errorsToday` | number | `0` | Daily error count |
| `lastRunAt` | string | `2026-05-03T10:00:00` | ISO datetime |

---

## Manager Sheet Tabs

### `clients` tab

Used by: Manager Agent, Receptionist Crons.  
⚠️ This is a **separate record** from Admin Sheet `Clients` — same real-world entity but different fields (snake_case, different status vocabulary). Not auto-synced.

| Column | Type | Example | Notes |
|---|---|---|---|
| `client_id` | string | `CLIENT-001` | Match key for updates |
| `business_name` | string | `Smile Dental Clinic` | — |
| `status` | string | `Active` | `Active` / `Onboarding` / `Churned` — title-case |
| `start_date` | string | `2025-01-01` | ISO date |
| `renewal_date` | string | `2026-06-01` | ISO date |
| `monthly_retainer_kwd` | number | `340` | MRR in KWD |
| `last_contact_at` | string | `2026-05-01` | ISO datetime, updated by Crons |
| `last_action` | string | `Follow-up sent` | Updated by Receptionist Crons |
| `last_action_at` | string | `2026-05-03T09:00:00` | ISO datetime |

---

### `leads` tab

Used by: Receptionist Agent (append), Receptionist Crons (update), Manager Agent (read), Pipeline GET (read + maps to admin dashboard).

| Column | Type | Example | Notes |
|---|---|---|---|
| `lead_id` | string | `LEAD-1714900000000` | PK — match key for updates |
| `created_at` | string | `2026-05-01T10:00:00` | ISO datetime |
| `full_name` | string | `Sara Al-Mansouri` | — |
| `phone` | string | `+96599999999` | — |
| `whatsapp` | string | `+96599999999` | — |
| `email` | string | | Optional |
| `website` | string | | Optional |
| `channel` | string | `WhatsApp` | Source channel |
| `business_name` | string | `Beauty Palace` | — |
| `industry` | string | `salon` | — |
| `location` | string | `Salmiya` | — |
| `num_employees` | string | `5-10` | — |
| `current_tools` | string | | Optional |
| `pain_point` | string | | Optional |
| `interested_bundle` | string | `pro` | `smart` / `pro` / `full-auto` |
| `budget_signal` | string | `High` | — |
| `lead_score` | number | `85` | 0–100 |
| `status` | string | `New` | `New` / `Contacted` / `Demo Booked` / `Proposal Sent` / `Won` / `Lost` — title-case |
| `last_contact_at` | string | | Updated by Crons |
| `next_action` | string | | — |
| `next_action_date` | string | | Optional |
| `notes` | string | | — |
| `assigned_to` | string | `Abdulaziz` | Hardcoded by Receptionist Agent |
| `won_bundle` | string | | Filled on close |
| `won_value_kwd` | number | | Filled on close |
| `lost_reason` | string | | Filled on close |
| `appointment_at` | string | | ISO datetime if demo booked |

---

### `payments` tab

Used by: Manager Agent (read), Receptionist Crons (read + update reminders).

| Column | Type | Example | Notes |
|---|---|---|---|
| `invoice_number` | string | `INV-2026-001` | PK — match key for reminder updates |
| `created_at` | string | `2026-05-01` | — |
| `client_id` | string | | — |
| `client_name` | string | | — |
| `business_name` | string | | — |
| `client_phone` | string | | — |
| `client_whatsapp` | string | | Used for WhatsApp reminders |
| `client_email` | string | | — |
| `invoice_type` | string | `retainer` | `retainer` / `build-fee` |
| `bundle` | string | `Clinic AI Pro` | — |
| `amount_kwd` | number | `340` | — |
| `due_date` | string | `2026-05-15` | ISO date |
| `status` | string | `Pending` | `Pending` / `Paid` / `Cancelled` — title-case |
| `paid_at` | string | | ISO date when paid |
| `payment_method` | string | | — |
| `payment_reference` | string | | — |
| `reminder_day1_sent` | string | `No` | `Yes` / `No` |
| `reminder_day5_sent` | string | `No` | `Yes` / `No` |
| `reminder_day10_sent` | string | `No` | `Yes` / `No` |
| `notes` | string | | — |

---

### `conversations` tab  *(gid: 1353954677)*

Used by: Receptionist Agent (append), admin Conversations workflow, admin Transcript workflow, portal-conversations, portal-transcript, broadcast, portal-data (booking count).

| Column | Type | Example | Notes |
|---|---|---|---|
| `session_id` | string | `sess_abc123` | Groups messages into one conversation |
| `timestamp` | string | `2026-05-03T10:05:00` | ISO datetime of this message |
| `channel` | string | `whatsapp` | `whatsapp` / `website` / `instagram` — lowercase |
| `sender_id` | string | `+96599999999` | Phone or user ID |
| `sender_name` | string | `Ahmed` | Display name |
| `role` | string | `user` | `user` / `assistant` |
| `message` | string | `I need an appointment` | Message content |
| `intent` | string | `booking` | Classified intent |
| `department_routed` | string | `reception` | Optional routing |
| `business` | string | `Smile Dental Clinic` | **Add this** — needed by portal-conversations to filter by client |
| `last_at` | string | `2026-05-03T10:05:00` | **Add this** — needed by portal-data booking count filter (same as timestamp is fine) |

> ⚠️ **`business` and `last_at` columns must be added** — the portal-conversations and portal-data workflows filter on them. The Receptionist Agent's `Log Conversation` node must be updated to write these two columns.

---

### `audit_log` tab  *(gid: 2000720577)*

Used by: Manager Agent and Receptionist Agent (append only).

| Column | Type | Example | Notes |
|---|---|---|---|
| `timestamp` | string | `2026-05-03T10:00:00` | ISO datetime |
| `workflow` | string | `Receptionist Agent` | Literal workflow name |
| `action` | string | `lead_logged` | Event type |
| `entity_id` | string | `LEAD-001` | — |
| `entity_name` | string | `Ahmed` | — |
| `result` | string | `success` | Always `success` |
| `detail` | string | | Short description |

---

### `kpi_log` tab  *(gid: 1610603247)*

Appended weekly by Receptionist Crons. Read-only for analysis.

| Column | Type | Notes |
|---|---|---|
| `snapshot_date` | string | ISO date of Sunday snapshot |
| `active_clients` | number | — |
| `onboarding_clients` | number | — |
| `churned_this_week` | number | — |
| `mrr_kwd` | number | — |
| `collected_this_week_kwd` | number | — |
| `pending_invoices_kwd` | number | — |
| `overdue_kwd` | number | — |
| `new_leads_this_week` | number | — |
| `total_leads_pipeline` | number | — |
| `hot_leads` | number | — |
| `leads_won_this_week` | number | — |
| `revenue_won_kwd` | number | — |

---

## Workflow Coverage

| Workflow | Sheet Used | Tabs | Notes |
|---|---|---|---|
| Admin Dashboard — Overview | Admin | Clients, Leads, Invoices, Agents | Read only |
| Admin Dashboard — Clients GET | Admin | Clients | Read only |
| Admin Dashboard — Clients POST | Admin | Clients | Append — missing 8 fields (see bugs) |
| Admin Dashboard — Client Detail | Admin | Clients | Read only |
| Admin Dashboard — Pipeline GET | Admin | Leads | Read only |
| Admin Dashboard — Pipeline Stage PATCH | Admin | Leads | Update `stage` by `id` |
| Admin Dashboard — Billing GET | Admin | Invoices, Clients | Read only |
| Admin Dashboard — Agents Status | Admin | Agents | Read only |
| Admin Dashboard — Conversations | Manager | conversations | Read by GID `1353954677` |
| Admin Dashboard — Transcript | Manager | conversations | Read by GID `1353954677` |
| Portal — portal-data | Admin | Clients, Invoices, Agents, conversations (Manager) | Read only |
| Portal — portal-conversations | Admin + Manager | Clients, conversations | Read only |
| Portal — portal-transcript | Admin + Manager | Clients, conversations | Read only |
| Portal — agent-toggle | Admin | Clients | Update `agentStatus` — matchingColumns bug |
| Portal — agent-settings | Admin | Clients | Update settings fields — matchingColumns bug |
| Portal — broadcast | Admin + Manager | Clients, conversations | Read only |
| Admin Mobile — clients | Admin | Clients | Read only |
| Admin Mobile — metrics | Admin | Clients | Read only |
| Manager Agent | Manager | clients, leads, payments, audit_log | Read + append |
| Receptionist Agent (full) | Manager | leads, conversations, audit_log | Append |
| Receptionist Crons | Manager | clients, leads, payments, kpi_log | Read + update + append |
| Universal Receptionist Template | Dynamic (`sheetId` from CLIENT CONFIG) | conversations | Append — **logs WhatsApp API response not conversation data (bug)** |
| Apify Lead Scraper | Manager | leads | Read + append — 9 fields missing vs Receptionist schema |
| Discovery Form | — | — | No sheets — sends emails only |
| PDF Generator | — | — | No sheets — generates PDF only |

---

## Bug Fixes — Applied 2026-05-03

All critical and high-severity bugs fixed via n8n REST API.

| # | Severity | Location | Fix Applied |
|---|---|---|---|
| 1 | ✅ Fixed | `agent-toggle` Update node | `matchingColumns: ["id"]` added inside `columns` object |
| 2 | ✅ Fixed | `agent-settings` Update node | `matchingColumns: ["id"]` added inside `columns` object |
| 3 | ✅ Fixed | Receptionist Crons `Update Client` | `matchingColumns: ["client_id"]` added; `client_id` added to value map |
| 4 | ✅ Fixed | Receptionist Agent `Log Conversation` | Added `business` and `last_at` columns to append node |
| 5 | ✅ Fixed | Universal Receptionist Template `Log Conversation` | Rebuilt column mapping with full conversation schema; `business` from `⚙️ CLIENT CONFIG`.businessName |
| 6 | ✅ Fixed | `Clients POST` Build Row | Added all 8 missing fields: `industry`, `bundleName`, `buildFeeKwd`, `buildFeePaid`, `phone`, `email`, `startDate`, `notes` + all schema fields |
| 7 | ✅ Fixed | `Clients POST` default tier | Changed `'basic'` → `'smart'` |
| 8 | ✅ Fixed | Pipeline GET sheet mismatch | Pipeline GET now reads Admin Sheet `Leads` (same as PATCH) |
| 9 | ✅ Fixed | Apify Lead Scraper | Added 9 missing columns: `pain_point`, `current_tools`, `num_employees`, `interested_bundle`, `appointment_at`, `next_action_date`, `won_bundle`, `won_value_kwd`, `lost_reason` |
| 10 | ✅ Fixed | Pipeline GET `bundleValues` | Updated to industry-aware keys (`clinic-pro`, `salon-smart`, etc.) matching current tier names |
| 11 | ⚠️ Pending | Manager Sheet `leads.status` | Title-case vs lowercase — the stageMap in Pipeline GET Format node already handles this mapping; acceptable for now |

### Remaining manual step
- Google Sheets credentials on portal workflows (portal-data, portal-conversations, portal-transcript, agent-toggle, agent-settings, broadcast) may need to be re-attached in n8n UI after credential rotation or first activation. Check if any return empty 200 responses.
