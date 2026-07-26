import { Section, SubHeading, Callout } from '../../components/Section';
import { ArrowRight } from 'lucide-react';

const causes = [
  'Duplicate carrier callbacks',
  'Queue replay',
  'Acknowledgement failure',
  'Consumer crash',
  'Retry processing',
  'Concurrent requests',
];

const concepts = [
  {
    name: 'event_dedupe_key',
    layer: 'Metering Layer',
    guards: 'Stops the same raw callback/event from being processed more than once.',
    example: 'DEDUPE-MSG-12345-DELIVERED',
  },
  {
    name: 'billing_usage_key',
    layer: 'Canonical Usage Store',
    guards: 'Stops one logical billable action from producing more than one canonical usage record.',
    example: 'tenant_id + source_object_id + billing_rule',
  },
  {
    name: 'submission_idempotency_key',
    layer: 'Billing Integration Layer',
    guards: 'Stops the same batch payload from being submitted to Zuora more than once.',
    example: 'batch_id + payload_version',
  },
];

export function Idempotency() {
  return (
    <Section
      id="idempotency"
      eyebrow="07 · Reliability"
      title="Duplicate billing and idempotency"
      intro="Duplicate billing is the single scenario enterprise customers will escalate over immediately, and the failure modes that cause it are ordinary distributed-systems events, not exotic edge cases."
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {causes.map((c) => (
          <div key={c} className="text-xs text-text-muted bg-white/[0.03] border border-border rounded-lg px-3 py-2">{c}</div>
        ))}
      </div>

      <SubHeading>Three separate concepts, three separate layers</SubHeading>
      <p className="text-text-muted leading-relaxed max-w-3xl">
        It's tempting to reach for one "idempotency key" and reuse it everywhere. That's a mistake — these three guarantees protect against
        three different failure modes at three different layers, and conflating them (or worse, using one tenant/product/date key as proof
        of usage-level idempotency for millions of separate billable actions) is how duplicate-billing bugs actually happen in production.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {concepts.map((c, i) => (
          <div key={c.name} className="card p-4">
            <div className="text-[10px] uppercase tracking-wide text-text-dim mb-1">Layer {i + 1} · {c.layer}</div>
            <div className="mono text-sm text-accent mb-2">{c.name}</div>
            <p className="text-xs text-text-muted leading-relaxed mb-3">{c.guards}</p>
            <div className="mono text-[11px] text-text-dim bg-black/20 rounded-md px-2 py-1.5 break-all">{c.example}</div>
          </div>
        ))}
      </div>

      <Callout tone="amber">
        <strong>Design correction:</strong> an earlier draft used a single key including <span className="mono">contract_version</span> for
        both usage identity and batch submission. That's wrong on two counts. First, contract_version is a <em>rating</em> attribute — it can
        be corrected after submission (see the HDFC Bank mid-cycle upgrade in the prototype's batch history) — and if it were part of an
        identity key, correcting it would generate a <em>different</em> key and create a second record instead of updating the first,
        silently causing the exact duplicate charge this design exists to prevent. Second, a key built from tenant + product + date is a
        <em> batch-level</em> concept — it cannot stand in for usage-level idempotency across millions of individual billable actions inside
        that batch. billing_usage_key must be per source_object_id, not per batch.
      </Callout>

      <SubHeading>Retry behavior, precisely</SubHeading>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="text-xs font-semibold text-accent mb-2">Network retry of the identical payload</div>
          <p className="text-xs text-text-muted leading-relaxed">
            Reuses the same submission_idempotency_key unchanged. Zuora recognizes it as the same submission and does not double-process it.
          </p>
        </div>
        <div className="card p-4">
          <div className="text-xs font-semibold text-amber mb-2">Corrected resubmission of a rejected subset</div>
          <p className="text-xs text-text-muted leading-relaxed">
            Receives a <em>new</em> child batch ID and its own submission_idempotency_key — but retains a parent_batch_id lineage pointer,
            and reuses the exact same canonical usage IDs. This is the same billable usage, resubmitted — not a new logical event, and never
            a second usage record.
          </p>
        </div>
      </div>

      <SubHeading>Walkthrough — one SMS, two delivery callbacks</SubHeading>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="text-xs font-semibold text-accent mb-2">First DELIVERED event for MSG-456</div>
          <ul className="text-xs text-text-muted space-y-1.5 list-disc list-inside">
            <li>Metering Layer checks event_dedupe_key — no match, processes the callback.</li>
            <li>Canonical Usage Store checks billing_usage_key — no existing usage record.</li>
            <li>Creates Usage ID U-100.</li>
          </ul>
        </div>
        <div className="card p-4">
          <div className="text-xs font-semibold text-amber mb-2">Second DELIVERED event for MSG-456 (carrier retry)</div>
          <ul className="text-xs text-text-muted space-y-1.5 list-disc list-inside">
            <li>Metering Layer's event_dedupe_key already matches — callback suppressed here.</li>
            <li>It never reaches the Canonical Usage Store, so billing_usage_key is never even re-checked.</li>
            <li>No second usage record. No second charge.</li>
          </ul>
        </div>
      </div>

      <Callout>
        A database-level unique constraint on billing_usage_key — not just application logic — is required to prevent two concurrent
        requests from both passing a "does this exist?" check and creating duplicate usage records at the same instant.
      </Callout>

      <div className="flex flex-wrap items-center gap-2 text-xs text-text-dim">
        <span>Raw event</span>
        <ArrowRight size={12} />
        <span>event_dedupe_key (Metering Layer)</span>
        <ArrowRight size={12} />
        <span>billing_usage_key (Canonical Usage Store)</span>
        <ArrowRight size={12} />
        <span>submission_idempotency_key (Billing Integration Layer)</span>
        <ArrowRight size={12} />
        <span>One usage record, one submission, one charge</span>
      </div>
    </Section>
  );
}
