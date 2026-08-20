"use client";

import { motion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { Icon } from "../icon.js";
import { drawFlow, drawRev, drawOn, growMiddle, nudge, nudgeTransition } from "../variants.js";
import { entranceSharp } from "../ease.js";
import type { IconProps } from "../types.js";

// Math glyph language: operator strokes strike in with growMiddle (the
// x/plus/minus vocabulary), written letters and traced constructions use the
// signature drawFlow/drawRev, containers stay static while the glyph performs,
// and satellites that exist at rest never vanish — they recoil, pulse or press.
const E = "easeInOut";

// growMiddle strike timing with a stagger delay
function gm(delay = 0, duration = 0.5): Transition {
  return { duration, delay, ease: entranceSharp, opacity: { duration: 0.08, delay } };
}
// grow-only pulse for endpoint circles that exist at rest. custom=delay
const pulse: Variants = {
  normal: { scale: 1 },
  animate: (d: number = 0) => ({ scale: [1, 1.35, 1], transition: { duration: 0.35, delay: d, ease: E } }),
};
// pop-in for handles that assemble (draw-in language). custom=delay
const popIn: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: (d: number = 0) => ({ scale: [0, 1.2, 1], opacity: [0, 1, 1], transition: { duration: 0.28, delay: d, ease: entranceSharp } }),
};
// a satellite knocked by a passing stroke: kicks away and settles back.
// custom=[dx, dy, delay]
const recoil: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[] = []) => ({
    x: [0, c[0] ?? 0, 0],
    y: [0, c[1] ?? 0, 0],
    transition: { duration: 0.45, delay: c[2] ?? 0, ease: E },
  }),
};
// a key pressed down and released. custom=delay
const keyPress: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({ y: [0, 0.7, 0], transition: { duration: 0.2, delay: d, ease: E } }),
};
// sideways jelly wobble that settles. custom=delay
const wobble: Variants = {
  normal: { x: 0 },
  animate: (d: number = 0) => ({ x: [0, 1.2, -1.2, 0.5, 0], transition: { duration: 0.7, delay: d, ease: E } }),
};
// heavy lift: slow heave up with a slight swing, quick drop, thud bounce
const heave: Variants = {
  normal: { y: 0, rotate: 0 },
  animate: {
    y: [0, -0.9, -0.9, 0.3, 0],
    rotate: [0, -3, 2, 0, 0],
    transition: { duration: 0.9, ease: E, times: [0, 0.35, 0.55, 0.8, 1] },
  },
};
// caliper jaw: starts displaced outward and clamps onto its rest spot.
// custom=[dx, dy]. Slow enough to actually read as travel (entranceSharp
// finished before the first visible frame).
const clampIn: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[] = []) => ({
    x: [c[0] ?? 0, 0],
    y: [c[1] ?? 0, 0],
    transition: { duration: 0.45, ease: E },
  }),
};

export const angleBody = '  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <path d="M3 11a10 10 0 0 1 10 10"/>';
export function Angle(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the L renders split at the corner weld (round caps hide the joint) so
          the wall arm can fold: it starts flat ON the floor (0°) and folds up
          to the right angle (90°) while the measure arc sweeps up behind it */}
      {/* originX/originY (NOT style transformOrigin, which motion overwrites
          with 50% 50% while animating a transform) pin the hinge at (3,21) */}
      <motion.path d="M3 3v16" variants={foldUp} style={{ transformBox: "view-box", originX: "3px", originY: "21px" }} />
      <path d="M3 19a2 2 0 0 0 2 2h16" />
      <motion.path d="M3 11a10 10 0 0 1 10 10" variants={sweepArc} />
    </Icon>
  );
}
// rotated +90 about (3,21) the wall lands exactly on the floor line (5,21)→(21,21).
// The measure arc is centered on the SAME pivot (3,21), so with identical
// timing its revealed fraction equals the arm's angle — the arc tip rides the
// folding arm like a protractor needle from 0° to 90°.
const FOLD = { duration: 0.9, ease: E } as const;
const foldUp: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [90, 0], transition: { ...FOLD } },
};
const sweepArc: Variants = {
  normal: { pathLength: 1, pathOffset: 0, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    pathOffset: [1, 0],
    opacity: [0, 1],
    transition: {
      pathLength: { ...FOLD },
      pathOffset: { ...FOLD },
      opacity: { duration: 0.1 },
    },
  },
};

export const asteriskBody = '  <path d="M12 6v12"/>\n  <path d="M17.196 9 6.804 15"/>\n  <path d="m6.804 9 10.392 6"/>';
export function Asterisk(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 6v12" variants={growMiddle} transition={gm(0, 0.4)} />
      <motion.path d="M17.196 9 6.804 15" variants={growMiddle} transition={gm(0.1, 0.4)} />
      <motion.path d="m6.804 9 10.392 6" variants={growMiddle} transition={gm(0.2, 0.4)} />
    </Icon>
  );
}

