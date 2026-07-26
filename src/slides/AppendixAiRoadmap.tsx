import { SlideShell } from './SlideShell';
import { Bot, SearchCheck, TrendingDown, Activity, Sparkles } from 'lucide-react';

const capabilities = [
  { icon: Bot, title: 'AI Billing Copilot', body: 'Answers "why was I charged" in plain language, backed by real records.' },
  { icon: SearchCheck, title: 'AI Dispute RCA', body: 'Auto-traces Invoice → Charge → Usage → Source Event.' },
  { icon: TrendingDown, title: 'Revenue Leakage Detector', body: 'Compares Events → Metering → Zuora → Invoice.' },
  { icon: Activity, title: 'Anomaly Detection', body: 'Flags spikes, odd discounts, missing batches, duplicate usage.' },
  { icon: Sparkles, title: 'Finance Ops Assistant', body: 'Recommends retries, mapping fixes, credit notes — human-approved.' },
];

export function AppendixAiRoadmap() {
  return (
    <SlideShell index={19} total={19} kicker="Appendix F · AI roadmap" title="Future AI-native billing capabilities" dense>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-full content-center">
        {capabilities.map((c) => (
          <div key={c.title} className="card p-4">
            <c.icon size={18} className="text-accent mb-2" />
            <h4 className="font-semibold text-sm text-text mb-1">{c.title}</h4>
            <p className="text-xs text-text-muted leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
