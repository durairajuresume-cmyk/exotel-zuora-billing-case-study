import { Section, SubHeading, Callout } from '../../components/Section';
import { ArchitectureDiagram } from '../../diagrams/ArchitectureDiagram';

export function Architecture() {
  return (
    <Section
      id="architecture"
      eyebrow="04 · Architecture"
      title="Proposed system architecture and ownership"
      intro="Six layers, three clear ownership zones. The diagram below is the single mental model everything else in this document builds on."
    >
      <div className="card p-6 md:p-8">
        <ArchitectureDiagram />
      </div>

      <SubHeading>Why a separate Billing Integration Layer</SubHeading>
      <p className="text-text-muted leading-relaxed max-w-3xl">
        Zuora is a billing and finance system, not a usage-processing system — it should never see raw carrier callbacks. Exotel's product
        systems are optimized for low-latency delivery, not for rating logic or invoice generation. Putting a dedicated layer in between gives
        us a place to own mapping, batching, retries, dead-lettering, and reconciliation without either side taking on responsibilities it
        isn't built for, and without invoice-generation concerns ever touching the communication API hot path.
      </p>

      <Callout>
        "Exotel determines what was consumed. Zuora determines how much to charge and generates the invoice." Every design decision in this
        case study defends that line.
      </Callout>
    </Section>
  );
}
