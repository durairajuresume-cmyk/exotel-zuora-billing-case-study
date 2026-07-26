import type { Invoice } from '../types';

// Illustrative sample data only — not real invoice or financial information.
// Invariant: for every invoice, subtotal_amount = sum(lines.amount); total_amount = subtotal_amount
// + tax_amount. Tax is modeled at a flat 18% (India GST on telecom services) for simplicity — no
// invoice here carries an amount that isn't explained by a visible line.
export const invoices: Invoice[] = [
  {
    invoice_id: 'INV-SWIGGY-202607',
    customer: 'Swiggy',
    billing_account_id: 'BA-SWIGGY-001',
    subscription_id: 'SUB-SWIGGY-001',
    billing_period: '2026-07',
    currency: 'INR',
    status: 'Posted',
    subtotal_amount: 1008208,
    tax_amount: 181477,
    total_amount: 1189685,
    issued_date: '2026-08-01',
    due_date: '2026-08-15',
    lines: [
      { line_id: 'LN-SWIGGY-1', product: 'SMS', usage_metric: 'DELIVERED_SMS', description: 'Delivered SMS — July 2026', quantity: 4250000, unit_rate: 0.14, amount: 595000, batch_id: 'BATCH-SWIGGY-SMS-20260722' },
      { line_id: 'LN-SWIGGY-2', product: 'VOICE', usage_metric: 'CONNECTED_MINUTES', description: 'Connected voice minutes — July 2026', quantity: 182400, unit_rate: 0.42, amount: 76608, batch_id: 'BATCH-SWIGGY-VOICE-20260722' },
      { line_id: 'LN-SWIGGY-3', product: 'WHATSAPP', usage_metric: 'WHATSAPP_CONVERSATION', description: 'WhatsApp marketing conversations — July 2026', quantity: 612000, unit_rate: 0.55, amount: 336600, batch_id: 'BATCH-SWIGGY-WA-20260721' },
    ],
  },
  // V1 demo invoice — Razorpay. Both lines fully accepted and matched (see usageBatches.ts);
  // subtotal_amount + tax_amount = total_amount exactly, and both lines share one billing
  // account / subscription, per the V1 commercial structure (one account, one subscription,
  // two usage-based rate-plan charges).
  {
    invoice_id: 'INV-RAZORPAY-202607',
    customer: 'Razorpay',
    billing_account_id: 'BA-RAZORPAY-003',
    subscription_id: 'SUB-RAZORPAY-003',
    billing_period: '2026-07',
    currency: 'INR',
    status: 'Posted',
    subtotal_amount: 160530,
    tax_amount: 28895,
    total_amount: 189425,
    issued_date: '2026-07-23',
    due_date: '2026-08-06',
    lines: [
      { line_id: 'LN-RZP-1', product: 'SMS', usage_metric: 'DELIVERED_SMS', description: 'Delivered SMS — July 2026', quantity: 980000, unit_rate: 0.16, amount: 156800, batch_id: 'BATCH-RAZORPAY-SMS-20260722' },
      { line_id: 'LN-RZP-2', product: 'VOICE', usage_metric: 'CONNECTED_MINUTES', description: 'Connected voice minutes — July 2026', quantity: 7460, unit_rate: 0.5, amount: 3730, batch_id: 'BATCH-RAZORPAY-VOICE-20260721' },
    ],
  },
  {
    invoice_id: 'INV-URBANCO-202607',
    customer: 'Urban Company',
    billing_account_id: 'BA-URBANCO-002',
    subscription_id: 'SUB-URBANCO-002',
    billing_period: '2026-07',
    currency: 'INR',
    status: 'Posted',
    subtotal_amount: 217530,
    tax_amount: 39155,
    total_amount: 256685,
    issued_date: '2026-08-01',
    due_date: '2026-08-15',
    lines: [
      { line_id: 'LN-UC-1', product: 'SMS', usage_metric: 'DELIVERED_SMS', description: 'Delivered SMS — July 2026', quantity: 1180000, unit_rate: 0.15, amount: 177000, batch_id: 'BATCH-URBANCO-SMS-20260722' },
      { line_id: 'LN-UC-2', product: 'VOICE', usage_metric: 'CONNECTED_MINUTES', description: 'Connected voice minutes — July 2026', quantity: 96500, unit_rate: 0.42, amount: 40530, batch_id: 'BATCH-URBANCO-VOICE-20260722' },
    ],
  },
  {
    invoice_id: 'INV-HDFC-202607',
    customer: 'HDFC Bank',
    billing_account_id: 'BA-HDFC-005',
    subscription_id: 'SUB-HDFC-005',
    billing_period: '2026-07',
    currency: 'INR',
    status: 'Posted',
    subtotal_amount: 1305592,
    tax_amount: 235007,
    total_amount: 1540599,
    issued_date: '2026-08-01',
    due_date: '2026-08-15',
    lines: [
      { line_id: 'LN-HDFC-1', product: 'SMS', usage_metric: 'DELIVERED_SMS', description: 'Delivered SMS — July 2026', quantity: 9800000, unit_rate: 0.13, amount: 1274000, batch_id: 'BATCH-HDFC-SMS-20260722' },
      { line_id: 'LN-HDFC-2', product: 'WHATSAPP', usage_metric: 'WHATSAPP_CONVERSATION', description: 'WhatsApp Business conversations — July 2026', quantity: 41200, unit_rate: 0.62, amount: 25544, batch_id: 'BATCH-HDFC-WA-20260722' },
      { line_id: 'LN-HDFC-3', product: 'CONVERSATIONAL_AI', usage_metric: 'AI_SESSION_MINUTES', description: 'Conversational AI session minutes — July 2026', quantity: 2880, unit_rate: 2.1, amount: 6048, batch_id: 'BATCH-HDFC-AI-20260721' },
    ],
  },
  // Apollo's Contact Center usage (BATCH-APOLLO-CC-20260722, see EXC-1041) is deliberately
  // excluded from this invoice — it failed submission and has not reconciled, so it carries no
  // rated quantity yet. It will appear as a next-cycle adjustment once resolved, per the
  // platform's correction principle (never silently edit a closed invoice).
  {
    invoice_id: 'INV-APOLLO-202607',
    customer: 'Apollo Hospitals',
    billing_account_id: 'BA-APOLLO-004',
    subscription_id: 'SUB-APOLLO-004',
    billing_period: '2026-07',
    currency: 'INR',
    status: 'Posted',
    subtotal_amount: 151300,
    tax_amount: 27234,
    total_amount: 178534,
    issued_date: '2026-08-01',
    due_date: '2026-08-15',
    lines: [
      { line_id: 'LN-APOLLO-1', product: 'SMS', usage_metric: 'DELIVERED_SMS', description: 'Delivered SMS — July 2026', quantity: 890000, unit_rate: 0.17, amount: 151300, batch_id: 'BATCH-APOLLO-SMS-20260722' },
    ],
  },
];

export const findInvoice = (invoice_id: string) => invoices.find((i) => i.invoice_id === invoice_id);
