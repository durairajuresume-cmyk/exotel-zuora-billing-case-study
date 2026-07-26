import { ArrowDown, Zap } from 'lucide-react';
import clsx from 'clsx';

interface Stage {
  title: string;
  owner: 'exotel' | 'integration' | 'zuora' | 'neutral';
  items: string[];
}

const stages: Stage[] = [
  {
    title: 'Exotel Product Systems',
    owner: 'exotel',
    items: ['SMS', 'Voice', 'WhatsApp', 'Conversational AI', 'Contact Center'],
  },
  {
    title: 'Raw Operational Events',
    owner: 'exotel',
    items: ['Submitted, delivered, connected, failed lifecycle callbacks'],
  },
  {
    title: 'Metering Layer',
    owner: 'exotel',
    items: ['Event validation', 'Status interpretation', 'Billable-rule evaluation', 'Deduplication & idempotency', 'Normalization', 'Usage record creation'],
  },
  {
    title: 'Canonical Usage Store',
    owner: 'exotel',
    items: ['Single schema across all products', 'Source of truth for what was consumed'],
  },
  {
    title: 'Billing Integration Layer',
    owner: 'integration',
    items: ['Field mapping', 'Tenant & subscription mapping', 'Aggregation & batching', 'Idempotency & retries', 'Audit logging', 'Reconciliation & replay'],
  },
  {
    title: 'Zuora',
    owner: 'zuora',
    items: ['Billing accounts & subscriptions', 'Product rate plans', 'Usage-based rating', 'Recurring charges, discounts, taxes', 'Invoices, credit & debit notes', 'Payments'],
  },
  {
    title: 'Finance & Customer Systems',
    owner: 'neutral',
    items: ['Published invoices', 'Finance reporting & DSO tracking', 'Customer billing portal'],
  },
];

const ownerStyles: Record<Stage['owner'], string> = {
  exotel: 'border-cyan/40 bg-cyan/5',
  integration: 'border-accent/50 bg-accent-soft',
  zuora: 'border-amber/40 bg-amber/5',
  neutral: 'border-border-light bg-white/[0.02]',
};

const ownerLabel: Record<Stage['owner'], string> = {
  exotel: 'Owned by Exotel',
  integration: 'Owned by Integration Layer',
  zuora: 'Owned by Zuora',
  neutral: 'Downstream consumers',
};

export function ArchitectureDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <div className="w-full">
      <div className="flex flex-col items-stretch gap-0 max-w-2xl mx-auto">
        {stages.map((stage, i) => (
          <div key={stage.title} className="flex flex-col items-center">
            <div className="w-full flex items-stretch gap-3">
              <div className={clsx('flex-1 rounded-xl border p-4', ownerStyles[stage.owner])}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-text text-sm">{stage.title}</h4>
                  {!compact && <span className="text-[10px] uppercase tracking-wide text-text-dim">{ownerLabel[stage.owner]}</span>}
                </div>
                {!compact && (
                  <ul className="flex flex-wrap gap-1.5">
                    {stage.items.map((item) => (
                      <li key={item} className="text-xs text-text-muted bg-black/20 rounded-md px-2 py-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {!compact && stage.title === 'Billing Integration Layer' && (
                <div className="w-36 shrink-0 rounded-xl border border-red/30 bg-red/5 p-3 flex flex-col justify-center">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-red mb-1">On retry exhaustion</div>
                  <div className="text-xs text-text-muted leading-snug">Dead-letter queue → manual or automated replay</div>
                </div>
              )}
            </div>

            {i === 0 && (
              <div className="w-full flex items-center gap-2 my-2">
                <div className="flex-1 border-t border-dashed border-amber/50" />
                <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-amber whitespace-nowrap">
                  <Zap size={11} /> Sync API ends here — everything below is asynchronous
                </span>
                <div className="flex-1 border-t border-dashed border-amber/50" />
              </div>
            )}

            {i < stages.length - 1 && <ArrowDown size={18} className="text-text-dim my-1.5 shrink-0" />}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-text-muted italic mt-6 max-w-xl mx-auto">
        "Exotel determines what was consumed. Zuora determines how much to charge and generates the invoice."
      </p>
    </div>
  );
}