export const astroidBody = '  <path d="M12.983 21.186a1 1 0 0 1-1.966 0 10 10 0 0 0-8.203-8.203 1 1 0 0 1 0-1.966 10 10 0 0 0 8.203-8.203 1 1 0 0 1 1.966 0 10 10 0 0 0 8.203 8.203 1 1 0 0 1 0 1.966 10 10 0 0 0-8.203 8.203"/>';
export function Astroid(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12.983 21.186a1 1 0 0 1-1.966 0 10 10 0 0 0-8.203-8.203 1 1 0 0 1 0-1.966 10 10 0 0 0 8.203-8.203 1 1 0 0 1 1.966 0 10 10 0 0 0 8.203 8.203 1 1 0 0 1 0 1.966 10 10 0 0 0-8.203 8.203" variants={drawFlow} custom={[0, 0.75]} />
    </Icon>
  );
}

export const badgePercentBody = '  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>\n  <path d="m15 9-6 6"/>\n  <path d="M9 9h.01"/>\n  <path d="M15 15h.01"/>';
export function BadgePercent(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <motion.path d="m15 9-6 6" variants={growMiddle} transition={gm(0, 0.45)} />
      <motion.path d="M9 9h.01" variants={recoil} custom={[-0.7, -0.7, 0.12]} />
      <motion.path d="M15 15h.01" variants={recoil} custom={[0.7, 0.7, 0.12]} />
    </Icon>
  );
}

export const boxBody = '  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>\n  <path d="m3.3 7 8.7 5 8.7-5"/>\n  <path d="M12 22V12"/>';
export function Box(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <motion.path d="m3.3 7 8.7 5 8.7-5" variants={drawFlow} custom={[0, 0.4]} />
      {/* path runs bottom→center, so drawRev folds it DOWN from the seam */}
      <motion.path d="M12 22V12" variants={drawRev} custom={[0.25, 0.35]} />
    </Icon>
  );
}

export const calculatorBody = '  <rect width="16" height="20" x="4" y="2" rx="2"/>\n  <line x1="8" x2="16" y1="6" y2="6"/>\n  <line x1="16" x2="16" y1="14" y2="18"/>\n  <path d="M16 10h.01"/>\n  <path d="M12 10h.01"/>\n  <path d="M8 10h.01"/>\n  <path d="M12 14h.01"/>\n  <path d="M8 14h.01"/>\n  <path d="M12 18h.01"/>\n  <path d="M8 18h.01"/>';
export function Calculator(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="16" height="20" x="4" y="2" rx="2" />
      {/* punch the keys in typing order, hit enter, and the display draws the result */}
      <motion.path d="M8 10h.01" variants={keyPress} custom={0} />
      <motion.path d="M12 10h.01" variants={keyPress} custom={0.07} />
      <motion.path d="M16 10h.01" variants={keyPress} custom={0.14} />
      <motion.path d="M8 14h.01" variants={keyPress} custom={0.21} />
      <motion.path d="M12 14h.01" variants={keyPress} custom={0.28} />
      <motion.path d="M8 18h.01" variants={keyPress} custom={0.35} />
      <motion.path d="M12 18h.01" variants={keyPress} custom={0.42} />
      <motion.line x1="16" x2="16" y1="14" y2="18" variants={keyPress} custom={0.5} />
      <motion.line x1="8" x2="16" y1="6" y2="6" variants={drawFlow} custom={[0.62, 0.25]} />
    </Icon>
  );
}

export const circleDivideBody = '  <circle cx="12" cy="12" r="10"/>\n  <line x1="8" x2="16" y1="12" y2="12"/>\n  <line x1="12" x2="12" y1="16" y2="16"/>\n  <line x1="12" x2="12" y1="8" y2="8"/>';
export function CircleDivide(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      <motion.line x1="8" x2="16" y1="12" y2="12" variants={growMiddle} transition={gm(0, 0.45)} />
      <motion.line x1="12" x2="12" y1="16" y2="16" variants={recoil} custom={[0, 0.8, 0.12]} />
      <motion.line x1="12" x2="12" y1="8" y2="8" variants={recoil} custom={[0, -0.8, 0.12]} />
    </Icon>
  );
}

export const circleEqualBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="M7 10h10"/>\n  <path d="M7 14h10"/>';
export function CircleEqual(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      <motion.path d="M7 10h10" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M7 14h10" variants={drawRev} custom={[0.08, 0.4]} />
    </Icon>
  );
}

export const circleMinusBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="M8 12h8"/>';
export function CircleMinus(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      <motion.path d="M8 12h8" variants={growMiddle} transition={gm(0, 0.45)} />
    </Icon>
  );
}

export const circlePercentBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="m15 9-6 6"/>\n  <path d="M9 9h.01"/>\n  <path d="M15 15h.01"/>';
export function CirclePercent(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      <motion.path d="m15 9-6 6" variants={growMiddle} transition={gm(0, 0.45)} />
      <motion.path d="M9 9h.01" variants={recoil} custom={[-0.7, -0.7, 0.12]} />
      <motion.path d="M15 15h.01" variants={recoil} custom={[0.7, 0.7, 0.12]} />
    </Icon>
  );
}

export const circleSlashBody = '  <circle cx="12" cy="12" r="10"/>\n  <line x1="9" x2="15" y1="15" y2="9"/>';
export function CircleSlash(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      <motion.line x1="9" x2="15" y1="15" y2="9" variants={growMiddle} transition={gm(0, 0.45)} />
    </Icon>
  );
}

