"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Icon } from "../icon.js";
import { DrawSlash } from "../slash.js";
import { drawFlow } from "../variants.js";
import type { IconProps } from "../types.js";

// Play once, no fade, no shrink. Loaders are the sole continuous spin.
const E = "easeInOut";
const R = { ease: E } as const;

const spin: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, 360], transition: { duration: 1.1, repeat: Infinity, ease: "linear" } },
};
const shift: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[]) => ({
    x: [0, c[0], 0],
    y: [0, c[1], 0],
    transition: { duration: c[3] || 0.55, delay: c[2] || 0, ...R },
  }),
};
const sketch: Variants = {
  normal: { x: 0, y: 0 },
  animate: { x: [0, 1.6, -1.6, 0], y: [0, -1.6, 1.6, 0], transition: { duration: 0.75, ...R } },
};
const deniedShake: Variants = {
  normal: { x: 0 },
  animate: { x: [0, -2, 2, -1.5, 1, 0], transition: { duration: 0.55, ...R } },
};
const swing: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -8, 8, -4, 0], transition: { duration: 0.9, ...R } },
};
const twinkle: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, 24, -14, 0], transition: { duration: 0.75, ...R } },
};
const wiggle: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -5, 5, 0], transition: { duration: 0.7, ...R } },
};
const plusBounce: Variants = {
  normal: { y: 0 },
  animate: { y: [0, -3, 0, -1.4, 0], transition: { duration: 0.7, ...R } },
};
// typewriter caret: two discrete character-width hops right, then home
const typeStep: Variants = {
  normal: { x: 0 },
  animate: {
    x: [0, 2.5, 2.5, 5, 5, 0],
    transition: { duration: 0.95, ease: E, times: [0, 0.15, 0.35, 0.5, 0.75, 1] },
  },
};
// grab-and-drag: the hand grips (dips), drags sideways while held low, releases
const grabDrag: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    y: [0, 2, 2, 0],
    x: [0, 0, -2, 0],
    transition: { duration: 0.9, ...R, times: [0, 0.3, 0.65, 1] },
  },
};

export const circlePlusBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="M8 12h8"/>\n  <path d="M12 8v8"/>';
export function CirclePlus(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      <motion.g variants={plusBounce}>
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </motion.g>
    </Icon>
  );
}

export const handGrabBody = '  <path d="M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4"/>\n  <path d="M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>\n  <path d="M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5"/>\n  <path d="M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/>\n  <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0"/>';
export function HandGrab(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={grabDrag}>
        <path d="M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" />
        <path d="M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
        <path d="M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5" />
        <path d="M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
        <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0" />
      </motion.g>
    </Icon>
  );
}

export const lassoBody = '  <path d="M3.704 14.467a10 8 0 1 1 3.115 2.375"/>\n  <path d="M7 22a5 5 0 0 1-2-3.994"/>\n  <circle cx="5" cy="16" r="2"/>';
export function Lasso(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={swing}>
        <path d="M3.704 14.467a10 8 0 1 1 3.115 2.375" />
        <path d="M7 22a5 5 0 0 1-2-3.994" />
        <circle cx="5" cy="16" r="2" />
      </motion.g>
    </Icon>
  );
}

export const lassoSelectBody = '  <path d="M7 22a5 5 0 0 1-2-4"/>\n  <path d="M7 16.93c.96.43 1.96.74 2.99.91"/>\n  <path d="M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2"/>\n  <path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>\n  <path d="M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z"/>';
export function LassoSelect(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the lasso loop draws itself around the selection, then the pointer
          confirms with a nudge */}
      <motion.path d="M7 22a5 5 0 0 1-2-4" variants={drawFlow} custom={[0.55, 0.25]} />
      <motion.path d="M7 16.93c.96.43 1.96.74 2.99.91" variants={drawFlow} custom={[0.4, 0.25]} />
      <motion.path d="M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2" variants={drawFlow} custom={[0, 0.5]} />
      <path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <motion.path d="M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z" variants={shift} custom={[0, 1.6, 0.7]} />
    </Icon>
  );
}

