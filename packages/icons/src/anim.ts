import type { Variants } from "motion/react";

// loopable motions that return to rest

export const spin: Variants = {
  normal: { rotate: 0 },
  animate: {
    // keyframes so every trigger replays; snap back to 0 after (360 == 0
    // visually) so hover-out never unwinds the spin backwards
    rotate: [0, 360],
    transition: { duration: 1.1, ease: "easeInOut" },
    transitionEnd: { rotate: 0 },
  },
};

export const wobble: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 6, -6, 0],
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

// bell shake for notification badges
export const wiggle: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -10, 8, -6, 4, 0],
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

// curious head tilt
export const tilt: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -13, 13, 0],
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

// rays extend outward and back to shine
export const shine: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.3, 1],
    transition: { duration: 0.9, ease: "easeInOut" },
  },
};

export const sway: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    x: [0, 1, -1, 0],
    y: [0, -1, 1, 0],
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

// pupil scanning left and right
export const look: Variants = {
  normal: { x: 0 },
  animate: {
    x: [0, -2.5, 2.5, 0],
    transition: { duration: 0.9, ease: "easeInOut" },
  },
};

export const blink: Variants = {
  normal: { scaleY: 1 },
  animate: {
    scaleY: [1, 0.15, 1],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export const pulse: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.12, 1],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

// quick emphasis pop for glyphs
export const popScale: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.35, 1],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

// gentle cradle swing for the moon
export const rock: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 8, -8, 0],
    transition: { duration: 1, ease: "easeInOut" },
  },
};

// hand wave, pivot set by the caller
export const wave: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 14, -8, 12, -6, 0],
    transition: { duration: 0.9, ease: "easeInOut" },
  },
};

export const bob: Variants = {
  normal: { y: 0 },
  animate: { y: [0, -2, 0], transition: { duration: 0.6, ease: "easeInOut" } },
};

export const twinkle: Variants = {
  normal: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 0.5, 1.3, 1],
    rotate: [0, 0, 90, 0],
    transition: { duration: 0.85, ease: "easeInOut" },
  },
};

export const shake: Variants = {
  normal: { x: 0 },
  animate: {
    x: [0, -1.5, 1.5, -1, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};
