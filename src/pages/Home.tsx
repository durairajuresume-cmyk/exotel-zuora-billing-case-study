import { Link } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Presentation, ArrowRight, ShieldCheck, GitBranch, Gauge } from 'lucide-react';
import { ArchitectureDiagram } from '../diagrams/ArchitectureDiagram';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Source-of-truth boundaries',
    body: 'Exotel owns raw events and validated usage. Zuora owns billing accounts, rating, and invoices. A dedicated integration layer connects them — asynchronously, never on the API hot path.',
  },
  {
    icon: GitBranch,
    title: 'Traceable by construction',
    body: 'Every invoice line traces back through a usage batch to canonical usage records and the original SMS, call, WhatsApp, or AI session event.',
  },
  {
    icon: Gauge,
    title: 'Reconciled, not just delivered',
    body: 'A successful API response is not enough. A three-way reconciliation loop compares Exotel metered usage, Zuora accepted usage, and invoiced quantity every cycle.',
  },
];

const deliverables = [
  {
    to: '/case-study',
    icon: BookOpen,
    title: 'Product Case Study',
    body: 'Full write-up: architecture, canonical usage model, idempotency, reconciliation, edge cases, rollout plan, and success metrics.',
  },
  {
    to: '/prototype',
    icon: LayoutDashboard,
    title: 'Billing Operations Prototype',
    body: 'A clickable prototype covering the dashboard, usage batches, invoice traceability, reconciliation exceptions, customer billing, and integration health.',
  },
  {
    to: '/slides',
    icon: Presentation,
    title: '19-Slide Presentation',
    body: '13 core slides plus 6 appendix slides, built to present live or export to PDF.',
  },
];

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
      <div className="max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Senior Product Manager · Interview Proof of Work</div>
        <h1 className="text-3xl md:text-5xl font-semibold text-text leading-tight mb-5">
          Designing the platform integration between <span className="text-accent">Exotel</span> and <span className="text-accent">Zuora</span>
        </h1>
        <p className="text-lg text-text-muted leading-relaxed mb-8">
          So Exotel can invoice enterprise customers accurately, faster, and with complete traceability — across SMS, Voice, WhatsApp,
          Contact Center, and Conversational AI.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/case-study" className="inline-flex items-center gap-2 rounded-lg bg-accent text-bg font-semibold text-sm px-4 py-2.5 hover:bg-accent-dim transition-colors">
            Read the case study <ArrowRight size={16} />
          </Link>
          <Link to="/prototype" className="inline-flex items-center gap-2 rounded-lg border border-border-light text-text font-semibold text-sm px-4 py-2.5 hover:bg-white/5 transition-colors">
            Explore the prototype
          </Link>
          <Link to="/slides" className="inline-flex items-center gap-2 rounded-lg border border-border-light text-text font-semibold text-sm px-4 py-2.5 hover:bg-white/5 transition-colors">
            View the deck
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-14">
        {pillars.map((p) => (
          <div key={p.title} className="card p-5">
            <p.icon size={20} className="text-accent mb-3" />
            <h3 className="font-semibold text-text mb-2">{p.title}</h3>
            <p className="text-sm text-text-muted leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 card p-6 md:p-10">
        <h2 className="text-lg font-semibold text-text mb-1">System at a glance</h2>
        <p className="text-sm text-text-muted mb-8">Ownership boundaries between Exotel product systems, the billing integration layer, and Zuora.</p>
        <ArchitectureDiagram compact />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-14">
        {deliverables.map((d) => (
          <Link key={d.to} to={d.to} className="card p-5 hover:border-accent/50 transition-colors group">
            <d.icon size={20} className="text-accent mb-3" />
            <h3 className="font-semibold text-text mb-2 flex items-center gap-1.5">
              {d.title}
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">{d.body}</p>
          </Link>
        ))}
      </div>

      <p className="text-xs text-text-dim mt-14 max-w-3xl">
        All customer names, usage figures, invoice amounts, and operational data shown throughout this project (Swiggy, Urban Company, Razorpay,
        Apollo Hospitals, HDFC Bank) are illustrative sample data created for this case study and do not represent real Exotel customers or contracts.
      </p>
    </div>
  );
}
