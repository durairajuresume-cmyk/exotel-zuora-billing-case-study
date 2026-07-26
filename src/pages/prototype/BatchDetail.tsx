import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { findBatch } from '../../data/usageBatches';
import { exceptions } from '../../data/exceptions';
import { StatusBadge } from '../../components/StatusBadge';
import { ScopeBadge } from '../../components/ScopeBadge';
import { ComponentLabel } from '../../components/ComponentLabel';
import { ReconciliationBars } from '../../components/ReconciliationBars';
import { Timeline } from '../../components/Timeline';

function formatDate(ts: string) {
  return new Date(ts).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' }) + ' UTC';
}

export function BatchDetail() {
  const { id } = useParams<{ id: string }>();
  const batch = id ? findBatch(id) : undefined;

  if (!batch) {
    return (
      <div className="card p-8 text-center">
        <p className="text-text-muted mb-4">Batch not found.</p>
        <Link to="/prototype/batches" className="text-accent text-sm hover:underline">
          Back to batch list
        </Link>
      </div>
    );
  }

  const linkedException = exceptions.find((e) => e.batch_id === batch.batch_id);

  return (
    <div>
      <Link to="/prototype/batches" className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-accent mb-4">
        <ArrowLeft size={13} /> Back to batch list
      </Link>

      <div className="mb-4">
        <ComponentLabel>Billing Integration Platform</ComponentLabel>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="mono text-lg md:text-xl font-semibold text-text">{batch.batch_id}</h1>
            <ScopeBadge level="V1 — Core" />
          </div>
          <p className="text-sm text-text-muted mt-1">
            {batch.customer} · {batch.product} · {batch.usage_metric} — this screen is both the Usage Batch and Reconciliation detail view.
          </p>
          {batch.parent_batch_id && (
            <p className="text-xs text-text-dim mt-1">
              Corrected resubmission of{' '}
              <Link to={`/prototype/batches/${batch.parent_batch_id}`} className="text-accent hover:underline">
                {batch.parent_batch_id}
              </Link>{' '}
              — same canonical usage IDs, new submission.
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <StatusBadge status={batch.zuora_submission_status} />
          <StatusBadge status={batch.reconciliation_status} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="card p-4 lg:col-span-1">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-3">Batch metadata</h3>
          <dl className="space-y-2 text-xs">
            {[
              ['Billing window', batch.billing_window],
              ['Contract version', batch.contract_version],
              ['Pricing plan', batch.pricing_plan],
              ['Tenant ID', batch.tenant_id],
              ['Invoice ID', batch.invoice_id ?? '— not yet invoiced'],
              ['Submission idempotency key', batch.submission_idempotency_key],
              ['Payload version', String(batch.payload_version)],
              ['Submission attempts', String(batch.submission_attempts.length)],
              ['Retry count', String(batch.retry_count)],
              ['Last updated', formatDate(batch.last_updated)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-border pb-2 last:border-0">
                <dt className="text-text-dim">{k}</dt>
                <dd className="mono text-text text-right break-all">{v}</dd>
              </div>
            ))}
            {linkedException && (
              <div className="flex justify-between gap-3 pt-1">
                <dt className="text-text-dim">Open exception</dt>
                <dd className="text-right">
                  <Link to={`/prototype/exceptions/${linkedException.exception_id}`} className="mono text-accent hover:underline">
                    {linkedException.exception_id}
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="card p-4 lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-3">Reconciliation</h3>
          <ReconciliationBars exotel={batch.exotel_metered_quantity} zuora={batch.zuora_accepted_quantity} invoice={batch.invoice_rated_quantity} unit={batch.unit} />
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-2">Sample usage IDs (drill-down)</h4>
            <div className="flex flex-wrap gap-1.5">
              {batch.usage_record_ids.map((u) => (
                <span key={u} className="mono text-xs bg-white/[0.04] border border-border rounded-md px-2 py-1 text-text-muted">
                  {u}
                </span>
              ))}
            </div>
            {batch.quantity > batch.usage_record_ids.length && (
              <p className="text-[11px] text-text-dim mt-2">
                Sample of {batch.usage_record_ids.length} shown — this batch aggregates {batch.quantity.toLocaleString('en-IN')} {batch.unit} in total.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-3">Submission attempts & API response</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-text-dim border-b border-border">
                  <th className="py-2 pr-3 font-medium">#</th>
                  <th className="py-2 pr-3 font-medium">Timestamp</th>
                  <th className="py-2 pr-3 font-medium">Result</th>
                  <th className="py-2 font-medium">Code</th>
                </tr>
              </thead>
              <tbody>
                {batch.submission_attempts.map((a) => (
                  <tr key={a.attempt} className="border-b border-border last:border-0">
                    <td className="py-2 pr-3 mono text-text">{a.attempt}</td>
                    <td className="py-2 pr-3 mono text-text-dim whitespace-nowrap">{formatDate(a.timestamp)}</td>
                    <td className="py-2 pr-3 text-text-muted">{a.result}</td>
                    <td className="py-2 mono text-accent">{a.response_code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-3">Audit timeline</h3>
          <Timeline events={batch.audit_timeline} />
        </div>
      </div>
    </div>
  );
}
