import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { FilterBar } from '../../components/FilterBar';
import { StatusBadge } from '../../components/StatusBadge';
import { ComponentLabel } from '../../components/ComponentLabel';
import { usageBatches } from '../../data/usageBatches';
import { customers } from '../../data/customers';
import { exceptions } from '../../data/exceptions';
import { Eye, RotateCcw, Download, GitCompareArrows, CheckCircle } from 'lucide-react';

const products = ['SMS', 'VOICE', 'WHATSAPP', 'CONVERSATIONAL_AI', 'CONTACT_CENTER'];
const submissionStatuses = ['PENDING', 'SUBMITTED', 'ACCEPTED', 'PARTIALLY_ACCEPTED', 'REJECTED', 'FAILED', 'DEAD_LETTER'];

function formatDate(ts: string) {
  return new Date(ts).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' });
}

export function BatchList() {
  const [customer, setCustomer] = useState('All');
  const [product, setProduct] = useState('All');
  const [status, setStatus] = useState('All');
  const [toast, setToast] = useState<string | null>(null);
  const [retried, setRetried] = useState<Record<string, boolean>>({});

  const exceptionByBatch = useMemo(() => {
    const map = new Map<string, string>();
    exceptions.forEach((e) => {
      if (e.batch_id) map.set(e.batch_id, e.exception_id);
    });
    return map;
  }, []);

  const filtered = useMemo(
    () =>
      usageBatches.filter(
        (b) => (customer === 'All' || b.customer === customer) && (product === 'All' || b.product === product) && (status === 'All' || b.zuora_submission_status === status),
      ),
    [customer, product, status],
  );

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div>
      <PageHeader
        title="Usage Batch List"
        scope="V1 — Simplified"
        subtitle="Every usage batch submitted from the Billing Integration Layer to Zuora, with submission and reconciliation status. V1 ships this view for a single tenant with basic status — multi-customer support and the filter bar below are Post-V1 (see V1 Scope in the case study)."
      />

      <div className="mb-4">
        <ComponentLabel>Billing Integration Platform</ComponentLabel>
      </div>

      <FilterBar
        resultCount={filtered.length}
        filters={[
          { label: 'Customer', value: customer, onChange: setCustomer, options: customers.map((c) => c.name) },
          { label: 'Product', value: product, onChange: setProduct, options: products },
          { label: 'Zuora status', value: status, onChange: setStatus, options: submissionStatuses },
        ]}
      />

      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[1300px]">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-dim">
              <th className="px-4 py-3 font-medium">Batch ID</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Metric</th>
              <th className="px-4 py-3 font-medium text-right">Quantity</th>
              <th className="px-4 py-3 font-medium">Window</th>
              <th className="px-4 py-3 font-medium">Zuora status</th>
              <th className="px-4 py-3 font-medium text-right">Retries</th>
              <th className="px-4 py-3 font-medium">Reconciliation</th>
              <th className="px-4 py-3 font-medium">Invoice</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => {
              const isRetried = retried[b.batch_id];
              const displayStatus = isRetried ? 'SUBMITTED' : b.zuora_submission_status;
              const rejectedQty = b.zuora_accepted_quantity !== null ? Math.max(0, b.exotel_metered_quantity - b.zuora_accepted_quantity) : null;
              const isPartial = b.zuora_submission_status === 'PARTIALLY_ACCEPTED';
              const isFullyFailed = b.zuora_submission_status === 'FAILED' || b.zuora_submission_status === 'DEAD_LETTER';
              const canAct = (isPartial || isFullyFailed) && !isRetried;
              const linkedException = exceptionByBatch.get(b.batch_id);

              return (
                <tr key={b.batch_id} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Link to={`/prototype/batches/${b.batch_id}`} className="mono text-xs text-accent hover:underline" title={b.batch_id}>
                      {b.batch_id}
                    </Link>
                    {b.parent_batch_id && (
                      <div className="text-[10px] text-text-dim mt-0.5">
                        Retry of{' '}
                        <Link to={`/prototype/batches/${b.parent_batch_id}`} className="text-accent hover:underline">
                          {b.parent_batch_id}
                        </Link>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-text">{b.customer}</td>
                  <td className="px-4 py-3 text-text-muted text-xs">{b.product}</td>
                  <td className="px-4 py-3 text-text-muted text-xs">{b.usage_metric}</td>
                  <td className="px-4 py-3 text-right mono text-xs text-text">{b.quantity.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-text-muted text-xs whitespace-nowrap">{b.billing_window}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={displayStatus} />
                  </td>
                  <td className="px-4 py-3 text-right mono text-xs text-text">{b.retry_count + (isRetried ? 1 : 0)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={b.reconciliation_status} />
                  </td>
                  <td className="px-4 py-3">
                    {b.invoice_id ? (
                      <span className="mono text-xs text-text-muted">{b.invoice_id}</span>
                    ) : (
                      <span className="text-xs text-text-dim">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-text-dim text-xs whitespace-nowrap">{formatDate(b.last_updated)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link to={`/prototype/batches/${b.batch_id}`} title="View batch" className="p-1.5 rounded-md hover:bg-white/10 text-text-muted hover:text-accent">
                        <Eye size={14} />
                      </Link>
                      {(isPartial || isFullyFailed) && (
                        <button
                          disabled={!canAct}
                          onClick={() => {
                            setRetried((r) => ({ ...r, [b.batch_id]: true }));
                            showToast(
                              isPartial
                                ? `Retry rejected records submitted for ${b.batch_id} (${rejectedQty?.toLocaleString('en-IN')} ${b.unit} rejected)`
                                : `Replay submitted for ${b.batch_id}`,
                            );
                          }}
                          title={isPartial ? `Retry rejected records (${rejectedQty?.toLocaleString('en-IN')} ${b.unit})` : 'Replay failed batch'}
                          className="p-1.5 rounded-md hover:bg-white/10 text-text-muted hover:text-accent disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text-muted"
                        >
                          <RotateCcw size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => showToast(`Audit log for ${b.batch_id} downloaded`)}
                        title="Download audit log"
                        className="p-1.5 rounded-md hover:bg-white/10 text-text-muted hover:text-accent"
                      >
                        <Download size={14} />
                      </button>
                      {linkedException ? (
                        <Link
                          to={`/prototype/exceptions/${linkedException}`}
                          title={`Open exception ${linkedException}`}
                          className="p-1.5 rounded-md hover:bg-white/10 text-text-muted hover:text-accent"
                        >
                          <GitCompareArrows size={14} />
                        </Link>
                      ) : (
                        <span title="No open exception for this batch" className="p-1.5 rounded-md text-text-dim opacity-30 cursor-not-allowed">
                          <GitCompareArrows size={14} />
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 card px-4 py-3 flex items-center gap-2 border-accent/40 bg-surface-2 shadow-lg">
          <CheckCircle size={16} className="text-accent" />
          <span className="text-sm text-text">{toast}</span>
        </div>
      )}
    </div>
  );
}
