import type { ReactNode } from "react";

// static chrome glyphs not from the animated library
export function Stroke({
  children,
  size = 16,
  width = 2,
}: {
  children: ReactNode;
  size?: number;
  width?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

type P = { size?: number };

export const Search = ({ size = 20 }: P) => (
  <Stroke size={size}>
    <path d="m21 21-4.34-4.34" />
    <circle cx="11" cy="11" r="8" />
  </Stroke>
);

export const Filter = ({ size = 20 }: P) => (
  <Stroke size={size}>
    <path d="M2 5h20" />
    <path d="M6 12h12" />
    <path d="M9 19h6" />
  </Stroke>
);

export const Play = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.5 5.27a1 1 0 0 1 1.5-.87l10 6.73a1 1 0 0 1 0 1.74l-10 6.73a1 1 0 0 1-1.5-.87z" />
  </svg>
);

export const ChevronDown = ({ size = 16 }: P) => (
  <Stroke size={size}>
    <path d="m6 9 6 6 6-6" />
  </Stroke>
);

export const ArrowUpRight = ({ size = 14 }: P) => (
  <Stroke size={size}>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </Stroke>
);

export const Moon = ({ size = 12 }: P) => (
  <Stroke size={size}>
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
  </Stroke>
);

export const Sun = ({ size = 12 }: P) => (
  <Stroke size={size}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </Stroke>
);

export const RotateCcw = ({ size = 16 }: P) => (
  <Stroke size={size}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </Stroke>
);

export const Maximize = ({ size = 18 }: P) => (
  <Stroke size={size}>
    <path d="M15 3h6v6" />
    <path d="m21 3-7 7" />
    <path d="m3 21 7-7" />
    <path d="M9 21H3v-6" />
  </Stroke>
);

export const Copy = ({ size = 16 }: P) => (
  <Stroke size={size}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </Stroke>
);

export const Files = ({ size = 16 }: P) => (
  <Stroke size={size}>
    <path d="M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
    <path d="M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z" />
    <path d="M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1" />
  </Stroke>
);

export const Scissors = ({ size = 16 }: P) => (
  <Stroke size={size}>
    <circle cx="6" cy="6" r="3" />
    <path d="M8.12 8.12 12 12" />
    <path d="M20 4 8.12 15.88" />
    <circle cx="6" cy="18" r="3" />
    <path d="M14.8 14.8 20 20" />
  </Stroke>
);

export const Clipboard = ({ size = 16 }: P) => (
  <Stroke size={size}>
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </Stroke>
);

export const Calendar = ({ size = 18 }: P) => (
  <Stroke size={size}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </Stroke>
);

export const Folder = ({ size = 18 }: P) => (
  <Stroke size={size}>
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </Stroke>
);

export const FileText = ({ size = 18 }: P) => (
  <Stroke size={size}>
    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
    <path d="M14 2v5a1 1 0 0 0 1 1h5" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </Stroke>
);

export const Heart = ({ size = 18 }: P) => (
  <Stroke size={size}>
    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
  </Stroke>
);

export const MessageCircle = ({ size = 18 }: P) => (
  <Stroke size={size}>
    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
  </Stroke>
);

export const Bug = ({ size = 14 }: P) => (
  <Stroke size={size}>
    <path d="M12 20v-9" />
    <path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" />
    <path d="M14.12 3.88 16 2" />
    <path d="M21 21a4 4 0 0 0-3.81-4" />
    <path d="M21 5a4 4 0 0 1-3.55 3.97" />
    <path d="M22 13h-4" />
    <path d="M3 21a4 4 0 0 1 3.81-4" />
    <path d="M3 5a4 4 0 0 0 3.55 3.97" />
    <path d="M6 13H2" />
    <path d="m8 2 1.88 1.88" />
    <path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" />
  </Stroke>
);

export const Rocket = ({ size = 14 }: P) => (
  <Stroke size={size}>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
    <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
  </Stroke>
);

export const Plus = ({ size = 16 }: P) => (
  <Stroke size={size}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </Stroke>
);

export function Github({ size = 20 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

// react atom doubles as the jsx logo
export function ReactLogo({ size = 16 }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
    >
      <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
    </svg>
  );
}
