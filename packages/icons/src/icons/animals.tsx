"use client";

import { motion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { Icon } from "../icon.js";
import { blink, wiggle } from "../anim.js";
import { DrawSlash } from "../slash.js";
import { drawFlow } from "../variants.js";
import type { IconProps } from "../types.js";

const OWN = { transformBox: "fill-box", transformOrigin: "center" } as const;
const t = (d: number, ease: Transition["ease"] = "easeInOut"): Transition => ({
  duration: d,
  ease,
});

const flap: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -55, -12, -50, -20, -45, 0], transition: t(0.75) },
};
const bodyBob: Variants = {
  normal: { y: 0, rotate: 0 },
  animate: { y: [0, 2, -4, 0], rotate: [0, -3, 2, 0], transition: t(0.7) },
};
const swing: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, 7, -7, 4, 0], transition: t(1) },
};
const drift: Variants = {
  normal: { rotate: 0, y: 0, x: 0 },
  animate: {
    rotate: [0, 12, -10, 6, 0],
    x: [0, -2, 2, 0],
    y: [0, -3, 2, 0],
    transition: t(1.3),
  },
};
const tailWag: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, 30, -30, 20, -12, 0], transition: t(0.7) },
};
// paper-bird take-off flutter: anticipation dip, hop up-forward, land — stays
// inside the viewBox, no shrink
const flyOff: Variants = {
  normal: { x: 0, y: 0, rotate: 0 },
  animate: {
    x: [0, -1, 3, 0],
    y: [0, 1, -3, 0],
    rotate: [0, 3, -8, 0],
    transition: t(0.85),
  },
};
// head tips back to yawn
const headBack: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -11, -8, 0], transition: t(1) },
};
const squint: Variants = {
  normal: { scaleY: 1 },
  animate: { scaleY: [1, 0.15, 0.15, 1], transition: t(1) },
};
// crouch then a small hop — rest geometry already reaches y=2, so the rise
// stays under 2 units to keep the ears inside the viewBox
const hop: Variants = {
  normal: { y: 0, scaleY: 1 },
  animate: {
    y: [0, 1.5, -2, 0],
    scaleY: [1, 0.82, 1.1, 1],
    transition: t(0.75),
  },
};
const tailWiggle: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, 18, -18, 11, 0], transition: t(0.6) },
};
const scurry: Variants = {
  normal: { x: 0 },
  animate: { x: [0, -2.5, 2.5, -1.5, 0], transition: t(0.5) },
};
const rockBase: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, 11, -11, 6, 0], transition: t(0.9) },
};
// two swim flicks: the shrimp darts backward with each tail tuck (no shrink)
const curl: Variants = {
  normal: { x: 0, rotate: 0 },
  animate: {
    x: [0, -2, -0.5, -1.6, 0],
    rotate: [0, -16, -4, -14, 0],
    transition: t(0.85),
  },
};
const creep: Variants = {
  normal: { x: 0, scaleX: 1 },
  animate: { x: [0, 1.5, 0], scaleX: [1, 1.09, 1], transition: t(1.5) },
};
const stalkWiggle: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, 24, -24, 0], transition: t(0.7) },
};
const perk: Variants = {
  normal: { y: 0, rotate: 0 },
  animate: { y: [0, -4, 0], rotate: [0, -9, 0], transition: t(0.6) },
};
// a slow two step plod that steps forward and settles back on its spot
const plod: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    x: [0, 1.5, 3, 1.5, 0],
    y: [0, -1.8, 0, -1.8, 0],
    transition: t(1.6),
  },
};
// bunches then reaches forward to crawl
const inch: Variants = {
  normal: { scaleX: 1, x: 0, rotate: 0 },
  animate: {
    scaleX: [1, 0.68, 1.18, 1],
    x: [0, -1.5, 2.5, 0],
    rotate: [0, 4, -3, 0],
    transition: t(1),
  },
};
// toes tap down in sequence like a step
const tap: Variants = {
  normal: { scale: 1 },
  animate: (custom: number) => ({
    scale: [1, 0.7, 1.12, 1],
    transition: { duration: 0.5, ease: "easeInOut", delay: custom },
  }),
};
const glide: Variants = {
  normal: { x: 0 },
  animate: { x: [0, 1.5, 0], transition: t(1.1) },
};
const headTilt: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -13, -13, 0], transition: t(0.95) },
};
// up-only emphasis pop (core shapes never scale below rest)
const press: Variants = {
  normal: { scale: 1 },
  animate: { scale: [1, 1.18, 1], transition: t(0.5) },
};
const antenna: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -16, 16, 0], transition: t(0.5) },
};
// impact ticks jolt outward from the break, then settle back. custom=[dx, dy, delay]
const jolt: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[]) => ({
    x: [0, c[0], 0],
    y: [0, c[1], 0],
    transition: { duration: 0.45, delay: c[2], ease: "easeInOut" },
  }),
};

