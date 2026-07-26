import { Section, SubHeading } from '../../components/Section';
import { GranularityDiagram } from '../../diagrams/GranularityDiagram';
import { TraceabilityChainDiagram } from '../../diagrams/TraceabilityChainDiagram';

export function Granularity() {
  return (
    <Section
      id="granularity"
      eyebrow="06 · Trade-off"
      title="Usage granularity decision"
      intro="How much usage detail should actually cross the wire into Zuora? This is the single highest-leverage trade-off in the integration."
    >
      <GranularityDiagram />

      <SubHeading>Example batch</SubHeading>
      <div className="card p-4 mono text-xs text-text-muted leading-relaxed whitespace-pre-wrap max-w-xl">
        {[
          'batch_id: BATCH-SWIGGY-SMS-20260722',
          'tenant_id: SWIGGY-001',
          'product: SMS',
          'metric: DELIVERED_SMS',
          'quantity: 4250000',
          'billing_window: 2026-07-22',
          'contract_version: PLAN-V3',
        ].join('\n')}
      </div>

      <SubHeading>Traceability preserved by the hybrid model</SubHeading>
      <p className="text-text-muted leading-relaxed max-w-3xl">
        Even though only daily aggregates reach Zuora, every invoice line can still be walked all the way back to a single raw event:
      </p>
      <div className="card p-4">
        <TraceabilityChainDiagram />
      </div>
    </Section>
  );
}