export const loaderBody = '  <path d="M12 2v4"/>\n  <path d="m16.2 7.8 2.9-2.9"/>\n  <path d="M18 12h4"/>\n  <path d="m16.2 16.2 2.9 2.9"/>\n  <path d="M12 18v4"/>\n  <path d="m4.9 19.1 2.9-2.9"/>\n  <path d="M2 12h4"/>\n  <path d="m4.9 4.9 2.9 2.9"/>';
export function Loader(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={spin}>
        <path d="M12 2v4" />
        <path d="m16.2 7.8 2.9-2.9" />
        <path d="M18 12h4" />
        <path d="m16.2 16.2 2.9 2.9" />
        <path d="M12 18v4" />
        <path d="m4.9 19.1 2.9-2.9" />
        <path d="M2 12h4" />
        <path d="m4.9 4.9 2.9 2.9" />
      </motion.g>
    </Icon>
  );
}

export const loaderCircleBody = '  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>';
export function LoaderCircle(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M21 12a9 9 0 1 1-6.219-8.56" variants={spin} />
    </Icon>
  );
}

export const loaderPinwheelBody = '  <path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0"/>\n  <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6"/>\n  <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6"/>\n  <circle cx="12" cy="12" r="10"/>';
export function LoaderPinwheel(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={spin}>
        <path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" />
        <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
        <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
        <circle cx="12" cy="12" r="10" />
      </motion.g>
    </Icon>
  );
}

export const mousePointerBody = '  <path d="M12.586 12.586 19 19"/>\n  <path d="M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z"/>';
export function MousePointer(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={shift} custom={[-1.5, -1.5]}>
        <path d="M12.586 12.586 19 19" />
        <path d="M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z" />
      </motion.g>
    </Icon>
  );
}

export const mousePointer2Body = '  <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>';
export function MousePointer2(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" variants={shift} custom={[-1.5, -1.5]} />
    </Icon>
  );
}

export const mousePointer2OffBody = '  <path d="m15.55 8.45 5.138 2.087a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063L8.45 15.551"/>\n  <path d="M22 2 2 22"/>\n  <path d="m6.816 11.528-2.779-6.84a.495.495 0 0 1 .651-.651l6.84 2.779"/>';
export function MousePointer2Off(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={wiggle}>
        <path d="m15.55 8.45 5.138 2.087a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063L8.45 15.551" />
        <path d="m6.816 11.528-2.779-6.84a.495.495 0 0 1 .651-.651l6.84 2.779" />
      </motion.g>
      <DrawSlash d="M22 2 2 22" from="tr" />
    </Icon>
  );
}

export const mousePointerBanBody = '  <path d="M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z"/>\n  <circle cx="16" cy="16" r="6"/>\n  <path d="m11.8 11.8 8.4 8.4"/>';
export function MousePointerBan(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={deniedShake}>
        <path d="M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z" />
        <circle cx="16" cy="16" r="6" />
        <path d="m11.8 11.8 8.4 8.4" />
      </motion.g>
    </Icon>
  );
}

export const mousePointerClickBody = '  <path d="M14 4.1 12 6"/>\n  <path d="m5.1 8-2.9-.8"/>\n  <path d="m6 12-1.9 2"/>\n  <path d="M7.2 2.2 8 5.1"/>\n  <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"/>';
export function MousePointerClick(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M14 4.1 12 6" variants={shift} custom={[1.5, -1, 0.05]} />
      <motion.path d="m5.1 8-2.9-.8" variants={shift} custom={[-1.6, 0, 0.1]} />
      <motion.path d="m6 12-1.9 2" variants={shift} custom={[-1, 1.5, 0.15]} />
      <motion.path d="M7.2 2.2 8 5.1" variants={shift} custom={[0, -1.6, 0]} />
      <motion.path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" variants={shift} custom={[-1, -1]} />
    </Icon>
  );
}

