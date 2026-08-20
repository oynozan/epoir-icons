"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Icon } from "../icon.js";
import { blink, look, popScale, rock, shine, spin, sway, tilt, twinkle, wave, wiggle, wobble } from "../anim.js";
import { DrawSlash } from "../slash.js";
import { drawFlow, drawRev } from "../variants.js";
import type { IconProps } from "../types.js";

// sound/light pushes physically outward and back (no opacity ripple).
// custom = [dx, dy, duration, delay]
const waveOut: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[]) => ({
    x: [0, c[0], 0],
    y: [0, c[1], 0],
    transition: { duration: c[2], delay: c[3], ease: "easeInOut" },
  }),
};
// glasses slip down the nose then get pushed back up, small overshoot
const pushUp: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, 1.8, 1.8, -0.6, 0],
    transition: { duration: 0.95, ease: "easeInOut", times: [0, 0.35, 0.55, 0.8, 1] },
  },
};
// the magnifier sweeps a small search loop over the scan area
const searchSweep: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    x: [0, -2.5, 2, 0],
    y: [0, 1.5, -2, 0],
    transition: { duration: 0.9, ease: "easeInOut" },
  },
};

export const accessibilityBody = '  <circle cx="16" cy="4" r="1"/>\n  <path d="m18 19 1-7-6 1"/>\n  <path d="m5 8 3-3 5.5 3-2.36 3.5"/>\n  <path d="M4.24 14.5a5 5 0 0 0 6.88 6"/>\n  <path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>';
export function Accessibility(props: IconProps) {
  return (
    <Icon {...props}>
      <motion.g variants={sway}>
        <circle cx="16" cy="4" r="1" />
      </motion.g>
      <motion.g variants={wobble} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d="m18 19 1-7-6 1" />
        <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      </motion.g>
      <motion.g variants={spin} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
        <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
      </motion.g>
    </Icon>
  );
}

export const adBody = '  <path d="M10 13H6"/>\n  <path d="M10 15v-4a2 2 0 0 0-4 0v4"/>\n  <path d="M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z"/>\n  <rect x="2" y="5" width="20" height="14" rx="2"/>';
export function Ad(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <motion.g variants={wiggle} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d="M10 13H6" />
        <path d="M10 15v-4a2 2 0 0 0-4 0v4" />
        <path d="M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z" />
      </motion.g>
    </Icon>
  );
}

export const babyBody = '  <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/>\n  <path d="M15 12h.01"/>\n  <path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>\n  <path d="M9 12h.01"/>';
export function Baby(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
      <path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
      <motion.g variants={blink} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d="M15 12h.01" />
        <path d="M9 12h.01" />
      </motion.g>
    </Icon>
  );
}

export const badgeInfoBody = '  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>\n  <line x1="12" x2="12" y1="16" y2="12"/>\n  <line x1="12" x2="12.01" y1="8" y2="8"/>';
export function BadgeInfo(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <motion.path d="M12 16v-4" variants={drawRev} custom={[0.18, 0.35]} />
      <motion.path d="M12 8h.01" variants={popScale} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const badgeQuestionMarkBody = '  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>\n  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>\n  <line x1="12" x2="12.01" y1="17" y2="17"/>';
export function BadgeQuestionMark(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <motion.g variants={tilt} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </motion.g>
    </Icon>
  );
}

export const circleQuestionMarkBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>\n  <path d="M12 17h.01"/>';
export function CircleQuestionMark(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10" />
      <motion.g variants={tilt} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </motion.g>
    </Icon>
  );
}

export const closedCaptionBody = '  <path d="M10 9.17a3 3 0 1 0 0 5.66"/>\n  <path d="M17 9.17a3 3 0 1 0 0 5.66"/>\n  <rect x="2" y="5" width="20" height="14" rx="2"/>';
export function ClosedCaption(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <motion.path d="M10 9.17a3 3 0 1 0 0 5.66" variants={drawFlow} custom={[0, 0.45]} />
      <motion.path d="M17 9.17a3 3 0 1 0 0 5.66" variants={drawFlow} custom={[0.25, 0.45]} />
    </Icon>
  );
}

