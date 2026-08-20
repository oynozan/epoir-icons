"use client";

import { motion } from "motion/react";
import type { IconProps } from "./types.js";

export function Icon({
  size = 24,
  strokeWidth = 2,
  absoluteStrokeWidth = false,
  children,
  style,
  ...rest
}: IconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={absoluteStrokeWidth ? (strokeWidth * 24) / size : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="normal"
      whileHover="animate"
      style={{ overflow: "visible", ...style }}
      {...rest}
    >
      {children}
    </motion.svg>
  );
}
