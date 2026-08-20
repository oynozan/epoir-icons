"use client";

import { motion } from "motion/react";
import { Icon } from "../icon.js";
import { growMiddle, drawTransition } from "../variants.js";
import type { IconProps } from "../types.js";

export const xBody = '  <path d="M18 6 6 18"/>\n  <path d="m6 6 12 12"/>';

export function X(props: IconProps) {
  return (
    <Icon {...props}>
      <motion.path
        d="M18 6 6 18"
        variants={growMiddle}
        transition={drawTransition}
      />
      <motion.path
        d="m6 6 12 12"
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