export const contrastBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="M12 18a6 6 0 0 0 0-12v12z"/>';
export function Contrast(props: IconProps) {
  return (
    <Icon {...props}>
      <motion.g variants={spin} style={{ transformBox: "view-box", transformOrigin: "12px 12px" }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 18a6 6 0 0 0 0-12v12z" />
      </motion.g>
    </Icon>
  );
}

export const earBody = '  <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/>\n  <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/>';
export function Ear(props: IconProps) {
  return (
    <Icon {...props}>
      <motion.g variants={tilt} style={{ transformBox: "view-box", transformOrigin: "11px 5px" }}>
        <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" />
        <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" />
      </motion.g>
    </Icon>
  );
}

export const earOffBody = '  <path d="M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46"/>\n  <path d="M6 8.5c0-.75.13-1.47.36-2.14"/>\n  <path d="M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76"/>\n  <path d="M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18"/>\n  <line x1="2" x2="22" y1="2" y2="22"/>';
export function EarOff(props: IconProps) {
  return (
    <Icon {...props}>
      {/* wiggle finishes before the slash draws so the slash-notches stay
          registered on the slash whenever it is visible (R6 sequencing) */}
      <motion.g variants={wiggle} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d="M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46" />
        <path d="M6 8.5c0-.75.13-1.47.36-2.14" />
        <path d="M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76" />
        <path d="M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18" />
      </motion.g>
      <DrawSlash d="M2 2 22 22" delay={0.75} />
    </Icon>
  );
}

export const eclipseBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="M12 2a7 7 0 1 0 10 10"/>';
export function Eclipse(props: IconProps) {
  return (
    <Icon {...props}>
      <motion.g variants={spin} style={{ transformBox: "view-box", transformOrigin: "12px 12px" }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a7 7 0 1 0 10 10" />
      </motion.g>
    </Icon>
  );
}

export const eyeBody = '  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>\n  <circle cx="12" cy="12" r="3"/>';
export function Eye(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <motion.g variants={look}>
        <circle cx="12" cy="12" r="3" />
      </motion.g>
    </Icon>
  );
}

export const eyeClosedBody = '  <path d="m15 18-.722-3.25"/>\n  <path d="M2 8a10.645 10.645 0 0 0 20 0"/>\n  <path d="m20 15-1.726-2.05"/>\n  <path d="m4 15 1.726-2.05"/>\n  <path d="m9 18 .722-3.25"/>';
// closed eye scrunches down in a blink
const closedBlink: Variants = {
  normal: { scaleY: 1, y: 0 },
  animate: {
    scaleY: [1, 0.45, 1],
    y: [0, 2, 0],
    transition: { duration: 0.55, ease: "easeInOut" },
  },
};
export function EyeClosed(props: IconProps) {
  return (
    <Icon {...props}>
      <motion.g variants={closedBlink} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d="m15 18-.722-3.25" />
        <path d="M2 8a10.645 10.645 0 0 0 20 0" />
        <path d="m20 15-1.726-2.05" />
        <path d="m4 15 1.726-2.05" />
        <path d="m9 18 .722-3.25" />
      </motion.g>
    </Icon>
  );
}

export const eyeDashedBody = '  <path d="M13.054 18.946a11 11 0 0 1-2.11 0"/>\n  <path d="M13.054 5.054a11 11 0 0 0-2.11-.001"/>\n  <path d="M17.072 6.274a11 11 0 0 1 1.753 1.173"/>\n  <path d="M18.825 16.552a11 11 0 0 1-1.753 1.174"/>\n  <path d="M2.514 13.303a11 11 0 0 1-.452-.954 1 1 0 0 1 0-.697 11 11 0 0 1 .45-.955"/>\n  <path d="M21.485 10.697a11 11 0 0 1 .453.955 1 1 0 0 1 0 .697 11 11 0 0 1-.453.954"/>\n  <path d="M5.173 7.448a11 11 0 0 1 1.753-1.174"/>\n  <path d="M6.926 17.726a11 11 0 0 1-1.753-1.174"/>\n  <circle cx="12" cy="12" r="3"/>';
export function EyeDashed(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13.054 18.946a11 11 0 0 1-2.11 0" />
      <path d="M13.054 5.054a11 11 0 0 0-2.11-.001" />
      <path d="M17.072 6.274a11 11 0 0 1 1.753 1.173" />
      <path d="M18.825 16.552a11 11 0 0 1-1.753 1.174" />
      <path d="M2.514 13.303a11 11 0 0 1-.452-.954 1 1 0 0 1 0-.697 11 11 0 0 1 .45-.955" />
      <path d="M21.485 10.697a11 11 0 0 1 .453.955 1 1 0 0 1 0 .697 11 11 0 0 1-.453.954" />
      <path d="M5.173 7.448a11 11 0 0 1 1.753-1.174" />
      <path d="M6.926 17.726a11 11 0 0 1-1.753-1.174" />
      <motion.g variants={look}>
        <circle cx="12" cy="12" r="3" />
      </motion.g>
    </Icon>
  );
}