export const birdBody = "  <path d=\"M16 7h.01\"/>\n  <path d=\"M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20\"/>\n  <path d=\"m20 7 2 .5-2 .5\"/>\n  <path d=\"M10 18v3\"/>\n  <path d=\"M14 17.75V21\"/>\n  <path d=\"M7 18a6 6 0 0 0 3.84-10.61\"/>";
export function Bird(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={bodyBob}>
        <path d="M16 7h.01" />
        <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
        <path d="m20 7 2 .5-2 .5" />
        <path d="M10 18v3" />
        <path d="M14 17.75V21" />
      </motion.g>
      <motion.g variants={flap} style={{ transformBox: "view-box", transformOrigin: "10px 8px" }}>
        <path d="M7 18a6 6 0 0 0 3.84-10.61" />
      </motion.g>
    </Icon>
  );
}

export const birdhouseBody = "  <path d=\"M12 18v4\"/>\n  <path d=\"m17 18 1.956-11.468\"/>\n  <path d=\"m3 8 7.82-5.615a2 2 0 0 1 2.36 0L21 8\"/>\n  <path d=\"M4 18h16\"/>\n  <path d=\"M7 18 5.044 6.532\"/>\n  <circle cx=\"12\" cy=\"10\" r=\"2\"/>";
export function Birdhouse(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={swing} style={{ transformBox: "view-box", transformOrigin: "12px 3px" }}>
        <path d="M12 18v4" />
        <path d="m17 18 1.956-11.468" />
        <path d="m3 8 7.82-5.615a2 2 0 0 1 2.36 0L21 8" />
        <path d="M4 18h16" />
        <path d="M7 18 5.044 6.532" />
        <circle cx="12" cy="10" r="2" />
      </motion.g>
    </Icon>
  );
}

export const boneBody = "  <path d=\"M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z\"/>";
export function Bone(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={wiggle} style={OWN}>
        <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
      </motion.g>
    </Icon>
  );
}

