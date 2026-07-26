import { Section, SubHeading } from '../../components/Section';
import { ReconciliationBars } from '../../components/ReconciliationBars';
import { ArrowRight } from 'lucide-react';

const detects = [
  'Missing usage',
  'Duplicate usage',
  'Rejected records',
  'Incorrect subscription mappings',
  'Contract-version mismatches',
  'Late-arriving usage',
  'Usage not included in the invoice',
  'Invoice quantity or amount differences',
];

const exceptionFlow = ['Detected', 'Assigned', 'Investigated', 'Corrected', 'Reconciled', 'Closed'];

export function Reconciliation() {
  return (
    <Section
      id="reconciliation"
      eyebrow="09 · Reconciliation"
      title="Three-way reconciliation"
      intro="A successful API call means Zuora accepted a batch — it does not mean the invoice is correct. Reconciliation compares three independent counts every cycle. The Reconciliation Service is a component within the Billing Integration Platform, not a separate ownership boundary — it operates on the same batches the platform submits."
    >
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-xs font-semibold text-text-dim mb-3">Before a bill run — two-way submission check</div>
          <ReconciliationBars exotel={980000} zuora={980000} invoice={null} unit="SMS" />
        </div>
        <div className="card p-4">
          <div className="text-xs font-semibold text-green mb-3">Matched example</div>
          <ReconciliationBars exotel={980000} zuora={980000} invoice={980000} unit="SMS" />
        </div>
        <div className="card p-4">
          <div className="text-xs font-semibold text-amber mb-3">Mismatch example — investigation required</div>
          <ReconciliationBars exotel={980000} zuora={979500} invoice={979500} unit="SMS" />
        </div>
      </div>
      <p className="text-text-muted text-sm leading-relaxed max-w-3xl">
        A batch only earns a MATCHED reconciliation status once all three numbers exist and agree. Before a bill run has actually rated it,
        the platform shows a two-way submission check (Exotel vs. Zuora) rather than presenting an incomplete three-way comparison as if it
        were a finished reconciliation — and it never renders a zero for "not yet known" the same way it renders a real, definitive zero.
      </p>

      <SubHeading>What the reconciliation service must detect</SubHeading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {detects.map((d) => (
          <div key={d} className="text-xs text-text-muted bg-white/[0.03] border border-border rounded-lg px-3 py-2">{d}</div>
        ))}
      </div>

      <SubHeading>Exception workflow</SubHeading>
      <div className="flex flex-wrap items-center gap-2">
        {exceptionFlow.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className="text-xs rounded-lg border border-border-light bg-surface-2 px-3 py-1.5">{s}</span>
            {i < exceptionFlow.length - 1 && <ArrowRight size={14} className="text-text-dim" />}
          </div>
        ))}
      </div>
      <p className="text-text-muted text-sm leading-relaxed max-w-3xl">
        Every exception is owned, aged, and closed with a documented correction — never silently absorbed into the next invoice. See the
        <span className="text-accent"> Reconciliation Exceptions</span> screen in the prototype for how Billing Ops works this queue day to day.
      </p>
    </Section>
  );
}
