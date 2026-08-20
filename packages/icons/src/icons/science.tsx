"use client";

import { motion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { Icon } from "../icon.js";
import { drawFlow, drawRev, growMiddle } from "../variants.js";
import { entranceSharp } from "../ease.js";
import type { IconProps } from "../types.js";

// Science language: genuine rotators really rotate (electron shells, gears,
// gauge needles, orbiting moons — origins pinned with motion originX/originY
// px values); chemistry vessels share one "reaction" treatment (the liquid
// level bobs VERTICALLY — sideways would poke through the walls — while
// ephemeral bubbles rise off it and dissipate); signals flow outward along
// their traces; -off icons beat fragments in fast, slash strikes last.
const E = "easeInOut";

function gm(delay = 0, duration = 0.5): Transition {
  return { duration, delay, ease: entranceSharp, opacity: { duration: 0.08, delay } };
}
// grow-only pulse for dots/cores that exist at rest. custom=delay
const pulse: Variants = {
  normal: { scale: 1 },
  animate: (d: number = 0) => ({ scale: [1, 1.35, 1], transition: { duration: 0.35, delay: d, ease: E } }),
};
// one full revolution, settling back to an identical rest. custom=duration
const spinOnce: Variants = {
  normal: { rotate: 0 },
  animate: (dur: number = 1.4) => ({
    rotate: [0, 360],
    transition: { duration: dur, ease: E },
    transitionEnd: { rotate: 0 },
  }),
};
// a gauge needle sweeping up from rest-left onto its reading. custom=[fromDeg, delay]
const needleSweep: Variants = {
  normal: { rotate: 0 },
  animate: (c: number[] = []) => ({
    rotate: [c[0] ?? -110, 8, 0],
    transition: { duration: 0.8, delay: c[1] ?? 0.1, ease: E },
  }),
};
// the liquid level bobs vertically — a CONTINUOUS simmer (loop closes at 0).
// custom=delay
const levelBob: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({
    y: [0, -0.6, 0, -0.35, 0],
    transition: { duration: 1.8, delay: d, repeat: Infinity, ease: E },
  }),
};
// an ephemeral bubble: rises off the liquid line, pops, and another follows —
// continuous brewing (opacity closes at 0 each cycle). custom=[dy, delay]
const bubble: Variants = {
  normal: { opacity: 0 },
  animate: (c: number[] = []) => ({
    y: [0, c[0] ?? -4],
    opacity: [0, 1, 1, 0],
    transition: {
      y: { duration: 1.1, delay: c[1] ?? 0, repeat: Infinity, repeatDelay: 0.35, ease: "easeOut" },
      opacity: { duration: 1.1, delay: c[1] ?? 0, repeat: Infinity, repeatDelay: 0.35, times: [0, 0.2, 0.7, 1] },
    },
  }),
};
// press along an axis and spring back. custom=[dx, dy]
const axisPress: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[] = []) => ({
    x: [0, c[0] ?? 0, 0],
    y: [0, c[1] ?? 0, 0],
    transition: { duration: 0.55, ease: E },
  }),
};
// knocked satellite: a small kick that settles. custom=[dx, dy, delay]
const recoil: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[] = []) => ({
    x: [0, c[0] ?? 0, 0],
    y: [0, c[1] ?? 0, 0],
    transition: { duration: 0.45, delay: c[2] ?? 0, ease: E },
  }),
};
// lub-dub double heartbeat, grow-only
const lubDub: Variants = {
  normal: { scale: 1 },
  animate: { scale: [1, 1.3, 1, 1.22, 1], transition: { duration: 0.7, delay: 0.15, ease: E } },
};
// soft glint ray fading in place. custom=[delay, dur]
const rayGlow: Variants = {
  normal: { opacity: 0 },
  animate: (c: number[] = []) => ({
    opacity: [0, 0.55, 0.55, 0],
    transition: { duration: c[1] ?? 1, delay: c[0] ?? 0, ease: E, times: [0, 0.3, 0.6, 1] },
  }),
};
// 4-ray star twinkle at a point (light source language: one source, equal steps)
function Twinkle({ cx, cy, r0 = 0.7, r1 = 1.9, delay = 0.35 }: { cx: number; cy: number; r0?: number; r1?: number; delay?: number }) {
  return (
    <>
      {[45, 135, 225, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <motion.line key={i}
            x1={cx + Math.cos(rad) * r0} y1={cy + Math.sin(rad) * r0}
            x2={cx + Math.cos(rad) * r1} y2={cy + Math.sin(rad) * r1}
            strokeWidth={1.3}
            variants={rayGlow} custom={[delay + i * 0.02, 0.9]} />
        );
      })}
    </>
  );
}