export const boneFractureBody = "  <path d=\"M14 4.5a1 1 0 0 1 5 0 .5.5 0 0 0 .5.5 1 1 0 0 1 0 5c-.81 0-1.8-.7-2.5 0l-1.958 1.957a.15.15 0 0 1-.252-.072l-.493-2.07a.15.15 0 0 0-.111-.112l-2.072-.494a.15.15 0 0 1-.072-.252L14 7c.7-.7 0-1.69 0-2.5\"/>\n  <path d=\"m16 20-1-2\"/>\n  <path d=\"m20 16-2-1\"/>\n  <path d=\"m4 8 2 1\"/>\n  <path d=\"m8 4 1 2\"/>\n  <path d=\"M9.698 14.19a.15.15 0 0 0 .112.112l2.074.489a.15.15 0 0 1 .072.252L10 17c-.7.7 0 1.69 0 2.5a1 1 0 0 1-5 0 .495.495 0 0 0-.5-.5 1 1 0 0 1 0-5c.81 0 1.8.7 2.5 0l1.956-1.957a.15.15 0 0 1 .252.072z\"/>";
export function BoneFracture(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={scurry}>
        <path d="M14 4.5a1 1 0 0 1 5 0 .5.5 0 0 0 .5.5 1 1 0 0 1 0 5c-.81 0-1.8-.7-2.5 0l-1.958 1.957a.15.15 0 0 1-.252-.072l-.493-2.07a.15.15 0 0 0-.111-.112l-2.072-.494a.15.15 0 0 1-.072-.252L14 7c.7-.7 0-1.69 0-2.5" />
        <path d="M9.698 14.19a.15.15 0 0 0 .112.112l2.074.489a.15.15 0 0 1 .072.252L10 17c-.7.7 0 1.69 0 2.5a1 1 0 0 1-5 0 .495.495 0 0 0-.5-.5 1 1 0 0 1 0-5c.81 0 1.8.7 2.5 0l1.956-1.957a.15.15 0 0 1 .252.072z" />
      </motion.g>
      <motion.path d="m16 20-1-2" variants={jolt} custom={[0.9, 1.6, 0]} />
      <motion.path d="m20 16-2-1" variants={jolt} custom={[1.6, 0.9, 0.06]} />
      <motion.path d="m4 8 2 1" variants={jolt} custom={[-1.6, -0.9, 0.06]} />
      <motion.path d="m8 4 1 2" variants={jolt} custom={[-0.9, -1.6, 0]} />
    </Icon>
  );
}

export const bugBody = "  <path d=\"M12 20v-9\"/>\n  <path d=\"M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z\"/>\n  <path d=\"M14.12 3.88 16 2\"/>\n  <path d=\"M21 21a4 4 0 0 0-3.81-4\"/>\n  <path d=\"M21 5a4 4 0 0 1-3.55 3.97\"/>\n  <path d=\"M22 13h-4\"/>\n  <path d=\"M3 21a4 4 0 0 1 3.81-4\"/>\n  <path d=\"M3 5a4 4 0 0 0 3.55 3.97\"/>\n  <path d=\"M6 13H2\"/>\n  <path d=\"m8 2 1.88 1.88\"/>\n  <path d=\"M9 7.13V6a3 3 0 1 1 6 0v1.13\"/>";
export function Bug(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={scurry}>
        <path d="M12 20v-9" />
        <path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" />
        <path d="M21 21a4 4 0 0 0-3.81-4" />
        <path d="M21 5a4 4 0 0 1-3.55 3.97" />
        <path d="M22 13h-4" />
        <path d="M3 21a4 4 0 0 1 3.81-4" />
        <path d="M3 5a4 4 0 0 0 3.55 3.97" />
        <path d="M6 13H2" />
        <path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" />
        {/* antennae ride inside the scurry group so their roots stay on the head */}
        <motion.g variants={antenna} style={{ transformBox: "view-box", transformOrigin: "12px 7px" }}>
          <path d="M14.12 3.88 16 2" />
          <path d="m8 2 1.88 1.88" />
        </motion.g>
      </motion.g>
    </Icon>
  );
}

export const bugOffBody = "  <path d=\"M12 20v-8\"/>\n  <path d=\"M12.656 7H14a4 4 0 0 1 4 4v1.344\"/>\n  <path d=\"M14.12 3.88 16 2\"/>\n  <path d=\"M17.123 17.123A6 6 0 0 1 6 14v-3a4 4 0 0 1 1.72-3.287\"/>\n  <path d=\"m2 2 20 20\"/>\n  <path d=\"M21 5a4 4 0 0 1-3.55 3.97\"/>\n  <path d=\"M22 13h-3.344\"/>\n  <path d=\"M3 21a4 4 0 0 1 3.81-4\"/>\n  <path d=\"M3 5a4 4 0 0 0 3.55 3.97\"/>\n  <path d=\"M6 13H2\"/>\n  <path d=\"m8 2 1.88 1.88\"/>\n  <path d=\"M9.712 4.06A3 3 0 0 1 15 6v1.13\"/>";
export function BugOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={scurry}>
        <path d="M12 20v-8" />
        <path d="M12.656 7H14a4 4 0 0 1 4 4v1.344" />
        <path d="M14.12 3.88 16 2" />
        <path d="M17.123 17.123A6 6 0 0 1 6 14v-3a4 4 0 0 1 1.72-3.287" />
        <path d="M21 5a4 4 0 0 1-3.55 3.97" />
        <path d="M22 13h-3.344" />
        <path d="M3 21a4 4 0 0 1 3.81-4" />
        <path d="M3 5a4 4 0 0 0 3.55 3.97" />
        <path d="M6 13H2" />
        <path d="m8 2 1.88 1.88" />
        <path d="M9.712 4.06A3 3 0 0 1 15 6v1.13" />
      </motion.g>
      <DrawSlash d="m2 2 20 20" delay={0.15} />
    </Icon>
  );
}