export const circleSlash2Body = '  <circle cx="12" cy="12" r="10"/>\n  <path d="M22 2 2 22"/>';
export function CircleSlash2(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the empty-set symbol writes itself: the ring inks round, then the
          slash strikes through corner to corner (same beat as phi) */}
      <motion.circle cx="12" cy="12" r="10" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M22 2 2 22" variants={drawFlow} custom={[0.42, 0.35]} />
    </Icon>
  );
}

export const circleXBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="m15 9-6 6"/>\n  <path d="m9 9 6 6"/>';
export function CircleX(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      <motion.path d="m15 9-6 6" variants={growMiddle} transition={gm(0, 0.45)} />
      <motion.path d="m9 9 6 6" variants={growMiddle} transition={gm(0.1, 0.45)} />
    </Icon>
  );
}

export const coneBody = '  <path d="m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98"/>\n  <ellipse cx="12" cy="19" rx="9" ry="3"/>';
export function Cone(p: IconProps) {
  return (
    <Icon {...p}>
      {/* drafted line by line: the slopes draw up over the apex and down,
          then the base rim closes the solid */}
      <motion.path d="m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98" variants={drawFlow} custom={[0, 0.45]} />
      <motion.ellipse cx="12" cy="19" rx="9" ry="3" variants={drawFlow} custom={[0.35, 0.5]} />
    </Icon>
  );
}

export const copyMinusBody = '  <line x1="12" x2="18" y1="15" y2="15"/>\n  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>\n  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>';
export function CopyMinus(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.line x1="12" x2="18" y1="15" y2="15" variants={growMiddle} transition={gm(0, 0.45)} />
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </Icon>
  );
}

export const copyPlusBody = '  <line x1="15" x2="15" y1="12" y2="18"/>\n  <line x1="12" x2="18" y1="15" y2="15"/>\n  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>\n  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>';
export function CopyPlus(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.line x1="15" x2="15" y1="12" y2="18" variants={growMiddle} transition={gm(0.1, 0.4)} />
      <motion.line x1="12" x2="18" y1="15" y2="15" variants={growMiddle} transition={gm(0, 0.4)} />
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </Icon>
  );
}

export const copySlashBody = '  <line x1="12" x2="18" y1="18" y2="12"/>\n  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>\n  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>';
export function CopySlash(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.line x1="12" x2="18" y1="18" y2="12" variants={growMiddle} transition={gm(0, 0.45)} />
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </Icon>
  );
}

export const copyXBody = '  <line x1="12" x2="18" y1="12" y2="18"/>\n  <line x1="12" x2="18" y1="18" y2="12"/>\n  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>\n  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>';
export function CopyX(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.line x1="12" x2="18" y1="12" y2="18" variants={growMiddle} transition={gm(0, 0.4)} />
      <motion.line x1="12" x2="18" y1="18" y2="12" variants={growMiddle} transition={gm(0.1, 0.4)} />
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </Icon>
  );
}

export const cuboidBody = '  <path d="M10 22v-8"/>\n  <path d="M2.336 8.89 10 14l11.715-7.029"/>\n  <path d="M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z"/>';
export function Cuboid(p: IconProps) {
  return (
    <Icon {...p}>
      {/* drafted line by line: outline first, then the face seam sweeps
          across, then the front edge folds down from the seam */}
      <motion.path d="M10 22v-8" variants={drawRev} custom={[0.6, 0.3]} />
      <motion.path d="M2.336 8.89 10 14l11.715-7.029" variants={drawFlow} custom={[0.38, 0.4]} />
      <motion.path d="M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z" variants={drawFlow} custom={[0, 0.5]} />
    </Icon>
  );
}

export const cylinderBody = '  <ellipse cx="12" cy="5" rx="9" ry="3"/>\n  <path d="M3 5v14a9 3 0 0 0 18 0V5"/>';
export function Cylinder(p: IconProps) {
  return (
    <Icon {...p}>
      {/* drafted line by line: the wall drops, rounds the bottom, rises back
          up, then the top rim closes the lid */}
      <motion.ellipse cx="12" cy="5" rx="9" ry="3" variants={drawFlow} custom={[0.4, 0.45]} />
      <motion.path d="M3 5v14a9 3 0 0 0 18 0V5" variants={drawFlow} custom={[0, 0.5]} />
    </Icon>
  );
}

export const decimalsArrowLeftBody = '  <path d="m13 21-3-3 3-3"/>\n  <path d="M20 18H10"/>\n  <path d="M3 11h.01"/>\n  <rect x="6" y="3" width="5" height="8" rx="2.5"/>';
export function DecimalsArrowLeft(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="m13 21-3-3 3-3" variants={drawFlow} custom={[0.35, 0.25]} />
      <motion.path d="M20 18H10" variants={drawFlow} custom={[0.15, 0.3]} />
      <motion.path d="M3 11h.01" variants={recoil} custom={[0, -1.2, 0]} />
      <rect x="6" y="3" width="5" height="8" rx="2.5" />
    </Icon>
  );
}

