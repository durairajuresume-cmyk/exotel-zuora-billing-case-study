import { Section, SubHeading } from '../../components/Section';
import { LifecycleDiagram } from '../../diagrams/LifecycleDiagram';

const steps = [
  'Customer sends an SMS.',
  'Exotel creates an SMS ID.',
  'Messaging system emits lifecycle events.',
  'Metering validates the Delivered event.',
  'Canonical usage record is created.',
  'Usage is added to a billing batch.',
  'Billing Integration Layer maps the customer, subscription, product, and contract.',
  'Batch is sent to Zuora.',
  'Zuora applies rate plan, discounts, commitments, and taxes.',
  'Zuora generates the invoice.',
  'Invoice is reconciled against Exotel usage.',
  'Invoice is published to the customer and Finance.',
];

export function Workflow() {
  return (
    <Section
      id="workflow"
      eyebrow="08 · Workflow"
      title="End-to-end billing workflow"
      intro="The happy path from a customer action to a reconciled invoice, and the lifecycle states that make every step observable."
    >
      <ol className="grid md:grid-cols-2 gap-2">
        {steps.map((s, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-text">
            <span className="mono text-xs text-accent shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>

      <SubHeading>Lifecycle state machine</SubHeading>
      <div className="card p-5">
        <LifecycleDiagram />
      </div>
    </Section>
  );
}
