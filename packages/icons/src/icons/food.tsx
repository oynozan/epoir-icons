"use client";

import { motion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { Icon } from "../icon.js";
import { drawFlow, drawRev, growMiddle } from "../variants.js";
import { entranceSharp } from "../ease.js";
import type { IconProps } from "../types.js";

// Food & beverage language: produce GROWS (body draws, stem/leaf sprouts
// last); drinks FILL (the liquid surface draws in and settles); prepared food
// ASSEMBLES in eating order with toppings popping; -off icons beat their
// fragments in fast and the slash strikes LAST. Multi-subpath `d` values never
// get drawFlow (Chromium only dashes the first subpath) — they stay static or
// move by transform.
const E = "easeInOut";

function gm(delay = 0, duration = 0.5): Transition {
  return { duration, delay, ease: entranceSharp, opacity: { duration: 0.08, delay } };
}
// grow-only pulse for dots, yolks, cherries. custom=delay
const pulse: Variants = {
  normal: { scale: 1 },
  animate: (d: number = 0) => ({ scale: [1, 1.35, 1], transition: { duration: 0.35, delay: d, ease: E } }),
};
// a topping/kernel popping into place. custom=delay
const popIn: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: (d: number = 0) => ({
    scale: [0, 1.2, 1],
    opacity: [0, 1, 1],
    transition: { duration: 0.3, delay: d, ease: entranceSharp },
  }),
};
// a candle flame: pops alight, then flickers. custom=delay
const flamePop: Variants = {
  normal: { scale: 1, opacity: 1, y: 0 },
  animate: (d: number = 0) => ({
    scale: [0, 1.2, 1, 1, 1],
    opacity: [0, 1, 1, 1, 1],
    y: [0, 0, -0.45, 0.25, 0],
    transition: { duration: 0.8, delay: d, ease: E },
  }),
};
// steam/smoke wisp: rises and dissipates, another follows. custom=delay
const steamRise: Variants = {
  normal: { y: 0, opacity: 1 },
  animate: (c: number[] = []) => ({
    y: [0, -(c[1] ?? 0.9)],
    opacity: [1, 1, 0],
    transition: { duration: 1.1, delay: c[0] ?? 0, repeat: Infinity, repeatDelay: 0.2, ease: "easeOut", opacity: { duration: 1.1, delay: c[0] ?? 0, repeat: Infinity, repeatDelay: 0.2, times: [0, 0.55, 1] } },
  }),
};
// one full spin in place (radius must fit the box). custom=duration
const spinOnce: Variants = {
  normal: { rotate: 0 },
  animate: (dur: number = 1) => ({
    rotate: [0, 360],
    transition: { duration: dur, ease: E },
    transitionEnd: { rotate: 0 },
  }),
};
// tips over and rights itself — cheers / a pour. custom=degrees
const tiltOnce: Variants = {
  normal: { rotate: 0 },
  animate: (deg: number = -4) => ({
    rotate: [0, deg, deg * -0.6, 0],
    transition: { duration: 0.8, ease: E },
  }),
};
// falls a beat and lands with a bounce. custom=delay
const landFall: Variants = {
  normal: { y: 0 },
  // hold the raised pose first — a front-loaded ease finishes the fall before
  // the eye (or the first capture frame) can register the start position.
  // custom=[delay, lift]; lift ≤ (paint top − 0.15): stroke is 2 units wide,
  // so a shape whose geometry tops at y2 paints to y1 and can only lift 0.85
  animate: (c: number[] = []) => ({
    y: [-(c[1] ?? 0.85), -(c[1] ?? 0.85), 0, -0.3, 0],
    transition: { duration: 0.85, delay: c[0] ?? 0, ease: E, times: [0, 0.3, 0.62, 0.8, 1] },
  }),
};
// jelly jiggle sideways. custom=delay
const jiggle: Variants = {
  normal: { x: 0 },
  animate: (d: number = 0) => ({
    x: [0, 0.7, -0.5, 0.3, 0],
    transition: { duration: 0.7, delay: d, ease: E },
  }),
};
// quick pop-pop jump for kernels / a hop for hats. custom=delay
const popJump: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({
    y: [0, -0.5, 0, -0.35, 0],
    transition: { duration: 0.6, delay: d, ease: E },
  }),
};
// liquid sloshes sideways and stills. custom=delay
const sloshOnce: Variants = {
  normal: { x: 0 },
  animate: (d: number = 0) => ({
    x: [0, 0.6, -0.6, 0.3, 0],
    transition: { duration: 0.8, delay: d, ease: E },
  }),
};
// the level bobs once — set down. custom=delay
const bobOnce: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({
    y: [0, -1, 0, -0.45, 0],
    transition: { duration: 0.9, delay: d, ease: E, times: [0, 0.3, 0.6, 0.8, 1] },
  }),
};
// the straw pops up out of the cup and drops back — its own bigger jump
// (popJump stays small for chef-hat/popcorn which sit nearer the top edge)
const strawPop: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, -0.8, 0, -0.35, 0],
    transition: { duration: 0.85, delay: 0.15, ease: E, times: [0, 0.3, 0.58, 0.8, 1] },
  },
};
// drives: forward trundle with two road bumps
const driveSurge: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    x: [0, 0.9, 0.9, 0],
    y: [0, -0.25, 0.1, 0],
    transition: { duration: 1, ease: E, times: [0, 0.4, 0.6, 1] },
  },
};
// dangles: swings from the stem apex and settles
const dangle: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -3, 2, -1, 0], transition: { duration: 1.1, ease: E } },
};
// wobbles like a spun ring settling flat / a jumping bean. custom=degrees
const wobble: Variants = {
  normal: { rotate: 0 },
  animate: (deg: number = -5) => ({
    rotate: [0, deg, deg * -0.8, deg * 0.4, 0],
    transition: { duration: 0.9, ease: E },
  }),
};
// a swell into place with NO overshoot — for pieces whose paint already
// reaches an edge (the -off bottles/shells). custom=delay
const swellIn: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: (d: number = 0) => ({
    scale: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.32, delay: d, ease: entranceSharp },
  }),
};
// a layer landing on the stack. custom=[dy, delay]
const stackIn: Variants = {
  normal: { y: 0 },
  animate: (c: number[] = []) => ({
    y: [c[0] ?? -3, 0],
    transition: { duration: 0.4, delay: c[1] ?? 0, ease: entranceSharp },
  }),
};
// a small settle bob for a filled vessel. custom=delay
const settleBob: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({ y: [0, -0.5, 0], transition: { duration: 0.4, delay: d, ease: E } }),
};
// a piece sliding out along an axis. custom=[dx, dy, delay]
const slideOut: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[] = []) => ({
    x: [c[0] ?? 0, 0],
    y: [c[1] ?? 0, 0],
    transition: { duration: 0.4, delay: c[2] ?? 0, ease: entranceSharp },
  }),
};

