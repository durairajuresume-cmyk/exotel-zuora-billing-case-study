import { Section, SubHeading, Callout } from '../../components/Section';
import { ScopeBadge } from '../../components/ScopeBadge';
import { AlertTriangle, ArrowRight } from 'lucide-react';

const screenScope = [
  {
    screen: 'Demo Control Center',
    level: 'V1' as const,
    inBuild: 'One tenant, one billing account, one subscription, two rate-plan charges. Per-product stages (Usage metered → Canonical usage ready → Billing Integration processing → Zuora accepted), then a shared Run Billing → View Invoice.',
    notInBuild: 'Nothing — this screen exists specifically to scope the four-week build.',
  },
  {
    screen: 'Usage Batch List',
    level: 'V1 — Simplified' as const,
    inBuild: 'Batch identity, Zuora status, retry count, reconciliation status for one tenant.',
    notInBuild: 'Multi-customer rows, the customer/product/status filter bar, and the download-audit-log action are Post-V1.',
  },
  {
    screen: 'Usage Batch Detail',
    level: 'V1 — Core' as const,
    inBuild: 'Batch metadata, three-way reconciliation bars, submission attempts, audit timeline. This is the actual proof screen.',
    notInBuild: 'Nothing structural — this screen is small enough to ship in full.',
  },
  {
    screen: 'Invoice Explorer (within Invoice Traceability)',
    level: 'V1 — Core' as const,
    inBuild: 'One invoice (INV-RAZORPAY-202607), expandable to its SMS and Voice lines, each linking to its batch.',
    notInBuild: 'The dropdown across five customers’ invoices is Post-V1 — V1 shows one invoice, not an explorer across a portfolio.',
  },
  {
    screen: 'Customer billing verification (within Invoice Traceability)',
    level: 'Post-V1' as const,
    inBuild: '—',
    notInBuild: 'Entire feature. Illustrates the idempotency guarantee narratively; not required to prove a Zuora invoice was generated.',
  },
  {
    screen: 'Billing Ops Dashboard',
    level: 'Post-V1' as const,
    inBuild: '—',
    notInBuild: 'Entire screen. Seven months of trend data cannot exist for a four-week-old system.',
  },
  {
    screen: 'Reconciliation Exceptions (list + detail)',
    level: 'Target-state concept' as const,
    inBuild: '—',
    notInBuild: 'Entire workflow — ownership, aging, root-cause objects, retry-batch lineage. Needs real exception volume to justify the tooling; V1 uses persisted failed status and a manual retry button instead (already present on Usage Batch List).',
  },
  {
    screen: 'Customer Billing Summary',
    level: 'Post-V1' as const,
    inBuild: '—',
    notInBuild: 'Entire screen. V1 has one customer; a five-logo switcher has no job to do yet.',
  },
  {
    screen: 'Integration Health',
    level: 'Target-state concept' as const,
    inBuild: '—',
    notInBuild: 'Entire screen. Requires operating history (30-day uptime, incident log) that cannot honestly exist in week 4.',
  },
];

const assumptions = [
  'Zuora sandbox and API access are available by Day 1 — this is the single largest schedule risk (see Week 1 below).',
  'One tenant, one billing account, one subscription for the entire V1 build.',
  'SMS and Voice both use simple per-unit pricing — no tiers, minimum commitments, or overage rules in V1.',
  'India / INR only — no multi-currency, no multi-geo tax logic.',
  'Tax is excluded or preconfigured in the Zuora sandbox — V1 does not build or validate tax rules.',
  'Usage events (delivery and connection callbacks) are already available from existing Exotel messaging/voice systems — V1 does not build event production.',
  'The Zuora bill run can be manually initiated — V1 does not build or validate a scheduling service.',
];

const weeks = [
  {
    week: 'Week 1',
    title: 'Zuora setup — the highest-risk workstream, isolated on its own',
    items: [
      'Provision Zuora sandbox and API credentials',
      'Product Catalogue: define SMS and Voice products with usage-based Rate Plan Charges and matching Units of Measure',
      'Create one billing account, one subscription, and the tenant-to-subscription mapping as a simple deployment configuration (a config table, not application code)',
      'Confirm a test usage record can be submitted via API and appears against the subscription',
    ],
    gate: 'Exit gate: a manually constructed usage record reaches Zuora and is visible against the subscription. If this slips, the whole four weeks slips — nothing downstream can be tested against a mock.',
  },
  {
    week: 'Week 2',
    title: 'Canonical usage + metering',
    items: [
      'Canonical usage schema (already defined, reused as-is)',
      'Ingestion + validation + billing-level idempotency (identity-only key, no contract_version) for DELIVERED_SMS and CONNECTED_MINUTES',
      'On-demand batch aggregation trigger — the production-equivalent scheduled job is out of scope for V1',
    ],
    gate: 'Exit gate: a manually triggered batch aggregates real usage records for both products and is ready to submit.',
  },
  {
    week: 'Week 3',
    title: 'Submission + invoicing',
    items: [
      'Billing Integration Layer: submit batches to Zuora, persist FAILED status on rejection, manual retry (no DLQ, no replay UI)',
      'Trigger the Zuora bill run manually and pull the resulting invoice back into the prototype',
      'Confirm one invoice carries both an SMS line and a Voice line under the same billing account',
    ],
    gate: 'Exit gate: an invoice exists in Zuora with both SMS and Voice lines, visible in Invoice Traceability.',
  },
  {
    week: 'Week 4',
    title: 'Reconciliation, idempotency proof, rehearsal',
    items: [
      'Read-only three-way reconciliation (Exotel metered vs. Zuora accepted vs. invoice rated)',
      'Deliberately replay a batch to prove no duplicate charge is created',
      'Full demo dry run: Generate → Submit → Run Billing → View Invoice, twice, with matching reconciliation both times',
      'Bug-fix buffer',
    ],
    gate: 'Exit gate: two consecutive live dry runs, zero duplicate charges, reconciliation shows a match both times.',
  },
];

