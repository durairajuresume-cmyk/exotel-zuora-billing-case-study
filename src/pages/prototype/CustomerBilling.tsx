import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { customers } from '../../data/customers';
import { invoices } from '../../data/invoices';
import { TrendingUp, TrendingDown, Building2, Info } from 'lucide-react';
import clsx from 'clsx';

export function CustomerBilling() {
  const [searchParams] = useSearchParams();
  const deepLinkedTenantId = searchParams.get('customer');
  const initialTenantId = customers.some((c) => c.tenant_id === deepLinkedTenantId) ? deepLinkedTenantId! : customers[0].tenant_id;
  const [tenantId, setTenantId] = useState(initialTenantId);
  const c = customers.find((x) => x.tenant_id === tenantId)!;
  const changeGood = c.usage_change_pct >= 0;
  // Sourced live from the actual Invoice record — Exotel does not independently compute a
  // financial total. Zuora rates and totals the invoice; this is a preview/read of that output.
  const currentInvoice = invoices.find((i) => i.customer === c.name);

  return (
    <div>
      <PageHeader title="Customer Billing Summary" subtitle="A per-customer view combining subscription state, current-period usage, and invoice status." />

      <div className="flex flex-wrap gap-2 mb-6">
        {customers.map((cust) => (
          <button
            key={cust.tenant_id}
            onClick={() => setTenantId(cust.tenant_id)}
            className={clsx(
              'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors',
              tenantId === cust.tenant_id ? 'border-accent/50 bg-accent-soft text-accent' : 'border-border text-text-muted hover:text-text hover:bg-white/5',
            )}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-[10px] font-semibold">{cust.logo_initial}</span>
            {cust.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card p-5 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={18} className="text-accent" />
            <div>
              <h3 className="font-semibold text-text text-sm">{c.name}</h3>
              <p className="text-xs text-text-dim">{c.industry}</p>
            </div>
          </div>
          <dl className="space-y-2 text-xs">
            {[
              ['Tenant ID', c.tenant_id],
              ['Billing account', c.billing_account_id],
              ['Subscription', c.subscription_id],
              ['Contract version', c.contract_version],
              ['Billing cycle', c.billing_cycle],
              ['Currency', c.currency],
              ['Region', c.region],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-border pb-2 last:border-0">
                <dt className="text-text-dim">{k}</dt>
                <dd className="mono text-text text-right">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {c.products.map((p) => (
              <span key={p} className="text-[10px] uppercase tracking-wide bg-white/[0.04] border border-border rounded-md px-2 py-1 text-text-muted">
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="card p-5 lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-4">Usage this period</h3>
          <div className="space-y-3 mb-6">
            {c.usage_this_period.map((u) => (
              <div key={u.metric} className="flex items-center justify-between text-sm">
                <span className="text-text-muted">
                  {u.product} · {u.metric.replaceAll('_', ' ')}
                </span>
                <span className="mono text-text">
                  {u.quantity.toLocaleString('en-IN')} {u.unit}
                </span>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-white/[0.02] p-3">
              <div className="text-xs text-text-dim mb-1 flex items-center gap-1.5">
                {currentInvoice?.status === 'Draft' ? 'Zuora invoice preview (Draft)' : 'Current invoice total'}
                <Info size={11} className="text-text-dim" />
              </div>
              {currentInvoice ? (
                <div className="text-lg font-semibold text-text mono">
                  {currentInvoice.currency} {currentInvoice.total_amount.toLocaleString('en-IN')}
                </div>
              ) : (
                <div className="text-sm text-text-dim">No invoice for this cycle yet</div>
              )}
            </div>
            <div className="rounded-lg border border-border bg-white/[0.02] p-3">
              <div className="text-xs text-text-dim mb-1">Previous invoice (posted)</div>
              <div className="text-lg font-semibold text-text mono">
                {c.currency} {c.previous_invoice.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
          <p className="text-[11px] text-text-dim mt-2">
            Sourced live from Zuora's rating output on {currentInvoice?.invoice_id ?? 'the current cycle'} — Exotel does not independently
            compute a financial total.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border">
            <div className={clsx('flex items-center gap-1.5 text-sm font-medium', changeGood ? 'text-green' : 'text-red')}>
              {changeGood ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
              {Math.abs(c.usage_change_pct)}% vs previous period
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-text-dim">Open disputes:</span>
              <span className={clsx('font-medium', c.open_disputes > 0 ? 'text-amber' : 'text-text')}>{c.open_disputes}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-text-dim">Credits outstanding:</span>
              <span className="mono text-text">
                {c.currency} {c.credits_outstanding.toLocaleString('en-IN')}
              </span>
            </div>
            <StatusBadge status={c.payment_status} />
          </div>
        </div>
      </div>
    </div>
  );
}
