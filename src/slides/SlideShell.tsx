import type { ReactNode } from 'react';

interface SlideShellProps {
  index: number;
  total: number;
  kicker: string;
  title: string;
  children: ReactNode;
  dense?: boolean;
}

export function SlideShell({ index, total, kicker, title, children, dense = false }: SlideShellProps) {
  return (
    <div className="slide-page relative w-full aspect-video bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col shrink-0">
      <div className="flex items-center justify-between px-10 pt-8 pb-4 shrink-0">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-1.5">{kicker}</div>
          <h2 className={dense ? 'text-2xl font-semibold text-text' : 'text-3xl font-semibold text-text'}>{title}</h2>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs font-semibold text-text-muted">Exotel × Zuora</div>
          <div className="text-[10px] text-text-dim">Billing Integration Platform</div>
        </div>
      </div>
      <div className="flex-1 min-h-0 px-10 pb-6 overflow-auto">{children}</div>
      <div className="flex items-center justify-between px-10 py-3 border-t border-border shrink-0">
        <span className="text-[10px] text-text-dim">Illustrative sample data · Senior PM proof of work</span>
        <span className="text-[10px] mono text-text-dim">
          {index} / {total}
        </span>
      </div>
    </div>
  );
}