export const decimalsArrowRightBody = '  <path d="M10 18h10"/>\n  <path d="m17 21 3-3-3-3"/>\n  <path d="M3 11h.01"/>\n  <rect x="15" y="3" width="5" height="8" rx="2.5"/>\n  <rect x="6" y="3" width="5" height="8" rx="2.5"/>';
export function DecimalsArrowRight(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 18h10" variants={drawFlow} custom={[0.15, 0.3]} />
      <motion.path d="m17 21 3-3-3-3" variants={drawFlow} custom={[0.35, 0.25]} />
      <motion.path d="M3 11h.01" variants={recoil} custom={[0, -1.2, 0]} />
      <rect x="15" y="3" width="5" height="8" rx="2.5" />
      <rect x="6" y="3" width="5" height="8" rx="2.5" />
    </Icon>
  );
}

export const diameterBody = '  <circle cx="19" cy="19" r="2"/>\n  <circle cx="5" cy="5" r="2"/>\n  <path d="M6.48 3.66a10 10 0 0 1 13.86 13.86"/>\n  <path d="m6.41 6.41 11.18 11.18"/>\n  <path d="M3.66 6.48a10 10 0 0 0 13.86 13.86"/>';
export function Diameter(p: IconProps) {
  return (
    <Icon {...p}>
      {/* caliper measurement: both jaws clamp in from outside onto the circle,
          then the diameter line draws between them */}
      {/* ±2.0 travel is the most the bottom-right jaw can start out without
          its paint (center+r2+stroke) leaving the 24-unit viewBox */}
      <motion.circle cx="19" cy="19" r="2" variants={clampIn} custom={[2, 2]} />
      <motion.circle cx="5" cy="5" r="2" variants={clampIn} custom={[-2, -2]} />
      <path d="M6.48 3.66a10 10 0 0 1 13.86 13.86" />
      <motion.path d="m6.41 6.41 11.18 11.18" variants={drawFlow} custom={[0.4, 0.4]} />
      <path d="M3.66 6.48a10 10 0 0 0 13.86 13.86" />
    </Icon>
  );
}

export const diamondPercentBody = '  <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z"/>\n  <path d="M9.2 9.2h.01"/>\n  <path d="m14.5 9.5-5 5"/>\n  <path d="M14.7 14.8h.01"/>';
export function DiamondPercent(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z" />
      <motion.path d="M9.2 9.2h.01" variants={recoil} custom={[-0.7, -0.7, 0.12]} />
      <motion.path d="m14.5 9.5-5 5" variants={growMiddle} transition={gm(0, 0.45)} />
      <motion.path d="M14.7 14.8h.01" variants={recoil} custom={[0.7, 0.7, 0.12]} />
    </Icon>
  );
}

export const divideBody = '  <circle cx="12" cy="6" r="1"/>\n  <line x1="5" x2="19" y1="12" y2="12"/>\n  <circle cx="12" cy="18" r="1"/>';
export function Divide(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.circle cx="12" cy="6" r="1" variants={recoil} custom={[0, -0.9, 0.12]} />
      <motion.line x1="5" x2="19" y1="12" y2="12" variants={growMiddle} transition={gm(0, 0.45)} />
      <motion.circle cx="12" cy="18" r="1" variants={recoil} custom={[0, 0.9, 0.12]} />
    </Icon>
  );
}

export const draftingCompassBody = '  <path d="m12.99 6.74 1.93 3.44"/>\n  <path d="M19.136 12a10 10 0 0 1-14.271 0"/>\n  <path d="m21 21-2.16-3.84"/>\n  <path d="m3 21 8.02-14.26"/>\n  <circle cx="12" cy="5" r="2"/>';
export function DraftingCompass(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the compass rocks around its pivot head; the drawn arc stays on the
          paper and inks itself under the sweep */}
      <motion.g variants={compassRock} style={{ transformBox: "view-box", originX: "12px", originY: "5px" }}>
        <path d="m12.99 6.74 1.93 3.44" />
        <path d="m21 21-2.16-3.84" />
        <path d="m3 21 8.02-14.26" />
        <circle cx="12" cy="5" r="2" />
      </motion.g>
      <motion.path d="M19.136 12a10 10 0 0 1-14.271 0" variants={drawFlow} custom={[0.1, 0.55]} />
    </Icon>
  );
}
const compassRock: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -6, 3, 0], transition: { duration: 0.8, ease: E } },
};

export const equalBody = '  <line x1="5" x2="19" y1="9" y2="9"/>\n  <line x1="5" x2="19" y1="15" y2="15"/>';
export function Equal(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.line x1="5" x2="19" y1="9" y2="9" variants={drawFlow} custom={[0, 0.4]} />
      <motion.line x1="5" x2="19" y1="15" y2="15" variants={drawRev} custom={[0.08, 0.4]} />
    </Icon>
  );
}

export const equalApproximatelyBody = '  <path d="M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0"/>\n  <path d="M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0"/>';
export function EqualApproximately(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0" variants={wobble} custom={0.08} />
      <motion.path d="M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0" variants={wobble} custom={0} />
    </Icon>
  );
}

