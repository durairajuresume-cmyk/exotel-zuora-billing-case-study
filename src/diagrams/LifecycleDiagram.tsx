import { ArrowRight } from 'lucide-react';

const happyPath = [
  'CREATED',
  'VALIDATED',
  'READY_FOR_BILLING',
  'BATCHED',
  'SENT_TO_ZUORA',
  'ACCEPTED_BY_ZUORA',
  'RATED',
  'INVOICED',
  'RECONCILED',
];

const failureStates = [
  { state: 'FAILED_VALIDATION', from: 'VALIDATED' },
  { state: 'FAILED_MAPPING', from: 'BATCHED' },
  { state: 'FAILED_SUBMISSION', from: 'SENT_TO_ZUORA' },
  { state: 'DEAD_LETTER', from: 'FAILED_SUBMISSION' },
  { state: 'RECONCILIATION_MISMATCH', from: 'ACCEPTED_BY_ZUORA' },
];

export function LifecycleDiagram() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Happy path</div>
        <div className="flex flex-wrap items-center gap-2">
          {happyPath.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span className="mono text-xs rounded-lg border border-accent/40 bg-accent-soft text-accent px-2.5 py-1.5 whitespace-nowrap">
                {s}
              </span>
              {i < happyPath.length - 1 && <ArrowRight size={14} className="text-text-dim shrink-0" />}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-red mb-3">Failure states</div>
        <div className="flex flex-wrap gap-2">
          {failureStates.map((f) => (
            <div key={f.state} className="flex items-center gap-2 rounded-lg border border-red/30 bg-red/5 px-2.5 py-1.5">
              <span className="mono text-xs text-text-dim whitespace-nowrap">{f.from}</span>
              <ArrowRight size={12} className="text-red shrink-0" />
              <span className="mono text-xs text-red whitespace-nowrap">{f.state}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
