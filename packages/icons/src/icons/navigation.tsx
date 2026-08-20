"use client";

import { motion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { Icon } from "../icon.js";
import { drawFlow, drawRev, drawOn, growMiddle, nudge, nudgeTransition } from "../variants.js";
import { entranceSharp } from "../ease.js";
import type { IconProps } from "../types.js";

// Navigation & Places language: buildings CONSTRUCT themselves in meaningful
// order (foundation → walls → detail payoff), routes/tracks draw their journey
// node to node, genuine rotators (compass needle, ferris wheel, helm, meter
// needle) really rotate — origins pinned with motion originX/originY px values
// (style transformOrigin gets overwritten by motion mid-animation). -off icons
// beat their fragments in fast, then the slash strikes. Dots never vanish:
// they pulse or thump.
const E = "easeInOut";

function gm(delay = 0, duration = 0.5): Transition {
  return { duration, delay, ease: entranceSharp, opacity: { duration: 0.08, delay } };
}
// grow-only pulse for dots/rings that exist at rest. custom=delay
const pulse: Variants = {
  normal: { scale: 1 },
  animate: (d: number = 0) => ({ scale: [1, 1.35, 1], transition: { duration: 0.35, delay: d, ease: E } }),
};
// pop-in for a node landing (draw-in language). custom=delay
const popIn: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: (d: number = 0) => ({ scale: [0, 1.2, 1], opacity: [0, 1, 1], transition: { duration: 0.28, delay: d, ease: entranceSharp } }),
};
// a tiny grounded thump for h.01 window/machine dots. custom=delay
const thump: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({ y: [0, -1, 0], transition: { duration: 0.25, delay: d, ease: E } }),
};
// crosshair tick clamping inward onto its mark. custom=[dx, dy]
const clampIn: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[] = []) => ({
    x: [c[0] ?? 0, 0],
    y: [c[1] ?? 0, 0],
    transition: { duration: 0.45, ease: E },
  }),
};
// a purposeful surge along the icon's own heading, gliding back to rest.
// custom=[dx, dy]
const surge: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[] = []) => ({
    x: [0, c[0] ?? 0, 0],
    y: [0, c[1] ?? 0, 0],
    transition: { duration: 0.8, ease: E },
  }),
};
// heavy one-rep lift with a slight tilt and a thud landing
const heft: Variants = {
  normal: { y: 0, rotate: 0 },
  animate: {
    y: [0, -1, -1, 0.3, 0],
    rotate: [0, -2, 1.5, 0, 0],
    transition: { duration: 0.9, ease: E, times: [0, 0.35, 0.55, 0.8, 1] },
  },
};
// pushpin press: down into the board and back flush
const press: Variants = {
  normal: { y: 0 },
  animate: { y: [0, 1.2, -0.2, 0], transition: { duration: 0.55, ease: E } },
};
// counterphase pan dip for the scales. custom=direction (+1 dips first)
const weigh: Variants = {
  normal: { y: 0 },
  animate: (dir: number = 1) => ({
    y: [0, dir, -0.6 * dir, 0.3 * dir, 0],
    transition: { duration: 1.1, ease: E },
  }),
};

export const barrelBody = '  <path d="M10 3a41 41 0 0 0 0 18"/>\n  <path d="M14 3a41 41 0 0 1 0 18"/>\n  <path d="M17 3a2 2 0 0 1 1.68.92 15.25 15.25 0 0 1 0 16.16A2 2 0 0 1 17 21H7a2 2 0 0 1-1.68-.92 15.25 15.25 0 0 1 0-16.16A2 2 0 0 1 7 3z"/>\n  <path d="M3.84 17h16.32"/>\n  <path d="M3.84 7h16.32"/>';
export function Barrel(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 3a41 41 0 0 0 0 18" variants={drawFlow} custom={[0.25, 0.35]} />
      <motion.path d="M14 3a41 41 0 0 1 0 18" variants={drawFlow} custom={[0.35, 0.35]} />
      <path d="M17 3a2 2 0 0 1 1.68.92 15.25 15.25 0 0 1 0 16.16A2 2 0 0 1 17 21H7a2 2 0 0 1-1.68-.92 15.25 15.25 0 0 1 0-16.16A2 2 0 0 1 7 3z" />
      <motion.path d="M3.84 17h16.32" variants={drawRev} custom={[0.1, 0.35]} />
      <motion.path d="M3.84 7h16.32" variants={drawFlow} custom={[0, 0.35]} />
    </Icon>
  );
}

export const binocularsBody = '  <path d="M10 10h4"/>\n  <path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"/>\n  <path d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z"/>\n  <path d="M 22 16 L 2 16"/>\n  <path d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z"/>\n  <path d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3"/>';
export function Binoculars(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 10h4" variants={growMiddle} transition={gm(0.35, 0.3)} />
      <motion.path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" variants={drawFlow} custom={[0.25, 0.3]} />
      <motion.path d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M 22 16 L 2 16" variants={growMiddle} transition={gm(0.5, 0.35)} />
      <motion.path d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3" variants={drawFlow} custom={[0.25, 0.3]} />
    </Icon>
  );
}

export const castleBody = '  <path d="M10 5V3"/>\n  <path d="M14 5V3"/>\n  <path d="M15 21v-3a3 3 0 0 0-6 0v3"/>\n  <path d="M18 3v8"/>\n  <path d="M18 5H6"/>\n  <path d="M22 11H2"/>\n  <path d="M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9"/>\n  <path d="M6 3v8"/>';
export function Castle(p: IconProps) {
  return (
    <Icon {...p}>
      {/* built from the ground up, turret tips last */}
      <motion.path d="M10 5V3" variants={drawRev} custom={[0.6, 0.2]} />
      <motion.path d="M14 5V3" variants={drawRev} custom={[0.68, 0.2]} />
      <motion.path d="M15 21v-3a3 3 0 0 0-6 0v3" variants={drawFlow} custom={[0.5, 0.35]} />
      <motion.path d="M18 3v8" variants={drawRev} custom={[0.45, 0.3]} />
      <motion.path d="M18 5H6" variants={drawFlow} custom={[0.55, 0.3]} />
      <motion.path d="M22 11H2" variants={drawFlow} custom={[0.3, 0.35]} />
      <motion.path d="M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9" variants={drawFlow} custom={[0, 0.45]} />
      <motion.path d="M6 3v8" variants={drawRev} custom={[0.45, 0.3]} />
    </Icon>
  );
}

export const churchBody = '  <path d="M10 9h4"/>\n  <path d="M12 7v5"/>\n  <path d="M14 21v-3a2 2 0 0 0-4 0v3"/>\n  <path d="m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9"/>\n  <path d="M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14"/>';
export function Church(p: IconProps) {
  return (
    <Icon {...p}>
      {/* nave, wings, door — then the cross writes itself last */}
      <motion.path d="M10 9h4" variants={growMiddle} transition={gm(0.72, 0.25)} />
      <motion.path d="M12 7v5" variants={drawFlow} custom={[0.6, 0.25]} />
      <motion.path d="M14 21v-3a2 2 0 0 0-4 0v3" variants={drawFlow} custom={[0.45, 0.3]} />
      <motion.path d="m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9" variants={drawFlow} custom={[0.2, 0.45]} />
      <motion.path d="M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14" variants={drawFlow} custom={[0, 0.5]} />
    </Icon>
  );
}

export const circleParkingBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>';
export function CircleParking(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      <motion.path d="M9 17V7h4a3 3 0 0 1 0 6H9" variants={drawRev} custom={[0, 0.5]} />
    </Icon>
  );
}

export const circleParkingOffBody = '  <path d="M12.656 7H13a3 3 0 0 1 2.984 3.307"/>\n  <path d="M13 13H9"/>\n  <path d="M19.071 19.071A1 1 0 0 1 4.93 4.93"/>\n  <path d="m2 2 20 20"/>\n  <path d="M8.357 2.687a10 10 0 0 1 12.956 12.956"/>\n  <path d="M9 17V9"/>';
export function CircleParkingOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12.656 7H13a3 3 0 0 1 2.984 3.307" variants={drawFlow} custom={[0.15, 0.3]} />
      <motion.path d="M13 13H9" variants={drawFlow} custom={[0.25, 0.25]} />
      <motion.path d="M19.071 19.071A1 1 0 0 1 4.93 4.93" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.55, 0.4)} />
      <motion.path d="M8.357 2.687a10 10 0 0 1 12.956 12.956" variants={drawFlow} custom={[0.08, 0.4]} />
      <motion.path d="M9 17V9" variants={drawRev} custom={[0.3, 0.25]} />
    </Icon>
  );
}

