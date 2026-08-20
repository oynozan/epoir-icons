"use client";

import { motion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { Icon } from "../icon.js";
import { drawFlow, drawRev, growMiddle } from "../variants.js";
import { entranceSharp } from "../ease.js";
import type { IconProps } from "../types.js";

// Sports & sustainability language: awards CELEBRATE (the disc/star lands with
// a pop, ribbons draw after); plants GROW upward (soil, then stem, then leaves
// unfurl); wind and water FLOW on closed infinite cycles; containers stay
// static. Scale pulses near an edge stay ≤1.18 (a 1.35 pulse flat-cuts).
const E = "easeInOut";

function gm(delay = 0, duration = 0.5): Transition {
  return { duration, delay, ease: entranceSharp, opacity: { duration: 0.08, delay } };
}
// grow-only pulse. custom=delay
const pulse: Variants = {
  normal: { scale: 1 },
  animate: (d: number = 0) => ({ scale: [1, 1.3, 1], transition: { duration: 0.35, delay: d, ease: E } }),
};
// a swell into place with NO overshoot — for pieces whose paint already
// reaches an edge (flower-2's petal ring paints to y1). custom=delay
const swellIn: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: (d: number = 0) => ({
    scale: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.32, delay: d, ease: entranceSharp },
  }),
};
// a piece landing into place. custom=delay
const popIn: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: (d: number = 0) => ({
    scale: [0, 1.2, 1],
    opacity: [0, 1, 1],
    transition: { duration: 0.3, delay: d, ease: entranceSharp },
  }),
};
// a triumphant lift that settles back. custom=delay. Capped at 0.8: the
// trophy's cup paints to y1, so a full unit clipped it at the top edge.
const liftUp: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({
    y: [0, -0.8, 0, -0.25, 0],
    transition: { duration: 0.7, delay: d, ease: E, times: [0, 0.3, 0.6, 0.8, 1] },
  }),
};
// the throw: toss up, one full spin in the air, drop and settle
const ballToss: Variants = {
  normal: { y: 0, rotate: 0 },
  // hang time: the apex holds across several frames so the toss reads —
  // lift is capped at 0.9 (the ball already fills the box to 1 unit)
  animate: {
    y: [0, -0.9, -0.9, 0, -0.25, 0],
    rotate: [0, 360],
    transition: {
      y: { duration: 1.1, ease: E, times: [0, 0.28, 0.5, 0.72, 0.86, 1] },
      rotate: { duration: 1.1, ease: E },
    },
    transitionEnd: { rotate: 0 },
  },
};
// the step: starts toe-up at 45° (slightly back) and stomps down flat.
// Scale rides 0.82→1 so the tilted pose stays inside the box (a 45°-rotated
// full-frame glyph otherwise pokes out on the axes).
const stepDown: Variants = {
  normal: { rotate: 0, scale: 1 },
  animate: {
    rotate: [45, 45, 10, 0, 0],
    scale: [0.8, 0.8, 0.85, 1, 1],
    transition: { duration: 0.9, ease: E, times: [0, 0.3, 0.7, 0.9, 1] },
  },
};
// swings from a mount and settles. custom=[deg]
const swingFrom: Variants = {
  normal: { rotate: 0 },
  animate: (deg: number = -3) => ({
    rotate: [0, deg, deg * -0.65, deg * 0.3, 0],
    transition: { duration: 1.1, ease: E },
  }),
};
// a float bobbing on the water. custom=delay
const bob: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({ y: [0, -0.8, 0], transition: { duration: 0.6, delay: d, ease: E } }),
};
// continuous flow: a gust/current streams along and closes its cycle.
// custom=[dx, dy, delay]
// full sine both directions; adjacent lines take OPPOSITE-sign amplitudes so
// neighbors visibly move against each other (time-offset same-sign pulses
// read as nothing). custom=[dx, dy, delay]
const flowLoop: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[] = []) => ({
    x: [0, c[0] ?? 0, 0, -(c[0] ?? 0), 0],
    y: [0, c[1] ?? 0, 0, -(c[1] ?? 0), 0],
    transition: { duration: 1.6, delay: c[2] ?? 0, repeat: Infinity, ease: E },
  }),
};
// an arrow travelling through the flow and returning. custom=[dy, delay]
const arrowRide: Variants = {
  normal: { y: 0 },
  animate: (c: number[] = []) => ({
    y: [0, c[0] ?? 0, 0],
    transition: { duration: 1.2, delay: c[1] ?? 0, ease: E },
  }),
};

// ---- Sports ---------------------------------------------------------------

