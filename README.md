# Exotel × Zuora Billing Integration — Product Case Study

A Senior Product Manager proof-of-work submission for the Exotel case study: *"Design a platform integration between
Exotel and Zuora so that Exotel can invoice enterprise customers accurately, faster, and with complete
traceability."*

This repository contains a single React application with three integrated deliverables:

1. A responsive **product case study** (`/case-study`) covering strategy, architecture, data model, reliability, rollout, and a four-week V1 scope boundary.
2. A clickable **Billing Operations prototype** (`/prototype`) with nine functioning screens over one referentially consistent mock dataset, each tagged V1, Post-V1, or Target-state concept.
3. A **13-slide presentation deck** plus 6 appendix slides (`/slides`), built to present live or export to PDF.

## 1. Project overview

Exotel sells SMS, Voice, WhatsApp, Contact Center, and Conversational AI to enterprise customers who mix products,
contracts, currencies, tax rules, and pricing models. This project designs the platform integration layer that
connects Exotel's usage systems to Zuora's billing engine so invoices are accurate, on time, fully traceable, free of
duplicate/missing usage, easy to investigate, and extensible to future products.

## 2. Problem statement

Today, usage and billing are not connected in a way Finance and Billing Operations can trust without manual
reconciliation. As Exotel adds enterprise accounts and products, that gap compounds. The `/case-study` page opens
with the full problem statement and objective (Section 01).

## 3. Product approach

- **Ownership boundaries**: Exotel owns raw events and validated usage; Zuora owns billing accounts, rating, and
  invoices; a dedicated Billing Integration Layer sits between them, asynchronous by design.
- **One canonical usage model** across every product so a new product is a metering-layer exercise, not a billing
  re-architecture.
- **Hybrid granularity**: event-level detail stays inside Exotel; hourly/daily aggregated batches (linked by
  `batch_id`) go to Zuora — full traceability at low integration volume.