export const equalNotBody = '  <line x1="5" x2="19" y1="9" y2="9"/>\n  <line x1="5" x2="19" y1="15" y2="15"/>\n  <line x1="19" x2="5" y1="5" y2="19"/>';
export function EqualNot(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.line x1="5" x2="19" y1="9" y2="9" variants={drawFlow} custom={[0, 0.35]} />
      <motion.line x1="5" x2="19" y1="15" y2="15" variants={drawRev} custom={[0.08, 0.35]} />
      <motion.line x1="19" x2="5" y1="5" y2="19" variants={growMiddle} transition={gm(0.45, 0.4)} />
    </Icon>
  );
}

export const grid2x2Body = '  <path d="M12 3v18"/>\n  <path d="M3 12h18"/>\n  <rect x="3" y="3" width="18" height="18" rx="2"/>';
export function Grid2x2(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 3v18" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M3 12h18" variants={drawFlow} custom={[0.15, 0.4]} />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </Icon>
  );
}

export const grid2x2CheckBody = '  <path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/>\n  <path d="m16 19 2 2 4-4"/>';
export function Grid2x2Check(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3" />
      <motion.path d="m16 19 2 2 4-4" variants={drawOn} transition={{ duration: 0.5, delay: 0.1, ease: entranceSharp, opacity: { duration: 0.08, delay: 0.1 } }} />
    </Icon>
  );
}

export const grid2x2PlusBody = '  <path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/>\n  <path d="M16 19h6"/>\n  <path d="M19 22v-6"/>';
export function Grid2x2Plus(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3" />
      <motion.path d="M16 19h6" variants={growMiddle} transition={gm(0, 0.4)} />
      <motion.path d="M19 22v-6" variants={growMiddle} transition={gm(0.1, 0.4)} />
    </Icon>
  );
}

export const grid2x2XBody = '  <path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/>\n  <path d="m16 16 5 5"/>\n  <path d="m16 21 5-5"/>';
export function Grid2x2X(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3" />
      <motion.path d="m16 16 5 5" variants={growMiddle} transition={gm(0, 0.4)} />
      <motion.path d="m16 21 5-5" variants={growMiddle} transition={gm(0.1, 0.4)} />
    </Icon>
  );
}

export const grid3x2Body = '  <path d="M15 3v18"/>\n  <path d="M3 12h18"/>\n  <path d="M9 3v18"/>\n  <rect x="3" y="3" width="18" height="18" rx="2"/>';
export function Grid3x2(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M15 3v18" variants={drawFlow} custom={[0.1, 0.35]} />
      <motion.path d="M3 12h18" variants={drawFlow} custom={[0.25, 0.4]} />
      <motion.path d="M9 3v18" variants={drawFlow} custom={[0, 0.35]} />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </Icon>
  );
}

export const landPlotBody = '  <path d="m12 8 6-3-6-3v10"/>\n  <path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"/>\n  <path d="m6.49 12.85 11.02 6.3"/>\n  <path d="M17.51 12.85 6.5 19.15"/>';
export function LandPlot(p: IconProps) {
  return (
    <Icon {...p}>
      {/* path ends at the pole base, so drawRev hoists the flag bottom-up */}
      <motion.path d="m12 8 6-3-6-3v10" variants={drawRev} custom={[0, 0.5]} />
      <path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12" />
      <motion.path d="m6.49 12.85 11.02 6.3" variants={drawFlow} custom={[0.35, 0.35]} />
      <motion.path d="M17.51 12.85 6.5 19.15" variants={drawFlow} custom={[0.45, 0.35]} />
    </Icon>
  );
}

export const lineSquiggleBody = '  <path d="M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2"/>';
export function LineSquiggle(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2" variants={drawFlow} custom={[0, 0.9]} />
    </Icon>
  );
}

export const octagonXBody = '  <path d="m15 9-6 6"/>\n  <path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"/>\n  <path d="m9 9 6 6"/>';
export function OctagonX(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="m15 9-6 6" variants={growMiddle} transition={gm(0, 0.45)} />
      <path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" />
      <motion.path d="m9 9 6 6" variants={growMiddle} transition={gm(0.1, 0.45)} />
    </Icon>
  );
}

export const omegaBody = '  <path d="M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21"/>';
export function Omega(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21" variants={drawFlow} custom={[0, 0.7]} />
    </Icon>
  );
}

export const parenthesesBody = '  <path d="M8 21s-4-3-4-9 4-9 4-9"/>\n  <path d="M16 3s4 3 4 9-4 9-4 9"/>';
export function Parentheses(p: IconProps) {
  return (
    <Icon {...p}>
      {/* both brackets write top→bottom: left path starts at its bottom, so it
          draws in reverse */}
      <motion.path d="M8 21s-4-3-4-9 4-9 4-9" variants={drawRev} custom={[0, 0.5]} />
      <motion.path d="M16 3s4 3 4 9-4 9-4 9" variants={drawFlow} custom={[0, 0.5]} />
    </Icon>
  );
}

export const percentBody = '  <line x1="19" x2="5" y1="5" y2="19"/>\n  <circle cx="6.5" cy="6.5" r="2.5"/>\n  <circle cx="17.5" cy="17.5" r="2.5"/>';
export function Percent(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.line x1="19" x2="5" y1="5" y2="19" variants={growMiddle} transition={gm(0, 0.45)} />
      <motion.circle cx="6.5" cy="6.5" r="2.5" variants={recoil} custom={[-0.7, -0.7, 0.12]} />
      <motion.circle cx="17.5" cy="17.5" r="2.5" variants={recoil} custom={[0.7, 0.7, 0.12]} />
    </Icon>
  );
}

