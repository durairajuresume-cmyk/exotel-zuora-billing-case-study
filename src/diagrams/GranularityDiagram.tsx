import { Check, X, Star } from 'lucide-react';
import clsx from 'clsx';

interface Option {
  key: string;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  recommended?: boolean;
}

const options: Option[] = [
  {
    key: 'A',
    title: 'Option A — Event-level',
    description: 'Send every individual usage record to Zuora.',
    pros: ['Maximum traceability'],
    cons: ['High API volume', 'Higher cost', 'Slower processing', 'Harder to operate at massive scale'],
  },
  {
    key: 'B',
    title: 'Option B — Monthly aggregate',
    description: 'Send only monthly aggregated usage.',
    pros: ['Low integration volume'],
    cons: ['Weak dispute traceability', 'Delayed anomaly detection', 'Difficult corrections'],
  },
  {
    key: 'H',
    title: 'Recommended — Hybrid',
    description: 'Keep event-level data inside Exotel; send hourly/daily aggregated batches to Zuora, linked by batch ID.',
    pros: ['Low integration volume like Option B', 'Full traceability preserved inside Exotel', 'Fast anomaly detection (hourly/daily, not monthly)', 'Corrections scoped to a single batch'],
    cons: [],
    recommended: true,
  },
];

export function GranularityDiagram() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {options.map((opt) => (
        <div
          key={opt.key}
          className={clsx(
            'rounded-xl border p-4 flex flex-col gap-3',
            opt.recommended ? 'border-accent/50 bg-accent-soft' : 'border-border bg-surface',
          )}
        >
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm text-text">{opt.title}</h4>
            {opt.recommended && <Star size={15} className="text-accent shrink-0" fill="currentColor" />}
          </div>
          <p className="text-xs text-text-muted leading-relaxed">{opt.description}</p>
          <div className="space-y-1.5">
            {opt.pros.map((p) => (
              <div key={p} className="flex items-start gap-1.5 text-xs text-text">
                <Check size={13} className="text-green mt-0.5 shrink-0" />
                <span>{p}</span>
              </div>
            ))}
            {opt.cons.map((c) => (
              <div key={c} className="flex items-start gap-1.5 text-xs text-text-muted">
                <X size={13} className="text-red mt-0.5 shrink-0" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
