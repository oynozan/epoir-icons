"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Icon } from "../icon.js";
import type { IconProps } from "../types.js";
import { drawFlow, drawRev } from "../variants.js";

// Play once, no fade, no shrink. Only genuine spinners loop. Icons that flow,
// emanate, build, or reveal are DRAWN (drawFlow) instead of faking motion.
const E = "easeInOut";
const R = { ease: E } as const;
const LOOP = { repeat: Infinity, ease: "linear" } as const;

const spin: Variants = { normal: { rotate: 0 }, animate: { rotate: [0, 360], transition: { duration: 1.4, ...LOOP } } };
const spinOnce: Variants = { normal: { rotate: 0 }, animate: { rotate: [0, 360], transition: { duration: 0.9, ...R } } };
const shift: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[]) => ({ x: [0, c[0], 0], y: [0, c[1], 0], transition: { duration: c[3] || 0.6, delay: c[2] || 0, ...R } }),
};
// weight settles onto/into a surface: press then a small rebound
const settle: Variants = {
  normal: { y: 0 },
  animate: (c: number[]) => ({ y: [0, c[0], c[0] * -0.3, 0], transition: { duration: c[1] || 0.75, ...R } }),
};
// a single droplet dips and returns; stagger delays make a falling spray
const drip: Variants = {
  normal: { y: 0 },
  animate: (c: number[]) => ({ y: [0, 3, 0], transition: { duration: 0.55, delay: c[0] || 0, ...R } }),
};
// a dispensed drip: appears at the spout as the pump bottoms out, falls, dissipates
const dripFall: Variants = {
  normal: { opacity: 0 },
  animate: {
    y: [0, 4.2],
    opacity: [0, 1, 1, 0],
    transition: {
      y: { duration: 0.7, delay: 0.35, ease: "easeIn" },
      opacity: { duration: 0.7, delay: 0.35, times: [0, 0.12, 0.75, 1] },
    },
  },
};
// the droplet glyph plumps as the drip joins it (grow-only, stays in place)
const plump: Variants = {
  normal: { scale: 1 },
  animate: { scale: [1, 1.07, 1], transition: { duration: 0.35, delay: 0.95, ...R } },
};
// blender contents churn: the liquid line sloshes continuously — a full 360
// spin swept it through the jar walls and lid, so it slosh-loops instead
const churn: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -16, 14, 0], transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" } },
};
const sway: Variants = { normal: { rotate: 0 }, animate: { rotate: [0, -6, 6, -3, 0], transition: { duration: 0.9, ...R } } };
const rock: Variants = { normal: { rotate: 0 }, animate: { rotate: [0, -9, 9, -6, 4, 0], transition: { duration: 1.1, ...R } } };
const ring: Variants = { normal: { rotate: 0 }, animate: { rotate: [0, -12, 10, -7, 4, 0], transition: { duration: 0.9, ...R } } };
const flicker: Variants = { normal: { rotate: 0 }, animate: { rotate: [0, -8, 8, -4, 3, 0], transition: { duration: 0.8, ...R } } };
const shake: Variants = { normal: { x: 0 }, animate: { x: [0, -2, 2, -1.5, 1, 0], transition: { duration: 0.55, ...R } } };
const sketch: Variants = { normal: { x: 0, y: 0 }, animate: { x: [0, 1.6, -1.6, 0], y: [0, -1.6, 1.6, 0], transition: { duration: 0.75, ...R } } };
const swingDoor: Variants = { normal: { rotateY: 0 }, animate: { rotateY: [0, -34, 0], transition: { duration: 1, ...R } } };
// lub-dub, grow-only (never below rest)
const beat: Variants = { normal: { scale: 1 }, animate: { scale: [1, 1.18, 1, 1.12, 1], transition: { duration: 0.7, ...R } } };
const hammerSwing: Variants = { normal: { rotate: 0 }, animate: { rotate: [0, -18, 9, 0], transition: { duration: 0.75, ...R, times: [0, 0.42, 0.65, 1] } } };
const dialTurn: Variants = { normal: { rotate: 0 }, animate: { rotate: [0, -45, 0], transition: { duration: 0.9, ...R } } };
// looping downward bob for a continuous spray of droplets. custom=[delay]
const spray: Variants = { normal: { y: 0 }, animate: (c: number[]) => ({ y: [0, 3, 0], transition: { duration: 0.9, delay: c[0] || 0, repeat: Infinity, ...R } }) };
// continuous sloshing water
// slosh amplitude capped at 1 so the wave's round caps stay inside the viewBox
const waveLoop: Variants = { normal: { x: 0 }, animate: { x: [0, 1, 0, -1, 0], transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } } };
// the tonearm swings onto the record, tracks a moment, then lifts back home
const needle: Variants = { normal: { rotate: 0 }, animate: { rotate: [0, 24, 21, 24, 0], transition: { duration: 1.7, ease: "easeInOut", times: [0, 0.35, 0.55, 0.75, 1] } } };
// the whole thing gives a quick pop-up hop with a small landing bounce
const hop: Variants = { normal: { y: 0 }, animate: { y: [0, -1.2, 0, -0.35, 0], transition: { duration: 0.65, ...R, times: [0, 0.3, 0.6, 0.8, 1] } } };
// contents rattle: tip over from the base and swing back. custom=[delay, degrees]
const rattle: Variants = {
  normal: { rotate: 0 },
  animate: (c: number[] = []) => ({ rotate: [0, c[1] ?? -7, (c[1] ?? -7) * -0.5, 0], transition: { duration: 0.6, delay: c[0] ?? 0.05, ...R } }),
};
// a splash droplet: launches up-and-out on a little parabola, falls back, fades.
// custom=[dx, dy(peak, negative=up), delay]
const splashUp: Variants = {
  normal: { opacity: 0 },
  animate: (c: number[]) => ({
    x: [0, c[0] * 0.65, c[0]],
    y: [0, c[1], c[1] * 0.3],
    opacity: [0, 1, 1, 0],
    transition: {
      x: { duration: 0.6, delay: c[2] ?? 0, ease: "easeOut", times: [0, 0.5, 1] },
      y: { duration: 0.6, delay: c[2] ?? 0, ease: ["easeOut", "easeIn"], times: [0, 0.5, 1] },
      opacity: { duration: 0.6, delay: c[2] ?? 0, times: [0, 0.15, 0.7, 1] },
    },
  }),
};