export const bugPlayBody = "  <path d=\"M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97\"/>\n  <path d=\"M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z\"/>\n  <path d=\"M14.12 3.88 16 2\"/>\n  <path d=\"M21 5a4 4 0 0 1-3.55 3.97\"/>\n  <path d=\"M3 21a4 4 0 0 1 3.81-4\"/>\n  <path d=\"M3 5a4 4 0 0 0 3.55 3.97\"/>\n  <path d=\"M6 13H2\"/>\n  <path d=\"m8 2 1.88 1.88\"/>\n  <path d=\"M9 7.13V6a3 3 0 1 1 6 0v1.13\"/>";
export function BugPlay(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97" />
      <path d="M14.12 3.88 16 2" />
      <path d="M21 5a4 4 0 0 1-3.55 3.97" />
      <path d="M3 21a4 4 0 0 1 3.81-4" />
      <path d="M3 5a4 4 0 0 0 3.55 3.97" />
      <path d="M6 13H2" />
      <path d="m8 2 1.88 1.88" />
      <path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" />
      <motion.g variants={press} style={OWN}>
        <path d="M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z" />
      </motion.g>
    </Icon>
  );
}

export const catBody = "  <path d=\"M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z\"/>\n  <path d=\"M8 14v.5\"/>\n  <path d=\"M16 14v.5\"/>\n  <path d=\"M11.25 16.25h1.5L12 17l-.75-.75Z\"/>";
export function Cat(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
      <motion.g variants={blink} style={{ transformBox: "view-box", transformOrigin: "12px 14px" }}>
        <path d="M8 14v.5" />
        <path d="M16 14v.5" />
      </motion.g>
    </Icon>
  );
}

export const dogBody = "  <path d=\"M11.25 16.25h1.5L12 17z\"/>\n  <path d=\"M16 14v.5\"/>\n  <path d=\"M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309\"/>\n  <path d=\"M8 14v.5\"/>\n  <path d=\"M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5\"/>";
export function Dog(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={headTilt} style={{ transformBox: "view-box", transformOrigin: "12px 20px" }}>
        <path d="M11.25 16.25h1.5L12 17z" />
        <path d="M16 14v.5" />
        <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309" />
        <path d="M8 14v.5" />
        <path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
      </motion.g>
    </Icon>
  );
}

export const eggBody = "  <path d=\"M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12\"/>";
export function Egg(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={rockBase} style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}>
        <path d="M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12" />
      </motion.g>
    </Icon>
  );
}

export const featherBody = "  <path d=\"M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z\"/>\n  <path d=\"M16 8 2 22\"/>\n  <path d=\"M17.5 15H9\"/>";
export function Feather(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={drift} style={OWN}>
        <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
        <path d="M16 8 2 22" />
        <path d="M17.5 15H9" />
      </motion.g>
    </Icon>
  );
}

export const fishBody = "  <path d=\"M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z\"/>\n  <path d=\"M18 12v.5\"/>\n  <path d=\"M16 17.93a9.77 9.77 0 0 1 0-11.86\"/>\n  <path d=\"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33\"/>\n  <path d=\"M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4\"/>\n  <path d=\"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98\"/>";
export function Fish(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
      <path d="M18 12v.5" />
      <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
      <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
      <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
      <motion.g variants={tailWag} style={{ transformBox: "view-box", transformOrigin: "7px 12px" }}>
        <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
      </motion.g>
    </Icon>
  );
}