export const awardBody = '  <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>\n  <circle cx="12" cy="8" r="6"/>';
export function Award(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the ribbons flutter: the whole award swings about the disc */}
      <motion.g variants={swingFrom} custom={-4} style={{ transformBox: "view-box", originX: "12px", originY: "8px" }}>
        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
        <circle cx="12" cy="8" r="6" />
      </motion.g>
    </Icon>
  );
}

export const medalBody = '  <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/>\n  <path d="M11 12 5.12 2.2"/>\n  <path d="m13 12 5.88-9.8"/>\n  <path d="M8 7h8"/>\n  <circle cx="12" cy="17" r="5"/>\n  <path d="M12 18v-2h-.5"/>';
export function Medal(p: IconProps) {
  return (
    <Icon {...p}>
      {/* swings on its ribbon from the apex and settles hanging */}
      <motion.g variants={swingFrom} custom={-3} style={{ transformBox: "view-box", originX: "12px", originY: "2px" }}>
        <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
        <path d="M11 12 5.12 2.2" />
        <path d="m13 12 5.88-9.8" />
        <path d="M8 7h8" />
        <circle cx="12" cy="17" r="5" />
        <path d="M12 18v-2h-.5" />
      </motion.g>
    </Icon>
  );
}

export const trophyBody = '  <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/>\n  <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/>\n  <path d="M18 9h1.5a1 1 0 0 0 0-5H18"/>\n  <path d="M4 22h16"/>\n  <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/>\n  <path d="M6 9H4.5a1 1 0 0 1 0-5H6"/>';
export function Trophy(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the whole trophy lifts in triumph once it is assembled */}
      <motion.g variants={liftUp} custom={0.6}>
        <motion.path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" variants={drawFlow} custom={[0.35, 0.3]} />
        <motion.path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" variants={drawFlow} custom={[0.35, 0.3]} />
        <motion.path d="M18 9h1.5a1 1 0 0 0 0-5H18" variants={drawFlow} custom={[0.22, 0.3]} />
        <motion.path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" variants={drawFlow} custom={[0, 0.5]} />
        <motion.path d="M6 9H4.5a1 1 0 0 1 0-5H6" variants={drawRev} custom={[0.22, 0.3]} />
      </motion.g>
      <motion.path d="M4 22h16" variants={growMiddle} transition={gm(0.5, 0.3)} />
    </Icon>
  );
}

export const podiumBody = '  <path d="M12 6V2h-1"/>\n  <path d="M9 15a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1"/>\n  <path d="M9 21V11a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10"/>';
export function Podium(p: IconProps) {
  return (
    <Icon {...p}>
      {/* winner's plinth rises first, steps follow, flag pops on top */}
      <motion.path d="M12 6V2h-1" variants={drawRev} custom={[0.55, 0.3]} />
      <motion.path d="M9 15a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1" variants={drawFlow} custom={[0.25, 0.45]} />
      <motion.path d="M9 21V11a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10" variants={drawRev} custom={[0, 0.4]} />
    </Icon>
  );
}

export const circleStarBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/>';
export function CircleStar(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      {/* the star inks itself round, then pops */}
      <motion.path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" variants={drawFlow} custom={[0, 0.6]} />
    </Icon>
  );
}

export const squareStarBody = '  <path d="M11.035 7.69a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/>\n  <rect x="3" y="3" width="18" height="18" rx="2"/>';
export function SquareStar(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11.035 7.69a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" variants={drawFlow} custom={[0, 0.6]} />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </Icon>
  );
}

export const volleyballBody = '  <path d="M11 7a16 16 20 0 1 10.98 4.362"/>\n  <path d="M12 12a13 13 0 0 1-8.66 5"/>\n  <path d="M16.83 13.634a16 16 0 0 1-9.267 7.328"/>\n  <path d="M20.66 17A13 13 0 0 0 12 12a13 13 0 0 1 0-10"/>\n  <path d="M8.17 15.366a16 16 0 0 1-1.713-11.69"/>\n  <circle cx="12" cy="12" r="10"/>';
export function Volleyball(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the throw: tossed up, one full spin in the air, drops and settles */}
      <motion.g variants={ballToss} style={{ transformBox: "view-box", originX: "12px", originY: "12px" }}>
        <path d="M11 7a16 16 20 0 1 10.98 4.362" />
        <path d="M12 12a13 13 0 0 1-8.66 5" />
        <path d="M16.83 13.634a16 16 0 0 1-9.267 7.328" />
        <path d="M20.66 17A13 13 0 0 0 12 12a13 13 0 0 1 0-10" />
        <path d="M8.17 15.366a16 16 0 0 1-1.713-11.69" />
        <circle cx="12" cy="12" r="10" />
      </motion.g>
    </Icon>
  );
}

