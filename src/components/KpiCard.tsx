import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface KpiCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: 'good' | 'bad' | 'neutral';
  icon?: LucideIcon;
  hint?: string;
}

export function KpiCard({ label, value, delta, deltaTone = 'neutral', icon: Icon, hint }: KpiCardProps) {
  return (
    <div className="card p-4 flex flex-col gap-2 min-w-0">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-text-muted">{label}</span>
        {Icon && <Icon size={16} className="text-accent shrink-0" />}
      </div>
      <div className="text-2xl font-semibold text-text tabular-nums truncate">{value}</div>
      <div className="flex items-center justify-between text-xs">
        {delta && (
          <span
            className={clsx(
              'font-medium',
              deltaTone === 'good' && 'text-green',
              deltaTone === 'bad' && 'text-red',
              deltaTone === 'neutral' && 'text-text-muted',
            )}
          >
            {delta}
          </span>
        )}
        {hint && <span className="text-text-dim truncate">{hint}</span>}
      </div>
    </div>
  );
}
