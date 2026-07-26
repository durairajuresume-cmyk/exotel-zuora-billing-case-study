import { Section } from '../../components/Section';

const phases = [
  {
    phase: 'Stage 1',
    title: 'Assumption validation / mobilisation',
    duration: '4 weeks',
    items: ['Understand current Exotel billing architecture', 'Map all products and pricing models', 'Understand Finance workflows', 'Define source-of-truth boundaries', 'Identify regulatory and tax requirements'],
    gate: 'Exit when: source-of-truth boundaries are signed off by Finance and Engineering, and SMS + Voice are confirmed as the narrowest viable first metrics. Runs concurrently with Stage 2, not strictly before it.',
  },
  {
    phase: 'Stage 2',
    title: 'Four-week Integration Proof',
    duration: '4 weeks',
    items: ['Detailed in "V1 scope" above — one tenant, one billing account, one subscription, SMS + Voice, a live Zuora invoice'],
    gate: 'Exit when: two consecutive live dry runs generate a matched, reconciled invoice for both products (see V1 Scope for the week-by-week plan and gates).',
  },
  {
    phase: 'Stage 3',
    title: 'Production Pilot',
    duration: '~14 weeks',
    items: [
      'Canonical usage schema and tenant/subscription mapping at production scale',
      'Delivered SMS + Voice, one geography, one currency',
      'Basic reconciliation and an internal dashboard',
      '3–5 enterprise customers',
      'Parallel billing with the existing system',
      'Finance approval before customer release',
    ],
    gate: 'Exit when: 30 consecutive days of India/INR batches reconcile at 100% with zero duplicate charges in a shadow environment, AND pilot invoices match the legacy system within ₹1 and 0.1% quantity across 2 consecutive cycles, with Finance sign-off in writing.',
  },
  {
    phase: 'Stage 4',
    title: 'Controlled Migration',
    duration: '8 weeks',
    items: ['Move pilot customers to Zuora-generated invoices', 'Monitor billing accuracy and disputes', 'Enable credit-note workflows'],
    gate: 'Exit when: pilot customers are fully cut over with zero billing-caused disputes for 2 consecutive cycles and credit/debit-note workflows are used at least once in production.',
  },
  {
    phase: 'Stage 5',
    title: 'Scaled Billing Operations',
    duration: '2–3 quarters',
    items: ['Voice, WhatsApp, Conversational AI, Contact Center at scale', 'Tiered pricing, minimum commitments', 'Prepaid and postpaid', 'Multi-currency, multi-country tax'],
    gate: 'Exit when: all five products are live for at least 25% of enterprise accounts with reconciliation mismatch held under 0.01%.',
  },
  {
    phase: 'Stage 6',
    title: 'AI-assisted operations',
    duration: 'Ongoing',
    items: ['Anomaly detection', 'Revenue leakage detection', 'AI Billing Copilot', 'Proactive dispute detection'],
    gate: 'Entry criteria: Stage 5 metrics stable for 2 consecutive quarters — AI features assist a mature, already-trustworthy pipeline, not a shaky one.',
  },
];

export function Rollout() {
  return (
    <Section
      id="rollout"
      eyebrow="12 · Rollout"
      title="From assumption validation to AI-assisted operations"
      intro="Six stages, each with an explicit exit gate. Stage 2 (the four-week Integration Proof) is detailed in the previous section — everything here is what comes before and after it, not a restatement of it."
    >
      <div className="relative">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border hidden md:block" />
        <div className="space-y-4">
          {phases.map((p) => (
            <div key={p.phase} className="flex gap-4">
              <div className="hidden md:flex flex-col items-center shrink-0 w-8">
                <span className="h-3 w-3 rounded-full bg-accent border-2 border-bg ring-2 ring-accent/40 z-10" />
              </div>
              <div className="card p-4 flex-1">
                <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wide">{p.phase}</span>
                  <h4 className="font-semibold text-sm text-text">{p.title}</h4>
                  <span className="text-xs text-text-dim mono ml-auto">{p.duration}</span>
                </div>
                <ul className="flex flex-wrap gap-1.5 mb-3">
                  {p.items.map((it) => (
                    <li key={it} className="text-xs text-text-muted bg-white/[0.03] border border-border rounded-md px-2 py-1">{it}</li>
                  ))}
                </ul>
                <div className="text-xs text-cyan bg-cyan/5 border border-cyan/20 rounded-md px-2.5 py-1.5 leading-relaxed">{p.gate}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
