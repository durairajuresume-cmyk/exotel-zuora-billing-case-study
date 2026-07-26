import { SlideShell } from './SlideShell';

export function AppendixApiPayload() {
  return (
    <SlideShell index={15} total={19} kicker="Appendix B · API payload example" title="Billing Integration Layer → Zuora usage submission" dense>
      <div className="h-full flex items-center justify-center">
        <pre className="mono text-xs text-text-muted leading-relaxed bg-black/20 border border-border rounded-xl p-6 max-w-xl">
{`POST /v1/usage/batches
{
  "batch_id": "BATCH-SWIGGY-SMS-20260722",
  "account_id": "BA-SWIGGY-001",
  "subscription_id": "SUB-SWIGGY-001",
  "charge_id": "SMS_DELIVERED_CHARGE",
  "contract_version": "PLAN-V3",
  "uom": "SMS",
  "quantity": 4250000,
  "start_date": "2026-07-22",
  "end_date": "2026-07-22",
  "submission_idempotency_key": "BATCH-SWIGGY-SMS-20260722-v1",
  "payload_version": 1
}

200 OK
{
  "status": "ACCEPTED",
  "zuora_usage_id": "USG-88213",
  "accepted_quantity": 4250000
}`}
        </pre>
      </div>
    </SlideShell>
  );
}