export const compassBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/>';
export function Compass(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      {/* the needle hunts for north: overshoots, wanders back, settles true */}
      <motion.path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" variants={needleHunt} style={{ transformBox: "view-box", originX: "12px", originY: "12px" }} />
    </Icon>
  );
}
const needleHunt: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -28, 16, -7, 0], transition: { duration: 1.2, ease: E } },
};

export const damBody = '  <path d="M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>\n  <path d="M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>\n  <path d="M2 10h4"/>\n  <path d="M2 14h4"/>\n  <path d="M2 18h4"/>\n  <path d="M2 6h4"/>\n  <path d="M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z"/>';
export function Dam(p: IconProps) {
  return (
    <Icon {...p}>
      {/* water streams OUT through the wall; level marks flick on rising */}
      <motion.path d="M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" variants={drawFlow} custom={[0.2, 0.5]} />
      <motion.path d="M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" variants={drawFlow} custom={[0.35, 0.5]} />
      <motion.path d="M2 10h4" variants={drawFlow} custom={[0.24, 0.2]} />
      <motion.path d="M2 14h4" variants={drawFlow} custom={[0.12, 0.2]} />
      <motion.path d="M2 18h4" variants={drawFlow} custom={[0, 0.2]} />
      <motion.path d="M2 6h4" variants={drawFlow} custom={[0.36, 0.2]} />
      <path d="M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z" />
    </Icon>
  );
}

export const dumbbellBody = '  <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/>\n  <path d="m2.5 21.5 1.4-1.4"/>\n  <path d="m20.1 3.9 1.4-1.4"/>\n  <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/>\n  <path d="m9.6 14.4 4.8-4.8"/>';
export function Dumbbell(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={heft} style={{ transformBox: "fill-box", originX: 0.5, originY: 0.5 }}>
        <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
        <path d="m2.5 21.5 1.4-1.4" />
        <path d="m20.1 3.9 1.4-1.4" />
        <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
        <path d="m9.6 14.4 4.8-4.8" />
      </motion.g>
    </Icon>
  );
}

export const earthBody = '  <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/>\n  <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/>\n  <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/>\n  <circle cx="12" cy="12" r="10"/>';
export function Earth(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the continents ink themselves on, one landmass after another */}
      <motion.path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" variants={drawFlow} custom={[0.4, 0.35]} />
      <motion.path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" variants={drawFlow} custom={[0.2, 0.45]} />
      <circle cx="12" cy="12" r="10" />
    </Icon>
  );
}

export const evChargerBody = '  <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5"/>\n  <path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16"/>\n  <path d="M2 21h13"/>\n  <path d="M3 7h11"/>\n  <path d="m9 11-2 3h3l-2 3"/>';
export function EvCharger(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the bolt zaps, then charge flows out along the cable */}
      <motion.path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5" variants={drawFlow} custom={[0.3, 0.5]} />
      <path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16" />
      <path d="M2 21h13" />
      <path d="M3 7h11" />
      <motion.path d="m9 11-2 3h3l-2 3" variants={drawFlow} custom={[0, 0.3]} />
    </Icon>
  );
}

export const factoryBody = '  <path d="M12 16h.01"/>\n  <path d="M16 16h.01"/>\n  <path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/>\n  <path d="M8 16h.01"/>';
export function Factory(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 16h.01" variants={thump} custom={0.62} />
      <motion.path d="M16 16h.01" variants={thump} custom={0.74} />
      <motion.path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" variants={drawFlow} custom={[0, 0.55]} />
      <motion.path d="M8 16h.01" variants={thump} custom={0.5} />
    </Icon>
  );
}

export const ferrisWheelBody = '  <circle cx="12" cy="12" r="2"/>\n  <path d="M12 2v4"/>\n  <path d="m6.8 15-3.5 2"/>\n  <path d="m20.7 7-3.5 2"/>\n  <path d="M6.8 9 3.3 7"/>\n  <path d="m20.7 17-3.5-2"/>\n  <path d="m9 22 3-8 3 8"/>\n  <path d="M8 22h8"/>\n  <path d="M18 18.7a9 9 0 1 0-12 0"/>';
export function FerrisWheel(p: IconProps) {
  return (
    <Icon {...p}>
      {/* rotating the wheel sweeps its rim gap around like a broken circle
          (frame check), so it BUILDS instead: rim draws round, the cabin
          spokes light up around the circle, the hub pulses */}
      <motion.circle cx="12" cy="12" r="2" variants={pulse} custom={0.62} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M12 2v4" variants={drawFlow} custom={[0.3, 0.2]} />
      <motion.path d="m6.8 15-3.5 2" variants={drawFlow} custom={[0.54, 0.2]} />
      <motion.path d="m20.7 7-3.5 2" variants={drawFlow} custom={[0.38, 0.2]} />
      <motion.path d="M6.8 9 3.3 7" variants={drawFlow} custom={[0.62, 0.2]} />
      <motion.path d="m20.7 17-3.5-2" variants={drawFlow} custom={[0.46, 0.2]} />
      <motion.path d="m9 22 3-8 3 8" variants={drawFlow} custom={[0.15, 0.35]} />
      <motion.path d="M8 22h8" variants={drawFlow} custom={[0.35, 0.25]} />
      <motion.path d="M18 18.7a9 9 0 1 0-12 0" variants={drawFlow} custom={[0, 0.55]} />
    </Icon>
  );
}

export const flagTriangleLeftBody = '  <path d="M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5"/>';
export function FlagTriangleLeft(p: IconProps) {
  return (
    <Icon {...p}>
      {/* hoisted: pole draws bottom-up, then the pennant unfurls */}
      <motion.path d="M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5" variants={drawFlow} custom={[0, 0.65]} />
    </Icon>
  );
}

export const flagTriangleRightBody = '  <path d="M6 22V2.8a.8.8 0 0 1 1.17-.71l11.38 5.69a.8.8 0 0 1 0 1.44L6 15.5"/>';
export function FlagTriangleRight(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M6 22V2.8a.8.8 0 0 1 1.17-.71l11.38 5.69a.8.8 0 0 1 0 1.44L6 15.5" variants={drawFlow} custom={[0, 0.65]} />
    </Icon>
  );
}

export const footprintsBody = '  <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/>\n  <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/>\n  <path d="M16 17h4"/>\n  <path d="M4 13h4"/>';
export function Footprints(p: IconProps) {
  return (
    <Icon {...p}>
      {/* walking: left print lands, then the right steps in after */}
      <motion.path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" variants={drawFlow} custom={[0.4, 0.4]} />
      <motion.path d="M16 17h4" variants={drawFlow} custom={[0.62, 0.2]} />
      <motion.path d="M4 13h4" variants={drawFlow} custom={[0.22, 0.2]} />
    </Icon>
  );
}

export const fuelBody = '  <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5"/>\n  <path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16"/>\n  <path d="M2 21h13"/>\n  <path d="M3 9h11"/>';
export function Fuel(p: IconProps) {
  return (
    <Icon {...p}>
      {/* fuel flows out along the hose to the tank port */}
      <motion.path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5" variants={drawFlow} custom={[0.25, 0.5]} />
      <path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16" />
      <path d="M2 21h13" />
      <motion.path d="M3 9h11" variants={drawFlow} custom={[0, 0.3]} />
    </Icon>
  );
}

