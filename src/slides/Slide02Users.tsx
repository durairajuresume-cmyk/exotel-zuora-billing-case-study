import { SlideShell } from './SlideShell';
import { Landmark, Headset, Users2, Code2, Building2, UserCheck } from 'lucide-react';

const users = [
  { icon: Landmark, role: 'Finance', pain: 'Cannot close books without a manual audit against usage.' },
  { icon: Headset, role: 'Billing Ops', pain: 'Manually cross-checks usage exports vs invoices every cycle.' },
  { icon: Users2, role: 'Customer Support', pain: 'Can’t explain a bill without escalating to engineering.' },
  { icon: Code2, role: 'Product & Engineering', pain: 'Every new product needs custom billing plumbing.' },
  { icon: Building2, role: 'Enterprise customers', pain: 'Can’t independently verify invoices against their own logs.' },
  { icon: UserCheck, role: 'Account Managers', pain: 'Get pulled into disputes with no tools to resolve them.' },
];

export function Slide02Users() {
  return (
    <SlideShell index={2} total={19} kicker="Slide 2 · Users" title="Users, pain points, and jobs to be done">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-full content-center">
        {users.map((u) => (
          <div key={u.role} className="card p-4">
            <u.icon size={18} className="text-accent mb-2" />
            <h4 className="font-semibold text-sm text-text mb-1">{u.role}</h4>
            <p className="text-xs text-text-muted leading-relaxed">{u.pain}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