export const activityBody = '  <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>';
export function Activity(p: IconProps) {
  return (
    <Icon {...p}>
      {/* one live heartbeat pass, right-to-left along the trace's path order */}
      <motion.path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" variants={drawFlow} custom={[0, 0.7]} />
    </Icon>
  );
}

export const atomBody = '  <circle cx="12" cy="12" r="1"/>\n  <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/>\n  <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/>';
export function Atom(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.circle cx="12" cy="12" r="1" variants={pulse} custom={0.55} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      {/* the shells reach ~14 units from center — NO rotation fits the 24-box
          (frame check: clipped flat at ±45°). The electrons trace their
          shells instead: each orbit redraws along its own path */}
      <motion.path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" variants={drawFlow} custom={[0, 0.7]} />
      <motion.path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" variants={drawFlow} custom={[0.18, 0.7]} />
    </Icon>
  );
}

export const beakerBody = '  <path d="M4.5 3h15"/>\n  <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/>\n  <path d="M6 14h12"/>';
export function Beaker(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M4.5 3h15" />
      <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
      <motion.path d="M6 14h12" variants={levelBob} custom={0} />
      {/* reaction bubbles rise off the level and pop */}
      <motion.path d="M10 12.6h.01" variants={bubble} custom={[-3.4, 0.1]} />
      <motion.path d="M14 12.9h.01" variants={bubble} custom={[-4.2, 0.3]} />
    </Icon>
  );
}

export const biohazardBody = '  <circle cx="12" cy="11.9" r="2"/>\n  <path d="M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6"/>\n  <path d="m8.9 10.1 1.4.8"/>\n  <path d="M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5"/>\n  <path d="m15.1 10.1-1.4.8"/>\n  <path d="M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2"/>\n  <path d="M12 13.9v1.6"/>\n  <path d="M13.5 5.4c-1-.2-2-.2-3 0"/>\n  <path d="M17 16.4c.7-.7 1.2-1.6 1.5-2.5"/>\n  <path d="M5.5 13.9c.3.9.8 1.8 1.5 2.5"/>';
export function Biohazard(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.circle cx="12" cy="11.9" r="2" variants={pulse} custom={0.55} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      {/* three crescent blades draw in rotational rhythm, ticks flick in */}
      <motion.path d="M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6" variants={drawFlow} custom={[0, 0.35]} />
      <motion.path d="m8.9 10.1 1.4.8" variants={drawFlow} custom={[0.48, 0.15]} />
      <motion.path d="M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5" variants={drawFlow} custom={[0.15, 0.35]} />
      <motion.path d="m15.1 10.1-1.4.8" variants={drawFlow} custom={[0.54, 0.15]} />
      <motion.path d="M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2" variants={drawFlow} custom={[0.3, 0.35]} />
      <motion.path d="M12 13.9v1.6" variants={drawFlow} custom={[0.6, 0.15]} />
      <motion.path d="M13.5 5.4c-1-.2-2-.2-3 0" variants={drawFlow} custom={[0.66, 0.18]} />
      <motion.path d="M17 16.4c.7-.7 1.2-1.6 1.5-2.5" variants={drawFlow} custom={[0.72, 0.18]} />
      <motion.path d="M5.5 13.9c.3.9.8 1.8 1.5 2.5" variants={drawFlow} custom={[0.78, 0.18]} />
    </Icon>
  );
}

