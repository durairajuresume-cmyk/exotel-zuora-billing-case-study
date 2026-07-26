import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { ScopeBadge } from '../../components/ScopeBadge';
import { ComponentLabel } from '../../components/ComponentLabel';
import { invoices } from '../../data/invoices';
import { findBatch } from '../../data/usageBatches';
import { traceCampaigns } from '../../data/traceability';
import { ChevronDown, ChevronRight, ShieldQuestion, CheckCircle2, AlertTriangle, Search, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const RAZORPAY_INVOICE_ID = 'INV-RAZORPAY-202607';

function InvoiceExplorer({ portfolioMode }: { portfolioMode: boolean }) {
  const [searchParams] = useSearchParams();
  const deepLinkedInvoiceId = searchParams.get('invoice');
  const initialInvoiceId = invoices.some((i) => i.invoice_id === deepLinkedInvoiceId) ? deepLinkedInvoiceId! : RAZORPAY_INVOICE_ID;
  const [invoiceId, setInvoiceId] = useState(initialInvoiceId);
  const [expandedLine, setExpandedLine] = useState<string | null>(null);
  const effectiveInvoiceId = portfolioMode ? invoiceId : RAZORPAY_INVOICE_ID;
  const invoice = invoices.find((i) => i.invoice_id === effectiveInvoiceId)!;

  return (
    <div className="card p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="font-semibold text-sm text-text">Invoice explorer</h3>
        {portfolioMode ? (
          <select
            value={invoiceId}
            onChange={(e) => {
              setInvoiceId(e.target.value);
              setExpandedLine(null);
            }}
            className="bg-surface-2 border border-border-light rounded-lg text-xs text-text px-2.5 py-1.5 focus:outline-none focus:border-accent/60"
          >
            {invoices.map((i) => (
              <option key={i.invoice_id} value={i.invoice_id}>
                {i.invoice_id} — {i.customer}
              </option>
            ))}
          </select>
        ) : (
          <span className="mono text-xs text-accent bg-accent-soft border border-accent/30 rounded-full px-2.5 py-1">{RAZORPAY_INVOICE_ID}</span>
        )}
      </div>
      {!portfolioMode && (
        <p className="text-[11px] text-text-dim mb-4">
          V1 Demo Dataset: Razorpay — this invoice is the one the four-week build proves out. Switch to "View portfolio examples" above to
          explore the other four illustrative customers.
        </p>
      )}

      <div className="flex flex-wrap gap-4 mb-4 text-xs">
        <div>
          <span className="text-text-dim">Customer: </span>
          <span className="text-text">{invoice.customer}</span>
        </div>
        <div>
          <span className="text-text-dim">Period: </span>
          <span className="text-text">{invoice.billing_period}</span>
        </div>
        <div>
          <span className="text-text-dim">Subtotal: </span>
          <span className="text-text mono">
            {invoice.currency} {invoice.subtotal_amount.toLocaleString('en-IN')}
          </span>
        </div>
        <div>
          <span className="text-text-dim">Tax: </span>
          <span className="text-text mono">
            {invoice.currency} {invoice.tax_amount.toLocaleString('en-IN')}
          </span>
        </div>
        <div>
          <span className="text-text-dim">Total: </span>
          <span className="text-text mono font-semibold">
            {invoice.currency} {invoice.total_amount.toLocaleString('en-IN')}
          </span>
        </div>
        <StatusBadge status={invoice.status} />
      </div>

      <div className="space-y-2">
        {invoice.lines.map((line) => {
          const batch = findBatch(line.batch_id);
          const isOpen = expandedLine === line.line_id;
          return (
            <div key={line.line_id} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedLine(isOpen ? null : line.line_id)}
                className="w-full flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-white/[0.02] text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {isOpen ? <ChevronDown size={14} className="text-accent shrink-0" /> : <ChevronRight size={14} className="text-text-dim shrink-0" />}
                  <span className="text-xs text-text truncate">{line.description}</span>
                </div>
                <span className="mono text-xs text-text shrink-0">
                  {invoice.currency} {line.amount.toLocaleString('en-IN')}
                </span>
              </button>
              {isOpen && (
                <div className="px-4 py-3 bg-black/20 border-t border-border space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-text-dim">Invoice line</span>
                    <ChevronRight size={12} className="text-text-dim" />
                    <span className="mono text-accent">{line.batch_id}</span>
                    <ChevronRight size={12} className="text-text-dim" />
                    <span className="text-text-dim">usage records</span>
                    <ChevronRight size={12} className="text-text-dim" />
                    <span className="text-text-dim">source events</span>
                  </div>
                  {batch ? (
                    <div className="grid sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-text-dim">Quantity billed: </span>
                        <span className="mono text-text">
                          {line.quantity.toLocaleString('en-IN')} {batch.unit}
                        </span>
                      </div>
                      <div>
                        <span className="text-text-dim">Sample usage IDs: </span>
                        <span className="mono text-text">{batch.usage_record_ids.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-text-dim">Contract version: </span>
                        <span className="mono text-text">{batch.contract_version}</span>
                      </div>
                      <div>
                        <span className="text-text-dim">Reconciliation: </span>
                        <StatusBadge status={batch.reconciliation_status} />
                      </div>
                    </div>
                  ) : (
                    <p className="text-text-dim">No batch record found for this line.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const OWNERSHIP_CHAIN = [
  { actor: 'Carrier', note: 'Emits a duplicate DELIVERED callback for the same message.' },
  { actor: 'Exotel Metering Layer', note: 'Detects the duplicate event via event_dedupe_key before it becomes billable usage.' },
  { actor: 'Canonical Usage Store', note: 'Retains exactly one billable usage record.' },
  { actor: 'Billing Integration Layer', note: 'Submits exactly one usage unit to Zuora.' },
  { actor: 'Zuora', note: 'Rates exactly one usage unit. Zuora never sees the duplicate — raw carrier callbacks never reach it.' },
  { actor: 'Support', note: 'Retrieves and shares this trace as evidence that no overcharge occurred.' },
];

function BillingVerification() {
  const [campaignId, setCampaignId] = useState(traceCampaigns[0].campaign_id);
  const campaign = traceCampaigns.find((c) => c.campaign_id === campaignId)!;

  return (
    <div className="card p-4 md:p-5">
      <div className="flex items-start gap-3 mb-4">
        <ShieldQuestion size={20} className="text-amber shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-text">Customer billing verification</h3>
            <ScopeBadge level="Post-V1" />
          </div>
          <p className="text-xs text-text-muted mt-0.5">"Our delivery logs show two DELIVERED callbacks for the same message. Were we charged twice?"</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Search size={14} className="text-text-dim" />
        <select
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
          className="bg-surface-2 border border-border-light rounded-lg text-xs text-text px-2.5 py-1.5 focus:outline-none focus:border-accent/60"
        >
          {traceCampaigns.map((c) => (
            <option key={c.campaign_id} value={c.campaign_id}>
              {c.campaign_id} — {c.customer}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs mb-4">
        <div>
          <span className="text-text-dim">Campaign: </span>
          <span className="mono text-text">{campaign.campaign_id}</span>
        </div>
        <div>
          <span className="text-text-dim">Customer: </span>
          <span className="text-text">{campaign.customer}</span>
        </div>
        <div>
          <span className="text-text-dim">SMS IDs: </span>
          <span className="mono text-text">{campaign.sms_ids.join(', ')}</span>
        </div>
        <div>
          <span className="text-text-dim">Usage IDs: </span>
          <span className="mono text-text">{campaign.usage_ids.join(', ')}</span>
        </div>
        <div>
          <span className="text-text-dim">Invoice: </span>
          <span className="mono text-text">
            {campaign.invoice_id} / {campaign.invoice_line_id}
          </span>
        </div>
        <div>
          <span className="text-text-dim">billing_usage_key: </span>
          <span className="mono text-text">{campaign.billing_usage_key}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-2">Ownership chain</h4>
        <div className="space-y-1">
          {OWNERSHIP_CHAIN.map((step, i) => (
            <div key={step.actor} className="flex items-start gap-2 text-xs">
              <span className="mono text-text-dim w-5 shrink-0">{i + 1}.</span>
              <span className="font-semibold text-text w-44 shrink-0">{step.actor}</span>
              <span className="text-text-muted">{step.note}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-2">Raw event trace</h4>
        <div className="space-y-1.5">
          {campaign.events.map((e) => (
            <div
              key={e.event_id}
              className={clsx(
                'flex items-center justify-between gap-3 text-xs rounded-md px-3 py-2 border',
                e.is_duplicate ? 'border-amber/30 bg-amber/5' : 'border-border bg-white/[0.02]',
              )}
            >
              <span className="text-text">{e.event_type}</span>
              <span className="mono text-text-dim">{e.source_object_id}</span>
              <span className="mono text-text-dim">{new Date(e.timestamp).toLocaleTimeString('en-IN', { hour12: false, timeZone: 'UTC' })} UTC</span>
              {e.is_duplicate && <span className="text-amber font-medium">Duplicate callback</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className={clsx('rounded-lg border px-3 py-2.5 flex items-center gap-2', campaign.duplicate_detected ? 'border-amber/30 bg-amber/5' : 'border-green/30 bg-green/5')}>
          {campaign.duplicate_detected ? <AlertTriangle size={15} className="text-amber shrink-0" /> : <CheckCircle2 size={15} className="text-green shrink-0" />}
          <span className="text-xs text-text">Duplicate callback observed: {campaign.duplicate_detected ? 'Yes' : 'No'}</span>
        </div>
        <div className={clsx('rounded-lg border px-3 py-2.5 flex items-center gap-2', campaign.duplicate_billed ? 'border-red/30 bg-red/5' : 'border-green/30 bg-green/5')}>
          {campaign.duplicate_billed ? <AlertTriangle size={15} className="text-red shrink-0" /> : <CheckCircle2 size={15} className="text-green shrink-0" />}
          <span className="text-xs text-text">Customer overcharged: {campaign.duplicate_billed ? 'Yes' : 'No'}</span>
        </div>
      </div>

      <div className="rounded-lg border border-accent/30 bg-accent-soft px-3 py-2.5">
        <div className="text-xs font-semibold text-accent mb-1">Verification outcome</div>
        <p className="text-xs text-text leading-relaxed">{campaign.verification_outcome}</p>
      </div>
    </div>
  );
}

export function Traceability() {
  const [portfolioMode, setPortfolioMode] = useState(false);

  return (
    <div>
      <PageHeader
        title="Invoice Traceability"
        scope="V1 — Core"
        subtitle="Trace any invoice line to its usage batch and source events. The Invoice Explorer is V1 — Core; the billing verification panel is Post-V1 (tagged below)."
      />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <ComponentLabel>Audit and Traceability</ComponentLabel>
        <div className="flex items-center gap-1 rounded-lg border border-border-light bg-surface-2 p-1">
          <button
            onClick={() => setPortfolioMode(false)}
            className={clsx('flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors', !portfolioMode ? 'bg-accent-soft text-accent' : 'text-text-muted hover:text-text')}
          >
            V1 Demo Dataset: Razorpay
          </button>
          <ArrowRight size={11} className="text-text-dim" />
          <button
            onClick={() => setPortfolioMode(true)}
            className={clsx('flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors', portfolioMode ? 'bg-accent-soft text-accent' : 'text-text-muted hover:text-text')}
          >
            View portfolio examples
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <InvoiceExplorer portfolioMode={portfolioMode} />
        <BillingVerification />
      </div>
    </div>
  );
}
