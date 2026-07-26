import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { FilterBar } from '../../components/FilterBar';
import { StatusBadge } from '../../components/StatusBadge';
import { ComponentLabel } from '../../components/ComponentLabel';
import { exceptions as initialExceptions } from '../../data/exceptions';
import { customers } from '../../data/customers';
import type { ExceptionStatus, ReconciliationException } from '../../types';
import { UserPlus, CheckCircle, SearchCheck } from 'lucide-react';

const products = ['SMS', 'VOICE', 'WHATSAPP', 'CONVERSATIONAL_AI', 'CONTACT_CENTER'];
const statuses: ExceptionStatus[] = ['Detected', 'Assigned', 'Investigated', 'Corrected', 'Reconciled', 'Closed'];

export function Exceptions() {
  const [rows, setRows] = useState<ReconciliationException[]>(initialExceptions);
  const [customer, setCustomer] = useState('All');
  const [product, setProduct] = useState('All');
  const [status, setStatus] = useState('All');

  const filtered = useMemo(
    () => rows.filter((e) => (customer === 'All' || e.customer === customer) && (product === 'All' || e.product === product) && (status === 'All' || e.status === status)),
    [rows, customer, product, status],
  );

  function resolve(id: string) {
    setRows((prev) => prev.map((e) => (e.exception_id === id ? { ...e, status: 'Closed' } : e)));
  }
  function assignToMe(id: string) {
    setRows((prev) => prev.map((e) => (e.exception_id === id ? { ...e, owner: 'You', status: e.status === 'Detected' ? 'Assigned' : e.status } : e)));
  }

  return (
    <div>
      <PageHeader
        title="Reconciliation Exceptions"
        subtitle="The Billing Ops work queue. Click Investigate to open the full lineage — batch, retry batch, invoice, and root cause — without searching anywhere else."
      />
      <div className="mb-4">
        <ComponentLabel>Reconciliation Service — a component within the Billing Integration Platform</ComponentLabel>
      </div>

      <FilterBar
        resultCount={filtered.length}
        filters={[
          { label: 'Customer', value: customer, onChange: setCustomer, options: customers.map((c) => c.name) },
          { label: 'Product', value: product, onChange: setProduct, options: products },
          { label: 'Status', value: status, onChange: setStatus, options: statuses },
        ]}
      />

      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[1300px]">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-dim">
              <th className="px-4 py-3 font-medium">Exception ID</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Batch ID</th>
              <th className="px-4 py-3 font-medium">Invoice ID</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Root Cause</th>
              <th className="px-4 py-3 font-medium text-right">Qty diff</th>
              <th className="px-4 py-3 font-medium text-right">Revenue impact</th>
              <th className="px-4 py-3 font-medium">Owner</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.exception_id} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link to={`/prototype/exceptions/${e.exception_id}`} className="mono text-xs text-accent hover:underline">
                    {e.exception_id}
                  </Link>
                </td>
                <td className="px-4 py-3 text-text whitespace-nowrap">{e.customer}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {e.batch_id ? (
                    <Link to={`/prototype/batches/${e.batch_id}`} className="mono text-xs text-accent hover:underline" title={e.batch_id}>
                      {e.batch_id}
                    </Link>
                  ) : (
                    <span className="text-xs text-text-dim">—</span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {e.invoice_id ? (
                    <Link to={`/prototype/traceability?invoice=${e.invoice_id}`} className="mono text-xs text-accent hover:underline" title={e.invoice_id}>
                      {e.invoice_id}
                    </Link>
                  ) : (
                    <span className="text-xs text-text-dim">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-text-muted text-xs whitespace-nowrap">{e.product}</td>
                <td className="px-4 py-3 text-text-muted text-xs">{e.exception_type.replaceAll('_', ' ')}</td>
                <td className="px-4 py-3 text-right mono text-xs text-text">{e.quantity_difference.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-right mono text-xs text-text">₹{e.revenue_impact.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-text-muted text-xs whitespace-nowrap">{e.owner}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={e.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/prototype/exceptions/${e.exception_id}`}
                      title="Investigate"
                      className="flex items-center gap-1 px-2 py-1 rounded-md border border-accent/30 bg-accent-soft text-accent text-xs font-medium hover:bg-accent hover:text-bg transition-colors"
                    >
                      <SearchCheck size={12} /> Investigate
                    </Link>
                    <button title="Assign to me" onClick={() => assignToMe(e.exception_id)} className="p-1.5 rounded-md hover:bg-white/10 text-text-muted hover:text-accent">
                      <UserPlus size={14} />
                    </button>
                    <button title="Mark resolved" onClick={() => resolve(e.exception_id)} disabled={e.status === 'Closed'} className="p-1.5 rounded-md hover:bg-white/10 text-text-muted hover:text-green disabled:opacity-30">
                      <CheckCircle size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