export const appleBody = '  <path d="M12 6.528V3a1 1 0 0 1 1-1h0"/>\n  <path d="M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21"/>';
export function Apple(p: IconProps) {
  return (
    <Icon {...p}>
      {/* gravity: the apple falls a beat and lands with a bounce */}
      <motion.g variants={landFall} custom={[0, 0.85]}>
        <path d="M12 6.528V3a1 1 0 0 1 1-1h0" />
        <path d="M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21" />
      </motion.g>
    </Icon>
  );
}

export const bananaBody = '  <path d="M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5"/>\n  <path d="M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z"/>';
export function Banana(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5" variants={drawFlow} custom={[0.35, 0.4]} />
      <motion.path d="M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z" variants={drawFlow} custom={[0, 0.55]} />
    </Icon>
  );
}

export const cherryBody = '  <path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"/>\n  <path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"/>\n  <path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"/>\n  <path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"/>';
export function Cherry(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the pair dangles: swings gently from the stem apex and settles */}
      <motion.g variants={dangle} style={{ transformBox: "view-box", originX: "12px", originY: "3px" }}>
        <path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" />
        <path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" />
        <path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12" />
        <path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z" />
      </motion.g>
    </Icon>
  );
}

export const grapeBody = '  <path d="M22 5V2l-5.89 5.89"/>\n  <circle cx="16.6" cy="15.89" r="3"/>\n  <circle cx="8.11" cy="7.4" r="3"/>\n  <circle cx="12.35" cy="11.65" r="3"/>\n  <circle cx="13.91" cy="5.85" r="3"/>\n  <circle cx="18.15" cy="10.09" r="3"/>\n  <circle cx="6.56" cy="13.2" r="3"/>\n  <circle cx="10.8" cy="17.44" r="3"/>\n  <circle cx="5" cy="19" r="3"/>';
export function Grape(p: IconProps) {
  const o = { transformBox: "fill-box", transformOrigin: "center" } as const;
  return (
    <Icon {...p}>
      {/* the bunch fills grape by grape from the stem down */}
      <motion.path d="M22 5V2l-5.89 5.89" variants={drawRev} custom={[0, 0.3]} />
      <motion.circle cx="13.91" cy="5.85" r="3" variants={popIn} custom={0.22} style={o} />
      <motion.circle cx="8.11" cy="7.4" r="3" variants={popIn} custom={0.3} style={o} />
      <motion.circle cx="18.15" cy="10.09" r="3" variants={popIn} custom={0.34} style={o} />
      <motion.circle cx="12.35" cy="11.65" r="3" variants={popIn} custom={0.42} style={o} />
      <motion.circle cx="6.56" cy="13.2" r="3" variants={popIn} custom={0.5} style={o} />
      <motion.circle cx="16.6" cy="15.89" r="3" variants={popIn} custom={0.54} style={o} />
      <motion.circle cx="10.8" cy="17.44" r="3" variants={popIn} custom={0.62} style={o} />
      <motion.circle cx="5" cy="19" r="3" variants={popIn} custom={0.7} style={o} />
    </Icon>
  );
}

export const citrusBody = '  <path d="M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z"/>\n  <path d="M19.65 15.66A8 8 0 0 1 8.35 4.34"/>\n  <path d="m14 10-5.5 5.5"/>\n  <path d="M14 17.85V10H6.15"/>';
export function Citrus(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M19.65 15.66A8 8 0 0 1 8.35 4.34" variants={drawFlow} custom={[0.2, 0.4]} />
      {/* the segment lines strike out from the core */}
      <motion.path d="m14 10-5.5 5.5" variants={drawRev} custom={[0.55, 0.25]} />
      <motion.path d="M14 17.85V10H6.15" variants={drawRev} custom={[0.42, 0.35]} />
    </Icon>
  );
}

export const carrotBody = '  <path d="M15 16a1 1 0 0 0-7-7q-4 4-5.987 12.385a.5.5 0 0 0 .602.602Q11 20 15 16l-3-3"/>\n  <path d="M15 9q4 4 7 0-3-4-7 0 4-4 0-7-4 3 0 7"/>\n  <path d="m8 15-2.58-2.58"/>';
export function Carrot(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M15 16a1 1 0 0 0-7-7q-4 4-5.987 12.385a.5.5 0 0 0 .602.602Q11 20 15 16l-3-3" variants={drawFlow} custom={[0, 0.55]} />
      {/* the leaves sprout after the root */}
      <motion.path d="M15 9q4 4 7 0-3-4-7 0 4-4 0-7-4 3 0 7" variants={drawFlow} custom={[0.45, 0.45]} />
      <motion.path d="m8 15-2.58-2.58" variants={drawFlow} custom={[0.35, 0.2]} />
    </Icon>
  );
}

export const broccoliBody = '  <path d="M10 13a3 3 0 0 1-2.121-5.121"/>\n  <path d="M15.606 14.204c-3.5 1.5-5.899 4.503-8.899 7.503A1 1 0 0 1 6 22c-2 0-4-2-4-4a1 1 0 0 1 .293-.707c1.911-1.911 3.823-3.578 5.347-5.441"/>\n  <path d="M16.573 14.737A4 4 0 0 1 14 11"/>\n  <path d="M7.14 10.907a4 4 0 1 1 2.756-7.43A4 4 0 0 1 16.7 4.48a2 2 0 0 1 2.82 2.82 4 4 0 0 1 1.002 6.805A4 4 0 1 1 13 16"/>';
export function Broccoli(p: IconProps) {
  return (
    <Icon {...p}>
      {/* crown florets first, stalk drops after */}
      <motion.path d="M10 13a3 3 0 0 1-2.121-5.121" variants={drawFlow} custom={[0.3, 0.25]} />
      <motion.path d="M15.606 14.204c-3.5 1.5-5.899 4.503-8.899 7.503A1 1 0 0 1 6 22c-2 0-4-2-4-4a1 1 0 0 1 .293-.707c1.911-1.911 3.823-3.578 5.347-5.441" variants={drawFlow} custom={[0.42, 0.45]} />
      <motion.path d="M16.573 14.737A4 4 0 0 1 14 11" variants={drawFlow} custom={[0.34, 0.25]} />
      <motion.path d="M7.14 10.907a4 4 0 1 1 2.756-7.43A4 4 0 0 1 16.7 4.48a2 2 0 0 1 2.82 2.82 4 4 0 0 1 1.002 6.805A4 4 0 1 1 13 16" variants={drawFlow} custom={[0, 0.6]} />
    </Icon>
  );
}

