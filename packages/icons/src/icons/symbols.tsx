"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Icon } from "../icon.js";
import {
  drawFlow,
  drawOn,
  drawTransition,
  growMiddle,
  pop,
  popTransition,
} from "../variants.js";
import type { IconProps } from "../types.js";

const centerScale = { transformBox: "fill-box", transformOrigin: "center" } as const;

// big check draws first then the small one follows
export const checkCheckBody =
  '  <path d="M18 6 7 17l-5-5"/>\n  <path d="m22 10-7.5 7.5L13 16"/>';
export function CheckCheck(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path
        d="M18 6 7 17l-5-5"
        variants={drawOn}
        transition={{ duration: 0.5, ease: [0.2, 0.75, 0.34, 0.94], opacity: { duration: 0.08 } }}
      />
      <motion.path
        d="m22 10-7.5 7.5L13 16"
        variants={drawOn}
        transition={{ duration: 0.4, delay: 0.5, ease: [0.2, 0.75, 0.34, 0.94], opacity: { duration: 0.08, delay: 0.5 } }}
      />
    </Icon>
  );
}

export const minusBody = '  <path d="M5 12h14"/>';
export function Minus(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M5 12h14" variants={growMiddle} transition={drawTransition} />
    </Icon>
  );
}

export const plusBody = '  <path d="M5 12h14"/>\n  <path d="M12 5v14"/>';
export function Plus(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M5 12h14" variants={growMiddle} transition={drawTransition} />
      <motion.path
        d="M12 5v14"
        variants={growMiddle}
        transition={{
          ...drawTransition,
          delay: 0.1,
          opacity: { duration: 0.08, delay: 0.1 },
        }}
      />
    </Icon>
  );
}

export const dotBody = '  <circle cx="12" cy="12" r="1"/>';
export function Dot(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.circle
        cx="12"
        cy="12"
        r="1"
        style={centerScale}
        variants={pop}
        transition={popTransition}
      />
    </Icon>
  );
}

// lens draws then the handle follows
export const searchBody =
  '  <path d="m21 21-4.34-4.34"/>\n  <circle cx="11" cy="11" r="8"/>';
export function Search(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.circle
        cx="11"
        cy="11"
        r="8"
        variants={drawOn}
        transition={{ duration: 0.55, ease: [0.2, 0.75, 0.34, 0.94], opacity: { duration: 0.08 } }}
      />
      <motion.path
        d="m21 21-4.34-4.34"
        variants={drawOn}
        transition={{ duration: 0.25, delay: 0.4, ease: [0.2, 0.75, 0.34, 0.94], opacity: { duration: 0.08, delay: 0.4 } }}
      />
    </Icon>
  );
}

// the stem inks itself upward while the dot falls from the circle's top and
// lands with a small bounce — big enough to read at grid size
export const infoBody =
  '  <circle cx="12" cy="12" r="10"/>\n  <path d="M12 16v-4"/>\n  <path d="M12 8h.01"/>';
const infoDot: Variants = {
  normal: { y: 0 },
  animate: {
    y: [-6, 0, 1, 0],
    transition: { duration: 0.55, delay: 0.05, ease: [0.2, 0.75, 0.34, 0.94], times: [0, 0.55, 0.78, 1] },
  },
};
export function Info(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      <motion.path d="M12 16v-4" variants={drawFlow} custom={[0, 0.3]} />
      <motion.path d="M12 8h.01" variants={infoDot} />
    </Icon>
  );
}