export const phiBody = '  <path d="M12 2v20"/>\n  <circle cx="12" cy="12" r="7"/>';
export function Phi(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 2v20" variants={drawFlow} custom={[0.35, 0.4]} />
      <motion.circle cx="12" cy="12" r="7" variants={drawFlow} custom={[0, 0.55]} />
    </Icon>
  );
}

export const piBody = '  <line x1="9" x2="9" y1="4" y2="20"/>\n  <path d="M4 7c0-1.7 1.3-3 3-3h13"/>\n  <path d="M18 20c-1.7 0-3-1.3-3-3V4"/>';
export function Pi(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.line x1="9" x2="9" y1="4" y2="20" variants={drawFlow} custom={[0.15, 0.3]} />
      <motion.path d="M4 7c0-1.7 1.3-3 3-3h13" variants={drawFlow} custom={[0, 0.35]} />
      {/* right leg path runs foot→top, so drawRev writes it downward */}
      <motion.path d="M18 20c-1.7 0-3-1.3-3-3V4" variants={drawRev} custom={[0.25, 0.35]} />
    </Icon>
  );
}

export const pyramidBody = '  <path d="M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z"/>\n  <path d="M12 2v20"/>';
export function Pyramid(p: IconProps) {
  return (
    <Icon {...p}>
      {/* drafted line by line: the outline sweeps up over the apex and round
          the base, then the front edge drops from apex to base */}
      <motion.path d="M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M12 2v20" variants={drawFlow} custom={[0.4, 0.4]} />
    </Icon>
  );
}

export const radicalBody = '  <path d="M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21"/>';
export function Radical(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21" variants={drawFlow} custom={[0, 0.65]} />
    </Icon>
  );
}

export const radiusBody = '  <path d="M20.34 17.52a10 10 0 1 0-2.82 2.82"/>\n  <circle cx="19" cy="19" r="2"/>\n  <path d="m13.41 13.41 4.18 4.18"/>\n  <circle cx="12" cy="12" r="2"/>';
export function Radius(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M20.34 17.52a10 10 0 1 0-2.82 2.82" />
      <motion.circle cx="19" cy="19" r="2" variants={pulse} custom={0.42} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="m13.41 13.41 4.18 4.18" variants={drawFlow} custom={[0.15, 0.3]} />
      <motion.circle cx="12" cy="12" r="2" variants={pulse} custom={0} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const sigmaBody = '  <path d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2"/>';
export function Sigma(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2" variants={drawFlow} custom={[0, 0.7]} />
    </Icon>
  );
}

export const slashBody = '  <path d="M22 2 2 22"/>';
export function Slash(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M22 2 2 22" variants={growMiddle} transition={gm(0, 0.45)} />
    </Icon>
  );
}

export const squareAsteriskBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="M12 8v8"/>\n  <path d="m8.5 14 7-4"/>\n  <path d="m8.5 10 7 4"/>';
export function SquareAsterisk(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="M12 8v8" variants={growMiddle} transition={gm(0, 0.35)} />
      <motion.path d="m8.5 14 7-4" variants={growMiddle} transition={gm(0.1, 0.35)} />
      <motion.path d="m8.5 10 7 4" variants={growMiddle} transition={gm(0.2, 0.35)} />
    </Icon>
  );
}

export const squareChevronUpBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="m8 14 4-4 4 4"/>';
export function SquareChevronUp(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="m8 14 4-4 4 4" variants={nudge("y", -2)} transition={nudgeTransition} />
    </Icon>
  );
}

export const squareDivideBody = '  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>\n  <line x1="8" x2="16" y1="12" y2="12"/>\n  <line x1="12" x2="12" y1="16" y2="16"/>\n  <line x1="12" x2="12" y1="8" y2="8"/>';
export function SquareDivide(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <motion.line x1="8" x2="16" y1="12" y2="12" variants={growMiddle} transition={gm(0, 0.45)} />
      <motion.line x1="12" x2="12" y1="16" y2="16" variants={recoil} custom={[0, 0.8, 0.12]} />
      <motion.line x1="12" x2="12" y1="8" y2="8" variants={recoil} custom={[0, -0.8, 0.12]} />
    </Icon>
  );
}

export const squareEqualBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="M7 10h10"/>\n  <path d="M7 14h10"/>';
export function SquareEqual(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="M7 10h10" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M7 14h10" variants={drawRev} custom={[0.08, 0.4]} />
    </Icon>
  );
}

export const squareFunctionBody = '  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>\n  <path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3"/>\n  <path d="M9 11.2h5.7"/>';
export function SquareFunction(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      {/* the ƒ curve path runs bottom→top, so drawRev writes it downward */}
      <motion.path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" variants={drawRev} custom={[0, 0.5]} />
      <motion.path d="M9 11.2h5.7" variants={drawFlow} custom={[0.3, 0.25]} />
    </Icon>
  );
}

export const squareMinusBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="M8 12h8"/>';
export function SquareMinus(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="M8 12h8" variants={growMiddle} transition={gm(0, 0.45)} />
    </Icon>
  );
}