export const leafyGreenBody = '  <path d="M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22"/>\n  <path d="M2 22 17 7"/>';
export function LeafyGreen(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22" variants={drawFlow} custom={[0, 0.6]} />
      {/* the vein runs out to the tip */}
      <motion.path d="M2 22 17 7" variants={drawFlow} custom={[0.45, 0.35]} />
    </Icon>
  );
}

export const beanBody = '  <path d="M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z"/>\n  <path d="M5.341 10.62a4 4 0 1 0 5.279-5.28"/>';
export function Bean(p: IconProps) {
  return (
    <Icon {...p}>
      {/* a jumping bean: wiggles about its middle */}
      <motion.g variants={wobble} custom={-4} style={{ transformBox: "view-box", originX: "12px", originY: "12px" }}>
        <path d="M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z" />
        <path d="M5.341 10.62a4 4 0 1 0 5.279-5.28" />
      </motion.g>
    </Icon>
  );
}

export const nutBody = '  <path d="M12 4V2"/>\n  <path d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4"/>\n  <path d="M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z"/>';
export function Nut(p: IconProps) {
  return (
    <Icon {...p}>
      {/* dropped from the tree: falls a beat and lands with a bounce */}
      <motion.g variants={landFall} custom={[0, 0.85]}>
      <path d="M12 4V2" />
      <path d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4" />
      <path d="M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z" />
      </motion.g>
    </Icon>
  );
}

export const wheatBody = '  <path d="M2 22 16 8"/>\n  <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/>\n  <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/>\n  <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/>\n  <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/>\n  <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>\n  <path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>\n  <path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>';
export function Wheat(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the stalk draws up, then the grains sprout off it bottom to top */}
      <motion.path d="M2 22 16 8" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" variants={drawFlow} custom={[0.4, 0.25]} />
      <motion.path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" variants={drawFlow} custom={[0.5, 0.25]} />
      <motion.path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" variants={drawFlow} custom={[0.6, 0.25]} />
      <motion.path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" variants={drawFlow} custom={[0.7, 0.25]} />
      <motion.path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" variants={drawFlow} custom={[0.35, 0.25]} />
      <motion.path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" variants={drawFlow} custom={[0.45, 0.25]} />
      <motion.path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" variants={drawFlow} custom={[0.55, 0.25]} />
    </Icon>
  );
}

export const hopBody = '  <path d="M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18"/>\n  <path d="M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88"/>\n  <path d="M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36"/>\n  <path d="M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87"/>\n  <path d="M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08"/>\n  <path d="M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57"/>\n  <path d="M4.93 4.93 3 3a.7.7 0 0 1 0-1"/>\n  <path d="M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15"/>';
export function Hop(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the bracts open one after another from the stem */}
      <motion.path d="M4.93 4.93 3 3a.7.7 0 0 1 0-1" variants={drawRev} custom={[0, 0.2]} />
      <motion.path d="M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88" variants={drawFlow} custom={[0.1, 0.5]} />
      <motion.path d="M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57" variants={drawFlow} custom={[0.3, 0.3]} />
      <motion.path d="M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15" variants={drawFlow} custom={[0.38, 0.3]} />
      <motion.path d="M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08" variants={drawFlow} custom={[0.46, 0.28]} />
      <motion.path d="M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18" variants={drawFlow} custom={[0.54, 0.28]} />
      <motion.path d="M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36" variants={drawFlow} custom={[0.62, 0.28]} />
      <motion.path d="M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87" variants={drawFlow} custom={[0.7, 0.28]} />
    </Icon>
  );
}

export const veganBody = '  <path d="M16 8q6 0 6-6-6 0-6 6"/>\n  <path d="M17.41 3.59a10 10 0 1 0 3 3"/>\n  <path d="M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14"/>';
export function Vegan(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M16 8q6 0 6-6-6 0-6 6" variants={drawFlow} custom={[0.5, 0.3]} />
      <motion.path d="M17.41 3.59a10 10 0 1 0 3 3" variants={drawFlow} custom={[0, 0.6]} />
      <motion.path d="M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14" variants={drawFlow} custom={[0.25, 0.5]} />
    </Icon>
  );
}

export const torusBody = '  <ellipse cx="12" cy="11" rx="3" ry="2"/>\n  <ellipse cx="12" cy="12.5" rx="10" ry="8.5"/>';
export function Torus(p: IconProps) {
  return (
    <Icon {...p}>
      {/* a spun ring settling flat */}
      <motion.g variants={wobble} custom={-6} style={{ transformBox: "view-box", originX: "12px", originY: "12.5px" }}>
        <ellipse cx="12" cy="11" rx="3" ry="2" />
        <ellipse cx="12" cy="12.5" rx="10" ry="8.5" />
      </motion.g>
    </Icon>
  );
}

export const amphoraBody = '  <path d="M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8"/>\n  <path d="M10 5H8a2 2 0 0 0 0 4h.68"/>\n  <path d="M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8"/>\n  <path d="M14 5h2a2 2 0 0 1 0 4h-.68"/>\n  <path d="M18 22H6"/>\n  <path d="M9 2h6"/>';
export function Amphora(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the vessel draws down its body, handles loop on, base lands */}
      <motion.path d="M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8" variants={drawFlow} custom={[0.1, 0.45]} />
      <motion.path d="M10 5H8a2 2 0 0 0 0 4h.68" variants={drawFlow} custom={[0.42, 0.3]} />
      <motion.path d="M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8" variants={drawFlow} custom={[0.1, 0.45]} />
      <motion.path d="M14 5h2a2 2 0 0 1 0 4h-.68" variants={drawFlow} custom={[0.42, 0.3]} />
      <motion.path d="M18 22H6" variants={growMiddle} transition={gm(0.62, 0.3)} />
      <motion.path d="M9 2h6" variants={growMiddle} transition={gm(0, 0.25)} />
    </Icon>
  );
}

export const bottleWineBody = '  <path d="M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a6 6 0 0 0 1.2 3.6l.6.8A6 6 0 0 1 17 13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a6 6 0 0 1 1.2-3.6l.6-.8A6 6 0 0 0 10 5z"/>\n  <path d="M17 13h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4"/>';
export function BottleWine(p: IconProps) {
  return (
    <Icon {...p}>
      {/* a pour gesture: the bottle tips and rights itself */}
      <motion.g variants={tiltOnce} custom={-4} style={{ transformBox: "view-box", originX: "12px", originY: "22px" }}>
        <path d="M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a6 6 0 0 0 1.2 3.6l.6.8A6 6 0 0 1 17 13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a6 6 0 0 1 1.2-3.6l.6-.8A6 6 0 0 0 10 5z" />
        <path d="M17 13h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4" />
      </motion.g>
    </Icon>
  );
}

