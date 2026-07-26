import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, intro, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-12 border-b border-border last:border-b-0">
      <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">{eyebrow}</div>
      <h2 className="text-2xl md:text-3xl font-semibold text-text mb-4">{title}</h2>
      {intro && <div className="text-text-muted leading-relaxed mb-6 max-w-3xl">{intro}</div>}
      <div className="space-y-6">{children}</div>
    </section>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-semibold text-text mt-2">{children}</h3>;
}

export function Callout({ children, tone = 'accent' }: { children: ReactNode; tone?: 'accent' | 'amber' }) {
  const toneClasses = tone === 'accent' ? 'border-accent/40 bg-accent-soft text-text' : 'border-amber/40 bg-amber/5 text-text';
  return <div className={`rounded-xl border ${toneClasses} px-4 py-3 text-sm leading-relaxed`}>{children}</div>;
}
