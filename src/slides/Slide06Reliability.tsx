import { SlideShell } from './SlideShell';
import { ReconciliationBars } from '../components/ReconciliationBars';

export function Slide06Reliability() {
  return (
    <SlideShell index={7} total={19} kicker="Slide 7 · Reliability" title="Three idempotency keys, three layers, one reconciliation" dense>
      <div className="grid md:grid-cols-2 gap-6 h-full items-center">
        <div className="space-y-3">
          <div className="card p-3">
            <div className="text-xs font-semibold text-accent mb-1">event_dedupe_key · Metering Layer</div>
            <p className="text-[11px] text-text-muted leading-relaxed">Stops the same raw callback from being processed twice.</p>
          </div>
          <div className="card p-3">
            <div className="text-xs font-semibold text-accent mb-1">billing_usage_key · Canonical Usage Store</div>
            <div className="mono text-[11px] text-text-dim">tenant_id + source_object_id + billing_rule</div>
            <p className="text-[11px] text-text-muted mt-1">Deliberately excludes contract_version — a rating attribute, not part of identity.</p>
          </div>
          <div className="card p-3">
            <div className="text-xs font-semibold text-accent mb-1">submission_idempotency_key · Billing Integration Layer</div>
            <div className="mono text-[11px] text-text-dim">batch_id + payload_version</div>
          </div>
          <div className="card p-3">
            <div className="text-xs font-semibold text-text mb-1">Reliability posture</div>
            <p className="text-[11px] text-text-muted leading-relaxed">Retry with backoff → dead-letter queue → manual or automated replay, without ever duplicating a charge.</p>
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs font-semibold text-amber mb-3">Three-way reconciliation — mismatch example</div>
          <ReconciliationBars exotel={980000} zuora={979500} invoice={979500} unit="SMS" />
        </div>
      </div>
    </SlideShell>
  );
}