export const gavelBody = '  <path d="m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381"/>\n  <path d="m16 16 6-6"/>\n  <path d="m21.5 10.5-8-8"/>\n  <path d="m8 8 6-6"/>\n  <path d="m8.5 7.5 8 8"/>';
export function Gavel(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381" />
      {/* the mallet lifts along its swing arc and slams back down */}
      <motion.g variants={gavelSlam}>
        <path d="m16 16 6-6" />
        <path d="m21.5 10.5-8-8" />
        <path d="m8 8 6-6" />
        <path d="m8.5 7.5 8 8" />
      </motion.g>
    </Icon>
  );
}
const gavelSlam: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    x: [0, 1.4, -0.4, 0],
    y: [0, -1.4, 0.4, 0],
    transition: { duration: 0.6, ease: E, times: [0, 0.4, 0.7, 1] },
  },
};

export const gitCommitHorizontalBody = '  <circle cx="12" cy="12" r="3"/>\n  <line x1="3" x2="9" y1="12" y2="12"/>\n  <line x1="15" x2="21" y1="12" y2="12"/>';
export function GitCommitHorizontal(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.circle cx="12" cy="12" r="3" variants={popIn} custom={0.28} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.line x1="3" x2="9" y1="12" y2="12" variants={drawFlow} custom={[0, 0.3]} />
      <motion.line x1="15" x2="21" y1="12" y2="12" variants={drawRev} custom={[0, 0.3]} />
    </Icon>
  );
}

export const gitCommitVerticalBody = '  <path d="M12 3v6"/>\n  <circle cx="12" cy="12" r="3"/>\n  <path d="M12 15v6"/>';
export function GitCommitVertical(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 3v6" variants={drawFlow} custom={[0, 0.25]} />
      <motion.circle cx="12" cy="12" r="3" variants={popIn} custom={0.22} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M12 15v6" variants={drawFlow} custom={[0.42, 0.25]} />
    </Icon>
  );
}

export const globeBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>\n  <path d="M2 12h20"/>';
export function Globe(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      {/* the meridian travels once around the world; the equator crosses it */}
      <motion.path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" variants={drawFlow} custom={[0, 0.65]} />
      <motion.path d="M2 12h20" variants={drawFlow} custom={[0.25, 0.4]} />
    </Icon>
  );
}

export const globeCheckBody = '  <path d="m15 6 2 2 4-4"/>\n  <path d="M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10"/>';
export function GlobeCheck(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="m15 6 2 2 4-4" variants={drawOn} transition={{ duration: 0.45, delay: 0.5, ease: entranceSharp, opacity: { duration: 0.08, delay: 0.5 } }} />
      <motion.path d="M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10" variants={drawFlow} custom={[0, 0.6]} />
    </Icon>
  );
}

export const globeOffBody = '  <path d="M10.114 4.462A14.5 14.5 0 0 1 12 2a10 10 0 0 1 9.313 13.643"/>\n  <path d="M15.557 15.556A14.5 14.5 0 0 1 12 22 10 10 0 0 1 4.929 4.929"/>\n  <path d="M15.892 10.234A14.5 14.5 0 0 0 12 2a10 10 0 0 0-3.643.687"/>\n  <path d="M17.656 12H22"/>\n  <path d="M19.071 19.071A10 10 0 0 1 12 22 14.5 14.5 0 0 1 8.44 8.45"/>\n  <path d="M2 12h10"/>\n  <path d="m2 2 20 20"/>';
export function GlobeOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10.114 4.462A14.5 14.5 0 0 1 12 2a10 10 0 0 1 9.313 13.643" variants={drawFlow} custom={[0, 0.35]} />
      <motion.path d="M15.557 15.556A14.5 14.5 0 0 1 12 22 10 10 0 0 1 4.929 4.929" variants={drawFlow} custom={[0.1, 0.35]} />
      <motion.path d="M15.892 10.234A14.5 14.5 0 0 0 12 2a10 10 0 0 0-3.643.687" variants={drawFlow} custom={[0.2, 0.3]} />
      <motion.path d="M17.656 12H22" variants={drawFlow} custom={[0.3, 0.2]} />
      <motion.path d="M19.071 19.071A10 10 0 0 1 12 22 14.5 14.5 0 0 1 8.44 8.45" variants={drawFlow} custom={[0.15, 0.35]} />
      <motion.path d="M2 12h10" variants={drawFlow} custom={[0.25, 0.25]} />
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.55, 0.4)} />
    </Icon>
  );
}

export const globeXBody = '  <path d="m16 3 5 5"/>\n  <path d="M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10"/>\n  <path d="m21 3-5 5"/>';
export function GlobeX(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="m16 3 5 5" variants={growMiddle} transition={gm(0.5, 0.35)} />
      <motion.path d="M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10" variants={drawFlow} custom={[0, 0.6]} />
      <motion.path d="m21 3-5 5" variants={growMiddle} transition={gm(0.6, 0.35)} />
    </Icon>
  );
}

export const hospitalBody = '  <path d="M12 7v4"/>\n  <path d="M14 21v-3a2 2 0 0 0-4 0v3"/>\n  <path d="M14 9h-4"/>\n  <path d="M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/>\n  <path d="M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"/>';
export function Hospital(p: IconProps) {
  return (
    <Icon {...p}>
      {/* tower and wings build; the medical cross strikes in last */}
      <motion.path d="M12 7v4" variants={growMiddle} transition={gm(0.55, 0.25)} />
      <motion.path d="M14 21v-3a2 2 0 0 0-4 0v3" variants={drawFlow} custom={[0.42, 0.3]} />
      <motion.path d="M14 9h-4" variants={growMiddle} transition={gm(0.68, 0.25)} />
      <motion.path d="M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" variants={drawFlow} custom={[0.18, 0.45]} />
      <motion.path d="M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16" variants={drawFlow} custom={[0, 0.45]} />
    </Icon>
  );
}

export const hotelBody = '  <path d="M10 22v-6.57"/>\n  <path d="M12 11h.01"/>\n  <path d="M12 7h.01"/>\n  <path d="M14 15.43V22"/>\n  <path d="M15 16a5 5 0 0 0-6 0"/>\n  <path d="M16 11h.01"/>\n  <path d="M16 7h.01"/>\n  <path d="M8 11h.01"/>\n  <path d="M8 7h.01"/>\n  <rect x="4" y="2" width="16" height="20" rx="2"/>';
export function Hotel(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the windows light up floor by floor; the doorway arch draws */}
      <motion.path d="M10 22v-6.57" variants={drawRev} custom={[0.15, 0.3]} />
      <motion.path d="M12 11h.01" variants={thump} custom={0.36} />
      <motion.path d="M12 7h.01" variants={thump} custom={0.6} />
      <motion.path d="M14 15.43V22" variants={drawFlow} custom={[0.15, 0.3]} />
      <motion.path d="M15 16a5 5 0 0 0-6 0" variants={drawFlow} custom={[0, 0.3]} />
      <motion.path d="M16 11h.01" variants={thump} custom={0.42} />
      <motion.path d="M16 7h.01" variants={thump} custom={0.66} />
      <motion.path d="M8 11h.01" variants={thump} custom={0.3} />
      <motion.path d="M8 7h.01" variants={thump} custom={0.54} />
      <rect x="4" y="2" width="16" height="20" rx="2" />
    </Icon>
  );
}

export const landmarkBody = '  <path d="M10 18v-7"/>\n  <path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/>\n  <path d="M14 18v-7"/>\n  <path d="M18 18v-7"/>\n  <path d="M3 22h18"/>\n  <path d="M6 18v-7"/>';
export function Landmark(p: IconProps) {
  return (
    <Icon {...p}>
      {/* ground, then the columns rise, then the pediment caps them */}
      <motion.path d="M10 18v-7" variants={drawFlow} custom={[0.26, 0.3]} />
      <motion.path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z" variants={drawFlow} custom={[0.55, 0.4]} />
      <motion.path d="M14 18v-7" variants={drawFlow} custom={[0.34, 0.3]} />
      <motion.path d="M18 18v-7" variants={drawFlow} custom={[0.42, 0.3]} />
      <motion.path d="M3 22h18" variants={drawFlow} custom={[0, 0.35]} />
      <motion.path d="M6 18v-7" variants={drawFlow} custom={[0.18, 0.3]} />
    </Icon>
  );
}