export const wineBody = '  <path d="M8 22h8"/>\n  <path d="M7 10h10"/>\n  <path d="M12 15v7"/>\n  <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>';
export function Wine(p: IconProps) {
  return (
    <Icon {...p}>
      {/* a gentle swirl from the stem */}
      <motion.g variants={tiltOnce} custom={-3.5} style={{ transformBox: "view-box", originX: "12px", originY: "22px" }}>
        <path d="M8 22h8" />
        <path d="M7 10h10" />
        <path d="M12 15v7" />
        <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
      </motion.g>
    </Icon>
  );
}

export const martiniBody = '  <path d="M12 12 4.207 4.207A.707.707 0 0 1 4.707 3h14.586a.707.707 0 0 1 .5 1.207z"/>\n  <path d="M12 12v10"/>\n  <path d="M7 22h10"/>';
export function Martini(p: IconProps) {
  return (
    <Icon {...p}>
      {/* cheers: the glass tips and rights itself */}
      <motion.g variants={tiltOnce} custom={-4} style={{ transformBox: "view-box", originX: "12px", originY: "22px" }}>
        <path d="M12 12 4.207 4.207A.707.707 0 0 1 4.707 3h14.586a.707.707 0 0 1 .5 1.207z" />
        <path d="M12 12v10" />
        <path d="M7 22h10" />
      </motion.g>
    </Icon>
  );
}

export const beerBody = '  <path d="M17 11h1a3 3 0 0 1 0 6h-1"/>\n  <path d="M9 12v6"/>\n  <path d="M13 12v6"/>\n  <path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"/>\n  <path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/>';
export function Beer(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the clink: the mug tips toward the toast and back */}
      <motion.g variants={tiltOnce} custom={-5} style={{ transformBox: "view-box", originX: "5px", originY: "22px" }}>
        <path d="M17 11h1a3 3 0 0 1 0 6h-1" />
        <path d="M9 12v6" />
        <path d="M13 12v6" />
        <path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z" />
        <path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
      </motion.g>
    </Icon>
  );
}

export const glassWaterBody = '  <path d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z"/>\n  <path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0"/>';
export function GlassWater(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z" />
      {/* the water sloshes side to side and stills */}
      <motion.path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0" variants={sloshOnce} custom={0.1} />
    </Icon>
  );
}

export const milkBody = '  <path d="M8 2h8"/>\n  <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/>\n  <path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0"/>';
export function Milk(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M8 2h8" />
      <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" />
      {/* set down fresh: the milk line bobs once */}
      <motion.path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" variants={bobOnce} custom={0.1} />
    </Icon>
  );
}

export const cupSodaBody = '  <path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"/>\n  <path d="M5 8h14"/>\n  <path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"/>\n  <path d="m12 8 1-6h2"/>';
export function CupSoda(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" />
      <path d="M5 8h14" />
      <path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
      {/* the cup holds still — the straw pops up and drops back */}
      <motion.path d="m12 8 1-6h2" variants={strawPop} />
    </Icon>
  );
}

export const coffeeBody = '  <path d="M10 2v2"/>\n  <path d="M14 2v2"/>\n  <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>\n  <path d="M6 2v2"/>';
export function Coffee(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the cup holds still — only the steam moves, rising and dissipating */}
      <motion.path d="M10 2v2" variants={steamRise} custom={[0.35, 0.85]} />
      <motion.path d="M14 2v2" variants={steamRise} custom={[0.7, 0.85]} />
      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
      <motion.path d="M6 2v2" variants={steamRise} custom={[0, 0.85]} />
    </Icon>
  );
}

export const soupBody = '  <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/>\n  <path d="M7 21h10"/>\n  <path d="M19.5 12 22 6"/>\n  <path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"/>\n  <path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"/>\n  <path d="M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62"/>';
export function Soup(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
      <path d="M7 21h10" />
      <path d="M19.5 12 22 6" />
      {/* the bowl holds still — steam curls rise off it, staggered */}
      <motion.path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62" variants={steamRise} custom={[0.6, 1.3]} />
      <motion.path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62" variants={steamRise} custom={[0.3, 1.3]} />
      <motion.path d="M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62" variants={steamRise} custom={[0, 1.3]} />
    </Icon>
  );
}

export const saladBody = '  <path d="M7 21h10"/>\n  <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/>\n  <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"/>\n  <path d="m13 12 4-4"/>\n  <path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2"/>';
export function Salad(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M7 21h10" variants={growMiddle} transition={gm(0.42, 0.3)} />
      <motion.path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" variants={drawFlow} custom={[0, 0.5]} />
      {/* the leaves pile in after the bowl */}
      <motion.path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1" variants={drawFlow} custom={[0.45, 0.45]} />
      <motion.path d="m13 12 4-4" variants={drawRev} custom={[0.72, 0.2]} />
      <motion.path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" variants={drawFlow} custom={[0.6, 0.3]} />
    </Icon>
  );
}

export const dessertBody = '  <path d="M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826"/>\n  <path d="M20.804 14.869a9 9 0 0 1-17.608 0"/>\n  <circle cx="12" cy="4" r="2"/>';
export function Dessert(p: IconProps) {
  return (
    <Icon {...p}>
      {/* cream swirls in, then the cherry pops on top */}
      <motion.path d="M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826" variants={drawFlow} custom={[0.15, 0.55]} />
      <motion.path d="M20.804 14.869a9 9 0 0 1-17.608 0" variants={drawFlow} custom={[0, 0.4]} />
      <motion.circle cx="12" cy="4" r="2" variants={popIn} custom={0.68} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const iceCreamConeBody = '  <path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11"/>\n  <path d="M17 7A5 5 0 0 0 7 7"/>\n  <path d="M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"/>';
export function IceCreamCone(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the scoop (then its band) drop onto the static cone */}
      <path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11" />
      <motion.path d="M17 7A5 5 0 0 0 7 7" variants={landFall} custom={[0.1, 0.85]} />
      <motion.path d="M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4" variants={landFall} custom={[0.28, 0.85]} />
    </Icon>
  );
}