// ---- Emitted ephemera --------------------------------------------------
// Flourish elements (rays, sparks, particles, pulses) that DON'T exist in the
// exported body. They are invisible at rest (opacity 0) so the rest frame still
// matches the lucide source, and only appear during the hover animation. Fade
// is allowed here because these are ephemera that genuinely dissipate.

// a ray shoots from its near point out to its far point, then fades
const rayLine: Variants = {
  normal: { opacity: 0 },
  animate: (c: number[]) => ({
    x2: [c[0], c[2]],
    y2: [c[1], c[3]],
    opacity: [0, 1, 1, 0],
    transition: { duration: c[5] ?? 0.7, delay: c[4] ?? 0, ...R, times: [0, 0.3, 0.65, 1] },
  }),
};
// an arc/stroke that draws on and fades, looping — a continuous broadcast pulse
const pulseDraw: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: (c: number[] = []) => ({
    pathLength: [0, 1],
    opacity: [0, 1, 1, 0],
    transition: { duration: c[1] ?? 1.1, delay: c[0] ?? 0, repeat: Infinity, ease: "easeOut", times: [0, 0.4, 0.7, 1] },
  }),
};
// an expanding ring ripple from a point: radius grows and fades. custom=[delay,dur,r0,r1]
const ripple: Variants = {
  normal: { opacity: 0 },
  animate: (c: number[] = []) => ({
    r: [c[2] ?? 1, c[3] ?? 8],
    opacity: [0.75, 0],
    transition: { duration: c[1] ?? 0.75, delay: c[0] ?? 0, ease: "easeOut" },
  }),
};
// a wisp/particle that rises and fades, looping — steam, smoke, heat, embers
const rise: Variants = {
  normal: { opacity: 0 },
  animate: (c: number[]) => ({
    y: [0, c[1] ?? -7],
    opacity: [0, 0.85, 0],
    transition: { duration: c[2] ?? 1.1, delay: c[0] ?? 0, repeat: Infinity, ease: "easeOut", times: [0, 0.35, 1] },
  }),
};
// short round-capped wisps rising from [x, y, delay] points
function Rise({ items, dy = -6, dur = 1.1, len = 1.6 }: {
  items: [number, number, number][]; dy?: number; dur?: number; len?: number;
}) {
  return (
    <>
      {items.map(([x, y, d], i) => (
        <motion.path key={i} d={`M${x} ${y}v-${len}`} variants={rise} custom={[d, dy, dur]} />
      ))}
    </>
  );
}
// spark rays that shoot outward from a point, for impacts (hammer, spark, foam)
function Rays({ cx, cy, angles, r0 = 1.5, r1 = 6.5, delay = 0.05, dur = 0.62, step = 0.035 }: {
  cx: number; cy: number; angles: number[]; r0?: number; r1?: number; delay?: number; dur?: number; step?: number;
}) {
  return (
    <>
      {angles.map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const sx = cx + Math.cos(rad) * r0, sy = cy + Math.sin(rad) * r0;
        const ex = cx + Math.cos(rad) * r1, ey = cy + Math.sin(rad) * r1;
        return (
          <motion.line key={i} x1={sx} y1={sy} x2={sx} y2={sy}
            variants={rayLine} custom={[sx, sy, ex, ey, delay + i * step, dur]} />
        );
      })}
    </>
  );
}

// soft light: short even rays that fade in place around a source (no shooting)
const rayGlow: Variants = {
  normal: { opacity: 0 },
  animate: (c: number[]) => ({
    opacity: [0, 0.55, 0.55, 0],
    transition: { duration: c[1] ?? 1, delay: c[0] ?? 0, ...R, times: [0, 0.3, 0.6, 1] },
  }),
};
function Shine({ cx, cy, angles, r0 = 2, r1 = 5.5, delay = 0.08, dur = 1, step = 0.02, w }: {
  cx: number; cy: number; angles: number[]; r0?: number; r1?: number; delay?: number; dur?: number; step?: number; w?: number;
}) {
  // w: optional thinner stroke for tight fans — full-width rays packed into a
  // small zone merge into a single gray blob
  return (
    <>
      {angles.map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <motion.line key={i}
            x1={cx + Math.cos(rad) * r0} y1={cy + Math.sin(rad) * r0}
            x2={cx + Math.cos(rad) * r1} y2={cy + Math.sin(rad) * r1}
            {...(w ? { strokeWidth: w } : {})}
            variants={rayGlow} custom={[delay + i * step, dur]} />
        );
      })}
    </>
  );
}
export const airVentBody = '  <path d="M18 17.5a2.5 2.5 0 1 1-4 2.03V12"/>\n  <path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>\n  <path d="M6 8h12"/>\n  <path d="M6.6 15.572A2 2 0 1 0 10 17v-5"/>';
export function AirVent(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 8h12" />
      <motion.path d="M6.6 15.572A2 2 0 1 0 10 17v-5" variants={drawRev} custom={[0, 0.55]} />
      <motion.path d="M18 17.5a2.5 2.5 0 1 1-4 2.03V12" variants={drawRev} custom={[0.14, 0.55]} />
    </Icon>
  );
}

export const alarmSmokeBody = '  <path d="M11 21c0-2.5 2-2.5 2-5"/>\n  <path d="M16 21c0-2.5 2-2.5 2-5"/>\n  <path d="m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8"/>\n  <path d="M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z"/>\n  <path d="M6 21c0-2.5 2-2.5 2-5"/>';
export function AlarmSmoke(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8" />
      <path d="M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z" />
      <motion.path d="M6 21c0-2.5 2-2.5 2-5" variants={drawRev} custom={[0, 0.5]} />
      <motion.path d="M11 21c0-2.5 2-2.5 2-5" variants={drawRev} custom={[0.12, 0.5]} />
      <motion.path d="M16 21c0-2.5 2-2.5 2-5" variants={drawRev} custom={[0.24, 0.5]} />
    </Icon>
  );
}

export const armchairBody = '  <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/>\n  <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/>\n  <path d="M5 18v2"/>\n  <path d="M19 18v2"/>';
export function Armchair(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={settle} custom={[2, 0.7]}>
        <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
        <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
        <path d="M5 18v2" />
        <path d="M19 18v2" />
      </motion.g>
    </Icon>
  );
}

export const bedBody = '  <path d="M2 4v16"/>\n  <path d="M2 8h18a2 2 0 0 1 2 2v10"/>\n  <path d="M2 17h20"/>\n  <path d="M6 8v9"/>';
export function Bed(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={settle} custom={[1.4, 0.75]}>
        <path d="M2 4v16" />
        <path d="M2 8h18a2 2 0 0 1 2 2v10" />
        <path d="M2 17h20" />
        <path d="M6 8v9" />
      </motion.g>
    </Icon>
  );
}

