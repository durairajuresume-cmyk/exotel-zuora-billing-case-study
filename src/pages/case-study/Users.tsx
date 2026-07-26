import { Section, Callout } from '../../components/Section';
import { Landmark, Headset, Users2, Code2, Building2, UserCheck } from 'lucide-react';

const users = [
  {
    icon: Landmark,
    role: 'Finance',
    painPoint: 'Cannot close the books with confidence when invoice totals don’t reconcile against metered usage.',
    jtbd: 'When the billing cycle closes, I need invoice-to-usage parity so I can close books on time without a manual audit.',
  },
  {
    icon: Headset,
    role: 'Billing Operations',
    painPoint: 'Spends hours per cycle manually cross-checking usage exports against Zuora invoices with spreadsheets.',
    jtbd: 'When a batch fails or a number looks off, I need to trace it to the source event in minutes, not days.',
  },
  {
    icon: Users2,
    role: 'Customer Support',
    painPoint: 'Cannot answer "why was I billed this much" without escalating to engineering.',
    jtbd: 'When a customer disputes a charge, I need a self-serve trace from invoice line to source event to respond same-day.',
  },
  {
    icon: Code2,
    role: 'Product & Engineering',
    painPoint: 'Every new product (e.g. Conversational AI) requires custom, one-off billing plumbing.',
    jtbd: 'When we launch a new product, I need to plug it into an existing usage schema instead of building new billing pipes.',
  },
  {
    icon: Building2,
    role: 'Enterprise customers',
    painPoint: 'Receive invoices they cannot independently verify against their own usage logs.',
    jtbd: 'When I receive an invoice, I need confidence it reflects exactly what I consumed, with a way to dispute specific line items.',
  },
  {
    icon: UserCheck,
    role: 'Account Managers',
    painPoint: 'Get pulled into billing disputes they have no tools to investigate or resolve.',
    jtbd: 'When a customer raises a billing concern, I need an answer I can trust without going back and forth with engineering.',
  },
];

export function Users() {
  return (
    <Section
      id="users"
      eyebrow="02 · Users"
      title="Users, pain points, and jobs to be done"
      intro="Six stakeholder groups depend on this integration working correctly, each with a distinct job to be done when something goes wrong."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {users.map((u) => (
          <div key={u.role} className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <u.icon size={17} className="text-accent shrink-0" />
              <h4 className="font-semibold text-text text-sm">{u.role}</h4>
            </div>
            <p className="text-xs text-text-muted mb-2">
              <span className="text-red font-medium">Pain point — </span>
              {u.painPoint}
            </p>
            <p className="text-xs text-text-muted">
              <span className="text-accent font-medium">Job to be done — </span>
              {u.jtbd}
            </p>
          </div>
        ))}
      </div>

      <Callout>
        <strong>V1 user scope:</strong> the four-week Integration Proof is used directly by Finance, Billing Operations, and Support.
        Enterprise customers benefit through accurate invoices and evidence Support can share — but a customer-facing self-service
        usage/traceability portal is Post-V1, not part of the four-week build.
      </Callout>
    </Section>
  );
}