export const iceCreamBowlBody = '  <path d="M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0"/>\n  <path d="M12.14 11a3.5 3.5 0 1 1 6.71 0"/>\n  <path d="M15.5 6.5a3.5 3.5 0 1 0-7 0"/>';
export function IceCreamBowl(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the bowl path is multi-subpath (can't dash) — it holds while the
          other two scoops pop in over it */}
      <path d="M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0" />
      <motion.path d="M12.14 11a3.5 3.5 0 1 1 6.71 0" variants={landFall} custom={[0.1, 1.1]} />
      <motion.path d="M15.5 6.5a3.5 3.5 0 1 0-7 0" variants={landFall} custom={[0.32, 1.1]} />
    </Icon>
  );
}

export const popsicleBody = '  <path d="M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z"/>\n  <path d="m22 22-5.5-5.5"/>';
export function Popsicle(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z" variants={drawFlow} custom={[0, 0.55]} />
      {/* the stick slides out of the bar */}
      <motion.path d="m22 22-5.5-5.5" variants={drawRev} custom={[0.5, 0.3]} />
    </Icon>
  );
}

export const lollipopBody = '  <circle cx="11" cy="11" r="8"/>\n  <path d="m21 21-4.3-4.3"/>\n  <path d="M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0"/>';
export function Lollipop(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the candy twirls a full turn on its static stick */}
      <motion.g variants={spinOnce} custom={1.1} style={{ transformBox: "view-box", originX: "11px", originY: "11px" }}>
        <circle cx="11" cy="11" r="8" />
        <path d="M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0" />
      </motion.g>
      <path d="m21 21-4.3-4.3" />
    </Icon>
  );
}

export const candyBody = '  <path d="M10 7v10.9"/>\n  <path d="M14 6.1V17"/>\n  <path d="M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4"/>\n  <path d="M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07"/>\n  <path d="M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4"/>';
export function Candy(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the wrapper shimmy: a quick side-to-side twist wiggle */}
      <motion.g variants={jiggle} custom={0}>
        <path d="M10 7v10.9" />
        <path d="M14 6.1V17" />
        <path d="M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4" />
        <path d="M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07" />
        <path d="M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4" />
      </motion.g>
    </Icon>
  );
}

export const candyCaneBody = '  <path d="m10.8 5 2.111 4.223"/>\n  <path d="M17.75 7 15 2.1"/>\n  <path d="m4.874 14.647 2.12 4.24"/>\n  <path d="M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2z"/>\n  <path d="m7.906 9.712 2.005 4.411"/>';
export function CandyCane(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the cane draws hook-to-foot, then the stripes strike in sequence */}
      <motion.path d="M17.75 7 15 2.1" variants={growMiddle} transition={gm(0.5, 0.25)} />
      <motion.path d="m10.8 5 2.111 4.223" variants={growMiddle} transition={gm(0.6, 0.25)} />
      <motion.path d="m7.906 9.712 2.005 4.411" variants={growMiddle} transition={gm(0.7, 0.25)} />
      <motion.path d="m4.874 14.647 2.12 4.24" variants={growMiddle} transition={gm(0.8, 0.25)} />
      <motion.path d="M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2z" variants={drawRev} custom={[0, 0.6]} />
    </Icon>
  );
}

