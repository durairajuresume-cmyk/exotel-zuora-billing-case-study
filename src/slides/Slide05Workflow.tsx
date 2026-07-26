import { SlideShell } from './SlideShell';
import { LifecycleDiagram } from '../diagrams/LifecycleDiagram';

export function Slide05Workflow() {
  return (
    <SlideShell index={6} total={19} kicker="Slide 6 · Workflow" title="End-to-end billing workflow" dense>
      <div className="h-full flex flex-col justify-center gap-6">
        <p className="text-sm text-text-muted max-w-3xl">
          SMS sent → SMS ID created → lifecycle events → metering validates Delivered → canonical usage record → billing batch → mapped to
          Zuora subscription → rated with plan, discounts, taxes → invoice generated → reconciled → published.
        </p>
        <LifecycleDiagram />
      </div>
    </SlideShell>
  );
}