export const sportShoeBody = '  <path d="m15 10.42 4.8-5.07"/>\n  <path d="M19 18h3"/>\n  <path d="M9.5 22 21.414 9.415A2 2 0 0 0 21.2 6.4l-5.61-4.208A1 1 0 0 0 14 3v2a2 2 0 0 1-1.394 1.906L8.677 8.053A1 1 0 0 0 8 9c-.155 6.393-2.082 9-4 9a2 2 0 0 0 0 4h14"/>';
export function SportShoe(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the step: starts toe-up at 45° and stomps down flat */}
      <motion.g variants={stepDown} style={{ transformBox: "view-box", originX: "12px", originY: "12px" }}>
        <path d="m15 10.42 4.8-5.07" />
        <path d="M19 18h3" />
        <path d="M9.5 22 21.414 9.415A2 2 0 0 0 21.2 6.4l-5.61-4.208A1 1 0 0 0 14 3v2a2 2 0 0 1-1.394 1.906L8.677 8.053A1 1 0 0 0 8 9c-.155 6.393-2.082 9-4 9a2 2 0 0 0 0 4h14" />
      </motion.g>
    </Icon>
  );
}

export const fishingRodBody = '  <path d="M4 11h1"/>\n  <path d="M8 15a2 2 0 0 1-4 0V3a1 1 0 0 1 1-1h.5C14 2 20 9 20 18v4"/>\n  <circle cx="18" cy="18" r="2"/>';
export function FishingRod(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M4 11h1" variants={growMiddle} transition={gm(0.45, 0.2)} />
      {/* the rod draws grip-to-tip, then the float bobs at the end */}
      <motion.path d="M8 15a2 2 0 0 1-4 0V3a1 1 0 0 1 1-1h.5C14 2 20 9 20 18v4" variants={drawFlow} custom={[0, 0.6]} />
      <motion.circle cx="18" cy="18" r="2" variants={bob} custom={0.65} />
    </Icon>
  );
}

export const fishingHookBody = '  <path d="m17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10"/>\n  <path d="M20.414 8.586 22 7"/>\n  <circle cx="19" cy="10" r="2"/>';
export function FishingHook(p: IconProps) {
  return (
    <Icon {...p}>
      {/* swings on its line like a pendulum from the eye */}
      <motion.g variants={swingFrom} custom={-6} style={{ transformBox: "view-box", originX: "19px", originY: "10px" }}>
        <path d="m17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10" />
        <circle cx="19" cy="10" r="2" />
      </motion.g>
      <path d="M20.414 8.586 22 7" />
    </Icon>
  );
}

// ---- Sustainability -------------------------------------------------------

export const sproutBody = '  <path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/>\n  <path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/>\n  <path d="M5 21h14"/>';
export function Sprout(p: IconProps) {
  return (
    <Icon {...p}>
      {/* soil, then the shoot rises, then the leaves unfurl */}
      <motion.path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3" variants={drawRev} custom={[0.15, 0.6]} />
      <motion.path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" variants={drawFlow} custom={[0.5, 0.4]} />
      <motion.path d="M5 21h14" variants={growMiddle} transition={gm(0, 0.3)} />
    </Icon>
  );
}

export const leafBody = '  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>\n  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>';
export function Leaf(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" variants={drawFlow} custom={[0, 0.55]} />
      {/* the vein runs out to the tip */}
      <motion.path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" variants={drawRev} custom={[0.45, 0.4]} />
    </Icon>
  );
}

export const flowerBody = '  <circle cx="12" cy="12" r="3"/>\n  <path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"/>\n  <path d="M12 7.5V9"/>\n  <path d="M7.5 12H9"/>\n  <path d="M16.5 12H15"/>\n  <path d="M12 16.5V15"/>\n  <path d="m8 8 1.88 1.88"/>\n  <path d="M14.12 9.88 16 8"/>\n  <path d="m8 16 1.88-1.88"/>\n  <path d="M14.12 14.12 16 16"/>';
export function Flower(p: IconProps) {
  return (
    <Icon {...p}>
      {/* petals unfurl, spokes strike outward, then the core pulses */}
      <motion.circle cx="12" cy="12" r="3" variants={pulse} custom={0.75} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" variants={drawFlow} custom={[0, 0.65]} />
      <motion.path d="M12 7.5V9" variants={drawRev} custom={[0.5, 0.2]} />
      <motion.path d="M7.5 12H9" variants={drawRev} custom={[0.56, 0.2]} />
      <motion.path d="M16.5 12H15" variants={drawRev} custom={[0.56, 0.2]} />
      <motion.path d="M12 16.5V15" variants={drawRev} custom={[0.5, 0.2]} />
      <motion.path d="m8 8 1.88 1.88" variants={drawRev} custom={[0.62, 0.2]} />
      <motion.path d="M14.12 9.88 16 8" variants={drawFlow} custom={[0.62, 0.2]} />
      <motion.path d="m8 16 1.88-1.88" variants={drawRev} custom={[0.68, 0.2]} />
      <motion.path d="M14.12 14.12 16 16" variants={drawFlow} custom={[0.68, 0.2]} />
    </Icon>
  );
}

