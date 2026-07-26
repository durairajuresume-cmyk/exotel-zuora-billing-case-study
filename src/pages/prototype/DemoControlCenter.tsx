import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { ComponentLabel } from '../../components/ComponentLabel';
import { findBatch } from '../../data/usageBatches';
import { findInvoice } from '../../data/invoices';
import { findCustomer } from '../../data/customers';
import { CheckCircle2, Layers, Database, GitMerge, UploadCloud, Receipt, FileText, ArrowRight, CheckCircle, Info, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const BILLING_INTEGRATION_STEPS: { label: string; tooltip?: string }[] = [
  { label: 'Validate batch' },
  { label: 'Resolve Billing Account & Subscription' },
  { label: 'Map usage metric to Zuora Rate Plan Charge' },
  { label: 'Check submission idempotency' },
  { label: 'Transform Canonical Usage into Zuora Usage API schema' },
  { label: 'Submit usage to Zuora' },
  { label: 'Persist Zuora response' },
  {
    label: 'Reconcile Canonical Usage submitted vs. Zuora accepted usage',
    tooltip:
      "Reconciliation compares Exotel's Canonical Usage Records against the usage accepted by Zuora. Differences usually occur because Zuora rejected some records due to invalid Billing Account, Subscription, Rate Plan Charge, Billing Window, or payload validation.",
  },
  { label: 'Update Batch Status (Accepted / Partially Accepted / Failed)' },
  { label: 'Raise Reconciliation Exception if a mismatch exists' },
];

function BillingIntegrationCard({ batchId }: { batchId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-accent/30 bg-accent-soft">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-left">
        <div className="flex items-center gap-1.5">
          <GitMerge size={13} className="text-accent" />
          <span className="text-xs font-semibold text-text">Billing Integration processing</span>
        </div>
        <ChevronDown size={13} className={clsx('text-accent transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="px-3 pb-3">
          <ol className="space-y-1">
            {BILLING_INTEGRATION_STEPS.map((step, i) => (
              <li key={step.label} className="flex items-center gap-2 text-[11px] text-text-muted" title={step.tooltip}>
                <CheckCircle2 size={11} className="text-green shrink-0" />
                <span className="mono text-text-dim">{i + 1}.</span>
                <span className={step.tooltip ? 'underline decoration-dotted decoration-text-dim underline-offset-2 cursor-help' : undefined}>{step.label}</span>
              </li>
            ))}
            <li className="text-[10px] text-text-dim pt-1 border-t border-accent/20 mt-1">Batch: {batchId}</li>
          </ol>
          <p className="text-[10px] text-text-dim leading-relaxed pt-2 mt-1 border-t border-accent/20">
            Billing Integration compares the Canonical Usage submitted with Zuora's accepted usage. Any mismatch is surfaced as a
            reconciliation exception before Billing Operations proceeds — V1 does not auto-retry or auto-correct.
          </p>
        </div>
      )}
    </div>
  );
}

function ProductLane({ title, batchId, unit }: { title: string; batchId: string; unit: string }) {
  const batch = findBatch(batchId);
  const [toast, setToast] = useState<string | null>(null);
  if (!batch) return null;

  function handleAction(stage: string) {
    setToast(`${title} — ${stage}: see Usage Batch Detail for the full audit trail.`);
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-sm text-text">{title}</h4>
        <StatusBadge status={batch.zuora_submission_status} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-stretch">
        <button onClick={() => handleAction('Usage metered')} className="rounded-lg border border-green/30 bg-green/5 px-3 py-2.5 text-left hover:bg-green/10 transition-colors">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Layers size={12} className="text-green" />
            <span className="text-xs font-semibold text-text">Usage metered</span>
          </div>
          <p className="text-[11px] text-text-muted leading-snug">
            {batch.exotel_metered_quantity.toLocaleString('en-IN')} {unit}
          </p>
        </button>
        <button onClick={() => handleAction('Canonical usage ready')} className="rounded-lg border border-green/30 bg-green/5 px-3 py-2.5 text-left hover:bg-green/10 transition-colors">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Database size={12} className="text-green" />
            <span className="text-xs font-semibold text-text">Canonical usage ready</span>
          </div>
          <p className="text-[11px] text-text-muted leading-snug">{batch.usage_record_ids.length} sample usage IDs</p>
        </button>
        <div className="sm:col-span-1">
          <BillingIntegrationCard batchId={batch.batch_id} />
        </div>
        <button onClick={() => handleAction('Zuora accepted')} className="rounded-lg border border-green/30 bg-green/5 px-3 py-2.5 text-left hover:bg-green/10 transition-colors">
          <div className="flex items-center gap-1.5 mb-0.5">
            <UploadCloud size={12} className="text-green" />
            <span className="text-xs font-semibold text-text">Zuora accepted</span>
          </div>
          <p className="text-[11px] text-text-muted leading-snug">
            {batch.zuora_accepted_quantity?.toLocaleString('en-IN')} / {batch.exotel_metered_quantity.toLocaleString('en-IN')} {unit}
          </p>
          <p className="text-[10px] text-green/80 leading-snug mt-1 pt-1 border-t border-green/20">
            {batch.reconciliation_status === 'MATCHED'
              ? 'Response received → Reconciliation completed'
              : 'Response received → Reconciliation pending'}
          </p>
        </button>
      </div>

      <Link to={`/prototype/batches/${batch.batch_id}`} className="inline-flex items-center gap-1 text-xs text-accent hover:underline mt-3">
        Open Usage Batch Detail <ArrowRight size={11} />
      </Link>
      {toast && <div className="mt-2 text-[11px] text-text-dim bg-white/[0.03] border border-border rounded-md px-2 py-1.5">{toast}</div>}
    </div>
  );
}

export function DemoControlCenter() {
  const invoice = findInvoice('INV-RAZORPAY-202607');
  const customer = findCustomer('RAZORPAY-003');
  const [billingToast, setBillingToast] = useState<string | null>(null);
  const navigate = useNavigate();

  const smsBatch = findBatch('BATCH-RAZORPAY-SMS-20260722');
  const voiceBatch = findBatch('BATCH-RAZORPAY-VOICE-20260721');
  const bothMatched = smsBatch?.reconciliation_status === 'MATCHED' && voiceBatch?.reconciliation_status === 'MATCHED';

  return (
    <div>
      <PageHeader
        title="Demo Control Center"
        scope="V1"
        subtitle="The single entry point for the four-week live demo: one tenant (Razorpay), one billing account, one subscription, two usage-based rate-plan charges (SMS, Voice). All stages are grounded in one shared, referentially consistent prototype dataset. Interactions are simulated client-side for this proof of concept."
      />

      <div className="mb-4">
        <ComponentLabel>Metering → Canonical Usage → Billing Integration → Zuora → Reconciliation → Ready for Billing</ComponentLabel>
      </div>

      {customer && invoice && (
        <div className="card p-4 mb-4 flex flex-wrap items-center gap-4">
          <div className="text-xs">
            <span className="text-text-dim">Tenant: </span>
            <span className="mono text-text">{customer.tenant_id}</span>
          </div>
          <div className="text-xs">
            <span className="text-text-dim">Billing account: </span>
            <span className="mono text-text">{customer.billing_account_id}</span>
          </div>
          <div className="text-xs">
            <span className="text-text-dim">Subscription: </span>
            <span className="mono text-text">{customer.subscription_id}</span>
          </div>
          <div className="text-xs text-text-dim ml-auto flex items-center gap-1.5">
            <Info size={12} />
            One account, one subscription, two rate-plan charges. Mapping is a controlled deployment configuration, not application code — see V1 Scope.
          </div>
        </div>
      )}

      <div className="grid gap-4 mb-4">
        <ProductLane title="SMS · DELIVERED_SMS" batchId="BATCH-RAZORPAY-SMS-20260722" unit="SMS" />
        <ProductLane title="Voice · CONNECTED_MINUTES" batchId="BATCH-RAZORPAY-VOICE-20260721" unit="minutes" />
      </div>

      <div className="card p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-sm text-text">Shared stage — both products roll into one invoice</h4>
          {invoice && <StatusBadge status={invoice.status} />}
        </div>

        {!bothMatched && (
          <div className="mb-3 rounded-lg border border-amber/30 bg-amber/5 px-3 py-2 text-xs text-amber">
            Run Billing is disabled — usage is still pending or mismatched for one of the two products.
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            disabled={!bothMatched}
            onClick={() => setBillingToast('Run Billing was manually initiated for this demo — production uses Zuora’s scheduled bill run.')}
            className={clsx(
              'flex-1 rounded-lg border px-3 py-2.5 text-left transition-colors',
              bothMatched ? 'border-green/30 bg-green/5 hover:bg-green/10' : 'border-border bg-white/[0.02] opacity-50 cursor-not-allowed',
            )}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <Receipt size={13} className={bothMatched ? 'text-green' : 'text-text-dim'} />
              <span className="text-xs font-semibold text-text">Run Billing</span>
            </div>
            <p className="text-[11px] text-text-muted leading-snug">{invoice ? `Zuora rated accepted usage into ${invoice.lines.length} invoice lines` : 'Not yet run'}</p>
          </button>
          <ArrowRight size={14} className="text-text-dim shrink-0 hidden sm:block self-center" />
          <button
            disabled={!invoice}
            onClick={() => invoice && navigate(`/prototype/traceability?invoice=${invoice.invoice_id}`)}
            className="flex-1 rounded-lg border border-green/30 bg-green/5 px-3 py-2.5 text-left hover:bg-green/10 transition-colors"
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <FileText size={13} className="text-green" />
              <span className="text-xs font-semibold text-text">View Invoice</span>
            </div>
            <p className="text-[11px] text-text-muted leading-snug">
              {invoice ? `${invoice.invoice_id} — ${invoice.currency} ${invoice.total_amount.toLocaleString('en-IN')}` : '—'}
            </p>
          </button>
        </div>

        {billingToast && <div className="mt-2 text-[11px] text-text-dim bg-white/[0.03] border border-border rounded-md px-2 py-1.5">{billingToast}</div>}
        {invoice && (
          <Link
            to={`/prototype/traceability?invoice=${invoice.invoice_id}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline mt-3"
          >
            <CheckCircle2 size={13} /> View {invoice.invoice_id} in Invoice Traceability — SMS and Voice lines, one billing account, one subscription <ArrowRight size={11} />
          </Link>
        )}
      </div>

      <div className="rounded-lg border border-cyan/20 bg-cyan/5 px-4 py-3 flex items-start gap-2">
        <CheckCircle size={14} className="text-cyan shrink-0 mt-0.5" />
        <p className="text-xs text-text-muted leading-relaxed">
          Production batching runs on a scheduled hourly/daily cadence (see architecture). An on-demand trigger exists specifically for this
          four-week proof and live rehearsals — that on-demand path does not exist in the target production design, where batching remains
          scheduled and failure handling is a full dead-letter queue with replay, not the persisted-status-plus-manual-retry model used here.
        </p>
      </div>
    </div>
  );
}
