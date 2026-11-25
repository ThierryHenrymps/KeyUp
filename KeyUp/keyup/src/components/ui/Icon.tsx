export type IconName = "key" | "lock" | "file" | "note" | "shield" | "sync" | "check" | "menu" | "close" | "home" | "chevron" | "plus" | "x" | "search" | "card" | "doc";

export const paths: Record<IconName, string> = {
  key: `<circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M16 7l3 3M14 9l2 2" />`,
  lock: `<rect x="5" y="11" width="14" height="9" rx="2.5" /><path d="M8 11V8a4 4 0 018 0v3" />`,
  file: `<path d="M7 3h7l5 5v12a1 1 0 01-1 1H7a1 1 0 011-1z" /><path d="M14 3v5h5" />`,
  note: `<rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8M8 13h8M8 17h5" />`,
  shield: `<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" />`,
  sync: `<path d="M20 7v4h-4M4 17v-4h4" /><path d="M6.5 9A7 7 0 0118 7.5L20 11M17.5 15A7 7 0 016 16.5L4 13" />`,
  check: `<path d="M5 12l4 4 10-10" />`,
  menu: `<path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" />`,
  close: `<path d="M6 6l12 12" /><path d="M18 6L6 18" />`,
  home: `<path d="M12 2L15 22H9z"/>`,
  chevron: `<path d="M18 15l-6-6L6 21"/>`,
  plus: `<path d="M9 9l6 6M9 15l6-6"/>`,
  x: `<path d="M18 6L6 18"/>`,
  search: `<path d="M21 21L21 3L3 3L3 21M21 21L3 3M21 3L3 21"/>`,
  card: `<path d="M16 7l3 3M14 9l2 2"/>`,
  doc: `<path d="M7 3h7l5 5v12a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"/>`,
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const path = paths[name];
  if (!path) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {path}
    </svg>
  );
}