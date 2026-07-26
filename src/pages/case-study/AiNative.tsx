import { Section, Callout } from '../../components/Section';
import { Bot, SearchCheck, TrendingDown, Activity, Sparkles } from 'lucide-react';

const capabilities = [
  {
    icon: Bot,
    title: 'AI Billing Copilot',
    body: 'Answers "why did my bill increase," "why was I charged," "was this usage duplicated," and "which contract rule was applied" in plain language, backed by real records.',
  },
  {
    icon: SearchCheck,
    title: 'AI Billing Dispute RCA',
    body: 'Automatically traces Invoice → Charge → Usage → Source Event for any disputed line, producing the same chain a human analyst would build manually.',
  },
  {
    icon: TrendingDown,
    title: 'AI Revenue Leakage Detector',
    body: 'Continuously compares Events → Metering → Zuora → Invoice to surface usage that was metered but never invoiced.',
  },
  {
    icon: Activity,
    title: 'AI Anomaly Detection',
    body: 'Flags sudden usage spikes, unusual discount application, missing batches, duplicate usage, and invoice variance before Finance notices them.',
  },
  {
    icon: Sparkles,
    title: 'AI Finance Operations Assistant',
    body: 'Recommends retrying a batch, correcting a subscription mapping, generating a credit note, or assigning an exception to Billing Ops.',
  },
];

export function AiNative() {
  return (
    <Section
      id="ai-native"
      eyebrow="11 · Future"
      title="Future AI-native billing capabilities"
      intro="Once the canonical usage model and reconciliation loop exist, they become the ideal substrate for AI copilots — because every answer can point at a real record instead of a guess."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {capabilities.map((c) => (
          <div key={c.title} className="card p-4">
            <c.icon size={18} className="text-accent mb-2" />
            <h4 className="font-semibold text-sm text-text mb-1">{c.title}</h4>
            <p className="text-xs text-text-muted leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
      <Callout>
        Guardrail: every AI recommendation must be evidence-backed, show its source records, and require human approval before any financial
        correction is executed. The prototype's Reconciliation Exceptions screen already shows where these recommendations would surface.
      </Callout>
    </Section>
  );
}
