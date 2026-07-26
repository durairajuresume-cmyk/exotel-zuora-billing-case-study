import { SlideShell } from './SlideShell';
import { LifecycleDiagram } from '../diagrams/LifecycleDiagram';

export function AppendixLifecycle() {
  return (
    <SlideShell index={16} total={19} kicker="Appendix C · State machine" title="Full usage lifecycle, including failure states" dense>
      <div className="h-full flex items-center">
        <LifecycleDiagram />
      </div>
    </SlideShell>
  );
}
