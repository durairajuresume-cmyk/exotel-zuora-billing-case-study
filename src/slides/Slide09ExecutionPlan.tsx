import { SlideShell } from './SlideShell';

const weeks = [
  { week: 'Week 1', title: 'Zuora setup (highest risk)', body: 'Sandbox, Product Catalogue (SMS + Voice rate plans), 1 subscription, mapping config.', gate: 'Gate: test usage record reaches Zuora.' },
  { week: 'Week 2', title: 'Metering + batching', body: 'Canonical schema, ingestion + idempotency for 2 metrics, on-demand batch trigger.', gate: 'Gate: manual batch aggregates real usage.' },
  { week: 'Week 3', title: 'Submission + invoicing', body: 'Submit to Zuora, persist FAILED + manual retry, trigger bill run, pull invoice back.', gate: 'Gate: 1 invoice, SMS + Voice lines, 1 account.' },
  { week: 'Week 4', title: 'Reconciliation + rehearsal', body: 'Read-only 3-way match, replay proves no duplicate charge, live dry run x2.', gate: 'Gate: 2 clean dry runs, 0 duplicate charges.' },
];

export function Slide09ExecutionPlan() {
  return (
    <SlideShell index={10} total={19} kicker="Slide 10 · Execution plan" title="Four weeks, three engineers, weekly exit gates" dense>
      <div className="grid grid-cols-4 gap-3 h-full content-center">
        {weeks.map((w) => (
          <div key={w.week} className="card p-4 flex flex-col gap-2">
            <div className="text-xs font-semibold text-accent uppercase tracking-wide">{w.week}</div>
            <h4 className="font-semibold text-sm text-text">{w.title}</h4>
            <p className="text-xs text-text-muted leading-relaxed flex-1">{w.body}</p>
            <div className="text-[11px] text-cyan bg-cyan/5 border border-cyan/20 rounded-md px-2 py-1.5 leading-snug">{w.gate}</div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
