interface BarRow {
  label: string;
  value: number;
  tone: 'cyan' | 'teal' | 'amber';
}

export function ReconciliationBars({ exotel, zuora, invoice, unit }: { exotel: number; zuora: number | null; invoice: number | null; unit: string }) {
  // Before a bill run has actually rated a batch, there is nothing to show as a completed
  // three-way reconciliation — showing a two-way submission check (or a single pending state)
  // is more honest than implying a match or mismatch that hasn't been determined yet.
  if (zuora === null) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-[140px_1fr_150px] items-center gap-3">
          <span className="text-xs text-text-muted">Exotel metered</span>
          <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full bg-cyan" style={{ width: '100%' }} />
          </div>
          <span className="mono text-xs text-text text-right tabular-nums">
            {exotel.toLocaleString('en-IN')} {unit}
          </span>
        </div>
        <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
          <span className="text-text-muted">Zuora response</span>
          <span className="mono font-semibold tabular-nums text-amber">Pending Zuora response</span>
        </div>
      </div>
    );
  }

  if (invoice === null) {
    // Two-way submission check: Zuora has responded, but no bill run has rated it yet.
    const max = Math.max(exotel, zuora, 1);
    const rows: BarRow[] = [
      { label: 'Exotel metered', value: exotel, tone: 'cyan' },
      { label: 'Zuora accepted', value: zuora, tone: 'teal' },
    ];
    const toneClass: Record<BarRow['tone'], string> = { cyan: 'bg-cyan', teal: 'bg-accent', amber: 'bg-amber' };
    const submissionDiff = exotel - zuora;
    return (
      <div className="space-y-3">
        <div className="text-[10px] uppercase tracking-wide text-text-dim">Two-way submission check — not yet rated into an invoice</div>
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[140px_1fr_150px] items-center gap-3">
            <span className="text-xs text-text-muted">{r.label}</span>
            <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div className={`h-full rounded-full ${toneClass[r.tone]}`} style={{ width: `${(r.value / max) * 100}%` }} />
            </div>
            <span className="mono text-xs text-text text-right tabular-nums">
              {r.value.toLocaleString('en-IN')} {unit}
            </span>
          </div>
        ))}
        <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
          <span className="text-text-muted">Submission difference (Exotel − Zuora)</span>
          <span className={`mono font-semibold tabular-nums ${submissionDiff === 0 ? 'text-green' : 'text-amber'}`}>
            {submissionDiff === 0 ? 'Matched · 0' : `${submissionDiff.toLocaleString('en-IN')} ${unit}`}
          </span>
        </div>
        <div className="text-xs text-text-dim">Invoice rated: Pending bill run</div>
      </div>
    );
  }

  const max = Math.max(exotel, zuora, invoice, 1);
  const rows: BarRow[] = [
    { label: 'Exotel metered', value: exotel, tone: 'cyan' },
    { label: 'Zuora accepted', value: zuora, tone: 'teal' },
    { label: 'Invoice rated', value: invoice, tone: 'amber' },
  ];
  const toneClass: Record<BarRow['tone'], string> = {
    cyan: 'bg-cyan',
    teal: 'bg-accent',
    amber: 'bg-amber',
  };
  const diff = exotel - invoice;

  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[140px_1fr_150px] items-center gap-3">
          <span className="text-xs text-text-muted">{r.label}</span>
          <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
            <div className={`h-full rounded-full ${toneClass[r.tone]}`} style={{ width: `${(r.value / max) * 100}%` }} />
          </div>
          <span className="mono text-xs text-text text-right tabular-nums">
            {r.value.toLocaleString('en-IN')} {unit}
          </span>
        </div>
      ))}
      <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
        <span className="text-text-muted">Difference (Exotel − Invoice)</span>
        <span className={`mono font-semibold tabular-nums ${diff === 0 ? 'text-green' : 'text-amber'}`}>
          {diff === 0 ? 'Matched · 0' : `${diff.toLocaleString('en-IN')} ${unit}`}
        </span>
      </div>
    </div>
  );
}
