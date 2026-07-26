import { SlideShell } from './SlideShell';
import { PlayCircle, LayoutDashboard, Layers, GitCompareArrows, AlertTriangle, Building2, Activity } from 'lucide-react';

const screens = [
  { icon: PlayCircle, title: 'Demo Control Center', body: 'Usage metered → Canonical usage → Billing Integration → Zuora accepted → Run Billing → View Invoice.', scope: 'V1' },
  { icon: Layers, title: 'Usage Batch List & Detail', body: 'Every batch sent to Zuora, with retries and reconciliation.', scope: 'V1' },
  { icon: GitCompareArrows, title: 'Invoice Traceability', body: 'Invoice → batch → usage → source event, expandable.', scope: 'V1' },
  { icon: LayoutDashboard, title: 'Billing Ops Dashboard', body: 'KPIs, trends, and filters for the whole billing operation.', scope: 'Post-V1' },
  { icon: AlertTriangle, title: 'Reconciliation Exceptions', body: 'Owned queue, root cause, retry-batch lineage.', scope: 'Target-state' },
  { icon: Building2, title: 'Customer Billing Summary', body: 'Subscription, usage, and live invoice status per account.', scope: 'Post-V1' },
  { icon: Activity, title: 'Integration Health', body: 'Zuora API availability, latency, dead-letter volume.', scope: 'Target-state' },
];

export function Slide07Prototype() {
  return (
    <SlideShell index={8} total={19} kicker="Slide 8 · Prototype" title="Every screen is real — not every screen ships in V1" dense>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-full content-center">
        {screens.map((s) => (
          <div key={s.title} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <s.icon size={18} className="text-accent" />
              <span
                className={
                  s.scope === 'V1'
                    ? 'text-[10px] font-semibold uppercase text-accent bg-accent-soft border border-accent/30 rounded-full px-2 py-0.5'
                    : s.scope === 'Post-V1'
                      ? 'text-[10px] font-semibold uppercase text-amber bg-amber/10 border border-amber/30 rounded-full px-2 py-0.5'
                      : 'text-[10px] font-semibold uppercase text-cyan bg-cyan/10 border border-cyan/30 rounded-full px-2 py-0.5'
                }
              >
                {s.scope}
              </span>
            </div>
            <h4 className="font-semibold text-sm text-text mb-1">{s.title}</h4>
            <p className="text-xs text-text-muted leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