export const bedDoubleBody = '  <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/>\n  <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/>\n  <path d="M12 4v6"/>\n  <path d="M2 18h20"/>';
export function BedDouble(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={settle} custom={[1.4, 0.75]}>
        <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
        <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
        <path d="M12 4v6" />
        <path d="M2 18h20" />
      </motion.g>
    </Icon>
  );
}

export const bedSingleBody = '  <path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"/>\n  <path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/>\n  <path d="M3 18h18"/>';
export function BedSingle(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={settle} custom={[1.4, 0.75]}>
        <path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
        <path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
        <path d="M3 18h18" />
      </motion.g>
    </Icon>
  );
}

export const bellElectricBody = '  <path d="M18.518 17.347A7 7 0 0 1 14 19"/>\n  <path d="M18.8 4A11 11 0 0 1 20 9"/>\n  <path d="M9 9h.01"/>\n  <circle cx="20" cy="16" r="2"/>\n  <circle cx="9" cy="9" r="7"/>\n  <rect x="4" y="16" width="10" height="6" rx="2"/>';
export function BellElectric(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={ring} style={{ transformBox: "view-box", transformOrigin: "9px 3px" }}>
        <path d="M9 9h.01" />
        <circle cx="20" cy="16" r="2" />
        <circle cx="9" cy="9" r="7" />
        <rect x="4" y="16" width="10" height="6" rx="2" />
        <motion.path d="M18.8 4A11 11 0 0 1 20 9" variants={drawFlow} custom={[0, 0.5]} />
        <motion.path d="M18.518 17.347A7 7 0 0 1 14 19" variants={drawFlow} custom={[0.12, 0.5]} />
      </motion.g>
    </Icon>
  );
}

export const blenderBody = '  <path d="M8 14a2 2 0 0 0-1.963 1.615l-1.018 5.193A1 1 0 0 0 6 22h12a1 1 0 0 0 .981-1.192l-1.018-5.193A2 2 0 0 0 16 14z"/>\n  <path d="m17 2-1 12"/>\n  <path d="M8.006 14 7 2"/>\n  <path d="M7.565 8.787A5 5 0 0 0 12 8a5 5 0 0 1 4.56-.75"/>\n  <path d="M19 2H5a2 2 0 0 0-2 2v5a2 2 0 0 0 .688 1.5"/>\n  <path d="M12 18h.01"/>';
export function Blender(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M8 14a2 2 0 0 0-1.963 1.615l-1.018 5.193A1 1 0 0 0 6 22h12a1 1 0 0 0 .981-1.192l-1.018-5.193A2 2 0 0 0 16 14z" />
      <path d="m17 2-1 12" />
      <path d="M8.006 14 7 2" />
      <motion.path d="M7.565 8.787A5 5 0 0 0 12 8a5 5 0 0 1 4.56-.75" variants={churn} style={{ transformBox: "view-box", transformOrigin: "12px 8px" }} />
      <path d="M19 2H5a2 2 0 0 0-2 2v5a2 2 0 0 0 .688 1.5" />
      <path d="M12 18h.01" />
    </Icon>
  );
}

export const blindsBody = '  <path d="M3 3h18"/>\n  <path d="M20 7H8"/>\n  <path d="M20 11H8"/>\n  <path d="M10 19h10"/>\n  <path d="M8 15h12"/>\n  <path d="M4 3v14"/>\n  <circle cx="4" cy="19" r="2"/>';
export function Blinds(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M3 3h18" />
      <motion.path d="M20 7H8" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M20 11H8" variants={drawFlow} custom={[0.09, 0.4]} />
      <motion.path d="M8 15h12" variants={drawFlow} custom={[0.18, 0.4]} />
      <motion.path d="M10 19h10" variants={drawFlow} custom={[0.27, 0.4]} />
      <path d="M4 3v14" />
      <circle cx="4" cy="19" r="2" />
    </Icon>
  );
}

export const boltBody = '  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>\n  <circle cx="12" cy="12" r="4"/>';
export function Bolt(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={spinOnce} style={{ transformBox: "view-box", transformOrigin: "12px 12px" }}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <circle cx="12" cy="12" r="4" />
      </motion.g>
      <Rays cx={12} cy={12} angles={[45, 135, 225, 315]} r0={3.5} r1={6} delay={0.55} dur={0.32} step={0} />
    </Icon>
  );
}

export const brickWallBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="M12 9v6"/>\n  <path d="M16 15v6"/>\n  <path d="M16 3v6"/>\n  <path d="M3 15h18"/>\n  <path d="M3 9h18"/>\n  <path d="M8 15v6"/>\n  <path d="M8 3v6"/>';
export function BrickWall(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="M3 15h18" variants={drawFlow} custom={[0, 0.35]} />
      <motion.path d="M8 15v6" variants={drawFlow} custom={[0.06, 0.3]} />
      <motion.path d="M16 15v6" variants={drawFlow} custom={[0.06, 0.3]} />
      <motion.path d="M12 9v6" variants={drawFlow} custom={[0.14, 0.3]} />
      <motion.path d="M3 9h18" variants={drawFlow} custom={[0.2, 0.35]} />
      <motion.path d="M8 3v6" variants={drawFlow} custom={[0.28, 0.3]} />
      <motion.path d="M16 3v6" variants={drawFlow} custom={[0.28, 0.3]} />
    </Icon>
  );
}

export const brickWallFireBody = '  <path d="M16 3v2.107"/>\n  <path d="M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9"/>\n  <path d="M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938"/>\n  <path d="M3 15h5.253"/>\n  <path d="M3 9h8.228"/>\n  <path d="M8 15v6"/>\n  <path d="M8 3v6"/>';
export function BrickWallFire(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M16 3v2.107" />
      <Rise items={[[16, 12, 0], [18.5, 13, 0.6]]} dy={-4} dur={1} len={1.2} />
      <motion.path d="M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9" variants={flicker} style={{ transformBox: "view-box", transformOrigin: "17px 20px" }} />
      <path d="M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938" />
      <path d="M3 15h5.253" />
      <path d="M3 9h8.228" />
      <path d="M8 15v6" />
      <path d="M8 3v6" />
    </Icon>
  );
}

