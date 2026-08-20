"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Icon } from "../icon.js";
import type { IconProps } from "../types.js";

// A padlock's character is mechanical. Closed locks click SHUT: the shackle
// lifts, hangs a beat, then snaps down while the body dips on impact. Open
// locks spring OPEN: the free-ended shackle pops up with an overshoot, hinged
// at its body attachment. Keyhole dots pop at the moment of engagement.
const E = "easeInOut";

const shackleSnap: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, -1.5, -1.5, 0],
    transition: { duration: 0.75, ease: E, times: [0, 0.35, 0.6, 0.78] },
  },
};
// the body takes the hit: a small dip right as the shackle lands
const bodyClunk: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, 0, 0.7, 0],
    transition: { duration: 0.75, ease: E, times: [0, 0.75, 0.87, 1] },
  },
};
// free-ended shackle springs up and open around its hinge
const shackleSpring: Variants = {
  normal: { y: 0, rotate: 0 },
  animate: {
    y: [0, -1, 0.3, 0],
    rotate: [0, -6, 2, 0],
    transition: { duration: 0.7, ease: E },
  },
};
// keyhole dot pop, timed by custom delay to the mechanical beat
const dotPop: Variants = {
  normal: { scale: 1 },
  animate: (d: number = 0) => ({
    scale: [1, 1.4, 1],
    transition: { duration: 0.3, delay: d, ease: E },
  }),
};

export const lockBody = '  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>\n  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>';
export function Lock(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.rect width="18" height="11" x="3" y="11" rx="2" ry="2" variants={bodyClunk} />
      <motion.path d="M7 11V7a5 5 0 0 1 10 0v4" variants={shackleSnap} />
    </Icon>
  );
}

export const lockOpenBody = '  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>\n  <path d="M7 11V7a5 5 0 0 1 9.9-1"/>';
export function LockOpen(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <motion.path d="M7 11V7a5 5 0 0 1 9.9-1" variants={shackleSpring} style={{ transformBox: "view-box", transformOrigin: "7px 11px" }} />
    </Icon>
  );
}

export const lockKeyholeBody = '  <circle cx="12" cy="16" r="1"/>\n  <rect x="3" y="10" width="18" height="12" rx="2"/>\n  <path d="M7 10V7a5 5 0 0 1 10 0v3"/>';
export function LockKeyhole(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={bodyClunk}>
        <rect x="3" y="10" width="18" height="12" rx="2" />
        <motion.circle cx="12" cy="16" r="1" variants={dotPop} custom={0.55} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      </motion.g>
      <motion.path d="M7 10V7a5 5 0 0 1 10 0v3" variants={shackleSnap} />
    </Icon>
  );
}

export const lockKeyholeOpenBody = '  <circle cx="12" cy="16" r="1"/>\n  <rect width="18" height="12" x="3" y="10" rx="2"/>\n  <path d="M7 10V7a5 5 0 0 1 9.33-2.5"/>';
export function LockKeyholeOpen(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.circle cx="12" cy="16" r="1" variants={dotPop} custom={0.15} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <rect width="18" height="12" x="3" y="10" rx="2" />
      <motion.path d="M7 10V7a5 5 0 0 1 9.33-2.5" variants={shackleSpring} style={{ transformBox: "view-box", transformOrigin: "7px 10px" }} />
    </Icon>
  );
}