export const moveBody = '  <path d="M12 2v20"/>\n  <path d="m15 19-3 3-3-3"/>\n  <path d="m19 9 3 3-3 3"/>\n  <path d="M2 12h20"/>\n  <path d="m5 9-3 3 3 3"/>\n  <path d="m9 5 3-3 3 3"/>';
export function Move(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 2v20" />
      <motion.path d="m15 19-3 3-3-3" variants={shift} custom={[0, 2]} />
      <motion.path d="m19 9 3 3-3 3" variants={shift} custom={[2, 0]} />
      <path d="M2 12h20" />
      <motion.path d="m5 9-3 3 3 3" variants={shift} custom={[-2, 0]} />
      <motion.path d="m9 5 3-3 3 3" variants={shift} custom={[0, -2]} />
    </Icon>
  );
}

export const moveDiagonalBody = '  <path d="M11 19H5v-6"/>\n  <path d="M13 5h6v6"/>\n  <path d="M19 5 5 19"/>';
export function MoveDiagonal(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11 19H5v-6" variants={shift} custom={[-1.6, 1.6]} />
      <motion.path d="M13 5h6v6" variants={shift} custom={[1.6, -1.6]} />
      <path d="M19 5 5 19" />
    </Icon>
  );
}

export const moveDiagonal2Body = '  <path d="M19 13v6h-6"/>\n  <path d="M5 11V5h6"/>\n  <path d="m5 5 14 14"/>';
export function MoveDiagonal2(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M19 13v6h-6" variants={shift} custom={[1.6, 1.6]} />
      <motion.path d="M5 11V5h6" variants={shift} custom={[-1.6, -1.6]} />
      <path d="m5 5 14 14" />
    </Icon>
  );
}

export const moveHorizontalBody = '  <path d="m18 8 4 4-4 4"/>\n  <path d="M2 12h20"/>\n  <path d="m6 8-4 4 4 4"/>';
export function MoveHorizontal(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="m18 8 4 4-4 4" variants={shift} custom={[2, 0]} />
      <path d="M2 12h20" />
      <motion.path d="m6 8-4 4 4 4" variants={shift} custom={[-2, 0]} />
    </Icon>
  );
}

export const moveVerticalBody = '  <path d="M12 2v20"/>\n  <path d="m8 18 4 4 4-4"/>\n  <path d="m8 6 4-4 4 4"/>';
export function MoveVertical(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 2v20" />
      <motion.path d="m8 18 4 4 4-4" variants={shift} custom={[0, 2]} />
      <motion.path d="m8 6 4-4 4 4" variants={shift} custom={[0, -2]} />
    </Icon>
  );
}

export const penToolBody = '  <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/>\n  <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/>\n  <path d="m2.3 2.3 7.286 7.286"/>\n  <circle cx="11" cy="11" r="2"/>';
export function PenTool(p: IconProps) {
  return (
    <Icon {...p}>
      {/* pen traces a stroke like its sibling Pencil — whole group moves so
          the anchor stays on the nib */}
      <motion.g variants={sketch}>
        <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
        <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
        <path d="m2.3 2.3 7.286 7.286" />
        <circle cx="11" cy="11" r="2" />
      </motion.g>
    </Icon>
  );
}

export const pencilBody = '  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>\n  <path d="m15 5 4 4"/>';
export function Pencil(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={sketch}>
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
        <path d="m15 5 4 4" />
      </motion.g>
    </Icon>
  );
}

export const pencilOffBody = '  <path d="m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982"/>\n  <path d="m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353"/>\n  <path d="m15 5 4 4"/>\n  <path d="m2 2 20 20"/>';
export function PencilOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={wiggle}>
        <path d="m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982" />
        <path d="m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353" />
        <path d="m15 5 4 4" />
      </motion.g>
      <DrawSlash d="m2 2 20 20" />
    </Icon>
  );
}

export const pencilSparklesBody = '  <path d="M10 3H8"/>\n  <path d="m15.007 5.008 3.987 3.986"/>\n  <path d="M20 15v4"/>\n  <path d="M21.174 6.813a2.82 2.82 0 0 0-3.986-3.987L3.842 16.175a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>\n  <path d="M22 17h-4"/>\n  <path d="M4 5v4"/>\n  <path d="M6 7H2"/>\n  <path d="M9 2v2"/>';
export function PencilSparkles(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={shift} custom={[0.4, -1.2, 0]}>
        <path d="M10 3H8" />
        <path d="M9 2v2" />
      </motion.g>
      <motion.g variants={sketch}>
        <path d="m15.007 5.008 3.987 3.986" />
        <path d="M21.174 6.813a2.82 2.82 0 0 0-3.986-3.987L3.842 16.175a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      </motion.g>
      <motion.g variants={shift} custom={[1.2, 0.4, 0.08]}>
        <path d="M20 15v4" />
        <path d="M22 17h-4" />
      </motion.g>
      <motion.g variants={shift} custom={[-1.2, 0.4, 0.16]}>
        <path d="M4 5v4" />
        <path d="M6 7H2" />
      </motion.g>
    </Icon>
  );
}