export const squarePercentBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="m15 9-6 6"/>\n  <path d="M9 9h.01"/>\n  <path d="M15 15h.01"/>';
export function SquarePercent(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="m15 9-6 6" variants={growMiddle} transition={gm(0, 0.45)} />
      <motion.path d="M9 9h.01" variants={recoil} custom={[-0.7, -0.7, 0.12]} />
      <motion.path d="M15 15h.01" variants={recoil} custom={[0.7, 0.7, 0.12]} />
    </Icon>
  );
}

export const squarePiBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="M7 7h10"/>\n  <path d="M10 7v10"/>\n  <path d="M16 17a2 2 0 0 1-2-2V7"/>';
export function SquarePi(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="M7 7h10" variants={drawFlow} custom={[0, 0.3]} />
      <motion.path d="M10 7v10" variants={drawFlow} custom={[0.12, 0.3]} />
      {/* right leg path runs foot→top, so drawRev writes it downward */}
      <motion.path d="M16 17a2 2 0 0 1-2-2V7" variants={drawRev} custom={[0.22, 0.35]} />
    </Icon>
  );
}

export const squarePlusBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="M8 12h8"/>\n  <path d="M12 8v8"/>';
export function SquarePlus(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="M8 12h8" variants={growMiddle} transition={gm(0, 0.4)} />
      <motion.path d="M12 8v8" variants={growMiddle} transition={gm(0.1, 0.4)} />
    </Icon>
  );
}

export const squareRadicalBody = '  <path d="M7 12h2l2 5 2-10h4"/>\n  <rect x="3" y="3" width="18" height="18" rx="2"/>';
export function SquareRadical(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M7 12h2l2 5 2-10h4" variants={drawFlow} custom={[0, 0.5]} />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </Icon>
  );
}

export const squareSigmaBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="M16 8.9V7H8l4 5-4 5h8v-1.9"/>';
export function SquareSigma(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="M16 8.9V7H8l4 5-4 5h8v-1.9" variants={drawFlow} custom={[0, 0.6]} />
    </Icon>
  );
}

export const squareSlashBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <line x1="9" x2="15" y1="15" y2="9"/>';
export function SquareSlash(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.line x1="9" x2="15" y1="15" y2="9" variants={growMiddle} transition={gm(0, 0.45)} />
    </Icon>
  );
}

export const squareXBody = '  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>\n  <path d="m15 9-6 6"/>\n  <path d="m9 9 6 6"/>';
export function SquareX(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <motion.path d="m15 9-6 6" variants={growMiddle} transition={gm(0, 0.45)} />
      <motion.path d="m9 9 6 6" variants={growMiddle} transition={gm(0.1, 0.45)} />
    </Icon>
  );
}

export const tally1Body = '  <path d="M4 4v16"/>';
export function Tally1(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M4 4v16" variants={drawFlow} custom={[0, 0.22]} />
    </Icon>
  );
}

export const tally2Body = '  <path d="M4 4v16"/>\n  <path d="M9 4v16"/>';
export function Tally2(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M4 4v16" variants={drawFlow} custom={[0, 0.22]} />
      <motion.path d="M9 4v16" variants={drawFlow} custom={[0.12, 0.22]} />
    </Icon>
  );
}

export const tally3Body = '  <path d="M4 4v16"/>\n  <path d="M9 4v16"/>\n  <path d="M14 4v16"/>';
export function Tally3(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M4 4v16" variants={drawFlow} custom={[0, 0.22]} />
      <motion.path d="M9 4v16" variants={drawFlow} custom={[0.12, 0.22]} />
      <motion.path d="M14 4v16" variants={drawFlow} custom={[0.24, 0.22]} />
    </Icon>
  );
}

export const tally4Body = '  <path d="M4 4v16"/>\n  <path d="M9 4v16"/>\n  <path d="M14 4v16"/>\n  <path d="M19 4v16"/>';
export function Tally4(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M4 4v16" variants={drawFlow} custom={[0, 0.22]} />
      <motion.path d="M9 4v16" variants={drawFlow} custom={[0.12, 0.22]} />
      <motion.path d="M14 4v16" variants={drawFlow} custom={[0.24, 0.22]} />
      <motion.path d="M19 4v16" variants={drawFlow} custom={[0.36, 0.22]} />
    </Icon>
  );
}

export const tally5Body = '  <path d="M4 4v16"/>\n  <path d="M9 4v16"/>\n  <path d="M14 4v16"/>\n  <path d="M19 4v16"/>\n  <path d="M22 6 2 18"/>';
export function Tally5(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M4 4v16" variants={drawFlow} custom={[0, 0.22]} />
      <motion.path d="M9 4v16" variants={drawFlow} custom={[0.12, 0.22]} />
      <motion.path d="M14 4v16" variants={drawFlow} custom={[0.24, 0.22]} />
      <motion.path d="M19 4v16" variants={drawFlow} custom={[0.36, 0.22]} />
      {/* the bundle strike */}
      <motion.path d="M22 6 2 18" variants={growMiddle} transition={gm(0.55, 0.35)} />
    </Icon>
  );
}

