import { NavLink } from 'react-router-dom';
import { Radio } from 'lucide-react';
import clsx from 'clsx';

const links = [
  { to: '/', label: 'Overview', end: true },
  { to: '/case-study', label: 'Case Study' },
  { to: '/prototype', label: 'Prototype' },
  { to: '/slides', label: 'Slide Deck' },
];

export function TopNav() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-soft border border-accent/40">
            <Radio size={15} className="text-accent" />
          </span>
          <span className="font-semibold text-sm text-text hidden sm:inline">Exotel × Zuora</span>
          <span className="text-xs text-text-dim hidden md:inline">Billing Integration</span>
        </NavLink>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                clsx(
                  'px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  isActive ? 'bg-accent-soft text-accent' : 'text-text-muted hover:text-text hover:bg-white/5',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
