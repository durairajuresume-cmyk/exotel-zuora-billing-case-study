import { Callout } from '../../components/Section';
import { ShieldCheck, GitBranch, Gauge, Layers } from 'lucide-react';

const decisions = [
  {
    icon: Layers,
    title: 'A separate Billing Integration Layer',
    body: 'Not Zuora, not Exotel product systems. It owns mapping, batching, retries, dead-lettering, and reconciliation — asynchronously, off the API hot path.',
  },
  {
    icon: GitBranch,
    title: 'Hybrid usage granularity',
    body: 'Event-level detail stays in Exotel; hourly/daily aggregated batches go to Zuora, linked by batch_id — full traceability at low integration volume.',
  },
  {
    icon: ShieldCheck,
    title: 'Identity-only idempotency keys',
    body: 'Billing keys use only immutable facts (tenant, source object, product, billing rule) — never mutable rating attributes like contract_version — so corrections update records instead of duplicating charges.',
  },
  {
    icon: Gauge,
    title: 'Reconciliation is mandatory, not optional',
    body: 'A three-way match (Exotel metered → Zuora accepted → invoice rated) runs every cycle. A 200 OK from Zuora is never treated as proof of a correct invoice.',
  },
];

export function ExecutiveSummary() {
  return (
    <section id="executive-summary" className="scroll-mt-24 py-10 border-b border-border">
      <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Executive summary · 90-second read</div>
      <h2 className="text-2xl md:text-3xl font-semibold text-text mb-4">The whole case study in one screen</h2>
      <p className="text-text-muted leading-relaxed max-w-3xl mb-6">
        Exotel bills enterprise customers across SMS, Voice, WhatsApp, Contact Center, and Conversational AI without a system that guarantees
        invoices are accurate, on time, or traceable back to source events. This design keeps Exotel as the source of truth for usage and Zuora
        as the source of truth for billing, connected by a dedicated integration layer built around one rule:
      </p>
      <Callout>
        "Exotel determines what was consumed. Zuora determines how much to charge and generates the invoice." Every decision below defends that
        line.
      </Callout>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {decisions.map((d) => (
          <div key={d.title} className="card p-4">
            <d.icon size={18} className="text-accent mb-2" />
            <h4 className="font-semibold text-sm text-text mb-1">{d.title}</h4>
            <p className="text-xs text-text-muted leading-relaxed">{d.body}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-6">
        <div className="rounded-lg border border-border bg-white/[0.02] px-4 py-3">
          <div className="text-xs text-text-dim mb-1">North Star metric</div>
          <div className="text-sm font-semibold text-green">100% invoice-line traceability, zero duplicate charges</div>
        </div>
        <div className="rounded-lg border border-border bg-white/[0.02] px-4 py-3">
          <div className="text-xs text-text-dim mb-1">MVP scope</div>
          <div className="text-sm font-semibold text-text">Delivered SMS · 1 geography · 1 currency</div>
        </div>
        <div className="rounded-lg border border-border bg-white/[0.02] px-4 py-3">
          <div className="text-xs text-text-dim mb-1">Proof of work</div>
          <div className="text-sm font-semibold text-text">Working prototype + 16-slide deck below</div>
        </div>
      </div>
    </section>
  );
}