export const libraryBody = '  <path d="m16 6 4 14"/>\n  <path d="M12 6v14"/>\n  <path d="M8 8v12"/>\n  <path d="M4 4v16"/>';
export function Library(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the shelf fills: three books slot in, the last leans against them */}
      <motion.path d="m16 6 4 14" variants={drawFlow} custom={[0.45, 0.3]} />
      <motion.path d="M12 6v14" variants={drawFlow} custom={[0.3, 0.28]} />
      <motion.path d="M8 8v12" variants={drawFlow} custom={[0.15, 0.28]} />
      <motion.path d="M4 4v16" variants={drawFlow} custom={[0, 0.28]} />
    </Icon>
  );
}

export const libraryBigBody = '  <rect width="8" height="18" x="3" y="3" rx="1"/>\n  <path d="M7 3v18"/>\n  <path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"/>';
export function LibraryBig(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="8" height="18" x="3" y="3" rx="1" />
      <motion.path d="M7 3v18" variants={drawFlow} custom={[0, 0.35]} />
      <motion.path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z" variants={drawFlow} custom={[0.25, 0.45]} />
    </Icon>
  );
}

export const lineDotRightHorizontalBody = '  <path d="M 3 12 L 15 12"/>\n  <circle cx="18" cy="12" r="3"/>';
export function LineDotRightHorizontal(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M 3 12 L 15 12" variants={drawFlow} custom={[0, 0.35]} />
      <motion.circle cx="18" cy="12" r="3" variants={popIn} custom={0.3} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const locateBody = '  <line x1="2" x2="5" y1="12" y2="12"/>\n  <line x1="19" x2="22" y1="12" y2="12"/>\n  <line x1="12" x2="12" y1="2" y2="5"/>\n  <line x1="12" x2="12" y1="19" y2="22"/>\n  <circle cx="12" cy="12" r="7"/>';
export function Locate(p: IconProps) {
  return (
    <Icon {...p}>
      {/* lock-on: the ticks clamp inward and the ring pulses */}
      <motion.line x1="2" x2="5" y1="12" y2="12" variants={clampIn} custom={[-1.5, 0]} />
      <motion.line x1="19" x2="22" y1="12" y2="12" variants={clampIn} custom={[1.5, 0]} />
      <motion.line x1="12" x2="12" y1="2" y2="5" variants={clampIn} custom={[0, -1.5]} />
      <motion.line x1="12" x2="12" y1="19" y2="22" variants={clampIn} custom={[0, 1.5]} />
      <motion.circle cx="12" cy="12" r="7" variants={ringPulse} custom={0.4} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}
// the map OPENS: the sheet unfolds toward the viewer, hinged at its left edge
const mapUnfold: Variants = {
  normal: { rotateY: 0 },
  animate: { rotateY: [55, -6, 0], transition: { duration: 0.75, ease: E, times: [0, 0.75, 1] } },
};
// small grow-only pulse for big rings (1.35 would leave the viewBox)
const ringPulse: Variants = {
  normal: { scale: 1 },
  animate: (d: number = 0) => ({ scale: [1, 1.07, 1], transition: { duration: 0.35, delay: d, ease: E } }),
};
// softer pulse for endpoint circles sitting ~1 unit from a viewBox edge —
// 1.35 flat-cuts against the edge (frame check on route/route-off)
const pulseSoft: Variants = {
  normal: { scale: 1 },
  animate: (d: number = 0) => ({ scale: [1, 1.18, 1], transition: { duration: 0.35, delay: d, ease: E } }),
};

export const locateFixedBody = '  <line x1="2" x2="5" y1="12" y2="12"/>\n  <line x1="19" x2="22" y1="12" y2="12"/>\n  <line x1="12" x2="12" y1="2" y2="5"/>\n  <line x1="12" x2="12" y1="19" y2="22"/>\n  <circle cx="12" cy="12" r="7"/>\n  <circle cx="12" cy="12" r="3"/>';
export function LocateFixed(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.line x1="2" x2="5" y1="12" y2="12" variants={clampIn} custom={[-1.5, 0]} />
      <motion.line x1="19" x2="22" y1="12" y2="12" variants={clampIn} custom={[1.5, 0]} />
      <motion.line x1="12" x2="12" y1="2" y2="5" variants={clampIn} custom={[0, -1.5]} />
      <motion.line x1="12" x2="12" y1="19" y2="22" variants={clampIn} custom={[0, 1.5]} />
      <circle cx="12" cy="12" r="7" />
      {/* the fix lands: center dot pulses hard */}
      <motion.circle cx="12" cy="12" r="3" variants={pulse} custom={0.42} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const locateOffBody = '  <path d="M12 19v3"/>\n  <path d="M12 2v3"/>\n  <path d="M18.89 13.24a7 7 0 0 0-8.13-8.13"/>\n  <path d="M19 12h3"/>\n  <path d="M2 12h3"/>\n  <path d="m2 2 20 20"/>\n  <path d="M7.05 7.05a7 7 0 0 0 9.9 9.9"/>';
export function LocateOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 19v3" variants={drawFlow} custom={[0.3, 0.2]} />
      <motion.path d="M12 2v3" variants={drawFlow} custom={[0.24, 0.2]} />
      <motion.path d="M18.89 13.24a7 7 0 0 0-8.13-8.13" variants={drawFlow} custom={[0, 0.35]} />
      <motion.path d="M19 12h3" variants={drawFlow} custom={[0.36, 0.2]} />
      <motion.path d="M2 12h3" variants={drawFlow} custom={[0.42, 0.2]} />
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.55, 0.4)} />
      <motion.path d="M7.05 7.05a7 7 0 0 0 9.9 9.9" variants={drawFlow} custom={[0.12, 0.35]} />
    </Icon>
  );
}

export const mapBody = '  <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/>\n  <path d="M15 5.764v15"/>\n  <path d="M9 3.236v15"/>';
export function Map(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the map OPENS: the whole sheet unfolds toward you, hinged left */}
      <motion.g variants={mapUnfold} style={{ transformBox: "view-box", originX: "3px", originY: "12px" }}>
        <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
        <path d="M15 5.764v15" />
        <path d="M9 3.236v15" />
      </motion.g>
    </Icon>
  );
}

export const mapMinusBody = '  <path d="m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V14"/>\n  <path d="M15 5.764V14"/>\n  <path d="M21 18h-6"/>\n  <path d="M9 3.236v15"/>';
export function MapMinus(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the map opens (unfolds), then the minus strikes */}
      <motion.g variants={mapUnfold} style={{ transformBox: "view-box", originX: "3px", originY: "12px" }}>
        <path d="m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V14" />
        <path d="M15 5.764V14" />
        <path d="M9 3.236v15" />
      </motion.g>
      <motion.path d="M21 18h-6" variants={growMiddle} transition={gm(0.8, 0.3)} />
    </Icon>
  );
}

export const mapPinBody = '  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>\n  <circle cx="12" cy="10" r="3"/>';
export function MapPin(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the pin hops and stamps the spot; the dot pulses on landing */}
      <motion.g variants={pinHop}>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <motion.circle cx="12" cy="10" r="3" variants={pulse} custom={0.4} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      </motion.g>
    </Icon>
  );
}
const pinHop: Variants = {
  normal: { y: 0 },
  animate: { y: [0, -1, 0, -0.3, 0], transition: { duration: 0.6, ease: E, times: [0, 0.3, 0.6, 0.8, 1] } },
};

export const mapPinCheckBody = '  <path d="M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728"/>\n  <circle cx="12" cy="10" r="3"/>\n  <path d="m16 18 2 2 4-4"/>';
export function MapPinCheck(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={pinHop}>
        <path d="M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728" />
        <motion.circle cx="12" cy="10" r="3" variants={pulse} custom={0.4} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      </motion.g>
      <motion.path d="m16 18 2 2 4-4" variants={drawOn} transition={{ duration: 0.45, delay: 0.5, ease: entranceSharp, opacity: { duration: 0.08, delay: 0.5 } }} />
    </Icon>
  );
}

export const mapPinCheckInsideBody = '  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>\n  <path d="m9 10 2 2 4-4"/>';
export function MapPinCheckInside(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={pinHop}>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <motion.path d="m9 10 2 2 4-4" variants={drawOn} transition={{ duration: 0.45, delay: 0.45, ease: entranceSharp, opacity: { duration: 0.08, delay: 0.45 } }} />
      </motion.g>
    </Icon>
  );
}

