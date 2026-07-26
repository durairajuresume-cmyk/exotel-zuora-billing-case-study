import { SlideShell } from './SlideShell';

export function AppendixSchema() {
  return (
    <SlideShell index={14} total={19} kicker="Appendix A · Sample data schema" title="Canonical usage record — full example" dense>
      <div className="h-full flex items-center justify-center">
        <pre className="mono text-xs text-text-muted leading-relaxed bg-black/20 border border-border rounded-xl p-6 max-w-xl">
{`usage_id: U-98765
tenant_id: SWIGGY-001
billing_account_id: BA-SWIGGY-001
subscription_id: SUB-SWIGGY-001
product: SMS
usage_metric: DELIVERED_SMS
quantity: 1
unit: SMS
usage_timestamp: 2026-07-22T14:02:11Z
source_object_id: MSG-12345
correlation_id: CAMPAIGN-789
geography: India
currency: INR
contract_version: PLAN-V3
billing_period: 2026-07
billing_usage_key: SWIGGY-001-MSG-12345-SMS_DELIVERY_CHARGE
batch_id: BATCH-SWIGGY-SMS-20260722
status: READY_FOR_BILLING`}
        </pre>
      </div>
    </SlideShell>
  );
}