export const fishOffBody = "  <path d=\"M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058\"/>\n  <path d=\"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618\"/>\n  <path d=\"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20\"/>";
export function FishOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={scurry}>
        <path d="M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058" />
        <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618" />
        <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4" />
      </motion.g>
      {/* slash waits for the scurry to settle so the notches stay registered */}
      <DrawSlash d="M2 2 22 22" delay={0.55} />
    </Icon>
  );
}

export const fishSymbolBody = "  <path d=\"M2 16s9-15 20-4C11 23 2 8 2 8\"/>";
export function FishSymbol(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={glide}>
        <path d="M2 16s9-15 20-4C11 23 2 8 2 8" />
      </motion.g>
    </Icon>
  );
}

export const origamiBody = "  <path d=\"M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025\"/>\n  <path d=\"m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009\"/>\n  <path d=\"m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027\"/>";
export function Origami(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={flyOff} style={OWN}>
        <path d="M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025" />
        <path d="m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009" />
        <path d="m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027" />
      </motion.g>
    </Icon>
  );
}

export const pandaBody = "  <path d=\"M11.25 17.25h1.5L12 18z\"/>\n  <path d=\"m15 12 2 2\"/>\n  <path d=\"M18 6.5a.5.5 0 0 0-.5-.5\"/>\n  <path d=\"M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83\"/>\n  <path d=\"M6 6.5a.495.495 0 0 1 .5-.5\"/>\n  <path d=\"m9 12-2 2\"/>";
// tips its head back and shuts its eyes to yawn
export function Panda(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={headBack} style={{ transformBox: "view-box", transformOrigin: "12px 21px" }}>
        <path d="M18 6.5a.5.5 0 0 0-.5-.5" />
        <path d="M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83" />
        <path d="M6 6.5a.495.495 0 0 1 .5-.5" />
        <path d="M11.25 17.25h1.5L12 18z" />
        <motion.g variants={squint} style={{ transformBox: "view-box", transformOrigin: "12px 13px" }}>
          <path d="m15 12 2 2" />
          <path d="m9 12-2 2" />
        </motion.g>
      </motion.g>
    </Icon>
  );
}

export const pawPrintBody = "  <circle cx=\"11\" cy=\"4\" r=\"2\"/>\n  <circle cx=\"18\" cy=\"8\" r=\"2\"/>\n  <circle cx=\"20\" cy=\"16\" r=\"2\"/>\n  <path d=\"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z\"/>";
export function PawPrint(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.circle cx="11" cy="4" r="2" custom={0} variants={tap} style={OWN} />
      <motion.circle cx="18" cy="8" r="2" custom={0.08} variants={tap} style={OWN} />
      <motion.circle cx="20" cy="16" r="2" custom={0.16} variants={tap} style={OWN} />
      <motion.path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" custom={0.26} variants={tap} style={OWN} />
    </Icon>
  );
}

export const rabbitBody = "  <path d=\"M13 16a3 3 0 0 1 2.24 5\"/>\n  <path d=\"M18 12h.01\"/>\n  <path d=\"M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3\"/>\n  <path d=\"M20 8.54V4a2 2 0 1 0-4 0v3\"/>\n  <path d=\"M7.612 12.524a3 3 0 1 0-1.6 4.3\"/>";
export function Rabbit(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={hop} style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}>
        <path d="M13 16a3 3 0 0 1 2.24 5" />
        <path d="M18 12h.01" />
        <path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3" />
        <path d="M20 8.54V4a2 2 0 1 0-4 0v3" />
        <path d="M7.612 12.524a3 3 0 1 0-1.6 4.3" />
      </motion.g>
    </Icon>
  );
}

