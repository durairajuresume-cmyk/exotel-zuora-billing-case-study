import { NavLink, Outlet } from 'react-router-dom';
import { PlayCircle, Layers, GitCompareArrows, AlertTriangle, Building2, Activity, LayoutDashboard } from 'lucide-react';
import clsx from 'clsx';
import { ScopeBadge, type ScopeLevel } from '../../components/ScopeBadge';

interface NavItem {
  to: string;
  label: string;
  icon: typeof PlayCircle;
  scope: ScopeLevel;
}

const v1Journey: NavItem[] = [
  { to: '/prototype/demo', label: 'Demo Control Center', icon: PlayCircle, scope: 'V1' },
  { to: '/prototype/batches', label: 'Usage Batches', icon: Layers, scope: 'V1 — Simplified' },
  { to: '/prototype/traceability', label: 'Invoice Traceability', icon: GitCompareArrows, scope: 'V1 — Core' },
];

const roadmapVision: NavItem[] = [
  { to: '/prototype/dashboard', label: 'Billing Ops Dashboard', icon: LayoutDashboard, scope: 'Post-V1' },
  { to: '/prototype/exceptions', label: 'Reconciliation Exceptions', icon: AlertTriangle, scope: 'Post-V1' },
  { to: '/prototype/customers', label: 'Customer Billing', icon: Building2, scope: 'Post-V1' },
  { to: '/prototype/health', label: 'Integration Health', icon: Activity, scope: 'Target-state concept' },
];

function NavGroup({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-text-dim mb-2 px-2">{title}</div>
      <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors shrink-0',
                isActive ? 'bg-accent-soft text-accent' : 'text-text-muted hover:text-text hover:bg-white/5',
              )
            }
          >
            <item.icon size={16} className="shrink-0" />
            <span className="flex-1">{item.label}</span>
            <ScopeBadge level={item.scope} className="hidden xl:inline-flex" />
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export function PrototypeLayout() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6">
      <div className="no-print rounded-xl border border-border-light bg-white/[0.02] px-4 py-3 mb-6 flex flex-col md:flex-row md:items-center gap-3">
        <p className="text-xs text-text-muted flex-1">
          <span className="font-semibold text-text">Prototype fidelity ≠ engineering commitment.</span> This prototype communicates both the
          four-week V1 build and the longer-term Billing Operations vision — the scope tags below tell you which is which.
        </p>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <ScopeBadge level="V1 — Core" />
          <span className="text-[10px] text-text-dim">4-week build</span>
          <ScopeBadge level="Post-V1" />
          <span className="text-[10px] text-text-dim">near-term roadmap</span>
          <ScopeBadge level="Target-state concept" />
          <span className="text-[10px] text-text-dim">full vision</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        <aside className="no-print lg:sticky lg:top-20 lg:self-start space-y-5">
          <NavGroup title="V1 Demo Journey" items={v1Journey} />
          <NavGroup title="Roadmap & Vision" items={roadmapVision} />
        </aside>
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
