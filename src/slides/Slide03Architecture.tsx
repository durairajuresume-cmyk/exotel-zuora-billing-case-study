import { SlideShell } from './SlideShell';
import { ArchitectureDiagram } from '../diagrams/ArchitectureDiagram';

export function Slide03Architecture() {
  return (
    <SlideShell index={4} total={19} kicker="Slide 4 · Architecture" title="Proposed system architecture and ownership" dense>
      <div className="h-full flex items-center justify-center">
        <div className="scale-[0.82] origin-center">
          <ArchitectureDiagram compact />
        </div>
      </div>
    </SlideShell>
  );
}
