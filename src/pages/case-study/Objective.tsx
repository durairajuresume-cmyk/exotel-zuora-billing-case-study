import { Section, Callout } from '../../components/Section';

export function Objective() {
  return (
    <Section
      id="objective"
      eyebrow="01 · Problem"
      title="Problem statement and objective"
      intro={
        <>
          Exotel provides communication products — SMS, Voice, WhatsApp, Contact Center, and Conversational AI — to enterprise customers who
          often use several of them at once, under different contracts, rates, billing cycles, currencies, tax rules, minimum commitments,
          discounts, and usage-based pricing models.
        </>
      }
    >
      <p className="text-text-muted leading-relaxed max-w-3xl">
        Today, Exotel's internal usage systems and its billing systems are not connected in a way that produces invoices Finance and Billing
        Operations can trust without manual reconciliation. As Exotel scales enterprise accounts and adds products, that gap compounds: more
        products, more contract variants, more usage volume, and more room for invoices to be wrong, late, or impossible to explain.
      </p>
      <p className="text-text-muted leading-relaxed max-w-3xl">
        This case study designs the platform integration between Exotel and Zuora so that invoices are accurate, generated on time, traceable to
        the original communication event, protected from duplicate or missing usage, easy for Finance and Billing Operations to investigate, and
        extensible to new products and pricing models without re-architecting the integration each time.
      </p>
      <Callout>
        <strong>Objective:</strong> design a billing integration platform — not just a UI — where Exotel remains the system of record for
        communication usage and Zuora becomes the system of record for billing, with a reliable, observable, and auditable bridge between them.
      </Callout>
    </Section>
  );
}