export const flower2Body = '  <path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/>\n  <circle cx="12" cy="8" r="2"/>\n  <path d="M12 10v12"/>\n  <path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/>\n  <path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>';
export function Flower2(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the petal ring is multi-subpath (cannot dash) — it swells open */}
      <motion.path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1" variants={swellIn} custom={0.35} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.circle cx="12" cy="8" r="2" variants={pulse} custom={0.7} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M12 10v12" variants={drawRev} custom={[0, 0.4]} />
      <motion.path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" variants={drawFlow} custom={[0.5, 0.35]} />
      <motion.path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" variants={drawFlow} custom={[0.58, 0.35]} />
    </Icon>
  );
}

export const treeDeciduousBody = '  <path d="M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z"/>\n  <path d="M12 19v3"/>';
export function TreeDeciduous(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z" variants={drawFlow} custom={[0, 0.6]} />
      {/* the trunk drops into the ground */}
      <motion.path d="M12 19v3" variants={drawFlow} custom={[0.55, 0.25]} />
    </Icon>
  );
}

export const treePineBody = '  <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"/>\n  <path d="M12 22v-3"/>';
export function TreePine(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" variants={drawFlow} custom={[0, 0.65]} />
      <motion.path d="M12 22v-3" variants={drawRev} custom={[0.6, 0.25]} />
    </Icon>
  );
}

export const treePalmBody = '  <path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4"/>\n  <path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3"/>\n  <path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"/>\n  <path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"/>';
export function TreePalm(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the trunk curves up, then the fronds unfurl one after another */}
      <motion.path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4" variants={drawRev} custom={[0.4, 0.35]} />
      <motion.path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3" variants={drawFlow} custom={[0.5, 0.35]} />
      <motion.path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35" variants={drawFlow} custom={[0.6, 0.4]} />
      <motion.path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14" variants={drawRev} custom={[0, 0.5]} />
    </Icon>
  );
}

export const treesBody = '  <path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/>\n  <path d="M7 16v6"/>\n  <path d="M13 19v3"/>\n  <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>';
export function Trees(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M7 16v6" variants={drawFlow} custom={[0.4, 0.25]} />
      <motion.path d="M13 19v3" variants={drawFlow} custom={[0.7, 0.25]} />
      {/* the far tree's tiers draw behind it */}
      <motion.path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" variants={drawFlow} custom={[0.35, 0.55]} />
    </Icon>
  );
}

export const recycleBody = '  <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>\n  <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>\n  <path d="m14 16-3 3 3 3"/>\n  <path d="M8.293 13.596 7.196 9.5 3.1 10.598"/>\n  <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/>\n  <path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>';
export function Recycle(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the three arrows chase the loop: limb then arrowhead, in turn */}
      <motion.path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="m13.378 9.633 4.096 1.098 1.097-4.096" variants={drawFlow} custom={[0.32, 0.25]} />
      <motion.path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" variants={drawRev} custom={[0.45, 0.4]} />
      <motion.path d="m14 16-3 3 3 3" variants={drawFlow} custom={[0.75, 0.25]} />
      <motion.path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" variants={drawRev} custom={[0.88, 0.4]} />
      <motion.path d="M8.293 13.596 7.196 9.5 3.1 10.598" variants={drawFlow} custom={[1.15, 0.25]} />
    </Icon>
  );
}

export const tentBody = '  <path d="M3.5 21 14 3"/>\n  <path d="M20.5 21 10 3"/>\n  <path d="M15.5 21 12 15l-3.5 6"/>\n  <path d="M2 21h20"/>';
export function Tent(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the poles draw down to the ground, door notch follows, ground last */}
      <motion.path d="M3.5 21 14 3" variants={drawRev} custom={[0, 0.4]} />
      <motion.path d="M20.5 21 10 3" variants={drawRev} custom={[0.12, 0.4]} />
      <motion.path d="M15.5 21 12 15l-3.5 6" variants={drawRev} custom={[0.4, 0.35]} />
      <motion.path d="M2 21h20" variants={growMiddle} transition={gm(0.6, 0.3)} />
    </Icon>
  );
}

