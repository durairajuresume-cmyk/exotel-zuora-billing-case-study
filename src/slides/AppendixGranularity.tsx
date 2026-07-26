import { SlideShell } from './SlideShell';
import { GranularityDiagram } from '../diagrams/GranularityDiagram';

export function AppendixGranularity() {
  return (
    <SlideShell index={18} total={19} kicker="Appendix E · Trade-off detail" title="Granular vs. aggregated usage comparison" dense>
      <div className="h-full flex items-center">
        <GranularityDiagram />
      </div>
    </SlideShell>
  );
}
