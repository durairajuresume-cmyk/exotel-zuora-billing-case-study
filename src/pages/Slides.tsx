import { useEffect, useRef, useState } from 'react';
import { Printer, ChevronUp, ChevronDown } from 'lucide-react';
import { Slide01Problem } from '../slides/Slide01Problem';
import { Slide02Users } from '../slides/Slide02Users';
import { Slide03DesignPrinciples } from '../slides/Slide03DesignPrinciples';
import { Slide03Architecture } from '../slides/Slide03Architecture';
import { Slide04UsageModel } from '../slides/Slide04UsageModel';
import { Slide05Workflow } from '../slides/Slide05Workflow';
import { Slide06Reliability } from '../slides/Slide06Reliability';
import { Slide07Prototype } from '../slides/Slide07Prototype';
import { Slide08V1Scope } from '../slides/Slide08V1Scope';
import { Slide09ExecutionPlan } from '../slides/Slide09ExecutionPlan';
import { Slide08Rollout } from '../slides/Slide08Rollout';
import { Slide09Metrics } from '../slides/Slide09Metrics';
import { Slide10Risks } from '../slides/Slide10Risks';
import { AppendixSchema } from '../slides/AppendixSchema';
import { AppendixApiPayload } from '../slides/AppendixApiPayload';
import { AppendixLifecycle } from '../slides/AppendixLifecycle';
import { AppendixEdgeCases } from '../slides/AppendixEdgeCases';
import { AppendixGranularity } from '../slides/AppendixGranularity';
import { AppendixAiRoadmap } from '../slides/AppendixAiRoadmap';
import clsx from 'clsx';

const slides = [
  { Component: Slide01Problem, label: '1. Problem' },
  { Component: Slide02Users, label: '2. Users & JTBD' },
  { Component: Slide03DesignPrinciples, label: '3. Design Principles' },
  { Component: Slide03Architecture, label: '4. Architecture' },
  { Component: Slide04UsageModel, label: '5. Usage model' },
  { Component: Slide05Workflow, label: '6. Workflow' },
  { Component: Slide06Reliability, label: '7. Reliability' },
  { Component: Slide07Prototype, label: '8. Prototype' },
  { Component: Slide08V1Scope, label: '9. V1 scope' },
  { Component: Slide09ExecutionPlan, label: '10. Execution plan' },
  { Component: Slide08Rollout, label: '11. Rollout' },
  { Component: Slide09Metrics, label: '12. Metrics' },
  { Component: Slide10Risks, label: '13. Risks' },
  { Component: AppendixSchema, label: 'A. Schema' },
  { Component: AppendixApiPayload, label: 'B. API payload' },
  { Component: AppendixLifecycle, label: 'C. Lifecycle' },
  { Component: AppendixEdgeCases, label: 'D. Edge cases' },
  { Component: AppendixGranularity, label: 'E. Granularity' },
  { Component: AppendixAiRoadmap, label: 'F. AI roadmap' },
];

export function Slides() {
  const [active, setActive] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const idx = slideRefs.current.findIndex((el) => el === visible[0].target);
          if (idx !== -1) setActive(idx);
        }
      },
      { threshold: 0.6 },
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goTo(idx: number) {
    const clamped = Math.max(0, Math.min(slides.length - 1, idx));
    slideRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') goTo(active + 1);
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') goTo(active - 1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
      <div className="no-print flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-text">Presentation deck</h1>
          <p className="text-sm text-text-muted mt-0.5">13 core slides + 6 appendix slides. Scroll, use arrow keys, or print to export as PDF.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-accent text-bg font-semibold text-sm px-4 py-2.5 hover:bg-accent-dim transition-colors"
        >
          <Printer size={16} /> Export to PDF
        </button>
      </div>

      <div className="grid lg:grid-cols-[200px_1fr] gap-6">
        <aside className="no-print hidden lg:block">
          <nav className="sticky top-20 space-y-0.5 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">
            {slides.map((s, i) => (
              <button
                key={s.label}
                onClick={() => goTo(i)}
                className={clsx(
                  'w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors border-l-2',
                  active === i ? 'border-accent text-accent bg-accent-soft' : 'border-transparent text-text-muted hover:text-text',
                )}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="space-y-8">
          {slides.map(({ Component }, i) => (
            <div key={i} ref={(el) => { slideRefs.current[i] = el; }}>
              <Component />
            </div>
          ))}
        </div>
      </div>

      <div className="no-print fixed bottom-6 right-6 flex flex-col gap-2 z-40">
        <button onClick={() => goTo(active - 1)} className="h-9 w-9 flex items-center justify-center rounded-full bg-surface-2 border border-border-light text-text-muted hover:text-accent">
          <ChevronUp size={16} />
        </button>
        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-surface-2 border border-border-light text-xs mono text-text">
          {active + 1}
        </div>
        <button onClick={() => goTo(active + 1)} className="h-9 w-9 flex items-center justify-center rounded-full bg-surface-2 border border-border-light text-text-muted hover:text-accent">
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}