export const windBody = '  <path d="M12.8 19.6A2 2 0 1 0 14 16H2"/>\n  <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/>\n  <path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>';
export function Wind(p: IconProps) {
  return (
    <Icon {...p}>
      {/* continuous: neighboring gusts stream against each other */}
      <motion.path d="M12.8 19.6A2 2 0 1 0 14 16H2" variants={flowLoop} custom={[0.7, 0, 0]} />
      <motion.path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" variants={flowLoop} custom={[-0.7, 0, 0]} />
      <motion.path d="M9.8 4.4A2 2 0 1 1 11 8H2" variants={flowLoop} custom={[0.7, 0, 0.2]} />
    </Icon>
  );
}

export const windArrowDownBody = '  <path d="M10 2v8"/>\n  <path d="M12.8 21.6A2 2 0 1 0 14 18H2"/>\n  <path d="M17.5 10a2.5 2.5 0 1 1 2 4H2"/>\n  <path d="m6 6 4 4 4-4"/>';
export function WindArrowDown(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the arrow drops through the streaming gusts */}
      <motion.g variants={arrowRide} custom={[0.9, 0.1]}>
        <path d="M10 2v8" />
        <path d="m6 6 4 4 4-4" />
      </motion.g>
      <motion.path d="M12.8 21.6A2 2 0 1 0 14 18H2" variants={flowLoop} custom={[0.7, 0, 0]} />
      <motion.path d="M17.5 10a2.5 2.5 0 1 1 2 4H2" variants={flowLoop} custom={[-0.7, 0, 0]} />
    </Icon>
  );
}

export const wavesVerticalBody = '  <path d="M12 2q2 2.5 0 5t0 5 0 5 0 5"/>\n  <path d="M19 2q2 2.5 0 5t0 5 0 5 0 5"/>\n  <path d="M5 2q2 2.5 0 5t0 5 0 5 0 5"/>';
export function WavesVertical(p: IconProps) {
  return (
    <Icon {...p}>
      {/* continuous: neighboring currents ripple against each other */}
      <motion.path d="M12 2q2 2.5 0 5t0 5 0 5 0 5" variants={flowLoop} custom={[-0.7, 0, 0]} />
      <motion.path d="M19 2q2 2.5 0 5t0 5 0 5 0 5" variants={flowLoop} custom={[0.7, 0, 0.15]} />
      <motion.path d="M5 2q2 2.5 0 5t0 5 0 5 0 5" variants={flowLoop} custom={[0.7, 0, 0]} />
    </Icon>
  );
}

export const wavesArrowUpBody = '  <path d="M12 2v8"/>\n  <path d="M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>\n  <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>\n  <path d="m8 6 4-4 4 4"/>';
export function WavesArrowUp(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the arrow rises out of the rolling swell */}
      <motion.g variants={arrowRide} custom={[-0.8, 0.1]}>
        <path d="M12 2v8" />
        <path d="m8 6 4-4 4 4" />
      </motion.g>
      <motion.path d="M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" variants={flowLoop} custom={[0.7, 0, 0]} />
      <motion.path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" variants={flowLoop} custom={[-0.7, 0, 0]} />
    </Icon>
  );
}

export const wavesArrowDownBody = '  <path d="M12 10L12 2"/>\n  <path d="M16 6L12 10L8 6"/>\n  <path d="M2 15C2.6 15.5 3.2 16 4.5 16C7 16 7 14 9.5 14C12.1 14 11.9 16 14.5 16C17 16 17 14 19.5 14C20.8 14 21.4 14.5 22 15"/>\n  <path d="M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C12.1 20 11.9 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21"/>';
export function WavesArrowDown(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the arrow drops into the rolling swell */}
      <motion.g variants={arrowRide} custom={[0.8, 0.1]}>
        <path d="M12 10L12 2" />
        <path d="M16 6L12 10L8 6" />
      </motion.g>
      <motion.path d="M2 15C2.6 15.5 3.2 16 4.5 16C7 16 7 14 9.5 14C12.1 14 11.9 16 14.5 16C17 16 17 14 19.5 14C20.8 14 21.4 14.5 22 15" variants={flowLoop} custom={[0.7, 0, 0]} />
      <motion.path d="M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C12.1 20 11.9 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21" variants={flowLoop} custom={[-0.7, 0, 0]} />
    </Icon>
  );
}
