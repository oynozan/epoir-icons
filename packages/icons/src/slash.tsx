"use client";

import { useId } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { entranceSharp } from "./ease.js";

// The slash is a full round-capped path revealed by a square clip that expands
// from its start corner, so the stroke draws on along its own diagonal. No
// pathLength is animated, so the round linecap never renders a dot at zero.
const wipeTL: Variants = {
  normal: { width: 24, height: 24 },
  animate: { width: [0, 24], height: [0, 24] },
};
const wipeTR: Variants = {
  normal: { x: 0, width: 24, height: 24 },
  animate: { x: [24, 0], width: [0, 24], height: [0, 24] },
};

export function DrawSlash({
  d,
  delay = 0.15,
  from = "tl",
}: {
  d: string;
  delay?: number;
  from?: "tl" | "tr";
}) {
  const clipId = useId();
  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <motion.rect
            x="0"
            y="0"
            width="24"
            height="24"
            variants={from === "tr" ? wipeTR : wipeTL}
            transition={{ duration: 0.45, delay, ease: entranceSharp }}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <path d={d} />
      </g>
    </>
  );
}
