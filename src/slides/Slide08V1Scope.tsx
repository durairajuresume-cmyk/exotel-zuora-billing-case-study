import { SlideShell } from './SlideShell';
import { ArrowRight, AlertTriangle } from 'lucide-react';

const v1 = ['Demo Control Center', 'Usage Batch List (simplified, 1 tenant)', 'Usage Batch Detail (full)', 'Invoice Explorer (1 invoice)'];
const postV1 = ['Billing Ops Dashboard', 'Reconciliation Exception workflow + detail', 'Customer Billing Summary', 'Integration Health', 'Billing verification panel', 'DLQ + automated retry'];

const assumptions = ['Zuora sandbox/API access by Day 1', '1 tenant, 1 billing account, 1 subscription', 'SMS + Voice, simple per-unit pricing', 'India / INR only, tax preconfigured'];

export function Slide08V1Scope() {
  return (
    <SlideShell index={9} total={19} kicker="Slide 9 · Scope under constraint" title="V1: a four-week integration proof" dense>
      <div className="h-full flex flex-col justify-center gap-4">
        <div className="rounded-lg border border-accent/40 bg-accent-soft px-4 py-2.5 text-xs text-text flex items-center gap-1.5 flex-wrap">
          <span className="mono">1. Mobilisation</span>
          <ArrowRight size={11} className="text-accent" />
          <span className="mono text-accent font-semibold">2. Integration Proof (4 wks)</span>
          <ArrowRight size={11} className="text-accent" />
          <span className="mono">3. Production Pilot</span>
          <ArrowRight size={11} className="text-accent" />
          <span className="mono">4. Controlled Migration</span>
          <ArrowRight size={11} className="text-accent" />
          <span className="mono">5. Scaled Billing Ops</span>
          <ArrowRight size={11} className="text-accent" />
          <span className="mono">6. AI-assisted</span>
        </div>
        <p className="text-[11px] text-text-muted">Prototype fidelity ≠ engineering commitment — every screen below communicates both the buildable V1 and the longer-term vision.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">In the 4-week build</div>
            <ul className="space-y-1.5">
              {v1.map((v) => (
                <li key={v} className="text-xs text-text bg-white/[0.03] border border-border rounded-md px-2 py-1.5">{v}</li>
              ))}
            </ul>
          </div>
          <div className="card p-4">
            <div className="text-xs font-semibold text-amber uppercase tracking-wide mb-2">Post-V1 / target-state</div>
            <ul className="space-y-1.5">
              {postV1.map((v) => (
                <li key={v} className="text-xs text-text-muted bg-white/[0.03] border border-border rounded-md px-2 py-1.5">{v}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {assumptions.map((a) => (
            <div key={a} className="text-[11px] text-text-muted bg-black/20 border border-border rounded-md px-2 py-1.5 leading-snug">{a}</div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-amber">
          <AlertTriangle size={13} />
          Highest schedule risk: Zuora sandbox access and Product Catalogue setup — isolated as its own Week 1 (next slide).
        </div>
      </div>
    </SlideShell>
  );
}
