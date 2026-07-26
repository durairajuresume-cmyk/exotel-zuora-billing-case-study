import { Section } from '../../components/Section';

const supportingNote = 'Every metric below exists to protect or diagnose the North Star. None of them is optimized in isolation.';

const guardrails = [
  'Zero duplicate charges',
  'Zero unaccounted billable usage',
  'Invoice generation within SLA',
  'Revenue-weighted mismatch below threshold',
];

const groups = [
  {
    title: 'Accuracy',
    metrics: ['Invoice accuracy percentage', 'Duplicate usage rate', 'Missing usage rate', 'Reconciliation mismatch rate', '% of invoice lines traceable to source events'],
  },
  {
    title: 'Speed',
    metrics: ['Usage-to-Zuora latency', 'Invoice generation time', 'Billing-cycle closure time', 'Dispute-resolution time'],
  },
  {
    title: 'Reliability',
    metrics: ['API success rate', 'Retry rate', 'Dead-letter volume', 'Batch failure rate', 'Late usage rate'],
  },
  {
    title: 'Business impact',
    metrics: ['Manual billing effort reduction', 'Invoice disputes reduction', 'Revenue leakage recovered', 'Invoices generated on time', 'DSO improvement', 'New pricing-plan launch time'],
  },
];

const targets = [
  { label: 'Invoice accuracy', target: '> 99.99%' },
  { label: 'Reconciliation mismatch rate', target: '< 0.01%' },
  { label: 'Duplicate charges', target: 'Zero' },
  { label: 'Invoice line traceability', target: '100%' },
  { label: 'Invoices generated within SLA', target: '95%' },
];

export function Metrics() {
  return (
    <Section
      id="metrics"
      eyebrow="13 · Metrics"
      title="Success metrics and expected business impact"
      intro="Metrics grouped by what they protect: correctness, speed, operational reliability, and the business outcomes leadership actually cares about."
    >
      <div className="rounded-xl border border-accent/40 bg-accent-soft p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-accent mb-1">North Star metric</div>
            <div className="text-xl font-semibold text-text">Percentage of posted invoice lines fully reconciled and traceable to canonical usage</div>
          </div>
          <p className="text-xs text-text-muted md:ml-auto md:max-w-xs md:text-right">{supportingNote}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {guardrails.map((g) => (
            <div key={g} className="text-xs text-text bg-black/20 border border-accent/20 rounded-md px-2.5 py-2 text-center">{g}</div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {groups.map((g) => (
          <div key={g.title} className="card p-4">
            <h4 className="font-semibold text-sm text-accent mb-2">{g.title}</h4>
            <ul className="space-y-1.5">
              {g.metrics.map((m) => (
                <li key={m} className="text-xs text-text-muted leading-snug">{m}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <h4 className="font-semibold text-sm text-text mb-3">Suggested MVP targets</h4>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {targets.map((t) => (
            <div key={t.label} className="flex items-center justify-between bg-white/[0.03] border border-border rounded-lg px-3 py-2.5">
              <span className="text-xs text-text-muted">{t.label}</span>
              <span className="mono text-sm font-semibold text-green">{t.target}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
