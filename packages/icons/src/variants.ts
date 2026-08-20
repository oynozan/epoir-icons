import type { Transition, Variants } from "motion/react";
import { entranceSharp } from "./ease.js";

// stroke grows out from its middle
export const growMiddle: Variants = {
  normal: { pathLength: 1, pathOffset: 0, opacity: 1 },
  animate: { pathLength: [0, 1], pathOffset: [0.5, 0], opacity: [0, 1] },
};

// stroke draws head to tail
export const drawOn: Variants = {
  normal: { pathLength: 1, pathOffset: 0, opacity: 1 },
  animate: { pathLength: [0, 1], pathOffset: [1, 0], opacity: [0, 1] },
};

// signature-style line draw (vivus-like): the stroke reveals along its own
// length. custom = [delay, duration]. A short opacity ramp hides the round
// cap dot that a round-linecap stroke renders at pathLength 0 — the one
// sanctioned use of opacity. Rest state is the full stroke, so hover redraws
// it and the final frame matches the source exactly.
export const drawFlow: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: (c: number[] = []) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      pathLength: { duration: c[1] ?? 0.6, delay: c[0] ?? 0, ease: entranceSharp },
      opacity: { duration: 0.12, delay: c[0] ?? 0 },
    },
  }),
};

// reverse-direction signature draw: reveals from the path's END back to its
// START (pathOffset 1->0). Use when the meaningful origin is the path's end
// point, e.g. wind/smoke that must emanate OUT of a device toward the free tip.
export const drawRev: Variants = {
  normal: { pathLength: 1, pathOffset: 0, opacity: 1 },
  animate: (c: number[] = []) => ({
    pathLength: [0, 1],
    pathOffset: [1, 0],
    opacity: [0, 1],
    transition: {
      pathLength: { duration: c[1] ?? 0.6, delay: c[0] ?? 0, ease: entranceSharp },
      pathOffset: { duration: c[1] ?? 0.6, delay: c[0] ?? 0, ease: entranceSharp },
      opacity: { duration: 0.12, delay: c[0] ?? 0 },
    },
  }),
};

export const drawTransition: Transition = {
  duration: 0.5,
  ease: entranceSharp,
  opacity: { duration: 0.08 },
};

// scale pop for dots and accents
export const pop: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: { scale: [0, 1.15, 1], opacity: [0, 1, 1] },
};

export const popTransition: Transition = {
  duration: 0.45,
  ease: entranceSharp,
};

// directional slide out and back
export function nudge(axis: "x" | "y", distance: number): Variants {
  return {
    normal: { x: 0, y: 0 },
    animate: { [axis]: [0, distance, 0] },
  };
}

export const nudgeTransition: Transition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1],
};
