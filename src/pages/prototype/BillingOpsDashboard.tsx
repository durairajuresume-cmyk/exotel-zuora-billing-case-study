import { useMemo, useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { FilterBar } from '../../components/FilterBar';
import { KpiCard } from '../../components/KpiCard';
import { TrendChart } from '../../components/TrendChart';
import { ComponentLabel } from '../../components/ComponentLabel';
import { trendData } from '../../data/health';
import { customers } from '../../data/customers';
import { usageBatches } from '../../data/usageBatches';
import { exceptions } from '../../data/exceptions';
import { invoices } from '../../data/invoices';
import type { Product } from '../../types';
import { Layers, CheckCircle2, GitCompareArrows, FileText, AlertOctagon, ShieldCheck, UserCog, TrendingDown } from 'lucide-react';

const periods = ['2026-07', '2026-06', '2026-05'];
const products = ['SMS', 'VOICE', 'WHATSAPP', 'CONVERSATIONAL_AI', 'CONTACT_CENTER'];
const statuses = ['Matched', 'Mismatch', 'Failed'];

const DEFINITIVE_STATUSES = new Set(['ACCEPTED', 'PARTIALLY_ACCEPTED', 'REJECTED', 'FAILED', 'DEAD_LETTER']);

export function BillingOpsDashboard() {
  const [period, setPeriod] = useState('All');
  const [customer, setCustomer] = useState('All');
  const [product, setProduct] = useState('All');
  const [status, setStatus] = useState('All');

  // All KPIs below are derived live from the same batch/exception/invoice records the other
  // screens use — filtering here changes real numbers, not a cosmetic result count.
  const filteredBatches = useMemo(
    () =>
      usageBatches.filter((b) => {
        if (period !== 'All' && !b.billing_window.startsWith(period)) return false;
        if (customer !== 'All' && b.customer !== customer) return false;
        if (product !== 'All' && b.product !== product) return false;
        if (status === 'Matched' && b.reconciliation_status !== 'MATCHED') return false;
        if (status === 'Mismatch' && b.reconciliation_status !== 'MISMATCH') return false;
        if (status === 'Failed' && b.zuora_submission_status !== 'FAILED' && b.zuora_submission_status !== 'DEAD_LETTER') return false;
        return true;
      }),
    [period, customer, product, status],
  );

  const filteredExceptions = useMemo(
    () =>
      exceptions.filter((e) => {
        if (period !== 'All' && e.billing_period !== period) return false;
        if (customer !== 'All' && e.customer !== customer) return false;
        if (product !== 'All' && e.product !== product) return false;
        return true;
      }),
    [period, customer, product],
  );

  const filteredInvoices = useMemo(
    () =>
      invoices.filter((i) => {
        if (period !== 'All' && i.billing_period !== period) return false;
        if (customer !== 'All' && i.customer !== customer) return false;
        return true;
      }),
    [period, customer],
  );

  const k = useMemo(() => {
    const definitive = filteredBatches.filter((b) => DEFINITIVE_STATUSES.has(b.zuora_submission_status));
    const acceptedCount = filteredBatches.filter((b) => b.zuora_submission_status === 'ACCEPTED').length;
    const matchedCount = filteredBatches.filter((b) => b.reconciliation_status === 'MATCHED').length;
    const openExceptions = filteredExceptions.filter((e) => e.status !== 'Closed' && e.status !== 'Reconciled');
    const failedBatches = filteredBatches.filter((b) => b.zuora_submission_status === 'FAILED' || b.zuora_submission_status === 'DEAD_LETTER').length;
    const batchesWithRetry = filteredBatches.filter((b) => b.retry_count > 0).length;
    const postedInvoices = filteredInvoices.filter((i) => i.status === 'Posted' || i.status === 'Paid').length;
    const revenueAtRisk = openExceptions.reduce((sum, e) => sum + e.revenue_impact, 0);

    // Usage segmented BY PRODUCT — never summed across products, since SMS (count), minutes,
    // and conversations are different units and adding them together is meaningless.
    const byProduct = new Map<Product, { quantity: number; unit: string }>();
    filteredBatches.forEach((b) => {
      const existing = byProduct.get(b.product);
      byProduct.set(b.product, { quantity: (existing?.quantity ?? 0) + b.exotel_metered_quantity, unit: b.unit });
    });

    return {
      batchesProcessed: filteredBatches.length,
      acceptanceRatePct: definitive.length > 0 ? Math.round((acceptedCount / definitive.length) * 100) : null,
      reconciledRatePct: filteredBatches.length > 0 ? Math.round((matchedCount / filteredBatches.length) * 100) : null,
      openExceptions: openExceptions.length,
      invoicesGenerated: filteredInvoices.length,
      slaAttainmentPct: filteredInvoices.length > 0 ? Math.round((postedInvoices / filteredInvoices.length) * 100) : null,
      failedBatches,
      manualInterventionRatePct: filteredBatches.length > 0 ? Math.round((batchesWithRetry / filteredBatches.length) * 100) : 0,
      revenueAtRisk,
      byProduct,
    };
  }, [filteredBatches, filteredExceptions, filteredInvoices]);

  return (
    <div>
      <PageHeader
        title="Billing Operations Dashboard"
        subtitle="Near-real-time operational view of usage processing, Zuora submission health, and reconciliation status across all enterprise customers."
      />
      <div className="mb-4">
        <ComponentLabel>Billing Operations Monitoring</ComponentLabel>
      </div>

      <FilterBar
        resultCount={k.batchesProcessed}
        filters={[
          { label: 'Billing period', value: period, onChange: setPeriod, options: periods },
          { label: 'Customer', value: customer, onChange: setCustomer, options: customers.map((c) => c.name) },
          { label: 'Product', value: product, onChange: setProduct, options: products },
          { label: 'Status', value: status, onChange: setStatus, options: statuses },
        ]}
      />

      {k.batchesProcessed === 0 && filteredExceptions.length === 0 ? (
        <div className="card p-8 text-center text-sm text-text-muted mb-6">
          No batches or exceptions match these filters. Try clearing the billing period or product filter.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
            <KpiCard label="Batches processed" value={String(k.batchesProcessed)} icon={Layers} hint="filtered" />
            <KpiCard label="Batch acceptance rate" value={k.acceptanceRatePct !== null ? `${k.acceptanceRatePct}%` : '—'} deltaTone="good" icon={CheckCircle2} hint="of definitive responses" />
            <KpiCard label="Reconciled batch rate" value={k.reconciledRatePct !== null ? `${k.reconciledRatePct}%` : '—'} deltaTone="good" icon={GitCompareArrows} hint="matched" />
            <KpiCard label="Reconciliation exceptions" value={String(k.openExceptions)} deltaTone={k.openExceptions > 0 ? 'bad' : 'good'} icon={AlertOctagon} hint="open" />
            <KpiCard label="Invoices generated" value={String(k.invoicesGenerated)} icon={FileText} hint="matching filter" />
            <KpiCard label="Invoice SLA attainment" value={k.slaAttainmentPct !== null ? `${k.slaAttainmentPct}%` : '—'} deltaTone="good" icon={ShieldCheck} hint="posted on cycle" />
            <KpiCard label="Manual intervention rate" value={`${k.manualInterventionRatePct}%`} deltaTone={k.manualInterventionRatePct > 0 ? 'bad' : 'good'} icon={UserCog} hint="batches needing retry" />
            <KpiCard label="Revenue at risk" value={`₹${(k.revenueAtRisk / 1000).toFixed(1)}K`} deltaTone={k.revenueAtRisk > 0 ? 'bad' : 'good'} icon={TrendingDown} hint="open exceptions" />
          </div>

          <div className="card p-4 mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-3">Usage by product (segmented — never summed across units)</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Array.from(k.byProduct.entries()).map(([p, v]) => (
                <div key={p} className="flex items-center justify-between bg-white/[0.03] border border-border rounded-lg px-3 py-2.5">
                  <span className="text-xs text-text-muted">{p}</span>
                  <span className="mono text-sm text-text">
                    {v.quantity.toLocaleString('en-IN')} {v.unit}
                  </span>
                </div>
              ))}
              {k.byProduct.size === 0 && <p className="text-xs text-text-dim">No usage in scope for the current filters.</p>}
            </div>
          </div>
        </>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <TrendChart data={trendData} dataKey="invoice_accuracy_pct" color="#2dd4bf" label="Invoice accuracy (%)" suffix="%" />
        </div>
        <div className="card p-4">
          <TrendChart data={trendData} dataKey="failed_batches" color="#f87171" label="Failed batches (count)" />
        </div>
        <div className="card p-4">
          <TrendChart data={trendData} dataKey="reconciliation_mismatch_pct" color="#f59e0b" label="Reconciliation mismatch (%)" suffix="%" />
        </div>
        <div className="card p-4">
          <TrendChart data={trendData} dataKey="invoice_generation_hours" color="#22d3ee" label="Invoice generation time (hours)" suffix="h" />
        </div>
      </div>
    </div>
  );
}
