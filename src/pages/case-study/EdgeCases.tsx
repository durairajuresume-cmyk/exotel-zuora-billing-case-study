import { Section, Callout } from '../../components/Section';

const edgeCases = [
  { case: 'Duplicate delivered callback', handling: 'Suppressed by billing-level idempotency key before a second usage record can be created.' },
  { case: 'Late delivery confirmation after billing cut-off', handling: 'Recorded as late-arriving usage and applied as a prior-period adjustment on the next invoice, with the original period preserved in the audit trail.' },
  { case: 'Contract price changes mid-cycle', handling: 'Usage is pinned to contract_version at the moment it was generated, so mixed-rate cycles rate correctly without manual splitting.' },
  { case: 'Zuora API downtime', handling: 'Batches queue in the Billing Integration Layer, retry with backoff, and fall to the dead-letter queue for manual replay if retries are exhausted.' },
  { case: 'Incorrect customer or subscription mapping', handling: 'Flagged as a SUBSCRIPTION_MAPPING_ERROR exception; batch is held out of invoicing until Billing Ops corrects the mapping and replays it.' },
  { case: 'Usage received after an invoice is closed', handling: 'Never edits the closed invoice; usage is billed as a next-cycle adjustment or offset with a debit/credit note.' },
  { case: 'Partial batch acceptance', handling: 'Accepted records proceed to rating; rejected records are isolated, retried independently, and tracked as their own exception.' },
  { case: 'Multi-currency customer', handling: 'Currency is a first-class field on the canonical usage record and batch, carried through to rating without conversion assumptions.' },
  { case: 'Tax rule changes', handling: 'Tax computation stays entirely inside Zuora, keyed off geography and effective date, decoupled from usage metering.' },
  { case: 'Customer uses multiple Exotel products', handling: 'Each product produces its own usage_metric on the shared canonical schema; invoice lines roll up per product under one billing account.' },
  { case: 'Prepaid customer runs out of balance', handling: 'Balance checks stay in Exotel’s serving path; billing integration only meters and rates actual consumption, unaffected by prepaid enforcement.' },
  { case: 'Minimum commitment and overage pricing', handling: 'Modeled entirely as a Zuora rate-plan concern — Exotel sends raw quantity, Zuora applies commitment and overage tiers.' },
  { case: 'Customer disputes an invoice', handling: 'Support and Billing Ops use the Invoice Traceability screen to walk invoice → batch → usage → source event and resolve without engineering.' },
  { case: 'Historical usage migration', handling: 'Migrated usage is tagged with a distinct batch_id and idempotency key so it never collides with organically metered usage.' },
  { case: 'Replaying failed batches without duplicating charges', handling: 'Replays reuse the original idempotency key and batch_id; Zuora and the reconciliation service both reject a record that already has a matching billing key.' },
];

export function EdgeCases() {
  return (
    <Section
      id="edge-cases"
      eyebrow="10 · Edge cases"
      title="Edge cases and how the platform handles them"
      intro="Fifteen scenarios that show up in any real enterprise billing operation — each one is a design decision, not an afterthought."
    >
      <div className="overflow-x-auto card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-dim">
              <th className="px-4 py-3 font-medium w-1/3">Edge case</th>
              <th className="px-4 py-3 font-medium">How the platform handles it</th>
            </tr>
          </thead>
          <tbody>
            {edgeCases.map((e, i) => (
              <tr key={e.case} className="border-b border-border last:border-0 hover:bg-white/[0.02] align-top">
                <td className="px-4 py-3 text-text font-medium text-xs">
                  <span className="text-text-dim mono mr-1.5">{String(i + 1).padStart(2, '0')}</span>
                  {e.case}
                </td>
                <td className="px-4 py-3 text-text-muted text-xs leading-relaxed">{e.handling}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout tone="amber">
        Correction principle: overbilling → credit note. Underbilling → debit note or next-cycle adjustment. Never silently edit a closed
        invoice. Always preserve the audit trail.
      </Callout>
    </Section>
  );
}