export const mapPinHouseBody = '  <path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"/>\n  <path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2"/>\n  <path d="M18 22v-3"/>\n  <circle cx="10" cy="10" r="3"/>';
export function MapPinHouse(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the pin stamps, then the little house builds beside it */}
      <motion.path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" variants={drawFlow} custom={[0.45, 0.4]} />
      <motion.path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" variants={drawRev} custom={[0, 0.5]} />
      <motion.path d="M18 22v-3" variants={drawFlow} custom={[0.8, 0.2]} />
      <motion.circle cx="10" cy="10" r="3" variants={pulse} custom={0.45} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const mapPinMinusBody = '  <path d="M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738"/>\n  <circle cx="12" cy="10" r="3"/>\n  <path d="M16 18h6"/>';
export function MapPinMinus(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={pinHop}>
        <path d="M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738" />
        <motion.circle cx="12" cy="10" r="3" variants={pulse} custom={0.4} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      </motion.g>
      <motion.path d="M16 18h6" variants={growMiddle} transition={gm(0.5, 0.3)} />
    </Icon>
  );
}

export const mapPinMinusInsideBody = '  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>\n  <path d="M9 10h6"/>';
export function MapPinMinusInside(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={pinHop}>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <motion.path d="M9 10h6" variants={growMiddle} transition={gm(0.45, 0.3)} />
      </motion.g>
    </Icon>
  );
}

export const mapPinnedBody = '  <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/>\n  <circle cx="12" cy="8" r="2"/>\n  <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/>';
export function MapPinned(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={pinHop}>
        <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" />
        <motion.circle cx="12" cy="8" r="2" variants={pulse} custom={0.4} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      </motion.g>
      <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" />
    </Icon>
  );
}

export const mapPinOffBody = '  <path d="M12.75 7.09a3 3 0 0 1 2.16 2.16"/>\n  <path d="M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568"/>\n  <path d="m2 2 20 20"/>\n  <path d="M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533"/>\n  <path d="M9.13 9.13a3 3 0 0 0 3.74 3.74"/>';
export function MapPinOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12.75 7.09a3 3 0 0 1 2.16 2.16" variants={drawFlow} custom={[0.3, 0.25]} />
      <motion.path d="M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.55, 0.4)} />
      <motion.path d="M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533" variants={drawFlow} custom={[0.12, 0.35]} />
      <motion.path d="M9.13 9.13a3 3 0 0 0 3.74 3.74" variants={drawFlow} custom={[0.38, 0.25]} />
    </Icon>
  );
}

export const mapPinPenBody = '  <path d="M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468"/>\n  <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>\n  <circle cx="10" cy="10" r="3"/>';
export function MapPinPen(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468" variants={drawRev} custom={[0, 0.45]} />
      {/* the pen nib sketches itself in beside the pin */}
      <motion.path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" variants={drawFlow} custom={[0.4, 0.5]} />
      <motion.circle cx="10" cy="10" r="3" variants={pulse} custom={0.4} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const mapPinPlusBody = '  <path d="M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738"/>\n  <circle cx="12" cy="10" r="3"/>\n  <path d="M16 18h6"/>\n  <path d="M19 15v6"/>';
export function MapPinPlus(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={pinHop}>
        <path d="M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738" />
        <motion.circle cx="12" cy="10" r="3" variants={pulse} custom={0.4} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      </motion.g>
      <motion.path d="M16 18h6" variants={growMiddle} transition={gm(0.5, 0.3)} />
      <motion.path d="M19 15v6" variants={growMiddle} transition={gm(0.6, 0.3)} />
    </Icon>
  );
}

export const mapPinPlusInsideBody = '  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>\n  <path d="M12 7v6"/>\n  <path d="M9 10h6"/>';
export function MapPinPlusInside(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={pinHop}>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <motion.path d="M12 7v6" variants={growMiddle} transition={gm(0.55, 0.3)} />
        <motion.path d="M9 10h6" variants={growMiddle} transition={gm(0.45, 0.3)} />
      </motion.g>
    </Icon>
  );
}

export const mapPinSearchBody = '  <path d="M 12.248 21.969 a 1 1 0 0 1 -0.849 -0.17 C 9.539 20.193 4 14.993 4 10 a 8 8 0 0 1 16 0 C 20 10.42 19.961 10.841 19.888 11.262"/>\n  <path d="m22 22-1.88-1.88"/>\n  <circle cx="12" cy="10" r="3"/>\n  <circle cx="18" cy="18" r="3"/>';
export function MapPinSearch(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M 12.248 21.969 a 1 1 0 0 1 -0.849 -0.17 C 9.539 20.193 4 14.993 4 10 a 8 8 0 0 1 16 0 C 20 10.42 19.961 10.841 19.888 11.262" variants={drawRev} custom={[0, 0.45]} />
      <motion.path d="m22 22-1.88-1.88" variants={drawFlow} custom={[0.62, 0.2]} />
      <motion.circle cx="12" cy="10" r="3" variants={pulse} custom={0.35} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      {/* the lens pulses — scanning */}
      <motion.circle cx="18" cy="18" r="3" variants={pulse} custom={0.5} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const mapPinXBody = '  <path d="M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077"/>\n  <circle cx="12" cy="10" r="3"/>\n  <path d="m21.5 15.5-5 5"/>\n  <path d="m21.5 20.5-5-5"/>';
export function MapPinX(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={pinHop}>
        <path d="M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077" />
        <motion.circle cx="12" cy="10" r="3" variants={pulse} custom={0.4} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      </motion.g>
      <motion.path d="m21.5 15.5-5 5" variants={growMiddle} transition={gm(0.5, 0.3)} />
      <motion.path d="m21.5 20.5-5-5" variants={growMiddle} transition={gm(0.6, 0.3)} />
    </Icon>
  );
}

export const mapPinXInsideBody = '  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>\n  <path d="m14.5 7.5-5 5"/>\n  <path d="m9.5 7.5 5 5"/>';
export function MapPinXInside(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={pinHop}>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <motion.path d="m14.5 7.5-5 5" variants={growMiddle} transition={gm(0.45, 0.3)} />
        <motion.path d="m9.5 7.5 5 5" variants={growMiddle} transition={gm(0.55, 0.3)} />
      </motion.g>
    </Icon>
  );
}

export const mapPlusBody = '  <path d="m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12"/>\n  <path d="M15 5.764V12"/>\n  <path d="M18 15v6"/>\n  <path d="M21 18h-6"/>\n  <path d="M9 3.236v15"/>';
export function MapPlus(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the map opens, then the plus strikes in */}
      <motion.g variants={mapUnfold} style={{ transformBox: "view-box", originX: "3px", originY: "12px" }}>
        <path d="m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12" />
        <path d="M15 5.764V12" />
        <path d="M9 3.236v15" />
      </motion.g>
      <motion.path d="M18 15v6" variants={growMiddle} transition={gm(0.9, 0.3)} />
      <motion.path d="M21 18h-6" variants={growMiddle} transition={gm(0.8, 0.3)} />
    </Icon>
  );
}

export const milestoneBody = '  <path d="M12 13v8"/>\n  <path d="M12 3v3"/>\n  <path d="M18.172 6a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/>';
export function Milestone(p: IconProps) {
  return (
    <Icon {...p}>
      {/* planted: post top, board outlines, post roots into the ground */}
      <motion.path d="M12 13v8" variants={drawFlow} custom={[0.55, 0.3]} />
      <motion.path d="M12 3v3" variants={drawFlow} custom={[0, 0.2]} />
      <motion.path d="M18.172 6a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" variants={drawFlow} custom={[0.15, 0.45]} />
    </Icon>
  );
}

