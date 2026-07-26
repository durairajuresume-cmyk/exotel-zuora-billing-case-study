import { Section } from '../../components/Section';
import { Check } from 'lucide-react';

const principles = [
  'Exotel remains the source of truth for raw communication events and validated billable usage.',
  'Zuora owns billing accounts, subscriptions, rate plans, rating, invoicing, credit notes, debit notes, and billing documents.',
  'A separate Billing Integration Layer connects Exotel and Zuora.',
  'Billing integration must be asynchronous and should never delay SMS, voice, or other communication APIs.',
  'Every invoice amount must be traceable back to its source usage and original operational event.',
  'Duplicate events must never create duplicate charges.',
  'Reconciliation is mandatory; a successful API response alone is not enough.',
  'Closed invoices should not be edited silently. Corrections use credit notes, debit notes, or next-cycle adjustments.',
  'The integration must be extensible across SMS, Voice, WhatsApp, AI, and future products.',
];

export function Principles() {
  return (
    <Section
      id="principles"
      eyebrow="03 · Principles"
      title="Core product principles"
      intro="These nine principles are the constitution for every architecture and workflow decision in this document — they are what keeps the system trustworthy as it scales."
    >
      <ol className="grid md:grid-cols-2 gap-3">
        {principles.map((p, i) => (
          <li key={i} className="flex items-start gap-3 card p-3.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft border border-accent/40">
              <Check size={12} className="text-accent" />
            </span>
            <span className="text-sm text-text leading-relaxed">{p}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