export const brickWallShieldBody = '  <path d="M12 9v1.258"/>\n  <path d="M16 3v5.46"/>\n  <path d="M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75"/>\n  <path d="M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z"/>\n  <path d="M3 15h7"/>\n  <path d="M3 9h12.142"/>\n  <path d="M8 15v6"/>\n  <path d="M8 3v6"/>';
export function BrickWallShield(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 9v1.258" />
      <path d="M16 3v5.46" />
      <path d="M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75" />
      <motion.path d="M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z" variants={drawFlow} custom={[0.12, 0.6]} />
      <path d="M3 15h7" />
      <path d="M3 9h12.142" />
      <path d="M8 15v6" />
      <path d="M8 3v6" />
    </Icon>
  );
}

export const brushCleaningBody = '  <path d="m16 22-1-4"/>\n  <path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/>\n  <path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z"/>\n  <path d="m8 22 1-4"/>';
export function BrushCleaning(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1" />
      <path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z" />
      <motion.path d="m8 22 1-4" variants={drawFlow} custom={[0.05, 0.35]} />
      <motion.path d="m16 22-1-4" variants={drawFlow} custom={[0.18, 0.35]} />
    </Icon>
  );
}

export const cookingPotBody = '  <path d="M2 12h20"/>\n  <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/>\n  <path d="m4 8 16-4"/>\n  <path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"/>';
export function CookingPot(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M2 12h20" />
      <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
      <Rise items={[[8, 11, 0], [12, 11, 0.45], [16, 11, 0.9]]} dy={-7} dur={1.3} />
      <motion.g variants={shift} custom={[0, -1.4]}>
        <path d="m4 8 16-4" />
        <path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" />
      </motion.g>
    </Icon>
  );
}

export const doorClosedBody = '  <path d="M10 12h.01"/>\n  <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/>\n  <path d="M2 20h20"/>';
export function DoorClosed(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={swingDoor} style={{ transformBox: "fill-box", transformOrigin: "right center", transformPerspective: 500 }}>
        <path d="M10 12h.01" />
        <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
      </motion.g>
      <path d="M2 20h20" />
    </Icon>
  );
}

export const doorClosedLockedBody = '  <path d="M10 12h.01"/>\n  <path d="M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/>\n  <path d="M2 20h8"/>\n  <path d="M20 17v-2a2 2 0 1 0-4 0v2"/>\n  <rect x="14" y="17" width="8" height="5" rx="1"/>';
export function DoorClosedLocked(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={shake}>
        <path d="M10 12h.01" />
        <path d="M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
      </motion.g>
      <path d="M2 20h8" />
      <path d="M20 17v-2a2 2 0 1 0-4 0v2" />
      <rect x="14" y="17" width="8" height="5" rx="1" />
    </Icon>
  );
}

export const doorOpenBody = '  <path d="M11 20H2"/>\n  <path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z"/>\n  <path d="M11 4H8a2 2 0 0 0-2 2v14"/>\n  <path d="M14 12h.01"/>\n  <path d="M22 20h-3"/>';
export function DoorOpen(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M11 20H2" />
      <motion.path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z" variants={swingDoor} style={{ transformBox: "fill-box", transformOrigin: "left center", transformPerspective: 500 }} />
      <path d="M11 4H8a2 2 0 0 0-2 2v14" />
      <path d="M14 12h.01" />
      <path d="M22 20h-3" />
    </Icon>
  );
}

export const drillBody = '  <path d="M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z"/>\n  <path d="M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8"/>\n  <path d="M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3"/>\n  <path d="M18 6h4"/>\n  <path d="m5 10-2 8"/>\n  <path d="m7 18 2-8"/>';
export function Drill(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={shake}>
        <path d="M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z" />
        <path d="M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8" />
        <path d="M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3" />
        <path d="M18 6h4" />
        <path d="m5 10-2 8" />
        <path d="m7 18 2-8" />
      </motion.g>
      {/* chips fly from the bit tip, fixed at the impact point — never riding
          the recoil shake */}
      <Rays cx={21} cy={6} angles={[300, 0, 60]} r0={0.5} r1={2.6} delay={0.05} dur={0.4} step={0.04} />
    </Icon>
  );
}

export const fanBody = '  <path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/>\n  <path d="M12 12v.01"/>';
export function Fan(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z" variants={spin} style={{ transformBox: "view-box", transformOrigin: "12px 12px" }} />
      <path d="M12 12v.01" />
    </Icon>
  );
}

export const fenceBody = '  <path d="M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"/>\n  <path d="M6 8h4"/>\n  <path d="M6 18h4"/>\n  <path d="m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"/>\n  <path d="M14 8h4"/>\n  <path d="M14 18h4"/>\n  <path d="m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"/>';
export function Fence(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={sway} style={{ transformBox: "view-box", transformOrigin: "12px 21px" }}>
        <path d="M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" />
        <path d="M6 8h4" />
        <path d="M6 18h4" />
        <path d="m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" />
        <path d="M14 8h4" />
        <path d="M14 18h4" />
        <path d="m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" />
      </motion.g>
    </Icon>
  );
}

export const fireExtinguisherBody = '  <path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5"/>\n  <path d="M9 18h8"/>\n  <path d="M18 3h-3"/>\n  <path d="M11 3a6 6 0 0 0-6 6v11"/>\n  <path d="M5 13h4"/>\n  <path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z"/>';
export function FireExtinguisher(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5" variants={shift} custom={[0, 1.2]} />
      <path d="M9 18h8" />
      <path d="M18 3h-3" />
      <Rays cx={18} cy={3} angles={[310, 340, 10, 40]} r0={0.5} r1={4.5} delay={0.15} dur={0.5} step={0.03} />
      <path d="M11 3a6 6 0 0 0-6 6v11" />
      <path d="M5 13h4" />
      <path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z" />
    </Icon>
  );
}

export const hammerBody = '  <path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"/>\n  <path d="m18 15 4-4"/>\n  <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>';
export function Hammer(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={hammerSwing} style={{ transformBox: "fill-box", transformOrigin: "left bottom" }}>
        <path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9" />
        <path d="m18 15 4-4" />
        <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" />
      </motion.g>
      {/* impact sparks burst at the struck point, NOT riding along with the swing */}
      <Rays cx={20.5} cy={14.5} angles={[320, 5, 50, 95]} r0={1.2} r1={3.4} delay={0.48} dur={0.28} step={0.02} />
    </Icon>
  );
}

