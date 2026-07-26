import { SlideShell } from './SlideShell';

const items = [
  { label: 'Risk', body: 'Complex commitment + overage plans may need more Zuora configuration than scoped.', tone: 'text-red border-red/30 bg-red/5' },
  { label: 'Trade-off', body: 'Hourly/daily batching adds reconciliation lag vs. real-time — fine for invoicing, not balance enforcement.', tone: 'text-amber border-amber/30 bg-amber/5' },
  { label: 'Assumption', body: 'Zuora is the assumed billing system of record; alternatives were not evaluated here.', tone: 'text-cyan border-cyan/30 bg-cyan/5' },
  { label: 'Open question', body: 'What invoice-availability SLA is required per contract tier, and which tax jurisdictions come first in Stage 5 (Scaled Billing Operations)?', tone: 'text-accent border-accent/30 bg-accent-soft' },
];

export function Slide10Risks() {
  return (
    <SlideShell index={13} total={19} kicker="Slide 13 · Closing" title="Risks, trade-offs, assumptions, and open questions" dense>
      <div className="grid grid-cols-2 gap-4 h-full content-center">
        {items.map((i) => (
          <div key={i.label} className="card p-5">
            <span className={`inline-block text-[10px] font-semibold uppercase tracking-wide rounded-full border px-2 py-0.5 mb-2 ${i.tone}`}>{i.label}</span>
            <p className="text-sm text-text-muted leading-relaxed">{i.body}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
