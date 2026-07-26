// Core domain types for the Exotel <> Zuora billing integration case study.
// All data using these types is illustrative / synthetic sample data.

export type Product =
  | 'SMS'
  | 'VOICE'
  | 'WHATSAPP'
  | 'CONVERSATIONAL_AI'
  | 'CONTACT_CENTER';

export type UsageMetric =
  | 'DELIVERED_SMS'
  | 'CONNECTED_MINUTES'
  | 'WHATSAPP_CONVERSATION'
  | 'AI_SESSION_MINUTES'
  | 'AGENT_SEAT_MINUTES';

export type LifecycleState =
  | 'CREATED'
  | 'VALIDATED'
  | 'READY_FOR_BILLING'
  | 'BATCHED'
  | 'SENT_TO_ZUORA'
  | 'ACCEPTED_BY_ZUORA'
  | 'RATED'
  | 'INVOICED'
  | 'RECONCILED';

export type FailureState =
  | 'FAILED_VALIDATION'
  | 'FAILED_MAPPING'
  | 'FAILED_SUBMISSION'
  | 'DEAD_LETTER'
  | 'RECONCILIATION_MISMATCH';

export type UsageStatus = LifecycleState | FailureState;

// Three distinct idempotency concepts — deliberately separate types, because they protect
// against three different failure modes and operate at three different layers:
//   1. event_dedupe_key   — Metering Layer. Stops the same raw callback being processed twice.
//   2. billing_usage_key  — Canonical Usage Store. Stops one billable action from producing
//                            more than one usage record. Built only from immutable facts
//                            (tenant, source object, billing rule) — never contract_version,
//                            which is a rating attribute that can be corrected after the fact.
//   3. submission_idempotency_key — Billing Integration Layer. Stops the same batch payload
//                            being submitted to Zuora twice. Built from batch_id + payload_version.
export interface UsageRecord {
  usage_id: string;
  tenant_id: string;
  billing_account_id: string;
  subscription_id: string;
  product: Product;
  usage_metric: UsageMetric;
  quantity: number;
  unit: string;
  usage_timestamp: string;
  source_object_id: string;
  correlation_id: string;
  campaign_id?: string;
  geography: string;
  currency: string;
  contract_version: string;
  billing_period: string;
  billing_usage_key: string;
  batch_id: string;
  status: UsageStatus;
  created_at: string;
  updated_at: string;
}

export type BatchSubmissionStatus =
  | 'PENDING'
  | 'SUBMITTED'
  | 'ACCEPTED'
  | 'PARTIALLY_ACCEPTED'
  | 'REJECTED'
  | 'FAILED'
  | 'DEAD_LETTER';

export type ReconciliationStatus =
  | 'MATCHED'
  | 'MISMATCH'
  | 'PENDING'
  | 'INVESTIGATING'
  | 'RESOLVED';

export interface AuditEvent {
  timestamp: string;
  actor: string;
  action: string;
  detail: string;
}

export interface UsageBatch {
  batch_id: string;
  // Lineage for corrected resubmissions: a child batch that resubmits a rejected subset of
  // parent_batch_id retains a pointer back to it, and reuses the SAME canonical usage_record_ids
  // — it is a resubmission of the same billable usage, not a new logical usage event.
  parent_batch_id?: string;
  customer: string;
  tenant_id: string;
  product: Product;
  usage_metric: UsageMetric;
  quantity: number;
  unit: string;
  billing_window: string;
  contract_version: string;
  pricing_plan: string;
  // batch_id + payload_version. A network retry of the identical payload reuses this key
  // unchanged (payload_version does not increment). A corrected resubmission of a rejected
  // subset is a *different batch* (its own batch_id) with its own submission_idempotency_key —
  // see parent_batch_id for the lineage pointer back to the original.
  submission_idempotency_key: string;
  payload_version: number;
  zuora_submission_status: BatchSubmissionStatus;
  retry_count: number;
  submission_attempts: { attempt: number; timestamp: string; result: string; response_code: string }[];
  reconciliation_status: ReconciliationStatus;
  invoice_id: string | null;
  exotel_metered_quantity: number;
  // null = not yet known (batch is PENDING/SUBMITTED, awaiting a Zuora response) — distinct
  // from 0, which means Zuora responded and accepted none of it.
  zuora_accepted_quantity: number | null;
  // null = not yet rated — no bill run has run against this batch yet. Only becomes a number
  // once Zuora has actually rated the accepted usage into an invoice line.
  invoice_rated_quantity: number | null;
  last_updated: string;
  usage_record_ids: string[];
  audit_timeline: AuditEvent[];
}

