import type { IntegrationHealthSnapshot, TrendPoint } from '../types';

// Illustrative sample data only.
export const integrationHealth: IntegrationHealthSnapshot = {
  zuora_api_availability_pct: 99.94,
  api_success_rate_pct: 99.87,
  avg_submission_latency_ms: 842,
  queue_lag_seconds: 47,
  dead_letter_volume: 2,
  retry_rate_pct: 1.8,
  last_successful_sync: '2026-07-23T10:12:00Z',
  active_incidents: [
    {
      id: 'INC-2026-0143',
      title: 'Zuora usage-ingest API elevated timeouts (07:20–07:45 UTC)',
      severity: 'P2',
      started_at: '2026-07-22T07:20:00Z',
      status: 'Resolved — root cause: Zuora-side rate limit change. 2 batches recovered via automatic retry.',
    },
  ],
};

export const trendData: TrendPoint[] = [
  { period: 'Jan', invoice_accuracy_pct: 99.91, failed_batches: 14, reconciliation_mismatch_pct: 0.09, invoice_generation_hours: 6.4 },
  { period: 'Feb', invoice_accuracy_pct: 99.93, failed_batches: 11, reconciliation_mismatch_pct: 0.07, invoice_generation_hours: 5.8 },
  { period: 'Mar', invoice_accuracy_pct: 99.95, failed_batches: 9, reconciliation_mismatch_pct: 0.05, invoice_generation_hours: 5.1 },
  { period: 'Apr', invoice_accuracy_pct: 99.96, failed_batches: 8, reconciliation_mismatch_pct: 0.05, invoice_generation_hours: 4.6 },
  { period: 'May', invoice_accuracy_pct: 99.97, failed_batches: 6, reconciliation_mismatch_pct: 0.04, invoice_generation_hours: 4.2 },
  { period: 'Jun', invoice_accuracy_pct: 99.98, failed_batches: 5, reconciliation_mismatch_pct: 0.03, invoice_generation_hours: 3.7 },
  { period: 'Jul', invoice_accuracy_pct: 99.99, failed_batches: 3, reconciliation_mismatch_pct: 0.02, invoice_generation_hours: 3.1 },
];