export function V1Scope() {
  return (
    <Section
      id="v1-scope"
      eyebrow="11.5 · Scope under constraint"
      title="V1 scope: a four-week integration proof"
      intro={
        <>
          Everything above this section describes the target system. Everything below draws a hard line around what three engineers can
          actually build and demo in four weeks — a live invoice generated through Zuora for two products, nothing more.
        </>
      }
    >
      <Callout>
        <strong>Terminology, precisely:</strong> "V1" here means a four-week integration proof — it is <em>not</em> the same thing as any
        single "Phase" in the rollout below. Six stages, in order:
        <br />
        <span className="mono text-xs">1. Assumption validation / mobilisation</span> <ArrowRight size={12} className="inline mx-1" />{' '}
        <span className="mono text-xs">2. Four-week Integration Proof</span> (this section) <ArrowRight size={12} className="inline mx-1" />{' '}
        <span className="mono text-xs">3. Production Pilot</span> <ArrowRight size={12} className="inline mx-1" />{' '}
        <span className="mono text-xs">4. Controlled Migration</span> <ArrowRight size={12} className="inline mx-1" />{' '}
        <span className="mono text-xs">5. Scaled Billing Operations</span> <ArrowRight size={12} className="inline mx-1" />{' '}
        <span className="mono text-xs">6. AI-assisted operations</span> (all detailed in the rollout section below). The Integration Proof
        exists to retire Zuora integration risk early — it runs concurrently with, not strictly before, the mobilisation work in Stage 1.
      </Callout>

      <SubHeading>Prototype fidelity ≠ engineering commitment</SubHeading>
      <p className="text-text-muted leading-relaxed max-w-3xl">
        Every screen in the prototype is real and clickable. That is deliberate — it lets this document communicate both the buildable V1
        and the longer-term Billing Operations vision in one artifact. The table below is the key that tells you which is which.
      </p>

      <div className="overflow-x-auto card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-dim">
              <th className="px-4 py-3 font-medium">Screen / feature</th>
              <th className="px-4 py-3 font-medium">Scope</th>
              <th className="px-4 py-3 font-medium">In the 4-week build</th>
              <th className="px-4 py-3 font-medium">Not in the 4-week build</th>
            </tr>
          </thead>
          <tbody>
            {screenScope.map((s) => (
              <tr key={s.screen} className="border-b border-border last:border-0 align-top hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-text text-xs font-medium">{s.screen}</td>
                <td className="px-4 py-3">
                  <ScopeBadge level={s.level} />
                </td>
                <td className="px-4 py-3 text-text-muted text-xs leading-relaxed">{s.inBuild}</td>
                <td className="px-4 py-3 text-text-muted text-xs leading-relaxed">{s.notInBuild}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>V1 assumptions and external dependencies</SubHeading>
      <div className="grid md:grid-cols-2 gap-2">
        {assumptions.map((a, i) => (
          <div key={i} className="text-xs text-text-muted bg-white/[0.03] border border-border rounded-lg px-3 py-2.5 leading-relaxed">
            {a}
          </div>
        ))}
      </div>
      <Callout tone="amber">
        <div className="flex items-start gap-2">
          <AlertTriangle size={15} className="text-amber shrink-0 mt-0.5" />
          <span>
            <strong>Highest schedule risk:</strong> Zuora sandbox access and Product Catalogue setup (rate plans, units of measure,
            subscriptions). This is external to the engineering team's control and is why it is isolated as its own Week 1 workstream below,
            not a sub-bullet inside "Billing Integration Layer."
          </span>
        </div>
      </Callout>

      <SubHeading>Four-week execution plan</SubHeading>
      <div className="space-y-3">
        {weeks.map((w) => (
          <div key={w.week} className="card p-4">
            <div className="flex items-baseline gap-2 mb-2 flex-wrap">
              <span className="text-xs font-semibold text-accent uppercase tracking-wide">{w.week}</span>
              <h4 className="font-semibold text-sm text-text">{w.title}</h4>
            </div>
            <ul className="flex flex-wrap gap-1.5 mb-3">
              {w.items.map((it) => (
                <li key={it} className="text-xs text-text-muted bg-white/[0.03] border border-border rounded-md px-2 py-1">
                  {it}
                </li>
              ))}
            </ul>
            <div className="text-xs text-cyan bg-cyan/5 border border-cyan/20 rounded-md px-2.5 py-1.5 leading-relaxed">{w.gate}</div>
          </div>
        ))}
      </div>

      <Callout tone="amber">
        <strong>If Zuora sandbox access is delayed:</strong> engineering may build against a contract-tested Zuora adapter — a fake that
        implements Zuora's real API contract — to keep Weeks 2–3 moving. This only unblocks development. V1 is <em>not</em> complete until a
        real Zuora sandbox invoice with SMS and Voice lines has actually been generated end to end.
      </Callout>
    </Section>
  );
}