export const cakeBody = '  <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>\n  <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/>\n  <path d="M2 21h20"/>\n  <path d="M7 8v3"/>\n  <path d="M12 8v3"/>\n  <path d="M17 8v3"/>\n  <path d="M7 4h.01"/>\n  <path d="M12 4h.01"/>\n  <path d="M17 4h.01"/>';
export function Cake(p: IconProps) {
  return (
    <Icon {...p}>
      {/* cake, frosting wave, candles rise, flames pop */}
      <motion.path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" variants={drawFlow} custom={[0.1, 0.45]} />
      <motion.path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" variants={drawFlow} custom={[0.42, 0.4]} />
      <motion.path d="M2 21h20" variants={growMiddle} transition={gm(0, 0.35)} />
      <motion.path d="M7 8v3" variants={drawRev} custom={[0.55, 0.2]} />
      <motion.path d="M12 8v3" variants={drawRev} custom={[0.62, 0.2]} />
      <motion.path d="M17 8v3" variants={drawRev} custom={[0.69, 0.2]} />
      <motion.path d="M7 4h.01" variants={flamePop} custom={0.8} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M12 4h.01" variants={flamePop} custom={0.87} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M17 4h.01" variants={flamePop} custom={0.94} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const cakeSliceBody = '  <path d="M16 13H3"/>\n  <path d="M16 17H3"/>\n  <path d="m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6"/>\n  <circle cx="9" cy="7" r="2"/>';
export function CakeSlice(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M16 13H3" variants={growMiddle} transition={gm(0.45, 0.3)} />
      <motion.path d="M16 17H3" variants={growMiddle} transition={gm(0.55, 0.3)} />
      <motion.path d="m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6" variants={drawFlow} custom={[0, 0.55]} />
      {/* the cherry pops on top */}
      <motion.circle cx="9" cy="7" r="2" variants={popIn} custom={0.68} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const cookieBody = '  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>\n  <path d="M8.5 8.5v.01"/>\n  <path d="M16 15.5v.01"/>\n  <path d="M12 12v.01"/>\n  <path d="M11 17v.01"/>\n  <path d="M7 14v.01"/>';
export function Cookie(p: IconProps) {
  const o = { transformBox: "fill-box", transformOrigin: "center" } as const;
  return (
    <Icon {...p}>
      {/* the cookie draws, then the chips pop in */}
      <motion.path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" variants={drawFlow} custom={[0, 0.55]} />
      <motion.path d="M8.5 8.5v.01" variants={popIn} custom={0.5} style={o} />
      <motion.path d="M16 15.5v.01" variants={popIn} custom={0.62} style={o} />
      <motion.path d="M12 12v.01" variants={popIn} custom={0.56} style={o} />
      <motion.path d="M11 17v.01" variants={popIn} custom={0.68} style={o} />
      <motion.path d="M7 14v.01" variants={popIn} custom={0.74} style={o} />
    </Icon>
  );
}

export const croissantBody = '  <path d="M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487"/>\n  <path d="M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132"/>\n  <path d="M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42"/>\n  <path d="M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14"/>\n  <path d="M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676"/>';
export function Croissant(p: IconProps) {
  return (
    <Icon {...p}>
      {/* from the center body out to both horns */}
      <motion.path d="M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487" variants={drawFlow} custom={[0.35, 0.3]} />
      <motion.path d="M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132" variants={drawFlow} custom={[0.35, 0.3]} />
      <motion.path d="M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42" variants={drawFlow} custom={[0.55, 0.3]} />
      <motion.path d="M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14" variants={drawFlow} custom={[0.55, 0.3]} />
      <motion.path d="M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676" variants={drawFlow} custom={[0, 0.55]} />
    </Icon>
  );
}

export const donutBody = '  <path d="M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3"/>\n  <circle cx="12" cy="12" r="3"/>';
export function Donut(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={spinOnce} custom={1} style={{ transformBox: "view-box", originX: "12px", originY: "12px" }}><path d="M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3" />
      {/* the hole inks last */}
      <circle cx="12" cy="12" r="3" /></motion.g>
    </Icon>
  );
}

export const pizzaBody = '  <path d="m12 14-1 1"/>\n  <path d="m13.75 18.25-1.25 1.42"/>\n  <path d="M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12"/>\n  <path d="M18.8 9.3a1 1 0 0 0 2.1 7.7"/>\n  <path d="M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z"/>';
export function Pizza(p: IconProps) {
  return (
    <Icon {...p}>
      {/* slice, crust line, then the toppings pop */}
      <motion.path d="m12 14-1 1" variants={popIn} custom={0.6} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="m13.75 18.25-1.25 1.42" variants={popIn} custom={0.68} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12" variants={drawFlow} custom={[0.4, 0.35]} />
      <motion.path d="M18.8 9.3a1 1 0 0 0 2.1 7.7" variants={popIn} custom={0.76} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z" variants={drawFlow} custom={[0, 0.5]} />
    </Icon>
  );
}

export const hamburgerBody = '  <path d="M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25"/>\n  <path d="M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2"/>\n  <path d="M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0"/>\n  <path d="m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2"/>';
export function Hamburger(p: IconProps) {
  return (
    <Icon {...p}>
      {/* stacked in eating order: bottom bun, filling, patty, top bun lands */}
      <motion.path d="M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25" variants={stackIn} custom={[-1.4, 0.25]} />
      <motion.path d="M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2" variants={stackIn} custom={[-1.4, 0.45]} />
      <motion.path d="M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" variants={stackIn} custom={[-1.4, 0.35]} />
    </Icon>
  );
}

export const sandwichBody = '  <path d="m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777"/>\n  <path d="M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25"/>\n  <path d="M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9"/>\n  <path d="m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2"/>\n  <rect width="20" height="4" x="2" y="11" rx="1"/>';
export function Sandwich(p: IconProps) {
  return (
    <Icon {...p}>
      {/* bread, filling, top slice lands */}
      <motion.path d="m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777" variants={stackIn} custom={[-1.4, 0.45]} />
      <motion.path d="M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25" variants={drawFlow} custom={[0.1, 0.3]} />
      <motion.path d="M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9" variants={drawFlow} custom={[0, 0.3]} />
      <motion.path d="m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" variants={stackIn} custom={[-1.2, 0.3]} />
      <motion.rect width="20" height="4" x="2" y="11" rx="1" variants={stackIn} custom={[-1.2, 0.2]} />
    </Icon>
  );
}

export const paperBagBody = '  <path d="M5.364 3.848C4 6 3 9.652 3 12.652V19a2 2 0 002 2h14a2 2 0 002-2v-5c0-2.334-1.816-4.668-2.622-7.002"/>\n  <path d="M7 3h11.379a2 2 0 011.789 1.106l.723 1.447A1 1 0 0119.997 7h-8.525a2 2 0 01-1.789-1.106L8.79 4.105a2 2 0 10-3.579 1.789l2.261 4.522A5 5 0 018 12.652V21"/>';
export function PaperBag(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M5.364 3.848C4 6 3 9.652 3 12.652V19a2 2 0 002 2h14a2 2 0 002-2v-5c0-2.334-1.816-4.668-2.622-7.002" variants={drawFlow} custom={[0, 0.5]} />
      {/* the folded top creases over */}
      <motion.path d="M7 3h11.379a2 2 0 011.789 1.106l.723 1.447A1 1 0 0119.997 7h-8.525a2 2 0 01-1.789-1.106L8.79 4.105a2 2 0 10-3.579 1.789l2.261 4.522A5 5 0 018 12.652V21" variants={drawFlow} custom={[0.35, 0.55]} />
    </Icon>
  );
}

export const popcornBody = '  <path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4"/>\n  <path d="M10 22 9 8"/>\n  <path d="m14 22 1-14"/>\n  <path d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z"/>';
export function Popcorn(p: IconProps) {
  return (
    <Icon {...p}>
      {/* pop-pop: the kernel cluster jumps over the static tub */}
      <motion.path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4" variants={popJump} custom={0.1} />
      <path d="M10 22 9 8" />
      <path d="m14 22 1-14" />
      <path d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z" />
    </Icon>
  );
}

export const drumstickBody = '  <path d="M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23"/>\n  <path d="m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59"/>';
export function Drumstick(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23" variants={drawFlow} custom={[0, 0.5]} />
      {/* the bone slides out of the meat */}
      <motion.path d="m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59" variants={drawFlow} custom={[0.4, 0.45]} />
    </Icon>
  );
}

export const beefBody = '  <path d="M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3"/>\n  <path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1-2.29 7.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"/>\n  <circle cx="12.5" cy="8.5" r="2.5"/>';
export function Beef(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1-2.29 7.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5" variants={drawFlow} custom={[0.2, 0.45]} />
      {/* the marbling pops in the middle */}
      <motion.circle cx="12.5" cy="8.5" r="2.5" variants={popIn} custom={0.6} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const hamBody = '  <path d="M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856"/>\n  <path d="M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288"/>\n  <path d="M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025"/>\n  <path d="m8.5 16.5-1-1"/>';
export function Ham(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288" variants={drawFlow} custom={[0.25, 0.45]} />
      {/* the bone hook loops on, then the score mark strikes */}
      <motion.path d="M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025" variants={drawFlow} custom={[0.45, 0.4]} />
      <motion.path d="m8.5 16.5-1-1" variants={growMiddle} transition={gm(0.7, 0.25)} />
    </Icon>
  );
}

export const eggFriedBody = '  <circle cx="11.5" cy="12.5" r="3.5"/>\n  <path d="M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z"/>';
export function EggFried(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the white holds still — only the yolk jiggles */}
      <motion.circle cx="11.5" cy="12.5" r="3.5" variants={jiggle} custom={0.2} />
      <path d="M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z" />
    </Icon>
  );
}

export const chefHatBody = '  <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/>\n  <path d="M6 17h12"/>';
export function ChefHat(p: IconProps) {
  return (
    <Icon {...p}>
      {/* a proud little hop */}
      <motion.g variants={popJump} custom={0}>
        <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
        <path d="M6 17h12" />
      </motion.g>
    </Icon>
  );
}