export const tangentBody = '  <circle cx="17" cy="4" r="2"/>\n  <path d="M15.59 5.41 5.41 15.59"/>\n  <circle cx="4" cy="17" r="2"/>\n  <path d="M12 22s-4-9-1.5-11.5S22 12 22 12"/>';
export function Tangent(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.circle cx="17" cy="4" r="2" variants={pulse} custom={0} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M15.59 5.41 5.41 15.59" variants={drawFlow} custom={[0.15, 0.4]} />
      <motion.circle cx="4" cy="17" r="2" variants={pulse} custom={0.5} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <path d="M12 22s-4-9-1.5-11.5S22 12 22 12" />
    </Icon>
  );
}

export const triangleRightBody = '  <path d="M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z"/>';
export function TriangleRight(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z" variants={drawFlow} custom={[0, 0.6]} />
    </Icon>
  );
}

export const variableBody = '  <path d="M8 21s-4-3-4-9 4-9 4-9"/>\n  <path d="M16 3s4 3 4 9-4 9-4 9"/>\n  <line x1="15" x2="9" y1="9" y2="15"/>\n  <line x1="9" x2="15" y1="9" y2="15"/>';
export function Variable(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M8 21s-4-3-4-9 4-9 4-9" variants={drawRev} custom={[0, 0.45]} />
      <motion.path d="M16 3s4 3 4 9-4 9-4 9" variants={drawFlow} custom={[0, 0.45]} />
      <motion.line x1="15" x2="9" y1="9" y2="15" variants={growMiddle} transition={gm(0.3, 0.35)} />
      <motion.line x1="9" x2="15" y1="9" y2="15" variants={growMiddle} transition={gm(0.4, 0.35)} />
    </Icon>
  );
}

export const vectorSquareBody = '  <path d="M19.5 7a24 24 0 0 1 0 10"/>\n  <path d="M4.5 7a24 24 0 0 0 0 10"/>\n  <path d="M7 19.5a24 24 0 0 0 10 0"/>\n  <path d="M7 4.5a24 24 0 0 1 10 0"/>\n  <rect x="17" y="17" width="5" height="5" rx="1"/>\n  <rect x="17" y="2" width="5" height="5" rx="1"/>\n  <rect x="2" y="17" width="5" height="5" rx="1"/>\n  <rect x="2" y="2" width="5" height="5" rx="1"/>';
export function VectorSquare(p: IconProps) {
  const handle = { transformBox: "fill-box", transformOrigin: "center" } as const;
  return (
    <Icon {...p}>
      {/* a vector path under construction: corner handle pops, edge draws to
          the next corner, all the way round — TL → TR → BR → BL → close */}
      <motion.rect x="2" y="2" width="5" height="5" rx="1" variants={popIn} custom={0} style={handle} />
      <motion.path d="M7 4.5a24 24 0 0 1 10 0" variants={drawFlow} custom={[0.06, 0.2]} />
      <motion.rect x="17" y="2" width="5" height="5" rx="1" variants={popIn} custom={0.22} style={handle} />
      <motion.path d="M19.5 7a24 24 0 0 1 0 10" variants={drawFlow} custom={[0.28, 0.2]} />
      <motion.rect x="17" y="17" width="5" height="5" rx="1" variants={popIn} custom={0.44} style={handle} />
      <motion.path d="M7 19.5a24 24 0 0 0 10 0" variants={drawRev} custom={[0.5, 0.2]} />
      <motion.rect x="2" y="17" width="5" height="5" rx="1" variants={popIn} custom={0.66} style={handle} />
      <motion.path d="M4.5 7a24 24 0 0 0 0 10" variants={drawRev} custom={[0.72, 0.2]} />
    </Icon>
  );
}

export const weightBody = '  <circle cx="12" cy="5" r="3"/>\n  <path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"/>';
export function Weight(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={heave} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle cx="12" cy="5" r="3" />
        <path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z" />
      </motion.g>
    </Icon>
  );
}

export const weightTildeBody = '  <path d="M6.5 8a2 2 0 0 0-1.906 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8z"/>\n  <path d="M7.999 15a2.5 2.5 0 0 1 4 0 2.5 2.5 0 0 0 4 0"/>\n  <circle cx="12" cy="5" r="3"/>';
export function WeightTilde(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={heave} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d="M6.5 8a2 2 0 0 0-1.906 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8z" />
        {/* after the thud, the needle wobbles — approximately this heavy */}
        <motion.path d="M7.999 15a2.5 2.5 0 0 1 4 0 2.5 2.5 0 0 0 4 0" variants={wobble} custom={0.75} />
        <circle cx="12" cy="5" r="3" />
      </motion.g>
    </Icon>
  );
}

export const xLineTopBody = '  <path d="M18 4H6"/>\n  <path d="M18 8 6 20"/>\n  <path d="m6 8 12 12"/>';
export function XLineTop(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the bar recoils up from the strike below it */}
      <motion.path d="M18 4H6" variants={recoil} custom={[0, -0.8, 0.15]} />
      <motion.path d="M18 8 6 20" variants={growMiddle} transition={gm(0, 0.4)} />
      <motion.path d="m6 8 12 12" variants={growMiddle} transition={gm(0.1, 0.4)} />
    </Icon>
  );
}
