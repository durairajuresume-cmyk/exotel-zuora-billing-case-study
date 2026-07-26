import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronRight } from 'lucide-react';
import { findException } from '../../data/exceptions';
import { findBatch } from '../../data/usageBatches';
import { StatusBadge } from '../../components/StatusBadge';
import { ComponentLabel } from '../../components/ComponentLabel';
import { Timeline } from '../../components/Timeline';
import { ReconciliationBars } from '../../components/ReconciliationBars';

function RelatedLink({ label, to, value }: { label: string; to?: string; value?: string | null }) {
  if (!to || !value) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-border bg-white/[0.02] px-3 py-2.5">
        <span className="text-xs text-text-dim">{label}</span>
        <span className="text-xs text-text-dim">— not applicable</span>
      </div>
    );
  }
  return (
    <Link to={to} className="flex items-center justify-between rounded-lg border border-border bg-white/[0.02] px-3 py-2.5 hover:border-accent/50 hover:bg-accent-soft group transition-colors">
      <span className="text-xs text-text-dim">{label}</span>
      <span className="mono text-xs text-accent flex items-center gap-1">
        {value}
        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </span>
    </Link>
  );
}

export function ExceptionDetail() {
  const { exceptionId } = useParams<{ exceptionId: string }>();
  const exception = exceptionId ? findException(exceptionId) : undefined;

  if (!exception) {
    return (
      <div className="card p-8 text-center">
        <p className="text-text-muted mb-4">Exception not found.</p>
        <Link to="/prototype/exceptions" className="text-accent text-sm hover:underline">
          Back to Reconciliation Exceptions
        </Link>
      </div>
    );
  }

  const batch = exception.batch_id ? findBatch(exception.batch_id) : undefined;

  return (
    <div>
      <Link to="/prototype/exceptions" className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-accent mb-4">
        <ArrowLeft size={13} /> Back to Reconciliation Exceptions
      </Link>

      <div className="mb-4">
        <ComponentLabel>Reconciliation Service — a component within the Billing Integration Platform</ComponentLabel>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="mono text-lg md:text-xl font-semibold text-text">{exception.exception_id}</h1>
          <p className="text-sm text-text-muted mt-1">
            {exception.customer} · {exception.product} · {exception.billing_period} · {exception.exception_type.replaceAll('_', ' ')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {exception.duplicate_billing_occurred === false && (
            <span className="text-[10px] font-semibold uppercase tracking-wide text-cyan bg-cyan/10 border border-cyan/30 rounded-full px-2.5 py-1">
              Idempotency audit signal — not an open mismatch
            </span>
          )}
          <StatusBadge status={exception.status} />
        </div>
      </div>

      {exception.duplicate_callbacks_observed !== undefined && (
        <div className="card p-4 mb-4 flex flex-wrap items-center gap-4">
          <div className="text-xs">
            <span className="text-text-dim">Duplicate callbacks observed: </span>
            <span className="mono text-text">{exception.duplicate_callbacks_observed}</span>
          </div>
          <div className="text-xs">
            <span className="text-text-dim">Duplicate billing occurred: </span>
            <span className={exception.duplicate_billing_occurred ? 'mono text-red' : 'mono text-green'}>{exception.duplicate_billing_occurred ? 'Yes' : 'No'}</span>
          </div>
          <p className="text-xs text-text-dim ml-auto">A suppressed duplicate is an idempotency success, not a billing discrepancy.</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <div className="card p-4 lg:col-span-1">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-3">Summary</h3>
          <dl className="space-y-2 text-xs">
            {[
              ['Customer', exception.customer],
              ['Billing period', exception.billing_period],
              ['Owner', exception.owner],
              ['Age', `${exception.age_days}d`],
              ['Quantity difference', exception.quantity_difference.toLocaleString('en-IN')],
              ['Revenue impact', `₹${exception.revenue_impact.toLocaleString('en-IN')}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-border pb-2 last:border-0">
                <dt className="text-text-dim">{k}</dt>
                <dd className="mono text-text text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="card p-4 lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-3">Related objects — jump straight to the source</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            <RelatedLink label="Usage Batch" to={exception.batch_id ? `/prototype/batches/${exception.batch_id}` : undefined} value={exception.batch_id} />
            <RelatedLink label="Retry Batch" to={exception.retry_batch_id ? `/prototype/batches/${exception.retry_batch_id}` : undefined} value={exception.retry_batch_id} />
            <RelatedLink label="Invoice" to={exception.invoice_id ? `/prototype/traceability?invoice=${exception.invoice_id}` : undefined} value={exception.invoice_id} />
            <RelatedLink
              label="Customer & Subscription"
              to={batch ? `/prototype/customers?customer=${batch.tenant_id}` : undefined}
              value={batch ? `${batch.tenant_id} · ${batch.contract_version}` : undefined}
            />
          </div>
        </div>
      </div>

      <div className="card p-4 mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-3">Root cause</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-semibold text-accent mb-1">What happened</div>
            <p className="text-sm text-text leading-relaxed">{exception.root_cause.what_happened}</p>
          </div>
          <div>
            <div className="text-xs font-semibold text-accent mb-1">Why it happened</div>
            <p className="text-sm text-text leading-relaxed">{exception.root_cause.why_it_happened}</p>
          </div>
          <div>
            <div className="text-xs font-semibold text-amber mb-1">Business impact</div>
            <p className="text-sm text-text-muted leading-relaxed">{exception.root_cause.business_impact}</p>
          </div>
          <div>
            <div className="text-xs font-semibold text-green mb-1">Current resolution</div>
            <p className="text-sm text-text-muted leading-relaxed">{exception.root_cause.current_resolution}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <div className="card p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-3">Affected usage</h3>
          {batch ? (
            <>
              <ReconciliationBars exotel={batch.exotel_metered_quantity} zuora={batch.zuora_accepted_quantity} invoice={batch.invoice_rated_quantity} unit={batch.unit} />
              {exception.affected_usage_record_ids.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-xs text-text-dim mb-2">Sample of affected usage IDs (drill-down)</div>
                  <div className="flex flex-wrap gap-1.5">
                    {exception.affected_usage_record_ids.map((u) => (
                      <span key={u} className="mono text-xs bg-white/[0.04] border border-border rounded-md px-2 py-1 text-text-muted">
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-text-muted">No usage batch is linked to this exception — see the root cause above for context.</p>
          )}
        </div>

        <div className="card p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-3">Recommended action</h3>
          <ul className="space-y-2 mb-3">
            {exception.recommended_action.steps.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text">
                <ChevronRight size={14} className="text-accent shrink-0 mt-0.5" />
                {s}
              </li>
            ))}
          </ul>
          <div className="rounded-lg border border-accent/30 bg-accent-soft px-3 py-2.5">
            <div className="text-xs font-semibold text-accent mb-1">Expected impact</div>
            <p className="text-xs text-text leading-relaxed">{exception.recommended_action.expected_impact}</p>
          </div>
        </div>
      </div>

      <div className="card p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-3">Investigation timeline</h3>
        <Timeline events={exception.investigation_timeline} />
      </div>
    </div>
  );
}