export const pointerBody = '  <path d="M22 14a8 8 0 0 1-8 8"/>\n  <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/>\n  <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1"/>\n  <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10"/>\n  <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>';
export function Pointer(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={shift} custom={[0, 2]}>
        <path d="M22 14a8 8 0 0 1-8 8" />
        <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
        <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
        <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
        <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </motion.g>
    </Icon>
  );
}

export const pointerOffBody = '  <path d="M10 4.5V4a2 2 0 0 0-2.41-1.957"/>\n  <path d="M13.9 8.4a2 2 0 0 0-1.26-1.295"/>\n  <path d="M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158"/>\n  <path d="m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343"/>\n  <path d="M6 6v8"/>\n  <path d="m2 2 20 20"/>';
export function PointerOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={wiggle}>
        <path d="M10 4.5V4a2 2 0 0 0-2.41-1.957" />
        <path d="M13.9 8.4a2 2 0 0 0-1.26-1.295" />
        <path d="M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158" />
        <path d="m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343" />
        <path d="M6 6v8" />
      </motion.g>
      <DrawSlash d="m2 2 20 20" />
    </Icon>
  );
}

export const sparklesBody = '  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>\n  <path d="M20 2v4"/>\n  <path d="M22 4h-4"/>\n  <circle cx="4" cy="20" r="2"/>';
export function Sparkles(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" variants={twinkle} />
      <motion.g variants={shift} custom={[0.8, -0.8, 0.1]}>
        <path d="M20 2v4" />
        <path d="M22 4h-4" />
      </motion.g>
      <motion.circle cx="4" cy="20" r="2" variants={shift} custom={[-1, 1, 0.15]} />
    </Icon>
  );
}

export const splinePointerBody = '  <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/>\n  <path d="M5 17A12 12 0 0 1 17 5"/>\n  <circle cx="19" cy="5" r="2"/>\n  <circle cx="5" cy="19" r="2"/>';
export function SplinePointer(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" variants={shift} custom={[-1, -1]} />
      <path d="M5 17A12 12 0 0 1 17 5" />
      <motion.circle cx="19" cy="5" r="2" variants={shift} custom={[0.6, -0.6, 0.1]} />
      <motion.circle cx="5" cy="19" r="2" variants={shift} custom={[-0.6, 0.6, 0.16]} />
    </Icon>
  );
}

export const squareDashedMousePointerBody = '  <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/>\n  <path d="M5 3a2 2 0 0 0-2 2"/>\n  <path d="M19 3a2 2 0 0 1 2 2"/>\n  <path d="M5 21a2 2 0 0 1-2-2"/>\n  <path d="M9 3h1"/>\n  <path d="M9 21h2"/>\n  <path d="M14 3h1"/>\n  <path d="M3 9v1"/>\n  <path d="M21 9v2"/>\n  <path d="M3 14v1"/>';
export function SquareDashedMousePointer(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" variants={shift} custom={[-1, -1]} />
      <path d="M5 3a2 2 0 0 0-2 2" />
      <path d="M19 3a2 2 0 0 1 2 2" />
      <path d="M5 21a2 2 0 0 1-2-2" />
      <path d="M9 3h1" />
      <path d="M9 21h2" />
      <path d="M14 3h1" />
      <path d="M3 9v1" />
      <path d="M21 9v2" />
      <path d="M3 14v1" />
    </Icon>
  );
}

