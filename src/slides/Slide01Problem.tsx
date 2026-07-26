import { SlideShell } from './SlideShell';
import { AlertCircle, Target, ClipboardList } from 'lucide-react';

const constraints = [
  'Build a realistic V1 within 4 weeks',
  'Team size limited to 3 engineers',
  'Prioritize correctness over completeness',
  'Focus on proving the integration architecture rather than supporting every billing scenario',
];

export function Slide01Problem() {
  return (
    <SlideShell index={1} total={19} kicker="Slide 1 · Problem" title="Design a platform integration between Exotel and Zuora">
      <div className="h-full flex flex-col justify-center gap-5">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-red mt-0.5 shrink-0" />
              <p className="text-text leading-relaxed">
                Exotel sells SMS, Voice, WhatsApp, Contact Center, and Conversational AI to enterprise customers on mixed contracts, currencies,
                tax rules, commitments, and pricing models — but usage and billing systems aren't connected in a way Finance can trust.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Target size={20} className="text-accent mt-0.5 shrink-0" />
              <p className="text-text leading-relaxed">
                <span className="font-semibold">Objective: </span>
                invoice enterprise customers accurately, faster, and with complete traceability — by connecting Exotel's usage systems to Zuora's
                billing engine through a purpose-built integration layer.
              </p>
            </div>
          </div>
          <div className="card p-6 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-text-dim">Invoices must be</div>
            {['Accurate', 'Generated on time', 'Traceable to source events', 'Protected from duplicate or missing usage', 'Easy to investigate', 'Extensible to new products'].map((t) => (
              <div key={t} className="text-sm text-text bg-white/[0.03] border border-border rounded-lg px-3 py-2">
                {t}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-accent/25 bg-accent-soft/40 px-4 py-3">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-accent mb-2">
            <ClipboardList size={12} />
            Assignment Constraints
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1.5">
            {constraints.map((c) => (
              <div key={c} className="text-xs text-text-muted leading-snug">
                · {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