export const mosqueBody = '  <path d="M12.268 2a2 2 0 003.465 2"/>\n  <path d="M14 5 L14 8"/>\n  <path d="M16 22v-3a2 2 0 00-4 0v3"/>\n  <path d="M21 13c-.662-1.497-1.666-2.753-2.9-3.63C16.825 8.47 15.422 8 14 8s-2.826.47-4.1 1.37C8.668 10.248 7.663 11.504 7 13z"/>\n  <path d="M3 9h4"/>\n  <path d="M7 22V6a5 5 0 00-2-4 5 5 0 00-2 4v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>';
export function Mosque(p: IconProps) {
  return (
    <Icon {...p}>
      {/* minaret and walls raise, dome arcs over, crescent draws last */}
      <motion.path d="M12.268 2a2 2 0 003.465 2" variants={drawFlow} custom={[0.75, 0.3]} />
      <motion.path d="M14 5 L14 8" variants={drawRev} custom={[0.62, 0.2]} />
      <motion.path d="M16 22v-3a2 2 0 00-4 0v3" variants={drawFlow} custom={[0.5, 0.3]} />
      <motion.path d="M21 13c-.662-1.497-1.666-2.753-2.9-3.63C16.825 8.47 15.422 8 14 8s-2.826.47-4.1 1.37C8.668 10.248 7.663 11.504 7 13z" variants={drawFlow} custom={[0.3, 0.4]} />
      <motion.path d="M3 9h4" variants={drawFlow} custom={[0.2, 0.2]} />
      <motion.path d="M7 22V6a5 5 0 00-2-4 5 5 0 00-2 4v14a2 2 0 002 2h14a2 2 0 002-2v-7" variants={drawFlow} custom={[0, 0.55]} />
    </Icon>
  );
}

export const navigationBody = '  <polygon points="3 11 22 2 13 21 11 13 3 11"/>';
export function Navigation(p: IconProps) {
  return (
    <Icon {...p}>
      {/* surges along its own heading and glides back — locked on. The glyph's
          paint already reaches x23/y1, so the surge is capped to stay inside */}
      <motion.polygon points="3 11 22 2 13 21 11 13 3 11" variants={surge} custom={[0.9, -0.85]} />
    </Icon>
  );
}

export const navigation2Body = '  <polygon points="12 2 19 21 12 17 5 21 12 2"/>';
export function Navigation2(p: IconProps) {
  return (
    <Icon {...p}>
      {/* paint already reaches y1 — capped surge stays inside the viewBox */}
      <motion.polygon points="12 2 19 21 12 17 5 21 12 2" variants={surge} custom={[0, -0.9]} />
    </Icon>
  );
}

export const navigation2OffBody = '  <path d="M9.31 9.31 5 21l7-4 7 4-1.17-3.17"/>\n  <path d="M14.53 8.88 12 2l-1.17 3.17"/>\n  <line x1="2" x2="22" y1="2" y2="22"/>';
export function Navigation2Off(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M9.31 9.31 5 21l7-4 7 4-1.17-3.17" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M14.53 8.88 12 2l-1.17 3.17" variants={drawFlow} custom={[0.15, 0.3]} />
      <motion.line x1="2" x2="22" y1="2" y2="22" variants={growMiddle} transition={gm(0.5, 0.4)} />
    </Icon>
  );
}

export const navigationOffBody = '  <path d="M8.43 8.43 3 11l8 2 2 8 2.57-5.43"/>\n  <path d="M17.39 11.73 22 2l-9.73 4.61"/>\n  <line x1="2" x2="22" y1="2" y2="22"/>';
export function NavigationOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M8.43 8.43 3 11l8 2 2 8 2.57-5.43" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M17.39 11.73 22 2l-9.73 4.61" variants={drawFlow} custom={[0.15, 0.3]} />
      <motion.line x1="2" x2="22" y1="2" y2="22" variants={growMiddle} transition={gm(0.5, 0.4)} />
    </Icon>
  );
}

export const parkingMeterBody = '  <path d="M11 15h2"/>\n  <path d="M12 12v3"/>\n  <path d="M12 19v3"/>\n  <path d="M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z"/>\n  <path d="M9 9a3 3 0 1 1 6 0"/>';
export function ParkingMeter(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M11 15h2" />
      {/* the needle sweeps up from flat — time purchased */}
      <motion.path d="M12 12v3" variants={needleSweep} style={{ transformBox: "view-box", originX: "12px", originY: "15px" }} />
      <path d="M12 19v3" />
      <path d="M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z" />
      <motion.path d="M9 9a3 3 0 1 1 6 0" variants={drawFlow} custom={[0, 0.35]} />
    </Icon>
  );
}
const needleSweep: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [-75, 8, 0], transition: { duration: 0.7, delay: 0.25, ease: E } },
};

export const pinBody = '  <path d="M12 17v5"/>\n  <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>';
export function Pin(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={press}>
        <path d="M12 17v5" />
        <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
      </motion.g>
    </Icon>
  );
}

export const pinOffBody = '  <path d="M12 17v5"/>\n  <path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89"/>\n  <path d="m2 2 20 20"/>\n  <path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11"/>';
export function PinOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 17v5" variants={drawFlow} custom={[0.3, 0.2]} />
      <motion.path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89" variants={drawFlow} custom={[0, 0.35]} />
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.5, 0.4)} />
      <motion.path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11" variants={drawFlow} custom={[0.12, 0.35]} />
    </Icon>
  );
}

export const planeBody = '  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>';
export function Plane(p: IconProps) {
  return (
    <Icon {...p}>
      {/* takeoff surge along its heading, settling back on course */}
      <motion.path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" variants={surge} custom={[1.1, -1.1]} />
    </Icon>
  );
}

export const rollerCoasterBody = '  <path d="M6 19V5"/>\n  <path d="M10 19V6.8"/>\n  <path d="M14 19v-7.8"/>\n  <path d="M18 5v4"/>\n  <path d="M18 19v-6"/>\n  <path d="M22 19V9"/>\n  <path d="M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65"/>';
export function RollerCoaster(p: IconProps) {
  return (
    <Icon {...p}>
      {/* supports rise left to right, then the track runs the whole ride */}
      <motion.path d="M6 19V5" variants={drawRev} custom={[0.08, 0.25]} />
      <motion.path d="M10 19V6.8" variants={drawRev} custom={[0.16, 0.25]} />
      <motion.path d="M14 19v-7.8" variants={drawRev} custom={[0.24, 0.25]} />
      <motion.path d="M18 5v4" variants={drawFlow} custom={[0.32, 0.2]} />
      <motion.path d="M18 19v-6" variants={drawRev} custom={[0.32, 0.25]} />
      <motion.path d="M22 19V9" variants={drawRev} custom={[0.4, 0.25]} />
      <motion.path d="M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65" variants={drawFlow} custom={[0.3, 0.7]} />
    </Icon>
  );
}

export const routeBody = '  <circle cx="6" cy="19" r="3"/>\n  <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/>\n  <circle cx="18" cy="5" r="3"/>';
export function Route(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the journey: start pulses, the route snakes out, the end pulses on arrival */}
      <motion.circle cx="6" cy="19" r="3" variants={pulseSoft} custom={0} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" variants={drawFlow} custom={[0.15, 0.6]} />
      <motion.circle cx="18" cy="5" r="3" variants={pulseSoft} custom={0.72} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const routeOffBody = '  <circle cx="6" cy="19" r="3"/>\n  <path d="M9 19h8.5c.4 0 .9-.1 1.3-.2"/>\n  <path d="M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12"/>\n  <path d="m2 2 20 20"/>\n  <path d="M21 15.3a3.5 3.5 0 0 0-3.3-3.3"/>\n  <path d="M15 5h-4.3"/>\n  <circle cx="18" cy="5" r="3"/>';
export function RouteOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.circle cx="6" cy="19" r="3" variants={pulseSoft} custom={0} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M9 19h8.5c.4 0 .9-.1 1.3-.2" variants={drawFlow} custom={[0.12, 0.3]} />
      <motion.path d="M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12" variants={drawFlow} custom={[0.22, 0.3]} />
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.55, 0.4)} />
      <motion.path d="M21 15.3a3.5 3.5 0 0 0-3.3-3.3" variants={drawFlow} custom={[0.32, 0.25]} />
      <motion.path d="M15 5h-4.3" variants={drawFlow} custom={[0.42, 0.2]} />
      <motion.circle cx="18" cy="5" r="3" variants={pulseSoft} custom={0.3} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const scaleBody = '  <path d="M12 3v18"/>\n  <path d="m19 8 3 8a5 5 0 0 1-6 0zV7"/>\n  <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"/>\n  <path d="m5 8 3 8a5 5 0 0 1-6 0zV7"/>\n  <path d="M7 21h10"/>';