export const squareDashedTextBody = '  <path d="M14 21h1"/>\n  <path d="M14 3h1"/>\n  <path d="M19 3a2 2 0 0 1 2 2"/>\n  <path d="M21 14v1"/>\n  <path d="M21 19a2 2 0 0 1-2 2"/>\n  <path d="M21 9v1"/>\n  <path d="M3 14v1"/>\n  <path d="M3 9v1"/>\n  <path d="M5 21a2 2 0 0 1-2-2"/>\n  <path d="M5 3a2 2 0 0 0-2 2"/>\n  <path d="M7 12h10"/>\n  <path d="M7 16h6"/>\n  <path d="M7 8h8"/>\n  <path d="M9 21h1"/>\n  <path d="M9 3h1"/>';
export function SquareDashedText(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M14 21h1" />
      <path d="M14 3h1" />
      <path d="M19 3a2 2 0 0 1 2 2" />
      <path d="M21 14v1" />
      <path d="M21 19a2 2 0 0 1-2 2" />
      <path d="M21 9v1" />
      <path d="M3 14v1" />
      <path d="M3 9v1" />
      <path d="M5 21a2 2 0 0 1-2-2" />
      <path d="M5 3a2 2 0 0 0-2 2" />
      {/* the text builds: each line inks itself left-to-right, top first */}
      <motion.path d="M7 12h10" variants={drawFlow} custom={[0.12, 0.35]} />
      <motion.path d="M7 16h6" variants={drawFlow} custom={[0.24, 0.35]} />
      <motion.path d="M7 8h8" variants={drawFlow} custom={[0, 0.35]} />
      <path d="M9 21h1" />
      <path d="M9 3h1" />
    </Icon>
  );
}

export const squareMousePointerBody = '  <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/>\n  <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>';
export function SquareMousePointer(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" variants={shift} custom={[-1, -1]} />
      <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
    </Icon>
  );
}

export const stampBody = '  <path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13"/>\n  <path d="M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z"/>\n  <path d="M5 22h14"/>';
export function Stamp(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={shift} custom={[0, 2.5]}>
        <path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13" />
        <path d="M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z" />
      </motion.g>
      <path d="M5 22h14" />
    </Icon>
  );
}

export const textCursorBody = '  <path d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1"/>\n  <path d="M7 22h1a4 4 0 0 0 4-4"/>\n  <path d="M7 2h1a4 4 0 0 1 4 4"/>';
export function TextCursor(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={typeStep}>
        <path d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1" />
        <path d="M7 22h1a4 4 0 0 0 4-4" />
        <path d="M7 2h1a4 4 0 0 1 4 4" />
      </motion.g>
    </Icon>
  );
}

export const wandBody = '  <path d="M15 4V2"/>\n  <path d="M15 16v-2"/>\n  <path d="M8 9h2"/>\n  <path d="M20 9h2"/>\n  <path d="M17.8 11.8 19 13"/>\n  <path d="M15 9h.01"/>\n  <path d="M17.8 6.2 19 5"/>\n  <path d="m3 21 9-9"/>\n  <path d="M12.2 6.2 11 5"/>';
export function Wand(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={twinkle}>
        <path d="M15 4V2" />
        <path d="M15 16v-2" />
        <path d="M8 9h2" />
        <path d="M20 9h2" />
        <path d="M17.8 11.8 19 13" />
        <path d="M15 9h.01" />
        <path d="M17.8 6.2 19 5" />
        <path d="M12.2 6.2 11 5" />
      </motion.g>
      <motion.path d="m3 21 9-9" variants={shift} custom={[1, -1]} />
    </Icon>
  );
}

export const wandSparklesBody = '  <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/>\n  <path d="m14 7 3 3"/>\n  <path d="M5 6v4"/>\n  <path d="M19 14v4"/>\n  <path d="M10 2v2"/>\n  <path d="M7 8H3"/>\n  <path d="M21 16h-4"/>\n  <path d="M11 3H9"/>';
export function WandSparkles(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" variants={shift} custom={[1.5, -1.5]} />
      <motion.g variants={twinkle}>
        <path d="m14 7 3 3" />
        <path d="M5 6v4" />
        <path d="M19 14v4" />
        <path d="M10 2v2" />
        <path d="M7 8H3" />
        <path d="M21 16h-4" />
        <path d="M11 3H9" />
      </motion.g>
    </Icon>
  );
}

