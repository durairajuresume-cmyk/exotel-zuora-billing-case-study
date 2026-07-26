import { Boxes } from 'lucide-react';

// A subtle "which architecture component am I looking at" label. Keeps the prototype's screens
// legible against the case study's architecture diagram without repeating the whole diagram.
export function ComponentLabel({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-text-dim bg-white/[0.03] border border-border rounded-full px-2.5 py-1">
      <Boxes size={11} />
      {children}
    </div>
  );
}
