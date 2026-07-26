import { Filter } from 'lucide-react';

interface FilterSelect {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}

export function FilterBar({ filters, resultCount }: { filters: FilterSelect[]; resultCount?: number }) {
  return (
    <div className="card p-3 flex flex-wrap items-center gap-3 mb-4">
      <div className="flex items-center gap-1.5 text-xs text-text-dim shrink-0">
        <Filter size={13} />
        Filters
      </div>
      {filters.map((f) => (
        <select
          key={f.label}
          value={f.value}
          onChange={(e) => f.onChange(e.target.value)}
          className="bg-surface-2 border border-border-light rounded-lg text-xs text-text px-2.5 py-1.5 focus:outline-none focus:border-accent/60 cursor-pointer"
        >
          <option value="All">{f.label}: All</option>
          {f.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ))}
      {resultCount !== undefined && <span className="text-xs text-text-dim ml-auto">{resultCount} results</span>}
    </div>
  );
}
