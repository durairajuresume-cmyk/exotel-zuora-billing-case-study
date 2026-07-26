import type { TraceCampaign } from '../types';

// Illustrative sample data only. Models a realistic billing-verification inquiry:
// "Our delivery logs show two DELIVERED callbacks for the same message. Were we charged twice?"
export const traceCampaigns: TraceCampaign[] = [
  {
    campaign_id: 'CAMPAIGN-789',
    customer: 'Swiggy',
    product: 'SMS',
    invoice_id: 'INV-SWIGGY-202607',
    invoice_line_id: 'LN-SWIGGY-1',
    batch_id: 'BATCH-SWIGGY-SMS-CAMP789-20260718',
    usage_ids: ['U-97001'],
    sms_ids: ['MSG-12345'],
    billing_usage_key: 'SWIGGY-001+MSG-12345+SMS_DELIVERY_CHARGE',
    duplicate_detected: true,
    duplicate_billed: false,
    verification_outcome:
      'Not overcharged. The carrier sent a duplicate DELIVERED callback for MSG-12345, but the Metering Layer recognized it via event_dedupe_key before it ever reached the Canonical Usage Store, so only one usage record (U-97001) was ever created and only one unit was submitted to Zuora. Zuora never saw the duplicate — raw carrier callbacks never reach it. Share this trace with the customer to close the inquiry.',
    events: [
      { event_id: 'EVT-1', source_object_id: 'MSG-12345', event_type: 'SMS_SUBMITTED', timestamp: '2026-07-18T14:02:01Z', is_duplicate: false, event_dedupe_key: 'DEDUPE-MSG-12345-SUBMITTED' },
      { event_id: 'EVT-2', source_object_id: 'MSG-12345', event_type: 'SMS_DELIVERED', timestamp: '2026-07-18T14:02:11Z', is_duplicate: false, event_dedupe_key: 'DEDUPE-MSG-12345-DELIVERED' },
      { event_id: 'EVT-3', source_object_id: 'MSG-12345', event_type: 'SMS_DELIVERED (carrier retry callback)', timestamp: '2026-07-18T14:02:47Z', is_duplicate: true, event_dedupe_key: 'DEDUPE-MSG-12345-DELIVERED' },
    ],
  },
  {
    campaign_id: 'CAMPAIGN-641',
    customer: 'HDFC Bank',
    product: 'WHATSAPP',
    invoice_id: 'INV-HDFC-202607',
    invoice_line_id: 'LN-HDFC-2',
    batch_id: 'BATCH-HDFC-WA-20260722',
    usage_ids: ['U-66310'],
    sms_ids: ['WA-MSG-88213'],
    billing_usage_key: 'HDFC-005+WA-MSG-88213+WHATSAPP_CONVERSATION_CHARGE',
    duplicate_detected: false,
    duplicate_billed: false,
    verification_outcome: 'Not overcharged. Single conversation, single delivery event, single usage record, single charge — fully traceable end to end with no duplicate callback of any kind.',
    events: [
      { event_id: 'EVT-1', source_object_id: 'WA-MSG-88213', event_type: 'WHATSAPP_SENT', timestamp: '2026-07-22T09:14:02Z', is_duplicate: false, event_dedupe_key: 'DEDUPE-WA-MSG-88213-SENT' },
      { event_id: 'EVT-2', source_object_id: 'WA-MSG-88213', event_type: 'WHATSAPP_DELIVERED', timestamp: '2026-07-22T09:14:05Z', is_duplicate: false, event_dedupe_key: 'DEDUPE-WA-MSG-88213-DELIVERED' },
    ],
  },
];

export const findCampaign = (campaign_id: string) => traceCampaigns.find((c) => c.campaign_id === campaign_id);