export const heaterBody = '  <path d="M11 8c2-3-2-3 0-6"/>\n  <path d="M15.5 8c2-3-2-3 0-6"/>\n  <path d="M6 10h.01"/>\n  <path d="M6 14h.01"/>\n  <path d="M10 16v-4"/>\n  <path d="M14 16v-4"/>\n  <path d="M18 16v-4"/>\n  <path d="M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3"/>\n  <path d="M5 20v2"/>\n  <path d="M19 20v2"/>';
export function Heater(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11 8c2-3-2-3 0-6" variants={pulseDraw} custom={[0, 1]} />
      <motion.path d="M15.5 8c2-3-2-3 0-6" variants={pulseDraw} custom={[0.35, 1]} />
      <path d="M6 10h.01" />
      <path d="M6 14h.01" />
      <path d="M10 16v-4" />
      <path d="M14 16v-4" />
      <path d="M18 16v-4" />
      <path d="M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3" />
      <path d="M5 20v2" />
      <path d="M19 20v2" />
    </Icon>
  );
}

export const houseBody = '  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>\n  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>';
export function House(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={settle} custom={[1.6, 0.7]}>
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </motion.g>
    </Icon>
  );
}

export const houseHeartBody = '  <path d="M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"/>\n  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>';
export function HouseHeart(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.circle cx={12} cy={13} r={3} fill="none" variants={ripple} custom={[0.16, 0.7, 3, 8]} />
      <motion.path d="M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" variants={beat} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </Icon>
  );
}

export const housePlugBody = '  <path d="M10 12V8.964"/>\n  <path d="M14 12V8.964"/>\n  <path d="M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z"/>\n  <path d="M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2"/>';
export function HousePlug(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={shift} custom={[0, -0.9]}>
        <path d="M10 12V8.964" />
        <path d="M14 12V8.964" />
        <path d="M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z" />
      </motion.g>
      <path d="M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2" />
    </Icon>
  );
}

export const houseWifiBody = '  <path d="M9.5 13.866a4 4 0 0 1 5 .01"/>\n  <path d="M12 17h.01"/>\n  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>\n  <path d="M7 10.754a8 8 0 0 1 10 0"/>';
export function HouseWifi(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M9.5 13.866a4 4 0 0 1 5 .01" variants={pulseDraw} custom={[0, 1.1]} />
      <path d="M12 17h.01" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <motion.path d="M7 10.754a8 8 0 0 1 10 0" variants={pulseDraw} custom={[0.35, 1.1]} />
    </Icon>
  );
}

export const lampBody = '  <path d="M12 12v6"/>\n  <path d="M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z"/>\n  <path d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"/>';
export function Lamp(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 12v6" />
      <path d="M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z" />
      <path d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" />
      {/* 4 rays from ONE source (the bulb under the shade rim), radially
          angled at equal 40° steps around straight-down — wide enough that
          the inner pair clears the stem's paint */}
      <Shine cx={12} cy={12.3} angles={[30, 70, 110, 150]} r0={1.5} r1={4.8} w={1.3} />
    </Icon>
  );
}

export const lampCeilingBody = '  <path d="M12 2v5"/>\n  <path d="M14.829 15.998a3 3 0 1 1-5.658 0"/>\n  <path d="M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z"/>';
export function LampCeiling(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={rock} style={{ transformBox: "view-box", transformOrigin: "12px 2px" }}>
        <path d="M12 2v5" />
        <path d="M14.829 15.998a3 3 0 1 1-5.658 0" />
        <path d="M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z" />
        {/* 4 rays from ONE source (the hanging bulb), equal 40° steps */}
        <Shine cx={12} cy={18.8} angles={[30, 70, 110, 150]} r0={1.4} r1={4.2} w={1.3} />
      </motion.g>
    </Icon>
  );
}

export const lampDeskBody = '  <path d="M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z"/>\n  <path d="m14.207 4.793-3.414 3.414"/>\n  <path d="M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>\n  <path d="m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18"/>';
export function LampDesk(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={sway} style={{ transformBox: "view-box", transformOrigin: "12px 9px" }}>
        <path d="M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z" />
        <path d="m14.207 4.793-3.414 3.414" />
        {/* 4 rays from ONE source (the bulb at the head's rim center), equal
            30° steps around the rim's outward normal (~45° down-right) —
            riding the sway */}
        <Shine cx={17.2} cy={11.2} angles={[0, 30, 60, 90]} r0={1.5} r1={4.6} w={1.3} />
      </motion.g>
      <path d="M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <path d="m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18" />
    </Icon>
  );
}

export const lampFloorBody = '  <path d="M12 10v12"/>\n  <path d="M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z"/>\n  <path d="M9 22h6"/>';
export function LampFloor(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 10v12" />
      <path d="M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z" />
      <path d="M9 22h6" />
      {/* 4 rays from ONE source (bulb at the shade opening), equal 40° steps
          so the inner pair clears the pole's paint */}
      <Shine cx={12} cy={9.3} angles={[30, 70, 110, 150]} r0={1.5} r1={5.2} w={1.3} />
    </Icon>
  );
}

export const lampWallDownBody = '  <path d="M19.929 18.629A1 1 0 0 1 19 20H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 13h6a1 1 0 0 1 .928.629z"/>\n  <path d="M6 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>\n  <path d="M8 6h4a2 2 0 0 1 2 2v5"/>';
export function LampWallDown(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M19.929 18.629A1 1 0 0 1 19 20H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 13h6a1 1 0 0 1 .928.629z" />
      <path d="M8 6h4a2 2 0 0 1 2 2v5" />
      <path d="M6 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      {/* 4 rays from ONE source (bulb at the shade's bottom-center), equal
          40° steps — the wide spread keeps them distinct in the shallow strip */}
      <Shine cx={14} cy={20.2} angles={[30, 70, 110, 150]} r0={1.3} r1={3.3} w={1.3} />
    </Icon>
  );
}

export const lampWallUpBody = '  <path d="M19.929 9.629A1 1 0 0 1 19 11H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 4h6a1 1 0 0 1 .928.629z"/>\n  <path d="M6 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"/>\n  <path d="M8 18h4a2 2 0 0 0 2-2v-5"/>';
export function LampWallUp(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M19.929 9.629A1 1 0 0 1 19 11H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 4h6a1 1 0 0 1 .928.629z" />
      <path d="M8 18h4a2 2 0 0 0 2-2v-5" />
      <path d="M6 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" />
      {/* the shade's WIDE opening is its bottom edge — 4 rays fire DOWN out
          of one source at its center, equal 40° steps */}
      <Shine cx={14} cy={11.7} angles={[30, 70, 110, 150]} r0={1.3} r1={3.3} w={1.3} />
    </Icon>
  );
}