export const brainBody = '  <path d="M12 18V5"/>\n  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/>\n  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/>\n  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/>\n  <path d="M18 18a4 4 0 0 0 2-7.464"/>\n  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/>\n  <path d="M6 18a4 4 0 0 1-2-7.464"/>\n  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/>';
export function Brain(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the mind assembles: crown, temples, base, center line, inner fold */}
      <motion.path d="M12 18V5" variants={drawRev} custom={[0.45, 0.3]} />
      <motion.path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" variants={drawFlow} custom={[0.62, 0.3]} />
      <motion.path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" variants={drawFlow} custom={[0.15, 0.3]} />
      <motion.path d="M18 18a4 4 0 0 0 2-7.464" variants={drawFlow} custom={[0.3, 0.3]} />
      <motion.path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" variants={drawFlow} custom={[0.42, 0.35]} />
      <motion.path d="M6 18a4 4 0 0 1-2-7.464" variants={drawRev} custom={[0.3, 0.3]} />
      <motion.path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" variants={drawFlow} custom={[0.15, 0.3]} />
    </Icon>
  );
}

export const brainCircuitBody = '  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>\n  <path d="M9 13a4.5 4.5 0 0 0 3-4"/>\n  <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>\n  <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>\n  <path d="M6 18a4 4 0 0 1-1.967-.516"/>\n  <path d="M12 13h4"/>\n  <path d="M12 18h6a2 2 0 0 1 2 2v1"/>\n  <path d="M12 8h8"/>\n  <path d="M16 8V5a2 2 0 0 1 2-2"/>\n  <circle cx="16" cy="13" r=".5"/>\n  <circle cx="18" cy="3" r=".5"/>\n  <circle cx="20" cy="21" r=".5"/>\n  <circle cx="20" cy="8" r=".5"/>';
export function BrainCircuit(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M9 13a4.5 4.5 0 0 0 3-4" variants={drawFlow} custom={[0.3, 0.25]} />
      <motion.path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" variants={drawFlow} custom={[0.38, 0.2]} />
      <motion.path d="M3.477 10.896a4 4 0 0 1 .585-.396" variants={drawFlow} custom={[0.44, 0.2]} />
      <motion.path d="M6 18a4 4 0 0 1-1.967-.516" variants={drawFlow} custom={[0.5, 0.2]} />
      {/* signals flow out along the traces, nodes pop as each arrives */}
      <motion.path d="M12 13h4" variants={drawFlow} custom={[0.5, 0.25]} />
      <motion.path d="M12 18h6a2 2 0 0 1 2 2v1" variants={drawFlow} custom={[0.6, 0.3]} />
      <motion.path d="M12 8h8" variants={drawFlow} custom={[0.4, 0.25]} />
      <motion.path d="M16 8V5a2 2 0 0 1 2-2" variants={drawFlow} custom={[0.55, 0.25]} />
      <motion.circle cx="16" cy="13" r=".5" variants={pulse} custom={0.78} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.circle cx="18" cy="3" r=".5" variants={pulse} custom={0.82} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.circle cx="20" cy="21" r=".5" variants={pulse} custom={0.92} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.circle cx="20" cy="8" r=".5" variants={pulse} custom={0.68} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const brainCogBody = '  <path d="m10.852 14.772-.383.923"/>\n  <path d="m10.852 9.228-.383-.923"/>\n  <path d="m13.148 14.772.382.924"/>\n  <path d="m13.531 8.305-.383.923"/>\n  <path d="m14.772 10.852.923-.383"/>\n  <path d="m14.772 13.148.923.383"/>\n  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771"/>\n  <path d="M17.998 5.125a4 4 0 0 1 2.525 5.771"/>\n  <path d="M19.505 10.294a4 4 0 0 1-1.5 7.706"/>\n  <path d="M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516"/>\n  <path d="M4.5 10.291A4 4 0 0 0 6 18"/>\n  <path d="M6.002 5.125a3 3 0 0 0 .4 1.375"/>\n  <path d="m9.228 10.852-.923-.383"/>\n  <path d="m9.228 13.148-.923.383"/>\n  <circle cx="12" cy="12" r="3"/>';
export function BrainCog(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the gear genuinely turns one revolution — teeth and ring as one unit */}
      <motion.g variants={spinOnce} custom={1.2} style={{ transformBox: "view-box", originX: "12px", originY: "12px" }}>
        <path d="m10.852 14.772-.383.923" />
        <path d="m10.852 9.228-.383-.923" />
        <path d="m13.148 14.772.382.924" />
        <path d="m13.531 8.305-.383.923" />
        <path d="m14.772 10.852.923-.383" />
        <path d="m14.772 13.148.923.383" />
        <path d="m9.228 10.852-.923-.383" />
        <path d="m9.228 13.148-.923.383" />
        <circle cx="12" cy="12" r="3" />
      </motion.g>
      <motion.path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M17.998 5.125a4 4 0 0 1 2.525 5.771" variants={drawFlow} custom={[0.18, 0.25]} />
      <motion.path d="M19.505 10.294a4 4 0 0 1-1.5 7.706" variants={drawFlow} custom={[0.32, 0.25]} />
      <motion.path d="M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516" variants={drawFlow} custom={[0.46, 0.3]} />
      <motion.path d="M4.5 10.291A4 4 0 0 0 6 18" variants={drawFlow} custom={[0.25, 0.25]} />
      <motion.path d="M6.002 5.125a3 3 0 0 0 .4 1.375" variants={drawFlow} custom={[0.4, 0.18]} />
    </Icon>
  );
}

