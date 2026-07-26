import { SlideShell } from './SlideShell';

const fields = ['usage_id', 'tenant_id', 'billing_account_id', 'subscription_id', 'product', 'usage_metric', 'quantity', 'unit', 'usage_timestamp', 'source_object_id', 'correlation_id', 'contract_version', 'billing_usage_key', 'batch_id', 'status'];

export function Slide04UsageModel() {
  return (
    <SlideShell index={5} total={19} kicker="Slide 5 · Data model" title="One canonical usage model across every product" dense>
      <div className="grid md:grid-cols-2 gap-6 h-full items-center">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-2">Canonical fields</div>
          <div className="flex flex-wrap gap-1.5">
            {fields.map((f) => (
              <span key={f} className="mono text-xs bg-accent-soft border border-accent/30 text-accent rounded-md px-2 py-1">
                {f}
              </span>
            ))}
          </div>
          <p className="text-sm text-text-muted leading-relaxed mt-4">
            Every product maps into the same envelope, so adding a sixth product is a metering-layer exercise — not a billing re-architecture.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[
            { p: 'SMS', metric: 'DELIVERED_SMS', qty: '1', unit: 'SMS', src: 'MSG-12345' },
            { p: 'VOICE', metric: 'CONNECTED_MINUTES', qty: '3.5', unit: 'MINUTES', src: 'CALL-456' },
            { p: 'CONVERSATIONAL_AI', metric: 'AI_SESSION_MINUTES', qty: '6', unit: 'MINUTES', src: '—' },
          ].map((r) => (
            <div key={r.p} className="card p-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-text">{r.p}</span>
              <span className="mono text-text-muted">{r.metric}</span>
              <span className="mono text-accent">
                {r.qty} {r.unit}
              </span>
              <span className="mono text-text-dim">{r.src}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