export const microwaveBody = '  <rect width="20" height="15" x="2" y="4" rx="2"/>\n  <rect width="8" height="7" x="6" y="8" rx="1"/>\n  <path d="M18 8v7"/>\n  <path d="M6 19v2"/>\n  <path d="M18 19v2"/>';
export function Microwave(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={shake}>
        <rect width="20" height="15" x="2" y="4" rx="2" />
        <rect width="8" height="7" x="6" y="8" rx="1" />
        <path d="M18 8v7" />
        <path d="M6 19v2" />
        <path d="M18 19v2" />
      </motion.g>
    </Icon>
  );
}

export const mirrorRectangularBody = '  <path d="M11 6 8 9"/>\n  <path d="m16 7-8 8"/>\n  <rect x="4" y="2" width="16" height="20" rx="2"/>';
export function MirrorRectangular(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11 6 8 9" variants={drawFlow} custom={[0, 0.35]} />
      <motion.path d="m16 7-8 8" variants={drawFlow} custom={[0.12, 0.45]} />
      <rect x="4" y="2" width="16" height="20" rx="2" />
    </Icon>
  );
}

export const mirrorRoundBody = '  <path d="M10 6.6 8.6 8"/>\n  <path d="M12 18v4"/>\n  <path d="M15 7.5 9.5 13"/>\n  <path d="M7 22h10"/>\n  <circle cx="12" cy="10" r="8"/>';
export function MirrorRound(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 6.6 8.6 8" variants={drawFlow} custom={[0, 0.35]} />
      <motion.path d="M15 7.5 9.5 13" variants={drawFlow} custom={[0.12, 0.45]} />
      <path d="M12 18v4" />
      <path d="M7 22h10" />
      <circle cx="12" cy="10" r="8" />
    </Icon>
  );
}

export const paintRollerBody = '  <rect width="16" height="6" x="2" y="2" rx="2"/>\n  <path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>\n  <rect width="4" height="6" x="8" y="16" rx="1"/>';
export function PaintRoller(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={shift} custom={[0, 1.5]}>
        <rect width="16" height="6" x="2" y="2" rx="2" />
        <path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect width="4" height="6" x="8" y="16" rx="1" />
      </motion.g>
    </Icon>
  );
}

export const paintbrushBody = '  <path d="m14.622 17.897-10.68-2.913"/>\n  <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/>\n  <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/>';
export function Paintbrush(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
      <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />
      <motion.path d="m14.622 17.897-10.68-2.913" variants={drawFlow} custom={[0.15, 0.5]} />
    </Icon>
  );
}

export const paintbrushVerticalBody = '  <path d="M10 2v2"/>\n  <path d="M14 2v4"/>\n  <path d="M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z"/>\n  <path d="M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1"/>';
export function PaintbrushVertical(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={sketch}>
        <path d="M10 2v2" />
        <path d="M14 2v4" />
        <path d="M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z" />
        <path d="M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1" />
      </motion.g>
    </Icon>
  );
}

export const refrigeratorBody = '  <path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"/>\n  <path d="M5 10h14"/>\n  <path d="M15 7v6"/>';
export function Refrigerator(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={shake}>
        <path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" />
        <path d="M5 10h14" />
        <path d="M15 7v6" />
      </motion.g>
    </Icon>
  );
}

export const rockingChairBody = '  <path d="m15 13 3.708 7.416"/>\n  <path d="M3 19a15 15 0 0 0 18 0"/>\n  <path d="m3 2 3.21 9.633A2 2 0 0 0 8.109 13H18"/>\n  <path d="m9 13-3.708 7.416"/>';
export function RockingChair(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={rock} style={{ transformBox: "view-box", transformOrigin: "12px 20px" }}>
        <path d="m15 13 3.708 7.416" />
        <path d="M3 19a15 15 0 0 0 18 0" />
        <path d="m3 2 3.21 9.633A2 2 0 0 0 8.109 13H18" />
        <path d="m9 13-3.708 7.416" />
      </motion.g>
    </Icon>
  );
}

export const roseBody = '  <path d="M17 10h-1a4 4 0 1 1 4-4v.534"/>\n  <path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31"/>\n  <path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2"/>\n  <path d="M9.77 12C4 15 2 22 2 22"/>\n  <circle cx="17" cy="8" r="2"/>';
export function Rose(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M9.77 12C4 15 2 22 2 22" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2" variants={drawFlow} custom={[0.12, 0.4]} />
      <motion.path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31" variants={drawFlow} custom={[0.24, 0.45]} />
      <motion.path d="M17 10h-1a4 4 0 1 1 4-4v.534" variants={drawFlow} custom={[0.34, 0.4]} />
      <motion.circle cx="17" cy="8" r="2" variants={drawFlow} custom={[0.44, 0.35]} />
    </Icon>
  );
}

export const routerBody = '  <rect width="20" height="8" x="2" y="14" rx="2"/>\n  <path d="M6.01 18H6"/>\n  <path d="M10.01 18H10"/>\n  <path d="M15 10v4"/>\n  <path d="M17.84 7.17a4 4 0 0 0-5.66 0"/>\n  <path d="M20.66 4.34a8 8 0 0 0-11.31 0"/>';
export function Router(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6.01 18H6" />
      <path d="M10.01 18H10" />
      <path d="M15 10v4" />
      <motion.path d="M17.84 7.17a4 4 0 0 0-5.66 0" variants={pulseDraw} custom={[0, 1.1]} />
      <motion.path d="M20.66 4.34a8 8 0 0 0-11.31 0" variants={pulseDraw} custom={[0.35, 1.1]} />
    </Icon>
  );
}

export const shelvingUnitBody = '  <path d="M12 12V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>\n  <path d="M16 20v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"/>\n  <path d="M20 22V2"/>\n  <path d="M4 12h16"/>\n  <path d="M4 20h16"/>\n  <path d="M4 2v20"/>\n  <path d="M4 4h16"/>';
export function ShelvingUnit(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 12V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" variants={drawFlow} custom={[0, 0.45]} />
      <motion.path d="M16 20v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" variants={drawFlow} custom={[0.3, 0.45]} />
      <path d="M20 22V2" />
      <path d="M4 12h16" />
      <path d="M4 20h16" />
      <path d="M4 2v20" />
      <path d="M4 4h16" />
    </Icon>
  );
}

