import clsx from 'clsx';

export type ScopeLevel = 'V1' | 'V1 — Simplified' | 'V1 — Core' | 'Post-V1' | 'Target-state concept';

const SCOPE_STYLES: Record<ScopeLevel, string> = {
  V1: 'text-accent border-accent/40 bg-accent-soft',
  'V1 — Simplified': 'text-accent border-accent/40 bg-accent-soft',
  'V1 — Core': 'text-accent border-accent/40 bg-accent-soft',
  'Post-V1': 'text-amber border-amber/30 bg-amber/5',
  'Target-state concept': 'text-cyan border-cyan/30 bg-cyan/5',
};

export function ScopeBadge({ level, className }: { level: ScopeLevel; className?: string }) {
  return (
    <span className={clsx('inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap', SCOPE_STYLES[level], className)}>
      {level}
    </span>
  );
}
