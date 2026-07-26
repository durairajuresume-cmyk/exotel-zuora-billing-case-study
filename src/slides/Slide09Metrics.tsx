import { SlideShell } from './SlideShell';

const guardrails = ['Zero duplicate charges', 'Zero unaccounted billable usage', 'Invoice generation within SLA', 'Revenue-weighted mismatch below threshold'];

export function Slide09Metrics() {
  return (
    <SlideShell index={12} total={19} kicker="Slide 12 · Metrics" title="One North Star. Four guardrails." dense>
      <div className="h-full flex flex-col justify-center gap-6">
        <div className="rounded-xl border border-accent/40 bg-accent-soft p-6 text-center">
          <div className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">North Star</div>
          <div className="text-xl font-semibold text-text">Percentage of posted invoice lines fully reconciled and traceable to canonical usage</div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {guardrails.map((g) => (
            <div key={g} className="card p-4 flex items-center justify-center text-center">
              <div className="text-xs text-text-muted">{g}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