export function Scale(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 3v18" />
      {/* weighing: the pans seesaw in counterphase, then settle level */}
      <motion.path d="m19 8 3 8a5 5 0 0 1-6 0zV7" variants={weigh} custom={-1} />
      <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
      <motion.path d="m5 8 3 8a5 5 0 0 1-6 0zV7" variants={weigh} custom={1} />
      <path d="M7 21h10" />
    </Icon>
  );
}

export const schoolBody = '  <path d="M14 21v-3a2 2 0 0 0-4 0v3"/>\n  <path d="M18 4.933V21"/>\n  <path d="m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6"/>\n  <path d="m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11"/>\n  <path d="M6 4.933V21"/>\n  <circle cx="12" cy="9" r="2"/>';
export function School(p: IconProps) {
  return (
    <Icon {...p}>
      {/* walls and roof build, the emblem pulses, the door closes */}
      <motion.path d="M14 21v-3a2 2 0 0 0-4 0v3" variants={drawFlow} custom={[0.55, 0.3]} />
      <motion.path d="M18 4.933V21" variants={drawFlow} custom={[0.15, 0.35]} />
      <motion.path d="m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6" variants={drawFlow} custom={[0.3, 0.35]} />
      <motion.path d="m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M6 4.933V21" variants={drawFlow} custom={[0.15, 0.35]} />
      <motion.circle cx="12" cy="9" r="2" variants={pulse} custom={0.6} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const shipBody = '  <path d="M12 10.189V14"/>\n  <path d="M12 2v3"/>\n  <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/>\n  <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/>\n  <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>';
export function Ship(p: IconProps) {
  return (
    <Icon {...p}>
      {/* genuinely continuous: the hull rides a gentle swell while the sea
          sloshes beneath — seamless loop */}
      <motion.g variants={shipBob} style={{ transformBox: "view-box", originX: "12px", originY: "20px" }}>
        <path d="M12 10.189V14" />
        <path d="M12 2v3" />
        <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
        <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76" />
      </motion.g>
      <motion.path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" variants={seaSlosh} />
    </Icon>
  );
}
const shipBob: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -1.8, 0, 1.8, 0], transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } },
};
const seaSlosh: Variants = {
  normal: { x: 0 },
  animate: { x: [0, -0.9, 0, 0.9, 0], transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } },
};

export const shipWheelBody = '  <circle cx="12" cy="12" r="8"/>\n  <path d="M12 2v7.5"/>\n  <path d="m19 5-5.23 5.23"/>\n  <path d="M22 12h-7.5"/>\n  <path d="m19 19-5.23-5.23"/>\n  <path d="M12 14.5V22"/>\n  <path d="M10.23 13.77 5 19"/>\n  <path d="M9.5 12H2"/>\n  <path d="M10.23 10.23 5 5"/>\n  <circle cx="12" cy="12" r="2.5"/>';
export function ShipWheel(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the helm turns hard to starboard and eases back amidships */}
      <motion.g variants={helmTurn} style={{ transformBox: "view-box", originX: "12px", originY: "12px" }}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 2v7.5" />
        <path d="m19 5-5.23 5.23" />
        <path d="M22 12h-7.5" />
        <path d="m19 19-5.23-5.23" />
        <path d="M12 14.5V22" />
        <path d="M10.23 13.77 5 19" />
        <path d="M9.5 12H2" />
        <path d="M10.23 10.23 5 5" />
        <circle cx="12" cy="12" r="2.5" />
      </motion.g>
    </Icon>
  );
}
const helmTurn: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, 38, -10, 0], transition: { duration: 1.2, ease: E } },
};

export const signpostBody = '  <path d="M12 13v8"/>\n  <path d="M12 3v3"/>\n  <path d="M2.354 10.354a1.207 1.207 0 0 1 0-1.708l2.06-2.06A2 2 0 0 1 5.828 6h12.344a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H5.828a2 2 0 0 1-1.414-.586z"/>';
export function Signpost(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 13v8" />
      <path d="M12 3v3" />
      {/* the board catches the wind, swings on its post, settles pointing */}
      <motion.path d="M2.354 10.354a1.207 1.207 0 0 1 0-1.708l2.06-2.06A2 2 0 0 1 5.828 6h12.344a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H5.828a2 2 0 0 1-1.414-.586z" variants={boardSwing} style={{ transformBox: "view-box", originX: "12px", originY: "9.5px" }} />
    </Icon>
  );
}
const boardSwing: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -5, 3, -1, 0], transition: { duration: 0.9, ease: E } },
};

export const signpostBigBody = '  <path d="M10 9H4L2 7l2-2h6"/>\n  <path d="M14 5h6l2 2-2 2h-6"/>\n  <path d="M10 22V4a2 2 0 1 1 4 0v18"/>\n  <path d="M8 22h8"/>';
export function SignpostBig(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the two boards point their ways in turn */}
      <motion.path d="M10 9H4L2 7l2-2h6" variants={pointNudge} custom={[-1.2, 0]} />
      <motion.path d="M14 5h6l2 2-2 2h-6" variants={pointNudge} custom={[1.2, 0.15]} />
      <path d="M10 22V4a2 2 0 1 1 4 0v18" />
      <path d="M8 22h8" />
    </Icon>
  );
}
// a directional point: out along the arrow, back to rest. custom=[dx, delay]
const pointNudge: Variants = {
  normal: { x: 0 },
  animate: (c: number[] = []) => ({
    x: [0, c[0] ?? 0, 0],
    transition: { duration: 0.55, delay: c[1] ?? 0, ease: E },
  }),
};

export const squareChevronDownBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="m16 10-4 4-4-4"/>';
export function SquareChevronDown(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="m16 10-4 4-4-4" variants={nudge("y", 2)} transition={nudgeTransition} />
    </Icon>
  );
}

export const squareChevronLeftBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="m14 16-4-4 4-4"/>';
export function SquareChevronLeft(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="m14 16-4-4 4-4" variants={nudge("x", -2)} transition={nudgeTransition} />
    </Icon>
  );
}

export const squareChevronRightBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="m10 8 4 4-4 4"/>';
export function SquareChevronRight(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="m10 8 4 4-4 4" variants={nudge("x", 2)} transition={nudgeTransition} />
    </Icon>
  );
}

export const squareLibraryBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="M7 7v10"/>\n  <path d="M11 7v10"/>\n  <path d="m15 7 2 10"/>';
export function SquareLibrary(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="M7 7v10" variants={drawFlow} custom={[0, 0.28]} />
      <motion.path d="M11 7v10" variants={drawFlow} custom={[0.15, 0.28]} />
      <motion.path d="m15 7 2 10" variants={drawFlow} custom={[0.32, 0.3]} />
    </Icon>
  );
}

export const squareMBody = '  <path d="M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16"/>\n  <rect x="3" y="3" width="18" height="18" rx="2"/>';
export function SquareM(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the M writes itself in one stroke */}
      <motion.path d="M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16" variants={drawRev} custom={[0, 0.55]} />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </Icon>
  );
}

export const squareParkingBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>';
export function SquareParking(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="M9 17V7h4a3 3 0 0 1 0 6H9" variants={drawRev} custom={[0, 0.5]} />
    </Icon>
  );
}

export const squareParkingOffBody = '  <path d="M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41"/>\n  <path d="M3 8.7V19a2 2 0 0 0 2 2h10.3"/>\n  <path d="m2 2 20 20"/>\n  <path d="M13 13a3 3 0 1 0 0-6H9v2"/>\n  <path d="M9 17v-2.3"/>';
export function SquareParkingOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M3 8.7V19a2 2 0 0 0 2 2h10.3" variants={drawFlow} custom={[0.12, 0.35]} />
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.55, 0.4)} />
      <motion.path d="M13 13a3 3 0 1 0 0-6H9v2" variants={drawFlow} custom={[0.25, 0.3]} />
      <motion.path d="M9 17v-2.3" variants={drawRev} custom={[0.38, 0.2]} />
    </Icon>
  );
}

