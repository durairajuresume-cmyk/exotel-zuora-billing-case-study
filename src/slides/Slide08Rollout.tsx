import { SlideShell } from './SlideShell';

const phases = [
  { phase: 'Stage 1', duration: '4 wks', title: 'Mobilisation', body: 'Map products, contracts, Finance workflows.' },
  { phase: 'Stage 2', duration: '4 wks', title: 'Integration Proof', body: 'One tenant, SMS + Voice, live Zuora invoice (see slide 9).' },
  { phase: 'Stage 3', duration: '~14 wks', title: 'Production Pilot', body: 'Foundation + 3–5 customers, parallel billing, Finance sign-off.' },
  { phase: 'Stage 4', duration: '8 wks', title: 'Controlled Migration', body: 'Move pilots to Zuora invoices, enable credit notes.' },
  { phase: 'Stage 5', duration: '2–3 qtrs', title: 'Scaled Billing Ops', body: 'Voice, WhatsApp, AI, tiered pricing, multi-currency.' },
  { phase: 'Stage 6', duration: 'Ongoing', title: 'AI-assisted operations', body: 'Anomaly detection, revenue leakage, AI copilot.' },
];

export function Slide08Rollout() {
  return (
    <SlideShell index={11} total={19} kicker="Slide 11 · Rollout" title="Six stages: mobilisation to AI-assisted operations" dense>
      <p className="text-xs text-text-dim mb-3">Stage 2 is the four-week Integration Proof detailed on slides 9–10 — not the same thing as any single stage here.</p>
      <div className="grid grid-cols-3 gap-3 h-full content-center">
        {phases.map((p) => (
          <div key={p.phase} className="card p-4">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs font-semibold text-accent uppercase tracking-wide">{p.phase}</span>
              <span className="text-xs text-text-dim mono">{p.duration}</span>
            </div>
            <h4 className="font-semibold text-sm text-text mb-1">{p.title}</h4>
            <p className="text-xs text-text-muted leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