export type ExceptionType =
  | 'MISSING_USAGE'
  | 'DUPLICATE_USAGE'
  | 'REJECTED_RECORD'
  | 'SUBSCRIPTION_MAPPING_ERROR'
  | 'CONTRACT_VERSION_MISMATCH'
  | 'LATE_ARRIVING_USAGE'
  | 'USAGE_EXCLUDED_FROM_INVOICE'
  | 'INVOICE_AMOUNT_DIFFERENCE';

export type ExceptionStatus = 'Detected' | 'Assigned' | 'Investigated' | 'Corrected' | 'Reconciled' | 'Closed';

export interface ExceptionRootCause {
  what_happened: string;
  why_it_happened: string;
  business_impact: string;
  current_resolution: string;
}

export interface RecommendedCorrection {
  steps: string[];
  expected_impact: string;
}

export interface ReconciliationException {
  exception_id: string;
  customer: string;
  product: Product;
  billing_period: string;
  exception_type: ExceptionType;
  // For a prevented duplicate (idempotency worked), this is 0 — a suppressed duplicate is not
  // an open billable discrepancy. duplicate_callbacks_observed carries the raw-event count instead.
  quantity_difference: number;
  revenue_impact: number;
  currency: string;
  owner: string;
  age_days: number;
  status: ExceptionStatus;
  // Set only for idempotency-audit records: duplicate callbacks were observed but suppressed
  // before they became billable usage, so there is no revenue-impacting mismatch to open.
  duplicate_callbacks_observed?: number;
  duplicate_billing_occurred?: boolean;
  // Lineage — lets the Billing Ops user jump straight to the source of the problem instead of
  // manually searching the batch list or invoice explorer.
  batch_id?: string;
  retry_batch_id?: string;
  invoice_id?: string;
  affected_usage_record_ids: string[];
  root_cause: ExceptionRootCause;
  recommended_action: RecommendedCorrection;
  investigation_timeline: AuditEvent[];
}

export interface InvoiceLine {
  line_id: string;
  product: Product;
  usage_metric: UsageMetric;
  description: string;
  quantity: number;
  unit_rate: number;
  amount: number;
  batch_id: string;
}

export interface Invoice {
  invoice_id: string;
  customer: string;
  billing_account_id: string;
  subscription_id: string;
  billing_period: string;
  currency: string;
  status: 'Draft' | 'Posted' | 'Paid' | 'Disputed' | 'Overdue';
  // total_amount must always equal the sum of `lines` amounts plus tax_amount (minus credits,
  // if any) — every rupee on an invoice must be explained by a visible line. No invoice may
  // claim full traceability while carrying an amount its lines don't account for.
  subtotal_amount: number;
  tax_amount: number;
  total_amount: number;
  issued_date: string;
  due_date: string;
  lines: InvoiceLine[];
}

export interface Customer {
  tenant_id: string;
  name: string;
  logo_initial: string;
  industry: string;
  billing_account_id: string;
  subscription_id: string;
  products: Product[];
  billing_cycle: 'Monthly' | 'Bi-weekly';
  currency: string;
  region: string;
  contract_version: string;
  usage_this_period: { product: Product; metric: UsageMetric; quantity: number; unit: string }[];
  // Deliberately no stored "expected_invoice" field — Customer Billing Summary sources that
  // number live from the actual Invoice record (Zuora's rating output), so the UI never implies
  // Exotel independently computed a financial total. previous_invoice is a posted, historical fact.
  previous_invoice: number;
  usage_change_pct: number;
  open_disputes: number;
  credits_outstanding: number;
  payment_status: 'Current' | 'Overdue' | 'At Risk';
}

export interface CampaignTraceEvent {
  event_id: string;
  source_object_id: string;
  event_type: string;
  timestamp: string;
  is_duplicate: boolean;
  // Event-level idempotency key — stops the Metering Layer from processing this exact callback
  // twice. Distinct from billing_usage_key, which governs whether a *usage record* gets created.
  event_dedupe_key: string;
}

export interface TraceCampaign {
  campaign_id: string;
  customer: string;
  product: Product;
  invoice_id: string;
  invoice_line_id: string;
  batch_id: string;
  usage_ids: string[];
  sms_ids: string[];
  billing_usage_key: string;
  events: CampaignTraceEvent[];
  duplicate_detected: boolean;
  duplicate_billed: boolean;
  verification_outcome: string;
}

export interface IntegrationHealthSnapshot {
  zuora_api_availability_pct: number;
  api_success_rate_pct: number;
  avg_submission_latency_ms: number;
  queue_lag_seconds: number;
  dead_letter_volume: number;
  retry_rate_pct: number;
  last_successful_sync: string;
  active_incidents: { id: string; title: string; severity: 'P1' | 'P2' | 'P3'; started_at: string; status: string }[];
}

export interface TrendPoint {
  period: string;
  invoice_accuracy_pct: number;
  failed_batches: number;
  reconciliation_mismatch_pct: number;
  invoice_generation_hours: number;
}