export const showerHeadBody = '  <path d="m4 4 2.5 2.5"/>\n  <path d="M13.5 6.5a4.95 4.95 0 0 0-7 7"/>\n  <path d="M15 5 5 15"/>\n  <path d="M14 17v.01"/>\n  <path d="M10 16v.01"/>\n  <path d="M13 13v.01"/>\n  <path d="M16 10v.01"/>\n  <path d="M11 20v.01"/>\n  <path d="M17 14v.01"/>\n  <path d="M20 11v.01"/>';
export function ShowerHead(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="m4 4 2.5 2.5" />
      <path d="M13.5 6.5a4.95 4.95 0 0 0-7 7" />
      <path d="M15 5 5 15" />
      <motion.path d="M16 10v.01" variants={spray} custom={[0]} />
      <motion.path d="M20 11v.01" variants={spray} custom={[0.05]} />
      <motion.path d="M13 13v.01" variants={spray} custom={[0.12]} />
      <motion.path d="M17 14v.01" variants={spray} custom={[0.17]} />
      <motion.path d="M10 16v.01" variants={spray} custom={[0.24]} />
      <motion.path d="M14 17v.01" variants={spray} custom={[0.29]} />
      <motion.path d="M11 20v.01" variants={spray} custom={[0.38]} />
    </Icon>
  );
}

export const soapDispenserDropletBody = '  <path d="M10.5 2v4"/>\n  <path d="M14 2H7a2 2 0 0 0-2 2"/>\n  <path d="M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19"/>\n  <path d="M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>';
export function SoapDispenserDroplet(p: IconProps) {
  return (
    <Icon {...p}>
      {/* pump head and stem press down as ONE piece, then release */}
      <motion.g variants={shift} custom={[0, 1.2]}>
        <path d="M10.5 2v4" />
        <path d="M14 2H7a2 2 0 0 0-2 2" />
      </motion.g>
      {/* the dispensed drip falls from the spout (ephemera, invisible at rest) */}
      <motion.path d="M14.3 3.6v.5" variants={dripFall} />
      {/* the droplet glyph stays on its spot and just plumps as the drip joins */}
      <motion.path d="M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19" variants={plump} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <path d="M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </Icon>
  );
}

export const sofaBody = '  <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/>\n  <path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/>\n  <path d="M4 18v2"/>\n  <path d="M20 18v2"/>\n  <path d="M12 4v9"/>';
export function Sofa(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={settle} custom={[2, 0.7]}>
        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
        <path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
        <path d="M4 18v2" />
        <path d="M20 18v2" />
        <path d="M12 4v9" />
      </motion.g>
    </Icon>
  );
}

export const solarPanelBody = '  <path d="M11 2h2"/>\n  <path d="m14.28 14-4.56 8"/>\n  <path d="m21 22-1.558-4H4.558"/>\n  <path d="M3 10v2"/>\n  <path d="M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z"/>\n  <path d="M7 2a4 4 0 0 1-4 4"/>\n  <path d="m8.66 7.66 1.41 1.41"/>';
export function SolarPanel(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M11 2h2" />
      <path d="M3 10v2" />
      <path d="M7 2a4 4 0 0 1-4 4" />
      <path d="m8.66 7.66 1.41 1.41" />
      {/* sunshine: soft rays glow between and beyond the fixed ones, then the
          absorbed energy draws down through the panel's cell lines */}
      <Shine cx={3} cy={2} angles={[22.5, 67.5]} r0={7.5} r1={10} delay={0} dur={0.9} />
      <Shine cx={3} cy={2} angles={[0, 45, 90]} r0={11} r1={12.3} delay={0.12} dur={0.9} />
      <motion.path d="m14.28 14-4.56 8" variants={drawFlow} custom={[0.35, 0.4]} />
      <motion.path d="m21 22-1.558-4H4.558" variants={drawFlow} custom={[0.5, 0.45]} />
      <path d="M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z" />
    </Icon>
  );
}

export const swatchBookBody = '  <path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z"/>\n  <path d="M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7"/>\n  <path d="M 7 17h.01"/>\n  <path d="m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8"/>';
export function SwatchBook(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={sway} style={{ transformBox: "view-box", transformOrigin: "5px 20px" }}>
        <path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z" />
        <path d="M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7" />
        <path d="M 7 17h.01" />
        <path d="m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8" />
      </motion.g>
    </Icon>
  );
}

export const toiletBody = '  <path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18"/>\n  <path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"/>';
export function Toilet(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18" />
      <path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" />
      {/* the flush: droplets splash up out of the bowl mouth (the open sky
          right of the tank) — anything drawn INSIDE the bowl merges into
          gray mush at this size. They start ABOVE the rim paint (y<11) and
          stay right of the tank edge paint (x>16.1) so they never read as
          bumps on the porcelain */}
      <motion.path d="M17.2 10.8h.01" variants={splashUp} custom={[-0.2, -3.2, 0.05]} />
      <motion.path d="M18.6 10.6v.5" variants={splashUp} custom={[0.6, -4.2, 0]} />
      <motion.path d="M20 11h.01" variants={splashUp} custom={[1.7, -3, 0.08]} />
    </Icon>
  );
}

export const toolCaseBody = '  <path d="M10 15h4"/>\n  <path d="m14.817 10.995-.971-1.45 1.034-1.232a2 2 0 0 0-2.025-3.238l-1.82.364L9.91 3.885a2 2 0 0 0-3.625.748L6.141 6.55l-1.725.426a2 2 0 0 0-.19 3.756l.657.27"/>\n  <path d="m18.822 10.995 2.26-5.38a1 1 0 0 0-.557-1.318L16.954 2.9a1 1 0 0 0-1.281.533l-.924 2.122"/>\n  <path d="M4 12.006A1 1 0 0 1 4.994 11H19a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>';
export function ToolCase(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={hop}>
        <path d="M10 15h4" />
        <motion.path d="m14.817 10.995-.971-1.45 1.034-1.232a2 2 0 0 0-2.025-3.238l-1.82.364L9.91 3.885a2 2 0 0 0-3.625.748L6.141 6.55l-1.725.426a2 2 0 0 0-.19 3.756l.657.27" variants={rattle} custom={[0.08, -7]} style={{ transformBox: "fill-box", transformOrigin: "center bottom" }} />
        <motion.path d="m18.822 10.995 2.26-5.38a1 1 0 0 0-.557-1.318L16.954 2.9a1 1 0 0 0-1.281.533l-.924 2.122" variants={rattle} custom={[0.16, 9]} style={{ transformBox: "fill-box", transformOrigin: "center bottom" }} />
        <path d="M4 12.006A1 1 0 0 1 4.994 11H19a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      </motion.g>
    </Icon>
  );
}

