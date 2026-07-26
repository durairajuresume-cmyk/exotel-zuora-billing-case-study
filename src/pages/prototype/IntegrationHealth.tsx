import { PageHeader } from '../../components/PageHeader';
import { KpiCard } from '../../components/KpiCard';
import { integrationHealth } from '../../data/health';
import { Wifi, CheckCircle2, Timer, ListOrdered, AlertOctagon, RotateCcw, Clock } from 'lucide-react';
import clsx from 'clsx';

function formatTs(ts: string) {
  return new Date(ts).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' }) + ' UTC';
}

export function IntegrationHealth() {
  const h = integrationHealth;

  return (
    <div>
      <PageHeader title="Integration Health" subtitle="Operational health of the Billing Integration Layer's connection to the Zuora API." />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
        <KpiCard label="Zuora API availability" value={`${h.zuora_api_availability_pct}%`} icon={Wifi} deltaTone="good" delta="30-day" />
        <KpiCard label="API success rate" value={`${h.api_success_rate_pct}%`} icon={CheckCircle2} deltaTone="good" />
        <KpiCard label="Avg submission latency" value={`${h.avg_submission_latency_ms} ms`} icon={Timer} />
        <KpiCard label="Queue lag" value={`${h.queue_lag_seconds}s`} icon={ListOrdered} />
        <KpiCard label="Dead-letter volume" value={String(h.dead_letter_volume)} icon={AlertOctagon} deltaTone="bad" hint="batches" />
        <KpiCard label="Retry rate" value={`${h.retry_rate_pct}%`} icon={RotateCcw} />
        <KpiCard label="Last successful sync" value={new Date(h.last_successful_sync).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })} icon={Clock} hint="UTC" />
      </div>

      <div className="card p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-4">Active & recent incidents</h3>
        {h.active_incidents.length === 0 ? (
          <p className="text-sm text-text-muted">No active incidents.</p>
        ) : (
          <div className="space-y-3">
            {h.active_incidents.map((inc) => (
              <div key={inc.id} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 rounded-lg border border-border bg-white/[0.02] p-3.5">
                <span
                  className={clsx(
                    'text-xs font-semibold rounded-full px-2 py-0.5 shrink-0 w-fit',
                    inc.severity === 'P1' && 'bg-red/10 text-red border border-red/30',
                    inc.severity === 'P2' && 'bg-amber/10 text-amber border border-amber/30',
                    inc.severity === 'P3' && 'bg-cyan/10 text-cyan border border-cyan/30',
                  )}
                >
                  {inc.severity}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-text">{inc.title}</div>
                  <div className="text-xs text-text-dim mt-0.5">Started {formatTs(inc.started_at)}</div>
                </div>
                <div className="text-xs text-text-muted md:max-w-xs md:text-right">{inc.status}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
