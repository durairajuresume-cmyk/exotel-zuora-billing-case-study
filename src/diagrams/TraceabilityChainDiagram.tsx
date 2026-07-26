import { ChevronRight } from 'lucide-react';

const chain = ['Invoice line', 'Zuora usage record / batch', 'Exotel batch', 'Canonical usage records', 'SMS / Call / WhatsApp / AI IDs', 'Raw events'];

export function TraceabilityChainDiagram() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {chain.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <span className="text-xs rounded-lg border border-border-light bg-surface-2 text-text px-3 py-1.5 whitespace-nowrap">
            {step}
          </span>
          {i < chain.length - 1 && <ChevronRight size={14} className="text-accent shrink-0" />}
        </div>
      ))}
    </div>
  );
}
