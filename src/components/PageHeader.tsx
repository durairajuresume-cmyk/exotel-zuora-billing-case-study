import type { ReactNode } from 'react';
import { ScopeBadge, type ScopeLevel } from './ScopeBadge';

export function PageHeader({ title, subtitle, actions, scope }: { title: string; subtitle?: string; actions?: ReactNode; scope?: ScopeLevel }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl md:text-2xl font-semibold text-text">{title}</h1>
          {scope && <ScopeBadge level={scope} />}
        </div>
        {subtitle && <p className="text-sm text-text-muted mt-1 max-w-2xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}