export const handPlatterBody = '  <path d="M12 3V2"/>\n  <path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5"/>\n  <path d="M2 14h12a2 2 0 0 1 0 4h-2"/>\n  <path d="M4 10h16"/>\n  <path d="M5 10a7 7 0 0 1 14 0"/>\n  <path d="M5 14v6a1 1 0 0 1-1 1H2"/>';
export function HandPlatter(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 3V2" variants={drawRev} custom={[0, 0.2]} />
      {/* dome and tray first, then the hand reaches in below */}
      <motion.path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5" variants={drawFlow} custom={[0.5, 0.45]} />
      <motion.path d="M2 14h12a2 2 0 0 1 0 4h-2" variants={drawFlow} custom={[0.4, 0.35]} />
      <motion.path d="M4 10h16" variants={growMiddle} transition={gm(0.3, 0.3)} />
      <motion.path d="M5 10a7 7 0 0 1 14 0" variants={drawFlow} custom={[0.08, 0.4]} />
      <motion.path d="M5 14v6a1 1 0 0 1-1 1H2" variants={drawFlow} custom={[0.45, 0.3]} />
    </Icon>
  );
}

export const tractorBody = '  <path d="m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20"/>\n  <path d="M16 18h-5"/>\n  <path d="M18 5a1 1 0 0 0-1 1v5.573"/>\n  <path d="M3 4h8.129a1 1 0 0 1 .99.863L13 11.246"/>\n  <path d="M4 11V4"/>\n  <path d="M7 15h.01"/>\n  <path d="M8 10.1V4"/>\n  <circle cx="18" cy="18" r="2"/>\n  <circle cx="7" cy="15" r="5"/>';
export function Tractor(p: IconProps) {
  return (
    <Icon {...p}>
      {/* it DRIVES: the whole tractor trundles forward with two road bumps
          (wheel rotation is invisible on spoke-less circles — motion carries it) */}
      <motion.g variants={driveSurge}>
        <path d="m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20" />
        <path d="M16 18h-5" />
        <path d="M18 5a1 1 0 0 0-1 1v5.573" />
        <path d="M3 4h8.129a1 1 0 0 1 .99.863L13 11.246" />
        <path d="M4 11V4" />
        <path d="M8 10.1V4" />
        <circle cx="18" cy="18" r="2" />
        <circle cx="7" cy="15" r="5" />
        <path d="M7 15h.01" />
      </motion.g>
    </Icon>
  );
}

// ---- -off icons: fragments beat in fast, the slash strikes LAST -----------

export const beanOffBody = '  <path d="M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1"/>\n  <path d="M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66"/>\n  <path d="M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04"/>\n  <line x1="2" x2="22" y1="2" y2="22"/>';
export function BeanOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66" variants={drawFlow} custom={[0.12, 0.35]} />
      {/* multi-subpath: can't dash — it swells into place instead */}
      <motion.path d="M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04" variants={popIn} custom={0.28} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.line x1="2" x2="22" y1="2" y2="22" variants={growMiddle} transition={gm(0.5, 0.4)} />
    </Icon>
  );
}

export const beefOffBody = '  <path d="M11.771 6.109a2.5 2.5 0 0 1 3.12 3.12"/>\n  <path d="M17.852 12.185a6.5 6.5 0 0 0-9.035-9.04"/>\n  <path d="M18.013 18.013C15.029 20.349 10.831 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"/>\n  <path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1-.139 4.393"/>\n  <path d="m2 2 20 20"/>\n  <path d="M6.355 6.37a7 7 0 0 0-.075.23c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c3.356 0 6.993-1.267 9.85-3.151"/>';
export function BeefOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11.771 6.109a2.5 2.5 0 0 1 3.12 3.12" variants={drawFlow} custom={[0.28, 0.25]} />
      <motion.path d="M17.852 12.185a6.5 6.5 0 0 0-9.035-9.04" variants={drawFlow} custom={[0.12, 0.35]} />
      <motion.path d="M18.013 18.013C15.029 20.349 10.831 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5" variants={drawFlow} custom={[0.2, 0.35]} />
      <motion.path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1-.139 4.393" variants={drawFlow} custom={[0.32, 0.3]} />
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.55, 0.4)} />
      <motion.path d="M6.355 6.37a7 7 0 0 0-.075.23c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c3.356 0 6.993-1.267 9.85-3.151" variants={drawFlow} custom={[0, 0.4]} />
    </Icon>
  );
}

export const beerOffBody = '  <path d="M13 13v5"/>\n  <path d="M17 11.47V8"/>\n  <path d="M17 11h1a3 3 0 0 1 2.745 4.211"/>\n  <path d="m2 2 20 20"/>\n  <path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3"/>\n  <path d="M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268"/>\n  <path d="M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12"/>\n  <path d="M9 14.6V18"/>';
export function BeerOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M13 13v5" variants={drawFlow} custom={[0.3, 0.25]} />
      <motion.path d="M17 11.47V8" variants={drawRev} custom={[0.24, 0.25]} />
      <motion.path d="M17 11h1a3 3 0 0 1 2.745 4.211" variants={drawFlow} custom={[0.18, 0.3]} />
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.55, 0.4)} />
      <motion.path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268" variants={drawFlow} custom={[0.12, 0.3]} />
      <motion.path d="M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12" variants={drawFlow} custom={[0.06, 0.4]} />
      <motion.path d="M9 14.6V18" variants={drawFlow} custom={[0.36, 0.25]} />
    </Icon>
  );
}

export const candyOffBody = '  <path d="M10 10v7.9"/>\n  <path d="M11.802 6.145a5 5 0 0 1 6.053 6.053"/>\n  <path d="M14 6.1v2.243"/>\n  <path d="m15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965"/>\n  <path d="M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4"/>\n  <path d="m2 2 20 20"/>\n  <path d="M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4"/>';
export function CandyOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 10v7.9" variants={drawFlow} custom={[0.3, 0.25]} />
      <motion.path d="M11.802 6.145a5 5 0 0 1 6.053 6.053" variants={drawFlow} custom={[0.12, 0.3]} />
      <motion.path d="M14 6.1v2.243" variants={drawFlow} custom={[0.36, 0.2]} />
      <motion.path d="m15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4" variants={drawFlow} custom={[0.2, 0.35]} />
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.55, 0.4)} />
      <motion.path d="M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4" variants={drawFlow} custom={[0.26, 0.35]} />
    </Icon>
  );
}