export const toolboxBody = '  <path d="M16 12v4"/>\n  <path d="M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>\n  <path d="M17 6a2 2 0 011.414.586l3 3A2 2 0 0122 11v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 01.586-1.414l3-3A2 2 0 017 6z"/>\n  <path d="M2 14h20"/>\n  <path d="M8 12v4"/>';
export function Toolbox(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={shift} custom={[0, -1]}>
        <path d="M16 12v4" />
        <path d="M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <path d="M17 6a2 2 0 011.414.586l3 3A2 2 0 0122 11v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 01.586-1.414l3-3A2 2 0 017 6z" />
        <path d="M2 14h20" />
        <path d="M8 12v4" />
      </motion.g>
    </Icon>
  );
}

export const towelRackBody = '  <path d="M22 7h-2"/>\n  <path d="M6.5 3h11A2.5 2.5 0 0 1 20 5.5V20a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V5.5a1 1 0 0 0-5 0V17a1 1 0 0 0 1 1h4"/>\n  <path d="M9 7H2"/>';
export function TowelRack(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M22 7h-2" />
      <motion.path d="M6.5 3h11A2.5 2.5 0 0 1 20 5.5V20a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V5.5a1 1 0 0 0-5 0V17a1 1 0 0 0 1 1h4" variants={sway} style={{ transformBox: "view-box", transformOrigin: "12px 3px" }} />
      <path d="M9 7H2" />
    </Icon>
  );
}

export const turntableBody = '  <path d="M10 12.01h.01"/>\n  <path d="M18 8v4a8 8 0 0 1-1.07 4"/>\n  <circle cx="10" cy="12" r="4"/>\n  <rect x="2" y="4" width="20" height="16" rx="2"/>';
export function Turntable(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M10 12.01h.01" />
      <circle cx="10" cy="12" r="4" />
      <motion.path d="M18 8v4a8 8 0 0 1-1.07 4" variants={needle} style={{ transformBox: "fill-box", transformOrigin: "right top" }} />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </Icon>
  );
}

export const usbBody = '  <circle cx="10" cy="7" r="1"/>\n  <circle cx="4" cy="20" r="1"/>\n  <path d="M4.7 19.3 19 5"/>\n  <path d="m21 3-3 1 2 2Z"/>\n  <path d="M9.26 7.68 5 12l2 5"/>\n  <path d="m10 14 5 2 3.5-3.5"/>\n  <path d="m18 12 1-1 1 1-1 1Z"/>';
export function Usb(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={shift} custom={[-1.4, 1.4]}>
        <circle cx="10" cy="7" r="1" />
        <circle cx="4" cy="20" r="1" />
        <path d="M4.7 19.3 19 5" />
        <path d="m21 3-3 1 2 2Z" />
        <path d="M9.26 7.68 5 12l2 5" />
        <path d="m10 14 5 2 3.5-3.5" />
        <path d="m18 12 1-1 1 1-1 1Z" />
      </motion.g>
    </Icon>
  );
}

export const utilityPoleBody = '  <path d="M12 2v20"/>\n  <path d="M2 5h20"/>\n  <path d="M3 3v2"/>\n  <path d="M7 3v2"/>\n  <path d="M17 3v2"/>\n  <path d="M21 3v2"/>\n  <path d="m19 5-7 7-7-7"/>';
export function UtilityPole(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 2v20" />
      <path d="M2 5h20" />
      <path d="M3 3v2" />
      <path d="M7 3v2" />
      <path d="M17 3v2" />
      <path d="M21 3v2" />
      {/* current runs the line once: the cable draws from one crossarm end
          through the pole to the other and settles solid (wires are physical
          geometry, not a broadcast — they must never blink out) */}
      <motion.path d="m19 5-7 7-7-7" variants={drawFlow} custom={[0, 0.6]} />
    </Icon>
  );
}

export const vaultBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>\n  <path d="m7.9 7.9 2.7 2.7"/>\n  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>\n  <path d="m13.4 10.6 2.7-2.7"/>\n  <circle cx="7.5" cy="16.5" r=".5" fill="currentColor"/>\n  <path d="m7.9 16.1 2.7-2.7"/>\n  <circle cx="16.5" cy="16.5" r=".5" fill="currentColor"/>\n  <path d="m13.4 13.4 2.7 2.7"/>\n  <circle cx="12" cy="12" r="2"/>';
export function Vault(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
      <motion.g variants={dialTurn} style={{ transformBox: "view-box", transformOrigin: "12px 12px" }}>
        <path d="m7.9 7.9 2.7 2.7" />
        <path d="m13.4 10.6 2.7-2.7" />
        <path d="m7.9 16.1 2.7-2.7" />
        <path d="m13.4 13.4 2.7 2.7" />
        <circle cx="12" cy="12" r="2" />
      </motion.g>
      <Rays cx={12} cy={12} angles={[30, 90, 150, 210, 270, 330]} r0={2.5} r1={5} delay={0.58} dur={0.3} step={0} />
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="7.5" cy="16.5" r=".5" fill="currentColor" />
      <circle cx="16.5" cy="16.5" r=".5" fill="currentColor" />
    </Icon>
  );
}

export const washingMachineBody = '  <path d="M3 6h3"/>\n  <path d="M17 6h.01"/>\n  <rect width="18" height="20" x="3" y="2" rx="2"/>\n  <circle cx="12" cy="13" r="5"/>\n  <path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5"/>';
export function WashingMachine(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M3 6h3" />
      <path d="M17 6h.01" />
      <rect width="18" height="20" x="3" y="2" rx="2" />
      <motion.g variants={spin} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle cx="12" cy="13" r="5" />
        <path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" />
      </motion.g>
    </Icon>
  );
}

export const wavesLadderBody = '  <path d="M19 5a2 2 0 0 0-2 2v11"/>\n  <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>\n  <path d="M7 13h10"/>\n  <path d="M7 9h10"/>\n  <path d="M9 5a2 2 0 0 0-2 2v11"/>';
export function WavesLadder(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M19 5a2 2 0 0 0-2 2v11" />
      <motion.path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" variants={waveLoop} />
      <path d="M7 13h10" />
      <path d="M7 9h10" />
      <path d="M9 5a2 2 0 0 0-2 2v11" />
    </Icon>
  );
}
