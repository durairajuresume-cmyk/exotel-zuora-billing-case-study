import clsx from 'clsx';

type Tone = 'green' | 'amber' | 'red' | 'cyan' | 'muted' | 'teal';

const TONE_CLASSES: Record<Tone, string> = {
  green: 'bg-green/10 text-green border-green/30',
  amber: 'bg-amber/10 text-amber border-amber/30',
  red: 'bg-red/10 text-red border-red/30',
  cyan: 'bg-cyan/10 text-cyan border-cyan/30',
  teal: 'bg-accent-soft text-accent border-accent/30',
  muted: 'bg-white/5 text-text-muted border-border-light',
};

const STATUS_TONE_MAP: Record<string, Tone> = {
  // batch submission
  PENDING: 'muted',
  SUBMITTED: 'cyan',
  ACCEPTED: 'green',
  PARTIALLY_ACCEPTED: 'amber',
  REJECTED: 'red',
  FAILED: 'red',
  DEAD_LETTER: 'red',
  // reconciliation
  MATCHED: 'green',
  MISMATCH: 'amber',
  INVESTIGATING: 'amber',
  RESOLVED: 'green',
  // exception workflow
  Detected: 'red',
  Assigned: 'amber',
  Investigated: 'amber',
  Corrected: 'cyan',
  Reconciled: 'green',
  Closed: 'muted',
  // invoice
  Draft: 'muted',
  Posted: 'cyan',
  Paid: 'green',
  Disputed: 'red',
  Overdue: 'red',
  // payment
  Current: 'green',
  'At Risk': 'amber',
  // lifecycle
  CREATED: 'muted',
  VALIDATED: 'cyan',
  READY_FOR_BILLING: 'cyan',
  BATCHED: 'cyan',
  SENT_TO_ZUORA: 'cyan',
  ACCEPTED_BY_ZUORA: 'teal',
  RATED: 'teal',
  INVOICED: 'green',
  RECONCILED: 'green',
  FAILED_VALIDATION: 'red',
  FAILED_MAPPING: 'red',
  FAILED_SUBMISSION: 'red',
  RECONCILIATION_MISMATCH: 'amber',
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const tone = STATUS_TONE_MAP[status] ?? 'muted';
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap',
        TONE_CLASSES[tone],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status.replaceAll('_', ' ')}
    </span>
  );
}