export const circleGaugeBody = '  <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7"/>\n  <circle cx="12" cy="12" r="2"/>\n  <path d="M13.4 10.6 19 5"/>';
export function CircleGauge(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
      <motion.circle cx="12" cy="12" r="2" variants={pulse} custom={0.75} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      {/* the needle sweeps up from rest-left onto its reading */}
      <motion.path d="M13.4 10.6 19 5" variants={needleSweep} custom={[-120, 0.1]} style={{ transformBox: "view-box", originX: "12px", originY: "12px" }} />
    </Icon>
  );
}

export const circuitBoardBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="M11 9h4a2 2 0 0 0 2-2V3"/>\n  <circle cx="9" cy="9" r="2"/>\n  <path d="M7 21v-4a2 2 0 0 1 2-2h4"/>\n  <circle cx="15" cy="15" r="2"/>';
export function CircuitBoard(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      {/* current flows node → trace → node → trace */}
      <motion.path d="M11 9h4a2 2 0 0 0 2-2V3" variants={drawFlow} custom={[0.2, 0.35]} />
      <motion.circle cx="9" cy="9" r="2" variants={pulse} custom={0.05} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M7 21v-4a2 2 0 0 1 2-2h4" variants={drawRev} custom={[0.7, 0.35]} />
      <motion.circle cx="15" cy="15" r="2" variants={pulse} custom={0.55} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const flaskConicalBody = '  <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/>\n  <path d="M6.453 15h11.094"/>\n  <path d="M8.5 2h7"/>';
export function FlaskConical(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
      <motion.path d="M6.453 15h11.094" variants={levelBob} custom={0} />
      <path d="M8.5 2h7" />
      <motion.path d="M10.2 13.6h.01" variants={bubble} custom={[-3, 0.1]} />
      <motion.path d="M13.6 13.9h.01" variants={bubble} custom={[-3.8, 0.3]} />
    </Icon>
  );
}

