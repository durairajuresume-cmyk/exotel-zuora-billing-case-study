import { SlideShell } from './SlideShell';
import { Radio, GitMerge, Receipt } from 'lucide-react';

const exotelItems = ['Customer usage events', 'Metering', 'Canonical Usage Records', 'Billable usage calculation', 'Billing Integration', 'Submission', 'Reconciliation'];
const zuoraItems = ['Billing Accounts', 'Subscriptions', 'Rate Plans', 'Pricing', 'Taxes', 'Invoice Generation', 'Payments'];
const layerItems = [
  'Decouples Metering from billing vendors',
  'Consumes Canonical Usage Records',
  'Maps Exotel identifiers to billing platform objects',
  'Batches usage',
  'Transforms payloads into vendor-specific schemas',
  'Submits usage',
  'Performs reconciliation',
];

export function Slide03DesignPrinciples() {
  return (
    <SlideShell index={3} total={19} kicker="Slide 3 · Design Principles & Ownership" title="Why the Billing Integration Layer exists" dense>
      <div className="h-full flex flex-col justify-center gap-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-cyan/40 bg-cyan/5 p-4 flex flex-col">
            <Radio size={16} className="text-cyan mb-2" />
            <h4 className="font-semibold text-sm text-text mb-2">Exotel owns Operational Usage</h4>
            <ul className="space-y-1 flex-1">
              {exotelItems.map((it) => (
                <li key={it} className="text-[11px] text-text-muted leading-snug">· {it}</li>
              ))}
            </ul>
            <p className="text-[11px] font-semibold text-cyan mt-2 pt-2 border-t border-cyan/20">Exotel determines WHAT the customer consumed.</p>
          </div>

          <div className="rounded-xl border border-accent/50 bg-accent-soft p-4 flex flex-col">
            <GitMerge size={16} className="text-accent mb-2" />
            <h4 className="font-semibold text-sm text-text mb-0.5">Billing Integration Layer</h4>
            <p className="text-[10px] text-text-dim uppercase tracking-wide mb-2">Vendor-specific integration layer</p>
            <ul className="space-y-1 flex-1">
              {layerItems.map((it) => (
                <li key={it} className="text-[11px] text-text-muted leading-snug">· {it}</li>
              ))}
            </ul>
            <div className="text-[11px] font-semibold text-accent mt-2 pt-2 border-t border-accent/20 leading-snug">
              Purpose: keep Metering independent of any billing provider.
              <div className="text-text-muted font-normal mt-1">Today → Zuora. Tomorrow → another platform. Only this layer changes.</div>
            </div>
          </div>

          <div className="rounded-xl border border-amber/40 bg-amber/5 p-4 flex flex-col">
            <Receipt size={16} className="text-amber mb-2" />
            <h4 className="font-semibold text-sm text-text mb-2">Zuora owns Commercial Billing</h4>
            <ul className="space-y-1 flex-1">
              {zuoraItems.map((it) => (
                <li key={it} className="text-[11px] text-text-muted leading-snug">· {it}</li>
              ))}
            </ul>
            <p className="text-[11px] font-semibold text-amber mt-2 pt-2 border-t border-amber/20">Zuora determines HOW MUCH the customer should be charged.</p>
          </div>
        </div>

        <div className="rounded-lg border border-border-light bg-white/[0.03] px-4 py-3 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-text-dim mr-2">Design Principle —</span>
          <span className="text-xs text-text">Separate operational usage from commercial billing.</span>
          <span className="text-xs text-text-muted"> This lets Exotel evolve independently of any billing provider while keeping commercial logic inside Zuora.</span>
        </div>
      </div>
    </SlideShell>
  );
}
