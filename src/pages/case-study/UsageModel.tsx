import { Section, SubHeading } from '../../components/Section';

const fields: { field: string; description: string }[] = [
  { field: 'usage_id', description: 'Unique identifier for this canonical usage record.' },
  { field: 'tenant_id', description: 'Customer tenant, e.g. SWIGGY-001.' },
  { field: 'billing_account_id', description: 'Zuora billing account this usage rolls up to.' },
  { field: 'subscription_id', description: 'Zuora subscription / rate plan instance.' },
  { field: 'product', description: 'SMS, VOICE, WHATSAPP, CONVERSATIONAL_AI, CONTACT_CENTER.' },
  { field: 'usage_metric', description: 'DELIVERED_SMS, CONNECTED_MINUTES, AI_SESSION_MINUTES, etc.' },
  { field: 'quantity', description: 'Numeric amount consumed for this metric.' },
  { field: 'unit', description: 'SMS, MINUTES, CONVERSATIONS.' },
  { field: 'usage_timestamp', description: 'When the underlying event occurred.' },
  { field: 'source_object_id', description: 'Original operational object — MSG-12345, CALL-456.' },
  { field: 'correlation_id', description: 'Groups related usage, e.g. a campaign.' },
  { field: 'campaign_id', description: 'Optional marketing/campaign grouping.' },
  { field: 'geography', description: 'Region for tax and regulatory rules.' },
  { field: 'currency', description: 'Billing currency for this usage.' },
  { field: 'contract_version', description: 'Pins usage to the contract/rate-plan version active when consumed.' },
  { field: 'billing_period', description: 'Cycle this usage belongs to, e.g. 2026-07.' },
  { field: 'billing_usage_key', description: 'tenant_id + source_object_id + billing_rule — prevents one billable action from producing more than one usage record. See the Idempotency section for why this is distinct from event_dedupe_key and submission_idempotency_key.' },
  { field: 'batch_id', description: 'Aggregation batch this record was sent to Zuora in.' },
  { field: 'status', description: 'Lifecycle state — see the workflow section.' },
  { field: 'created_at / updated_at', description: 'Audit timestamps.' },
];

const examples = [
  {
    product: 'SMS',
    color: 'text-cyan',
    lines: ['usage_id: U-98765', 'tenant_id: SWIGGY-001', 'product: SMS', 'usage_metric: DELIVERED_SMS', 'quantity: 1', 'unit: SMS', 'source_object_id: MSG-12345', 'correlation_id: CAMPAIGN-789', 'status: READY_FOR_BILLING'],
  },
  {
    product: 'VOICE',
    color: 'text-accent',
    lines: ['product: VOICE', 'usage_metric: CONNECTED_MINUTES', 'quantity: 3.5', 'unit: MINUTES', 'source_object_id: CALL-456'],
  },
  {
    product: 'CONVERSATIONAL_AI',
    color: 'text-amber',
    lines: ['product: CONVERSATIONAL_AI', 'usage_metric: AI_SESSION_MINUTES', 'quantity: 6', 'unit: MINUTES'],
  },
];

export function UsageModel() {
  return (
    <Section
      id="usage-model"
      eyebrow="05 · Data model"
      title="Canonical usage model"
      intro="One usage schema, shared by every Exotel product, sitting between raw events and Zuora. This is what lets a new product plug into billing instead of requiring a new integration."
    >
      <div className="overflow-x-auto card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-dim">
              <th className="px-4 py-3 font-medium">Field</th>
              <th className="px-4 py-3 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f) => (
              <tr key={f.field} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                <td className="px-4 py-2.5 mono text-xs text-accent whitespace-nowrap">{f.field}</td>
                <td className="px-4 py-2.5 text-text-muted">{f.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>Example usage records across products</SubHeading>
      <div className="grid md:grid-cols-3 gap-4">
        {examples.map((ex) => (
          <div key={ex.product} className="card p-4">
            <div className={`text-xs font-semibold uppercase tracking-wide mb-3 ${ex.color}`}>{ex.product}</div>
            <pre className="mono text-xs text-text-muted leading-relaxed whitespace-pre-wrap">{ex.lines.join('\n')}</pre>
          </div>
        ))}
      </div>

      <p className="text-text-muted leading-relaxed max-w-3xl">
        Because every product maps into the same envelope — a tenant, a metric, a quantity, a unit, a source object, and a contract version —
        Exotel can add a sixth or seventh product without redesigning the billing integration. The Billing Integration Layer, the reconciliation
        service, and the audit trail all operate on the canonical schema, not on product-specific formats. Onboarding a new product becomes a
        metering-layer exercise (define its usage_metric and billable rule), not a re-architecture.
      </p>
    </Section>
  );
}
