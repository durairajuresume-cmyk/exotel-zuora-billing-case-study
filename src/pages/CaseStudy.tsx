import { useEffect, useState } from 'react';
import { ExecutiveSummary } from './case-study/ExecutiveSummary';
import { Objective } from './case-study/Objective';
import { Users } from './case-study/Users';
import { Principles } from './case-study/Principles';
import { Architecture } from './case-study/Architecture';
import { UsageModel } from './case-study/UsageModel';
import { Granularity } from './case-study/Granularity';
import { Idempotency } from './case-study/Idempotency';
import { Workflow } from './case-study/Workflow';
import { Reconciliation } from './case-study/Reconciliation';
import { EdgeCases } from './case-study/EdgeCases';
import { AiNative } from './case-study/AiNative';
import { V1Scope } from './case-study/V1Scope';
import { Rollout } from './case-study/Rollout';
import { Metrics } from './case-study/Metrics';
import { Risks } from './case-study/Risks';
import clsx from 'clsx';

const toc = [
  { id: 'executive-summary', label: 'Executive summary' },
  { id: 'objective', label: 'Problem & objective' },
  { id: 'users', label: 'Users & JTBD' },
  { id: 'principles', label: 'Product principles' },
  { id: 'architecture', label: 'System architecture' },
  { id: 'usage-model', label: 'Canonical usage model' },
  { id: 'granularity', label: 'Usage granularity' },
  { id: 'idempotency', label: 'Idempotency' },
  { id: 'workflow', label: 'End-to-end workflow' },
  { id: 'reconciliation', label: 'Reconciliation' },
  { id: 'edge-cases', label: 'Edge cases' },
  { id: 'ai-native', label: 'AI-native future' },
  { id: 'v1-scope', label: 'V1 scope (4-week build)' },
  { id: 'rollout', label: 'MVP & rollout' },
  { id: 'metrics', label: 'Success metrics' },
  { id: 'risks', label: 'Risks & trade-offs' },
];

export function CaseStudy() {
  const [active, setActive] = useState('executive-summary');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    );
    toc.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid lg:grid-cols-[220px_1fr] gap-8">
      <aside className="no-print hidden lg:block">
        <nav className="sticky top-20 space-y-0.5">
          <div className="text-xs font-semibold uppercase tracking-widest text-text-dim mb-3 px-3">On this page</div>
          {toc.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className={clsx(
                'block px-3 py-1.5 rounded-lg text-sm transition-colors border-l-2',
                active === t.id ? 'border-accent text-accent bg-accent-soft' : 'border-transparent text-text-muted hover:text-text',
              )}
            >
              {t.label}
            </a>
          ))}
        </nav>
      </aside>

      <div className="min-w-0">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Product Case Study</div>
          <h1 className="text-2xl md:text-4xl font-semibold text-text mb-3">
            Exotel × Zuora billing integration platform
          </h1>
          <p className="text-text-muted max-w-3xl">
            A complete design for connecting Exotel's communication usage systems to Zuora's billing engine — covering architecture, data
            model, reliability, reconciliation, rollout, and metrics.
          </p>
        </div>

        <ExecutiveSummary />
        <Objective />
        <Users />
        <Principles />
        <Architecture />
        <UsageModel />
        <Granularity />
        <Idempotency />
        <Workflow />
        <Reconciliation />
        <EdgeCases />
        <AiNative />
        <V1Scope />
        <Rollout />
        <Metrics />
        <Risks />
      </div>
    </div>
  );
}
