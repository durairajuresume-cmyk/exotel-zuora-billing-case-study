import { SlideShell } from './SlideShell';

const cases = [
  'Duplicate delivered callback',
  'Late delivery after billing cut-off',
  'Contract price changes mid-cycle',
  'Zuora API downtime',
  'Incorrect subscription mapping',
  'Usage after invoice closed',
  'Partial batch acceptance',
  'Multi-currency customer',
  'Tax rule changes',
  'Multiple products per customer',
  'Prepaid balance exhaustion',
  'Minimum commitment & overage',
  'Customer disputes an invoice',
  'Historical usage migration',
  'Replay without duplicate charges',
];

export function AppendixEdgeCases() {
  return (
    <SlideShell index={17} total={19} kicker="Appendix D · Edge cases" title="15 edge cases the platform is designed to handle" dense>
      <div className="grid grid-cols-3 gap-2 h-full content-center">
        {cases.map((c, i) => (
          <div key={c} className="text-xs text-text bg-white/[0.03] border border-border rounded-lg px-3 py-2 flex items-center gap-2">
            <span className="mono text-text-dim">{String(i + 1).padStart(2, '0')}</span>
            {c}
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