export const flaskConicalOffBody = '  <path d="M10 2v2.343"/>\n  <path d="M14 2v6.343"/>\n  <path d="m2 2 20 20"/>\n  <path d="M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-1.755-2.96l5.227-9.563"/>\n  <path d="M6.453 15H15"/>\n  <path d="M8.5 2h7"/>';
export function FlaskConicalOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 2v2.343" variants={drawFlow} custom={[0.2, 0.2]} />
      <motion.path d="M14 2v6.343" variants={drawFlow} custom={[0.28, 0.2]} />
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.55, 0.4)} />
      <motion.path d="M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-1.755-2.96l5.227-9.563" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M6.453 15H15" variants={drawFlow} custom={[0.36, 0.25]} />
      <motion.path d="M8.5 2h7" variants={drawFlow} custom={[0.12, 0.2]} />
    </Icon>
  );
}

export const flaskRoundBody = '  <path d="M10 2v6.292a7 7 0 1 0 4 0V2"/>\n  <path d="M5 15h14"/>\n  <path d="M8.5 2h7"/>';
export function FlaskRound(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M10 2v6.292a7 7 0 1 0 4 0V2" />
      <motion.path d="M5 15h14" variants={levelBob} custom={0} />
      <path d="M8.5 2h7" />
      <motion.path d="M10.4 13.6h.01" variants={bubble} custom={[-2.6, 0.1]} />
      <motion.path d="M13.8 13.9h.01" variants={bubble} custom={[-3.2, 0.3]} />
    </Icon>
  );
}

export const gaugeBody = '  <path d="m12 14 4-4"/>\n  <path d="M3.34 19a10 10 0 1 1 17.32 0"/>';
export function Gauge(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the needle sweeps up around its hub end onto the reading */}
      <motion.path d="m12 14 4-4" variants={needleSweep} custom={[-105, 0.1]} style={{ transformBox: "view-box", originX: "12px", originY: "14px" }} />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </Icon>
  );
}

export const lensConcaveBody = '  <path d="M7 2a1 1 0 0 0-.8 1.6 14 14 0 0 1 0 16.8A1 1 0 0 0 7 22h10a1 1 0 0 0 .8-1.6 14 14 0 0 1 0-16.8A1 1 0 0 0 17 2z"/>';
export function LensConcave(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M7 2a1 1 0 0 0-.8 1.6 14 14 0 0 1 0 16.8A1 1 0 0 0 7 22h10a1 1 0 0 0 .8-1.6 14 14 0 0 1 0-16.8A1 1 0 0 0 17 2z" variants={drawFlow} custom={[0, 0.6]} />
      {/* light catches the upper edge */}
      <Twinkle cx={19.5} cy={4.5} delay={0.55} />
    </Icon>
  );
}

export const lensConvexBody = '  <path d="M13.433 2a1 1 0 0 1 .824.448 18 18 0 0 1 0 19.104 1 1 0 0 1-.824.448h-2.866a1 1 0 0 1-.824-.448 18 18 0 0 1 0-19.104A1 1 0 0 1 10.567 2z"/>';
export function LensConvex(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M13.433 2a1 1 0 0 1 .824.448 18 18 0 0 1 0 19.104 1 1 0 0 1-.824.448h-2.866a1 1 0 0 1-.824-.448 18 18 0 0 1 0-19.104A1 1 0 0 1 10.567 2z" variants={drawFlow} custom={[0, 0.6]} />
      <Twinkle cx={17.5} cy={4.5} delay={0.55} />
    </Icon>
  );
}

export const microscopeBody = '  <path d="M6 18h8"/>\n  <path d="M3 22h18"/>\n  <path d="M14 22a7 7 0 1 0 0-14h-1"/>\n  <path d="M9 14h2"/>\n  <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/>\n  <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>';
export function Microscope(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      {/* focusing: the objective presses toward the stage; the stage tick
          recoils under it */}
      <motion.path d="M9 14h2" variants={recoil} custom={[0, 0.5, 0.18]} />
      <motion.g variants={axisPress} custom={[0, 0.8]}>
        <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
        <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
      </motion.g>
    </Icon>
  );
}

