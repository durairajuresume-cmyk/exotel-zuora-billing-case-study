import type { AuditEvent } from '../types';

function formatTimestamp(ts: string) {
  const d = new Date(ts);
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' }) + ' UTC';
}

export function Timeline({ events }: { events: AuditEvent[] }) {
  return (
    <ol className="relative border-l border-border pl-5 space-y-5">
      {events.map((e, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[25px] top-1 h-3 w-3 rounded-full border-2 border-accent bg-bg" />
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="mono text-xs text-text-dim">{formatTimestamp(e.timestamp)}</span>
            <span className="text-xs font-semibold text-accent">{e.action}</span>
            <span className="text-xs text-text-muted">· {e.actor}</span>
          </div>
          <p className="text-sm text-text mt-1 leading-relaxed">{e.detail}</p>
        </li>
      ))}
    </ol>
  );
}