export const dnaOffBody = '  <path d="M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8"/>\n  <path d="m17 6-2.891-2.891"/>\n  <path d="M2 15c3.333-3 6.667-3 10-3"/>\n  <path d="m2 2 20 20"/>\n  <path d="m20 9 .891.891"/>\n  <path d="M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1"/>\n  <path d="M3.109 14.109 4 15"/>\n  <path d="m6.5 12.5 1 1"/>\n  <path d="m7 18 2.891 2.891"/>\n  <path d="M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16"/>';
export function DnaOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8" variants={drawFlow} custom={[0, 0.3]} />
      <motion.path d="m17 6-2.891-2.891" variants={drawFlow} custom={[0.1, 0.2]} />
      <motion.path d="M2 15c3.333-3 6.667-3 10-3" variants={drawFlow} custom={[0.2, 0.3]} />
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.6, 0.4)} />
      <motion.path d="m20 9 .891.891" variants={drawFlow} custom={[0.3, 0.15]} />
      <motion.path d="M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1" variants={drawFlow} custom={[0.15, 0.3]} />
      <motion.path d="M3.109 14.109 4 15" variants={drawFlow} custom={[0.35, 0.15]} />
      <motion.path d="m6.5 12.5 1 1" variants={drawFlow} custom={[0.4, 0.15]} />
      <motion.path d="m7 18 2.891 2.891" variants={drawFlow} custom={[0.3, 0.2]} />
      <motion.path d="M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16" variants={drawFlow} custom={[0.25, 0.3]} />
    </Icon>
  );
}

export const eggOffBody = '  <path d="m2 2 20 20"/>\n  <path d="M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19"/>\n  <path d="M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568"/>';
export function EggOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.45, 0.4)} />
      <motion.path d="M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19" variants={drawRev} custom={[0.12, 0.35]} />
      <motion.path d="M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568" variants={drawFlow} custom={[0, 0.4]} />
    </Icon>
  );
}

export const hopOffBody = '  <path d="M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27"/>\n  <path d="M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28"/>\n  <path d="M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26"/>\n  <path d="M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25"/>\n  <path d="M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75"/>\n  <path d="M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24"/>\n  <path d="M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28"/>\n  <path d="M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05"/>\n  <path d="m2 2 20 20"/>';
export function HopOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27" variants={drawFlow} custom={[0.28, 0.28]} />
      <motion.path d="M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28" variants={drawFlow} custom={[0.36, 0.28]} />
      <motion.path d="M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26" variants={drawFlow} custom={[0.44, 0.25]} />
      <motion.path d="M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25" variants={drawFlow} custom={[0.16, 0.3]} />
      <motion.path d="M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75" variants={drawFlow} custom={[0.24, 0.25]} />
      <motion.path d="M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24" variants={drawFlow} custom={[0, 0.45]} />
      <motion.path d="M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28" variants={drawFlow} custom={[0.2, 0.3]} />
      <motion.path d="M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05" variants={drawFlow} custom={[0.08, 0.3]} />
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.6, 0.4)} />
    </Icon>
  );
}

export const milkOffBody = '  <path d="M8 2h8"/>\n  <path d="M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3"/>\n  <path d="M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435"/>\n  <line x1="2" x2="22" y1="2" y2="22"/>';
export function MilkOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M8 2h8" variants={growMiddle} transition={gm(0, 0.25)} />
      {/* multi-subpath carton body: swells in rather than dashing */}
      <motion.path d="M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3" variants={swellIn} custom={0.12} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435" variants={drawFlow} custom={[0.32, 0.3]} />
      <motion.line x1="2" x2="22" y1="2" y2="22" variants={growMiddle} transition={gm(0.55, 0.4)} />
    </Icon>
  );
}

export const nutOffBody = '  <path d="M12 4V2"/>\n  <path d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939"/>\n  <path d="M19 10v3.343"/>\n  <path d="M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192"/>\n  <line x1="2" x2="22" y1="2" y2="22"/>';
export function NutOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 4V2" variants={drawRev} custom={[0.3, 0.2]} />
      <motion.path d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939" variants={drawFlow} custom={[0, 0.45]} />
      <motion.path d="M19 10v3.343" variants={drawFlow} custom={[0.24, 0.2]} />
      {/* multi-subpath cap: swells in */}
      <motion.path d="M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192" variants={swellIn} custom={0.14} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.line x1="2" x2="22" y1="2" y2="22" variants={growMiddle} transition={gm(0.55, 0.4)} />
    </Icon>
  );
}

export const wheatOffBody = '  <path d="m2 22 10-10"/>\n  <path d="m16 8-1.17 1.17"/>\n  <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/>\n  <path d="m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97"/>\n  <path d="M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62"/>\n  <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/>\n  <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>\n  <path d="m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98"/>\n  <path d="M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28"/>\n  <line x1="2" x2="22" y1="2" y2="22"/>';
export function WheatOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="m2 22 10-10" variants={drawFlow} custom={[0, 0.3]} />
      <motion.path d="m16 8-1.17 1.17" variants={drawFlow} custom={[0.1, 0.2]} />
      <motion.path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" variants={drawFlow} custom={[0.24, 0.25]} />
      <motion.path d="m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97" variants={drawFlow} custom={[0.32, 0.25]} />
      <motion.path d="M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62" variants={drawFlow} custom={[0.4, 0.25]} />
      <motion.path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" variants={drawFlow} custom={[0.48, 0.25]} />
      <motion.path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" variants={drawFlow} custom={[0.2, 0.25]} />
      <motion.path d="m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98" variants={drawFlow} custom={[0.28, 0.25]} />
      <motion.path d="M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28" variants={drawFlow} custom={[0.36, 0.25]} />
      <motion.line x1="2" x2="22" y1="2" y2="22" variants={growMiddle} transition={gm(0.62, 0.4)} />
    </Icon>
  );
}

export const wineOffBody = '  <path d="M8 22h8"/>\n  <path d="M7 10h3m7 0h-1.343"/>\n  <path d="M12 15v7"/>\n  <path d="M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198"/>\n  <line x1="2" x2="22" y1="2" y2="22"/>';
export function WineOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M8 22h8" variants={growMiddle} transition={gm(0.4, 0.3)} />
      {/* both of these are multi-subpath: they swell in instead of dashing */}
      <motion.path d="M7 10h3m7 0h-1.343" variants={popIn} custom={0.3} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M12 15v7" variants={drawFlow} custom={[0.32, 0.25]} />
      <motion.path d="M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198" variants={popIn} custom={0.05} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.line x1="2" x2="22" y1="2" y2="22" variants={growMiddle} transition={gm(0.55, 0.4)} />
    </Icon>
  );
}