export const orbitBody = '  <path d="M20.341 6.484A10 10 0 0 1 10.266 21.85"/>\n  <path d="M3.659 17.516A10 10 0 0 1 13.74 2.152"/>\n  <circle cx="12" cy="12" r="3"/>\n  <circle cx="19" cy="5" r="2"/>\n  <circle cx="5" cy="19" r="2"/>';
export function Orbit(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.circle cx="12" cy="12" r="3" variants={pulse} custom={0.6} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      {/* the whole outer system — arcs AND moons — turns one revolution as
          one unit: genuine orbiting, and since everything sits on circles
          around (12,12) (max paint radius 11) it can never clip. Moons alone
          smeared over the arc end-caps (frame check). */}
      <motion.g variants={spinOnce} custom={1.6} style={{ transformBox: "view-box", originX: "12px", originY: "12px" }}>
        <path d="M20.341 6.484A10 10 0 0 1 10.266 21.85" />
        <path d="M3.659 17.516A10 10 0 0 1 13.74 2.152" />
        <circle cx="19" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
      </motion.g>
    </Icon>
  );
}

export const pipetteBody = '  <path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12"/>\n  <path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z"/>\n  <path d="m2 22 .414-.414"/>';
export function Pipette(p: IconProps) {
  return (
    <Icon {...p}>
      {/* dispensing: the pipette squeezes toward its tip and springs back;
          a droplet slips off the tip and dissipates */}
      <motion.g variants={axisPress} custom={[-0.8, 0.8]}>
        <path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12" />
        <path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" />
      </motion.g>
      <path d="m2 22 .414-.414" />
      <motion.path d="M3.4 20.1h.01" variants={bubble} custom={[1.6, 0.28]} />
    </Icon>
  );
}

export const radiationBody = '  <path d="M12 12h.01"/>\n  <path d="M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z"/>\n  <path d="M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z"/>\n  <path d="M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z"/>';
export function Radiation(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 12h.01" variants={recoil} custom={[0, -1, 0.55]} />
      {/* the trefoil blades draw in rotational rhythm, the core thumps */}
      <motion.path d="M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z" variants={drawFlow} custom={[0.3, 0.35]} />
      <motion.path d="M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z" variants={drawFlow} custom={[0.15, 0.35]} />
      <motion.path d="M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z" variants={drawFlow} custom={[0, 0.35]} />
    </Icon>
  );
}

export const satelliteBody = '  <path d="m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5"/>\n  <path d="M16.5 7.5 19 5"/>\n  <path d="m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5"/>\n  <path d="M9 21a6 6 0 0 0-6-6"/>\n  <path d="M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z"/>';
export function Satellite(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5" />
      <motion.path d="M16.5 7.5 19 5" variants={drawFlow} custom={[0.1, 0.25]} />
      <path d="m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5" />
      {/* the link wave draws once and settles SOLID (a lone pulsing arc blinks
          the icon apart — utility-pole lesson); an ephemeral echo wave inside
          it carries the transmission, then dissipates */}
      <motion.path d="M9 21a6 6 0 0 0-6-6" variants={drawFlow} custom={[0.3, 0.4]} />
      <motion.path d="M6 21a3 3 0 0 0-3-3" variants={echoWave} />
      <path d="M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z" />
    </Icon>
  );
}
// one echo wave rippling inside the drawn link arc, then gone
const echoWave: Variants = {
  normal: { opacity: 0 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 0.7, 0],
    transition: { duration: 0.6, delay: 0.7, ease: "easeOut", times: [0, 0.4, 1] },
  },
};

export const squareActivityBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="M17 12h-2l-2 5-2-10-2 5H7"/>';
export function SquareActivity(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="M17 12h-2l-2 5-2-10-2 5H7" variants={drawFlow} custom={[0, 0.55]} />
    </Icon>
  );
}

