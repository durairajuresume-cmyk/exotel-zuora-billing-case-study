import { Section } from '../../components/Section';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const risks = [
  { label: 'Risk', body: 'Zuora rate-plan modeling for complex minimum-commitment + overage contracts may require more configuration than initially scoped.' },
  { label: 'Risk', body: 'Hourly/daily batching still introduces a reconciliation lag versus real-time — acceptable for invoicing, not sufficient for real-time balance enforcement.' },
  { label: 'Trade-off', body: 'The hybrid granularity model pushes traceability complexity onto Exotel’s canonical usage store rather than Zuora — a deliberate choice to keep Zuora usage volume low.' },
  { label: 'Trade-off', body: 'The four-week Integration Proof scopes to SMS + Voice, one tenant, one geography, one currency — intentionally narrow to prove reconciliation and idempotency before adding product and pricing complexity.' },
  { label: 'Assumption', body: 'Zuora is the assumed system of record for rating and invoicing; this document does not evaluate alternative billing platforms.' },
  { label: 'Assumption', body: 'Existing Exotel messaging/voice systems already emit reliable lifecycle callbacks (submitted, delivered, failed) that the metering layer can consume.' },
  { label: 'Open question', body: 'What is the acceptable customer-facing SLA for invoice availability after billing-cycle close, and does it vary by contract tier?' },
  { label: 'Open question', body: 'Which regulatory/tax jurisdictions must Stage 5 (Scaled Billing Operations) support first, and does that change the multi-currency rollout order?' },
];

const toneMap: Record<string, string> = {
  Risk: 'text-red border-red/30 bg-red/5',
  'Trade-off': 'text-amber border-amber/30 bg-amber/5',
  Assumption: 'text-cyan border-cyan/30 bg-cyan/5',
  'Open question': 'text-accent border-accent/30 bg-accent-soft',
};

export function Risks() {
  return (
    <Section
      id="risks"
      eyebrow="14 · Closing"
      title="Risks, trade-offs, assumptions, and open questions"
      intro="No design is without cost. Naming these explicitly is part of the proof of work."
    >
      <div className="grid md:grid-cols-2 gap-3">
        {risks.map((r, i) => (
          <div key={i} className="card p-4">
            <span className={`inline-block text-[10px] font-semibold uppercase tracking-wide rounded-full border px-2 py-0.5 mb-2 ${toneMap[r.label]}`}>
              {r.label}
            </span>
            <p className="text-sm text-text-muted leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>

      <div className="card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-8">
        <div>
          <h4 className="font-semibold text-text mb-1">See it in action</h4>
          <p className="text-sm text-text-muted">The Billing Operations prototype implements the screens this design implies.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link to="/prototype" className="inline-flex items-center gap-2 rounded-lg bg-accent text-bg font-semibold text-sm px-4 py-2.5 hover:bg-accent-dim transition-colors">
            Open prototype <ArrowRight size={16} />
          </Link>
          <Link to="/slides" className="inline-flex items-center gap-2 rounded-lg border border-border-light text-text font-semibold text-sm px-4 py-2.5 hover:bg-white/5 transition-colors">
            View slide deck
          </Link>
        </div>
      </div>
    </Section>
  );
}