export const eyeOffBody = '  <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>\n  <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>\n  <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>\n  <path d="m2 2 20 20"/>';
export function EyeOff(props: IconProps) {
  return (
    <Icon {...props}>
      <motion.g variants={blink} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
        <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      </motion.g>
      <DrawSlash d="m2 2 20 20" delay={0.15} />
    </Icon>
  );
}

export const glassesBody = '  <circle cx="6" cy="15" r="4"/>\n  <circle cx="18" cy="15" r="4"/>\n  <path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/>\n  <path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2"/>\n  <path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2"/>';
export function Glasses(props: IconProps) {
  return (
    <Icon {...props}>
      {/* the classic adjust: glasses slip down the nose, then get pushed
          briskly back up with a tiny overshoot */}
      <motion.g variants={pushUp}>
        <circle cx="6" cy="15" r="4" />
        <circle cx="18" cy="15" r="4" />
        <path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
        <path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2" />
        <path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2" />
      </motion.g>
    </Icon>
  );
}

export const handBody = '  <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/>\n  <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>\n  <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/>\n  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>';
export function Hand(props: IconProps) {
  return (
    <Icon {...props}>
      <motion.g variants={wave} style={{ transformBox: "view-box", transformOrigin: "11px 21px" }}>
        <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
        <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </motion.g>
    </Icon>
  );
}

export const lifeBuoyBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="m4.93 4.93 4.24 4.24"/>\n  <path d="m14.83 9.17 4.24-4.24"/>\n  <path d="m14.83 14.83 4.24 4.24"/>\n  <path d="m9.17 14.83-4.24 4.24"/>\n  <circle cx="12" cy="12" r="4"/>';
export function LifeBuoy(props: IconProps) {
  return (
    <Icon {...props}>
      <motion.g variants={spin} style={{ transformBox: "view-box", transformOrigin: "12px 12px" }}>
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24" />
        <path d="m14.83 9.17 4.24-4.24" />
        <path d="m14.83 14.83 4.24 4.24" />
        <path d="m9.17 14.83-4.24 4.24" />
        <circle cx="12" cy="12" r="4" />
      </motion.g>
    </Icon>
  );
}

export const moonBody = '  <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>';
export function Moon(props: IconProps) {
  return (
    <Icon {...props}>
      <motion.g variants={rock} style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}>
        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
      </motion.g>
    </Icon>
  );
}

export const moonStarBody = '  <path d="M18 5h4"/>\n  <path d="M20 3v4"/>\n  <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>';
export function MoonStar(props: IconProps) {
  return (
    <Icon {...props}>
      <motion.g variants={sway}>
        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
      </motion.g>
      <motion.g variants={twinkle} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d="M18 5h4" />
        <path d="M20 3v4" />
      </motion.g>
    </Icon>
  );
}

