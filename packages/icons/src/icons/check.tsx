"use client";

import { motion } from "motion/react";
import { Icon } from "../icon.js";
import { drawOn } from "../variants.js";
import { entranceSharp } from "../ease.js";
import type { IconProps } from "../types.js";

export const checkBody = '  <path d="M20 6 9 17l-5-5"/>';

export function Check(props: IconProps) {
  return (
    <Icon {...props}>
      <motion.path
        d="M20 6 9 17l-5-5"
        variants={drawOn}
        transition={{
          duration: 0.6,
          ease: entranceSharp,
          opacity: { duration: 0.08 },
        }}
      />
    </Icon>
  );
}
