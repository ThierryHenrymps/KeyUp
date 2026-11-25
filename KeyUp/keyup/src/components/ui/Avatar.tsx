export interface AvatarProps {
  name: string;
  icon?: string;
  size?: number;
}

export function Avatar({ name, icon, size = 20 }: AvatarProps) {
  const iconName = icon ? (icon as keyof typeof paths) : "key";
  const path = (paths as Record<string, string>)[iconName];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path ? <path d={path} /> : null}
      <text
        x={size / 2}
        y={size / 2}
        fill="currentColor"
        textAnchor="middle"
        dy="0.3em"
      >
        {name[0]}
      </text>
    </svg>
  );
}

const paths: Record<string, string> = {
  key: `<circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M16 7l3 3M14 9l2 2" />`,
  lock: `<rect x="5" y="11" width="14" height="9" rx="2.5" /><path d="M8 11V8a4 4 0 018 0v3" />`,
  file: `<path d="M7 3h7l5 5v12a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" /><path d="M14 3v5h5" />`,
  note: `<rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8M8 13h8M8 17h5" />`,
};