export const personStandingBody = '  <circle cx="12" cy="5" r="1"/>\n  <path d="m9 20 3-6 3 6"/>\n  <path d="m6 8 6 2 6-2"/>\n  <path d="M12 10v4"/>';
export function PersonStanding(props: IconProps) {
  return (
    <Icon {...props}>
      <motion.g variants={sway}>
        <circle cx="12" cy="5" r="1" />
      </motion.g>
      <motion.g variants={wobble} style={{ transformBox: "view-box", transformOrigin: "12px 12px" }}>
        <path d="m9 20 3-6 3 6" />
        <path d="m6 8 6 2 6-2" />
        <path d="M12 10v4" />
      </motion.g>
    </Icon>
  );
}

export const scanEyeBody = '  <path d="M3 7V5a2 2 0 0 1 2-2h2"/>\n  <path d="M17 3h2a2 2 0 0 1 2 2v2"/>\n  <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>\n  <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>\n  <circle cx="12" cy="12" r="1"/>\n  <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"/>';
export function ScanEye(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
      <motion.g variants={look}>
        <circle cx="12" cy="12" r="1" />
      </motion.g>
    </Icon>
  );
}

export const scanSearchBody = '  <path d="M3 7V5a2 2 0 0 1 2-2h2"/>\n  <path d="M17 3h2a2 2 0 0 1 2 2v2"/>\n  <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>\n  <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>\n  <circle cx="12" cy="12" r="3"/>\n  <path d="m16 16-1.9-1.9"/>';
export function ScanSearch(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <motion.g variants={searchSweep}>
        <circle cx="12" cy="12" r="3" />
        <path d="m16 16-1.9-1.9" />
      </motion.g>
    </Icon>
  );
}

export const speechBody = '  <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"/>\n  <path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603"/>\n  <path d="M17 15a3.5 3.5 0 0 0-.025-4.975"/>';
export function Speech(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20" />
      <motion.path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603" variants={waveOut} custom={[2.2, 0, 0.9, 0.15]} />
      <motion.path d="M17 15a3.5 3.5 0 0 0-.025-4.975" variants={waveOut} custom={[1.6, 0, 0.8, 0]} />
    </Icon>
  );
}

export const sunBody = '  <circle cx="12" cy="12" r="4"/>\n  <path d="M12 2v2"/>\n  <path d="M12 20v2"/>\n  <path d="m4.93 4.93 1.41 1.41"/>\n  <path d="m17.66 17.66 1.41 1.41"/>\n  <path d="M2 12h2"/>\n  <path d="M20 12h2"/>\n  <path d="m6.34 17.66-1.41 1.41"/>\n  <path d="m19.07 4.93-1.41 1.41"/>';
export function Sun(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <motion.g variants={shine} style={{ transformBox: "view-box", transformOrigin: "12px 12px" }}>
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </motion.g>
    </Icon>
  );
}

export const sunDimBody = '  <circle cx="12" cy="12" r="4"/>\n  <path d="M12 4h.01"/>\n  <path d="M20 12h.01"/>\n  <path d="M12 20h.01"/>\n  <path d="M4 12h.01"/>\n  <path d="M17.657 6.343h.01"/>\n  <path d="M17.657 17.657h.01"/>\n  <path d="M6.343 17.657h.01"/>\n  <path d="M6.343 6.343h.01"/>';
export function SunDim(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <motion.g variants={shine} style={{ transformBox: "view-box", transformOrigin: "12px 12px" }}>
        <path d="M12 4h.01" />
        <path d="M20 12h.01" />
        <path d="M12 20h.01" />
        <path d="M4 12h.01" />
        <path d="M17.657 6.343h.01" />
        <path d="M17.657 17.657h.01" />
        <path d="M6.343 17.657h.01" />
        <path d="M6.343 6.343h.01" />
      </motion.g>
    </Icon>
  );
}