export const stethoscopeBody = '  <path d="M11 2v2"/>\n  <path d="M5 2v2"/>\n  <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/>\n  <path d="M8 15a6 6 0 0 0 12 0v-3"/>\n  <circle cx="20" cy="10" r="2"/>';
export function Stethoscope(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M11 2v2" />
      <path d="M5 2v2" />
      <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
      <path d="M8 15a6 6 0 0 0 12 0v-3" />
      {/* the chest piece hears a real double heartbeat */}
      <motion.circle cx="20" cy="10" r="2" variants={lubDub} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const syringeBody = '  <path d="m18 2 4 4"/>\n  <path d="m17 7 3-3"/>\n  <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/>\n  <path d="m9 11 4 4"/>\n  <path d="m5 19-3 3"/>\n  <path d="m14 4 6 6"/>';
export function Syringe(p: IconProps) {
  return (
    <Icon {...p}>
      {/* injection: plunger presses down the barrel axis, the medicine level
          pushes forward with it */}
      <motion.g variants={axisPress} custom={[-1.1, 1.1]}>
        <path d="m18 2 4 4" />
        <path d="m17 7 3-3" />
      </motion.g>
      <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
      <motion.path d="m9 11 4 4" variants={recoil} custom={[-0.8, 0.8, 0.12]} />
      <path d="m5 19-3 3" />
      <path d="m14 4 6 6" />
    </Icon>
  );
}

export const telescopeBody = '  <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"/>\n  <path d="m13.56 11.747 4.332-.924"/>\n  <path d="m16 21-3.105-6.21"/>\n  <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"/>\n  <path d="m6.158 8.633 1.114 4.456"/>\n  <path d="m8 21 3.105-6.21"/>\n  <circle cx="12" cy="13" r="2"/>';
export function Telescope(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
      <path d="m13.56 11.747 4.332-.924" />
      <path d="m16 21-3.105-6.21" />
      <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
      <path d="m6.158 8.633 1.114 4.456" />
      <path d="m8 21 3.105-6.21" />
      {/* focus… and a star twinkles where the scope aims */}
      <motion.circle cx="12" cy="13" r="2" variants={pulse} custom={0.15} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <Twinkle cx={21.3} cy={2.4} r0={0.6} r1={1.5} delay={0.45} />
    </Icon>
  );
}

export const testTubeBody = '  <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2"/>\n  <path d="M8.5 2h7"/>\n  <path d="M14.5 16h-5"/>';
export function TestTube(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2" />
      <path d="M8.5 2h7" />
      <motion.path d="M14.5 16h-5" variants={levelBob} custom={0} />
      <motion.path d="M12 14.6h.01" variants={bubble} custom={[-3.2, 0.15]} />
    </Icon>
  );
}

export const testTubeDiagonalBody = '  <path d="M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3"/>\n  <path d="m16 2 6 6"/>\n  <path d="M12 16H4"/>';
export function TestTubeDiagonal(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3" />
      <path d="m16 2 6 6" />
      <motion.path d="M12 16H4" variants={levelBob} custom={0} />
      <motion.path d="M8 14.7h.01" variants={bubble} custom={[-3, 0.15]} />
    </Icon>
  );
}

export const testTubesBody = '  <path d="M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2"/>\n  <path d="M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2"/>\n  <path d="M3 2h7"/>\n  <path d="M14 2h7"/>\n  <path d="M9 16H4"/>\n  <path d="M20 16h-5"/>';
export function TestTubes(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2" />
      <path d="M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2" />
      <path d="M3 2h7" />
      <path d="M14 2h7" />
      <motion.path d="M9 16H4" variants={levelBob} custom={0} />
      <motion.path d="M20 16h-5" variants={levelBob} custom={0.2} />
      <motion.path d="M6.5 14.6h.01" variants={bubble} custom={[-3, 0.1]} />
      <motion.path d="M17.5 14.6h.01" variants={bubble} custom={[-3.2, 0.35]} />
    </Icon>
  );
}