export const ratBody = "  <path d=\"M13 22H4a2 2 0 0 1 0-4h12\"/>\n  <path d=\"M13.236 18a3 3 0 0 0-2.2-5\"/>\n  <path d=\"M16 9h.01\"/>\n  <path d=\"M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3\"/>\n  <path d=\"M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18\"/>";
export function Rat(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={scurry}>
        <path d="M13.236 18a3 3 0 0 0-2.2-5" />
        <path d="M16 9h.01" />
        <path d="M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3" />
        <path d="M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18" />
        {/* tail wags about its rump attachment (16,18) and rides the scurry */}
        <motion.g variants={tailWiggle} style={{ transformBox: "view-box", transformOrigin: "16px 18px" }}>
          <path d="M13 22H4a2 2 0 0 1 0-4h12" />
        </motion.g>
      </motion.g>
    </Icon>
  );
}

export const shellBody = "  <path d=\"M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44\"/>";
// the spiral draws itself from the centre whorl outward to the lip
export function Shell(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path
        d="M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44"
        variants={drawFlow}
        custom={[0, 0.8]}
      />
    </Icon>
  );
}

export const shrimpBody = "  <path d=\"M11 12h.01\"/>\n  <path d=\"M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1\"/>\n  <path d=\"M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8\"/>\n  <path d=\"M14 8a8.5 8.5 0 0 1 0 8\"/>\n  <path d=\"M16 16c2 0 4.5-4 4-6\"/>";
export function Shrimp(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={curl} style={OWN}>
        <path d="M11 12h.01" />
        <path d="M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1" />
        <path d="M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8" />
        <path d="M14 8a8.5 8.5 0 0 1 0 8" />
        <path d="M16 16c2 0 4.5-4 4-6" />
      </motion.g>
    </Icon>
  );
}

export const snailBody = "  <path d=\"M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0\"/>\n  <circle cx=\"10\" cy=\"13\" r=\"8\"/>\n  <path d=\"M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6\"/>\n  <path d=\"M18 3 19.1 5.2\"/>\n  <path d=\"M22 3 20.9 5.2\"/>";
export function Snail(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={creep}>
        <path d="M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0" />
        <circle cx="10" cy="13" r="8" />
        <path d="M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6" />
        <motion.g variants={stalkWiggle} style={{ transformBox: "view-box", transformOrigin: "18px 6px" }}>
          <path d="M18 3 19.1 5.2" />
          <path d="M22 3 20.9 5.2" />
        </motion.g>
      </motion.g>
    </Icon>
  );
}

export const squirrelBody = "  <path d=\"M15.236 22a3 3 0 0 0-2.2-5\"/>\n  <path d=\"M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4\"/>\n  <path d=\"M18 13h.01\"/>\n  <path d=\"M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10\"/>";
export function Squirrel(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={perk} style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}>
        <path d="M15.236 22a3 3 0 0 0-2.2-5" />
        <path d="M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4" />
        <path d="M18 13h.01" />
        <path d="M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10" />
      </motion.g>
    </Icon>
  );
}

export const turtleBody = "  <path d=\"m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z\"/>\n  <path d=\"M4.82 7.9 8 10\"/>\n  <path d=\"M15.18 7.9 12 10\"/>\n  <path d=\"M16.93 10H20a2 2 0 0 1 0 4H2\"/>";
// the whole turtle plods forward as one
export function Turtle(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={plod}>
        <path d="M16.93 10H20a2 2 0 0 1 0 4H2" />
        <path d="m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z" />
        <path d="M4.82 7.9 8 10" />
        <path d="M15.18 7.9 12 10" />
      </motion.g>
    </Icon>
  );
}

export const wormBody = "  <path d=\"m19 12-1.5 3\"/>\n  <path d=\"M19.63 18.81 22 20\"/>\n  <path d=\"M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z\"/>";
export function Worm(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={inch} style={OWN}>
        <path d="m19 12-1.5 3" />
        <path d="M19.63 18.81 22 20" />
        <path d="M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z" />
      </motion.g>
    </Icon>
  );
}