export const storeBody = '  <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/>\n  <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"/>\n  <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"/>';
export function Store(p: IconProps) {
  return (
    <Icon {...p}>
      {/* opening up: the awning unrolls across the front, then the door */}
      <motion.path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" variants={drawFlow} custom={[0.5, 0.3]} />
      <motion.path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" variants={drawFlow} custom={[0, 0.55]} />
      <motion.path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" variants={drawFlow} custom={[0.3, 0.4]} />
    </Icon>
  );
}

export const trainFrontTunnelBody = '  <path d="M2 22V12a10 10 0 1 1 20 0v10"/>\n  <path d="M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8"/>\n  <path d="M10 15h.01"/>\n  <path d="M14 15h.01"/>\n  <path d="M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z"/>\n  <path d="m9 19-2 3"/>\n  <path d="m15 19 2 3"/>';
export function TrainFrontTunnel(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the tunnel bores round, the train builds inside, headlights thump */}
      <motion.path d="M2 22V12a10 10 0 1 1 20 0v10" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8" variants={drawFlow} custom={[0.5, 0.3]} />
      <motion.path d="M10 15h.01" variants={thump} custom={0.72} />
      <motion.path d="M14 15h.01" variants={thump} custom={0.8} />
      <motion.path d="M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z" variants={drawFlow} custom={[0.2, 0.45]} />
      <motion.path d="m9 19-2 3" variants={drawFlow} custom={[0.6, 0.2]} />
      <motion.path d="m15 19 2 3" variants={drawFlow} custom={[0.66, 0.2]} />
    </Icon>
  );
}

export const trainTrackBody = '  <path d="M2 17 17 2"/>\n  <path d="m2 14 8 8"/>\n  <path d="m5 11 8 8"/>\n  <path d="m8 8 8 8"/>\n  <path d="m11 5 8 8"/>\n  <path d="m14 2 8 8"/>\n  <path d="M7 22 22 7"/>';
export function TrainTrack(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the rails run ahead, then the sleepers hammer in up the line */}
      <motion.path d="M2 17 17 2" variants={drawFlow} custom={[0, 0.45]} />
      <motion.path d="m2 14 8 8" variants={drawFlow} custom={[0.3, 0.2]} />
      <motion.path d="m5 11 8 8" variants={drawFlow} custom={[0.4, 0.2]} />
      <motion.path d="m8 8 8 8" variants={drawFlow} custom={[0.5, 0.2]} />
      <motion.path d="m11 5 8 8" variants={drawFlow} custom={[0.6, 0.2]} />
      <motion.path d="m14 2 8 8" variants={drawFlow} custom={[0.7, 0.2]} />
      <motion.path d="M7 22 22 7" variants={drawFlow} custom={[0.1, 0.45]} />
    </Icon>
  );
}

export const universityBody = '  <path d="M14 21v-3a2 2 0 0 0-4 0v3"/>\n  <path d="M18 12h.01"/>\n  <path d="M18 16h.01"/>\n  <path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"/>\n  <path d="M6 12h.01"/>\n  <path d="M6 16h.01"/>\n  <circle cx="12" cy="10" r="2"/>';
export function University(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M14 21v-3a2 2 0 0 0-4 0v3" variants={drawFlow} custom={[0.4, 0.3]} />
      <motion.path d="M18 12h.01" variants={thump} custom={0.6} />
      <motion.path d="M18 16h.01" variants={thump} custom={0.68} />
      <motion.path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" variants={drawFlow} custom={[0, 0.55]} />
      <motion.path d="M6 12h.01" variants={thump} custom={0.52} />
      <motion.path d="M6 16h.01" variants={thump} custom={0.76} />
      <motion.circle cx="12" cy="10" r="2" variants={pulse} custom={0.55} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const utensilsBody = '  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>\n  <path d="M7 2v20"/>\n  <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>';
export function Utensils(p: IconProps) {
  return (
    <Icon {...p}>
      {/* table set: the fork's tines cup, its handle, then the knife */}
      <motion.path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M7 2v20" variants={drawFlow} custom={[0.2, 0.35]} />
      <motion.path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" variants={drawFlow} custom={[0.4, 0.45]} />
    </Icon>
  );
}

export const utensilsCrossedBody = '  <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/>\n  <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/>\n  <path d="m2.1 21.8 6.4-6.3"/>\n  <path d="m19 5-7 7"/>';
export function UtensilsCrossed(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the two utensils draw in from opposite corners and cross */}
      <motion.path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" variants={drawFlow} custom={[0.15, 0.45]} />
      <motion.path d="m2.1 21.8 6.4-6.3" variants={drawFlow} custom={[0.35, 0.3]} />
      <motion.path d="m19 5-7 7" variants={drawFlow} custom={[0.45, 0.3]} />
    </Icon>
  );
}

export const warehouseBody = '  <path d="M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11"/>\n  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z"/>\n  <path d="M6 13h12"/>\n  <path d="M6 17h12"/>';
export function Warehouse(p: IconProps) {
  return (
    <Icon {...p}>
      {/* shell raises, bay door outlines, shelf lines slide in */}
      <motion.path d="M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11" variants={drawFlow} custom={[0.25, 0.4]} />
      <motion.path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M6 13h12" variants={drawFlow} custom={[0.5, 0.25]} />
      <motion.path d="M6 17h12" variants={drawRev} custom={[0.6, 0.25]} />
    </Icon>
  );
}

export const wavesHorizontalBody = '  <path d="M2 12q2.5 2 5 0t5 0 5 0 5 0"/>\n  <path d="M2 19q2.5 2 5 0t5 0 5 0 5 0"/>\n  <path d="M2 5q2.5 2 5 0t5 0 5 0 5 0"/>';
export function WavesHorizontal(p: IconProps) {
  return (
    <Icon {...p}>
      {/* genuinely continuous water: neighboring rows slosh against each other */}
      <motion.path d="M2 12q2.5 2 5 0t5 0 5 0 5 0" variants={rowSlosh} custom={[-0.65, 0]} />
      <motion.path d="M2 19q2.5 2 5 0t5 0 5 0 5 0" variants={rowSlosh} custom={[0.65, 0.15]} />
      <motion.path d="M2 5q2.5 2 5 0t5 0 5 0 5 0" variants={rowSlosh} custom={[0.65, 0]} />
    </Icon>
  );
}
// amplitude ≤0.65: the rows' round caps sit 1 unit off the viewBox edge and a
// ±0.9 slosh left them 3px from the border at 800px — visually flat-cut.
// Adjacent rows take opposite signs so neighbors move against each other.
// custom=[dx, delay]
const rowSlosh: Variants = {
  normal: { x: 0 },
  animate: (c: number[] = []) => ({
    x: [0, c[0] ?? 0.65, 0, -(c[0] ?? 0.65), 0],
    transition: { duration: 1.3, delay: c[1] ?? 0, repeat: Infinity, ease: "easeInOut" },
  }),
};

export const waypointsBody = '  <path d="m10.586 5.414-5.172 5.172"/>\n  <path d="m18.586 13.414-5.172 5.172"/>\n  <path d="M6 12h12"/>\n  <circle cx="12" cy="20" r="2"/>\n  <circle cx="12" cy="4" r="2"/>\n  <circle cx="20" cy="12" r="2"/>\n  <circle cx="4" cy="12" r="2"/>';
export function Waypoints(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the route hops node to node across all four waypoints */}
      <motion.path d="m10.586 5.414-5.172 5.172" variants={drawFlow} custom={[0.1, 0.25]} />
      <motion.path d="m18.586 13.414-5.172 5.172" variants={drawFlow} custom={[0.72, 0.25]} />
      <motion.path d="M6 12h12" variants={drawFlow} custom={[0.42, 0.28]} />
      <motion.circle cx="12" cy="20" r="2" variants={pulse} custom={0.95} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.circle cx="12" cy="4" r="2" variants={pulse} custom={0} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.circle cx="20" cy="12" r="2" variants={pulse} custom={0.68} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.circle cx="4" cy="12" r="2" variants={pulse} custom={0.34} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}