export const sunMediumBody = '  <circle cx="12" cy="12" r="4"/>\n  <path d="M12 3v1"/>\n  <path d="M12 20v1"/>\n  <path d="M3 12h1"/>\n  <path d="M20 12h1"/>\n  <path d="m18.364 5.636-.707.707"/>\n  <path d="m6.343 17.657-.707.707"/>\n  <path d="m5.636 5.636.707.707"/>\n  <path d="m17.657 17.657.707.707"/>';
export function SunMedium(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <motion.g variants={shine} style={{ transformBox: "view-box", transformOrigin: "12px 12px" }}>
        <path d="M12 3v1" />
        <path d="M12 20v1" />
        <path d="M3 12h1" />
        <path d="M20 12h1" />
        <path d="m18.364 5.636-.707.707" />
        <path d="m6.343 17.657-.707.707" />
        <path d="m5.636 5.636.707.707" />
        <path d="m17.657 17.657.707.707" />
      </motion.g>
    </Icon>
  );
}

export const sunMoonBody = '  <path d="M12 2v2"/>\n  <path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/>\n  <path d="M16 12a4 4 0 0 0-4-4"/>\n  <path d="m19 5-1.256 1.256"/>\n  <path d="M20 12h2"/>';
// dawn breaks: the rays push outward one by one while the crescent holds
export function SunMoon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715" />
      <path d="M16 12a4 4 0 0 0-4-4" />
      <motion.path d="M12 2v2" variants={waveOut} custom={[0, -1.6, 0.6, 0]} />
      <motion.path d="m19 5-1.256 1.256" variants={waveOut} custom={[1.15, -1.15, 0.6, 0.12]} />
      <motion.path d="M20 12h2" variants={waveOut} custom={[1.6, 0, 0.6, 0.24]} />
    </Icon>
  );
}

export const transgenderBody = '  <path d="M12 16v6"/>\n  <path d="M14 20h-4"/>\n  <path d="M18 2h4v4"/>\n  <path d="m2 2 7.17 7.17"/>\n  <path d="M2 5.355V2h3.357"/>\n  <path d="m22 2-7.17 7.17"/>\n  <path d="M8 5 5 8"/>\n  <circle cx="12" cy="12" r="4"/>';
// the whole symbol spins as one — arms stay attached to the ring (R5),
// pinned to the icon centre via the invisible full-viewBox rect
export function Transgender(props: IconProps) {
  return (
    <Icon {...props}>
      <motion.g variants={spin}>
        <rect width="24" height="24" fill="none" stroke="none" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 16v6" />
        <path d="M14 20h-4" />
        <path d="m2 2 7.17 7.17" />
        <path d="M2 5.355V2h3.357" />
        <path d="M8 5 5 8" />
        <path d="M18 2h4v4" />
        <path d="m22 2-7.17 7.17" />
      </motion.g>
    </Icon>
  );
}

export const zoomInBody = '  <circle cx="11" cy="11" r="8"/>\n  <line x1="21" x2="16.65" y1="21" y2="16.65"/>\n  <line x1="11" x2="11" y1="8" y2="14"/>\n  <line x1="8" x2="14" y1="11" y2="11"/>';
export function ZoomIn(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <motion.g variants={popScale} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <line x1="11" x2="11" y1="8" y2="14" />
        <line x1="8" x2="14" y1="11" y2="11" />
      </motion.g>
    </Icon>
  );
}

export const zoomOutBody = '  <circle cx="11" cy="11" r="8"/>\n  <line x1="21" x2="16.65" y1="21" y2="16.65"/>\n  <line x1="8" x2="14" y1="11" y2="11"/>';
export function ZoomOut(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <motion.g variants={popScale} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <line x1="8" x2="14" y1="11" y2="11" />
      </motion.g>
    </Icon>
  );
}