- **Idempotency at three layers, three distinct keys**: `event_dedupe_key` (Metering Layer — don't reprocess the same
  callback), `billing_usage_key` (Canonical Usage Store — one billable action = one usage record), and
  `submission_idempotency_key` (Billing Integration Layer — don't resubmit the same batch payload twice). Conflating
  these — or using one tenant/product/date key as proof of usage-level idempotency for millions of billable actions —
  is how duplicate-billing bugs actually happen in production.
- **Reconciliation is mandatory**: a three-way comparison (Exotel metered → Zuora accepted → invoice rated) runs every
  cycle, with an owned exception workflow from Detected to Closed.
- **Closed invoices are never silently edited**: corrections flow through credit notes, debit notes, or next-cycle
  adjustments.

See `/case-study` for the full write-up, including 15 edge cases, the AI-native roadmap, phased rollout, and success
metrics.

## 4. Architecture summary

```
Exotel Product Systems (SMS, Voice, WhatsApp, Conversational AI, Contact Center)
        ↓
Raw Operational Events
        ↓
Metering Layer (validation, billable-rule evaluation, dedup, idempotency, normalization)
        ↓
Canonical Usage Store
        ↓
Billing Integration Layer (mapping, batching, retries, dead-letter queue, audit, reconciliation)
        ↓
Zuora (billing accounts, rate plans, rating, invoices, credit/debit notes, payments)
        ↓
Finance & Customer Systems
```

"Exotel determines what was consumed. Zuora determines how much to charge and generates the invoice."

## 5. Assumptions

- Zuora is the assumed billing system of record; alternative billing platforms were not evaluated.
- Exotel's existing messaging/voice systems already emit reliable lifecycle callbacks (submitted, delivered, failed).
- All customer names (Swiggy, Urban Company, Razorpay, Apollo Hospitals, HDFC Bank), usage volumes, invoice amounts,
  and operational incidents are **illustrative sample data** created for this case study, not real Exotel data.
- V1 (the four-week, three-engineer build) is intentionally narrow — SMS + Voice only, one tenant, one geography, one
  currency, tax preconfigured, per-unit pricing only. Full assumptions and external dependencies (Zuora sandbox access
  chief among them) are itemized in "V1 scope (4-week build)" in the case study.

## 6. How to run the project

Requires Node.js 20+.

```bash
npm install
npm run dev       # starts the dev server (defaults to http://localhost:5173)
```

```bash
npm run build      # type-checks with tsc and produces a production build in dist/
npm run preview    # serves the production build locally
```

No backend is required — all data is static mock data under `src/data/`.

## 7. How to navigate the prototype

Start at `/` for the overview, or go directly to `/prototype` — it now lands on the **Demo Control Center**, the primary
entry point for the four-week V1 build, defaulted to the Razorpay happy path. Every screen is real and clickable, but
not every screen ships in V1: the sidebar groups them into a **V1 Demo Journey** and **Roadmap & Vision**, and each
item carries a scope tag. See "V1 scope (4-week build)" in the case study for the full breakdown of what's in vs. out
of the four-week build inside each screen.

| Screen | Route | Scope | What it shows |
| --- | --- | --- | --- |
| Demo Control Center | `/prototype/demo` | **V1** | One tenant (Razorpay), one billing account, one subscription, two rate-plan charges (SMS + Voice). Per-product stages: Usage metered → Canonical usage ready → Billing Integration processing (expandable) → Zuora accepted, then a shared Run Billing → View Invoice. Both batches are fully accepted and matched — Run Billing is disabled if either is pending or mismatched. |
| Usage Batch List | `/prototype/batches` | **V1 — Simplified** | Every batch sent to Zuora, with precise **Retry rejected records** / **Replay failed batch** actions and reconciliation status (multi-customer rows and the filter bar are Post-V1) |
| Usage Batch Detail | `/prototype/batches/:id` | **V1 — Core** | Batch metadata, reconciliation (two-way before a bill run, three-way after), submission attempts, audit timeline |
| Invoice Traceability | `/prototype/traceability` | **V1 — Core** (Explorer, defaults to Razorpay) / **Post-V1** (billing verification panel) | Expandable invoice → batch → usage trace, plus a "were we charged twice?" billing verification panel with an explicit Carrier → Metering → Canonical Usage → Billing Integration → Zuora → Support ownership chain |
| Billing Ops Dashboard | `/prototype/dashboard` | Post-V1 | Batch-count and ratio KPIs, usage segmented by product (never summed across units), and trend charts |
| Reconciliation Exceptions | `/prototype/exceptions` | Post-V1 (list) / Target-state concept (detail) | Owned exception queue; click **Investigate** on any row to open the full lineage (batch, retry batch, invoice, root cause, timeline) at `/prototype/exceptions/:exceptionId` |
| Customer Billing Summary | `/prototype/customers` | Post-V1 | Per-customer subscription, usage, and current invoice total sourced live from the actual Invoice record (not an Exotel-computed estimate) |
| Integration Health | `/prototype/health` | Target-state concept | Zuora API availability, latency, dead-letter volume, active incidents |

Try: running through the Demo Control Center's stages for Razorpay, then opening its invoice to see SMS and Voice
lines under one billing account; using **Retry rejected records** on the separate June failure-scenario batch on the
batch list; opening exception `EXC-1042` and clicking through to its retry batch without leaving the investigation
page; or switching Invoice Traceability to "View portfolio examples" to explore the other four customers.

## 8. How to export or print the presentation to PDF

1. Go to `/slides`.
2. Click **Export to PDF** (or press `Cmd/Ctrl + P`) — this triggers the browser print dialog.
3. Choose **Save as PDF**, landscape orientation, and disable headers/footers for a clean export.
4. All 19 slides (13 core + 6 appendix) are already sized for a 1280×720 landscape page and will paginate
   automatically (`@page` + `page-break-after` are pre-configured in `src/index.css`). Slide 3 is Design Principles &
   Ownership; slides 9–10 are the V1 scope boundary and the four-week execution plan.

You can also scroll through the deck on-page or navigate with arrow keys / the left-hand slide index.

## 9. Key product decisions

- A **separate Billing Integration Layer** (not Zuora, not Exotel product systems) owns mapping, batching, retries,
  and reconciliation — keeping Zuora out of raw-event processing and keeping billing off the communication API hot
  path.
- **Hybrid usage granularity** over pure event-level or pure monthly-aggregate — the highest-leverage trade-off in the
  design (see Appendix E / Section 06).
- **Three distinct idempotency keys at three layers** (`event_dedupe_key`, `billing_usage_key`,
  `submission_idempotency_key`) because conflating them — or reusing a batch-level key as proof of usage-level
  idempotency — is the most common root cause of duplicate-billing incidents in real systems.
- **Reconciliation as a first-class, owned workflow**, not a side effect of successful API calls. A batch only earns
  MATCHED once all three quantities exist and agree — before a bill run, the platform shows an honest two-way
  submission check instead of a fabricated three-way comparison.
- **V1 scoped to two products (SMS, Voice), one tenant, one geography, one currency**, buildable by three engineers in
  four weeks — a distinct "Integration Proof" stage in its own right, not the same thing as the "Production Pilot"
  stage in the longer rollout, made explicit in its own case-study section and slides so the two are never confused.
- **Every prototype screen is tagged V1, Post-V1, or Target-state concept** rather than built at a single, undifferentiated
  fidelity — prototype completeness communicates the target vision; the tags communicate what three engineers actually commit to in four weeks.

## 10. Known limitations

- All data is static and client-side; there is no backend, so batch "retries," exception status changes, and the
  Demo Control Center's stages are simulated in local component state and reset on page reload.
- The prototype models one representative scenario per screen (e.g., one billing verification inquiry) rather than a
  fully exhaustive dataset.
- Tax, currency conversion, and regulatory rules are described conceptually (owned by Zuora) but not computed in the
  prototype.
- Responsive layouts are optimized for desktop and tablet; extremely narrow (sub-360px) phone widths were not a
  target per the brief.
- The prototype deliberately includes Post-V1 and Target-state-concept screens (Dashboard, Exception Detail,
  Customer Billing, Integration Health) to communicate the full vision — none of them are claimed as part of the
  four-week V1 build; see "V1 scope (4-week build)" in the case study.

## 11. Future roadmap

See `/case-study#ai-native` and Appendix F of the slide deck for the full AI-native roadmap:

1. AI Billing Copilot — plain-language answers to "why was I charged," backed by real records.
2. AI Billing Dispute RCA — automatic Invoice → Charge → Usage → Source Event tracing.
3. AI Revenue Leakage Detector — continuous Events → Metering → Zuora → Invoice comparison.
4. AI Anomaly Detection — usage spikes, unusual discounts, missing batches, duplicate usage.
5. AI Finance Operations Assistant — evidence-backed, human-approved recommendations (retry, remap, credit note).

## Project structure

```
src/
  components/     Reusable UI: KPI cards, status badges, filters, timeline, reconciliation bars, trend chart
  diagrams/        Custom HTML/CSS system diagrams (architecture, lifecycle, granularity, traceability chain)
  data/            Static mock data (customers, usage batches, invoices, exceptions, traceability, health)
  types/           Shared TypeScript domain types
  pages/           Home, CaseStudy (+ case-study/ sections), Slides, prototype/ (9 screens + layout)
  slides/          SlideShell + 19 slide components (13 core + 6 appendix)
```

## Illustrative data disclosure

All customer names, usage figures, invoice amounts, incidents, and employee names shown throughout this project are
synthetic sample data created for this case study. They do not represent real Exotel customers, contracts, or
operational history.
