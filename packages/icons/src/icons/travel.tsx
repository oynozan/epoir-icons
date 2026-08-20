"use client";

import { motion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { Icon } from "../icon.js";
import { drawFlow, drawRev, growMiddle } from "../variants.js";
import { entranceSharp } from "../ease.js";
import type { IconProps } from "../types.js";

// Travel language: gear PACKS (body draws, straps and fittings follow, wheels
// seat last); vehicles TRAVEL along their own heading; things that genuinely
// never stop loop on closed cycles (a conveyor belt, a boat at sea). Every
// transform keeps its paint inside 0..24 for the whole animation — including
// the first frame (the food/mail escape lesson).
const E = "easeInOut";

function gm(delay = 0, duration = 0.5): Transition {
  return { duration, delay, ease: entranceSharp, opacity: { duration: 0.08, delay } };
}
// a wheel/knob seating into place. custom=delay
const popIn: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: (d: number = 0) => ({
    scale: [0, 1.15, 1],
    opacity: [0, 1, 1],
    transition: { duration: 0.3, delay: d, ease: entranceSharp },
  }),
};
// grow-only pulse for a beacon or dot. custom=delay
const pulse: Variants = {
  normal: { scale: 1 },
  animate: (d: number = 0) => ({ scale: [1, 1.3, 1], transition: { duration: 0.35, delay: d, ease: E } }),
};
// a piece dropping onto what is below it. custom=[dy, delay]
const landOn: Variants = {
  normal: { y: 0 },
  animate: (c: number[] = []) => ({
    y: [c[0] ?? -1.2, 0],
    transition: { duration: 0.4, delay: c[1] ?? 0, ease: entranceSharp },
  }),
};
// pressed and sprung back. custom=[dy, delay]
const press: Variants = {
  normal: { y: 0 },
  animate: (c: number[] = []) => ({
    y: [0, c[0] ?? 0.6, -0.15, 0],
    transition: { duration: 0.5, delay: c[1] ?? 0, ease: E },
  }),
};
// a purposeful surge along a heading, gliding back. custom=[dx, dy, delay]
const surge: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[] = []) => ({
    x: [0, c[0] ?? 0, 0],
    y: [0, c[1] ?? 0, 0],
    transition: { duration: 0.8, delay: c[2] ?? 0, ease: E },
  }),
};
// a landing glide: starts up on the approach, descends once, stays down —
// never climbs back (a return keyframe reads as flying the wrong way)
const glideIn: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    x: [-0.7, -0.7, 0, 0],
    y: [-0.7, -0.7, 0, 0],
    transition: { duration: 1, ease: E, times: [0, 0.2, 0.85, 1] },
  },
};
// a hanging thing swinging under its mount — closed cycle, plays once
const sway: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -4, 3, -1.5, 0], transition: { duration: 1.2, ease: E } },
};
// steam/smoke wisp: rises and dissipates, another follows. custom=delay
const steamRise: Variants = {
  normal: { y: 0, opacity: 1 },
  animate: (c: number[] = []) => ({
    y: [0, -(c[1] ?? 0.9)],
    opacity: [1, 1, 0],
    transition: { duration: 1.1, delay: c[0] ?? 0, repeat: Infinity, repeatDelay: 0.2, ease: "easeOut", opacity: { duration: 1.1, delay: c[0] ?? 0, repeat: Infinity, repeatDelay: 0.2, times: [0, 0.55, 1] } },
  }),
};
// pulled/towed along the road: forward surge with a lean, then set back.
// custom=[dx, lean]
const rollPull: Variants = {
  normal: { x: 0, rotate: 0 },
  animate: (c: number[] = []) => ({
    x: [0, c[0] ?? 0.9, c[0] ?? 0.9, 0],
    rotate: [0, c[1] ?? -2.5, c[1] ?? -2.5, 0],
    transition: { duration: 1, ease: E, times: [0, 0.35, 0.6, 1] },
  }),
};
// hovering flight: a gentle continuous bob, cycle closed at 0
const hover: Variants = {
  normal: { y: 0 },
  animate: { y: [0, -0.7, 0], transition: { duration: 1.8, repeat: Infinity, ease: E } },
};
// towed with a road bump
const towSurge: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    x: [0, 0.8, 0.8, 0],
    y: [0, -0.25, 0.1, 0],
    transition: { duration: 0.9, ease: E, times: [0, 0.4, 0.6, 1] },
  },
};
// a proud little hop (shouldering the pack)
const hop: Variants = {
  normal: { y: 0 },
  animate: { y: [0, -0.8, 0, -0.2, 0], transition: { duration: 0.6, ease: E, times: [0, 0.3, 0.6, 0.8, 1] } },
};
// a hull rocking on water, forever, cycle closed at 0
const rockLoop: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -3, 0, 3, 0], transition: { duration: 2.4, repeat: Infinity, ease: E } },
};
// conveyor rollers thumping in an endless left-to-right wave. custom=delay
const rollerWave: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({
    y: [0, 0.4, 0],
    transition: { duration: 1.4, delay: d, repeat: Infinity, ease: E },
  }),
};

export const backpackBody = '  <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>\n  <path d="M8 10h8"/>\n  <path d="M8 18h8"/>\n  <path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"/>\n  <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>';
export function Backpack(p: IconProps) {
  return (
    <Icon {...p}>
      {/* shouldered: the whole pack hops up and settles on the straps */}
      <motion.g variants={hop}>
        <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M8 10h8" />
        <path d="M8 18h8" />
        <path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6" />
        <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      </motion.g>
    </Icon>
  );
}

export const luggageBody = '  <path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"/>\n  <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/>\n  <path d="M10 20h4"/>\n  <circle cx="16" cy="20" r="2"/>\n  <circle cx="8" cy="20" r="2"/>';
export function Luggage(p: IconProps) {
  const o = { transformBox: "fill-box", transformOrigin: "center" } as const;
  return (
    <Icon {...p}>
      {/* it ROLLS: pulled forward on its wheels with a lean into the pull */}
      <motion.g variants={rollPull} custom={[0.9, -2.5]} style={{ transformBox: "view-box", originX: "12px", originY: "22px" }}>
        <path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
        <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
        <path d="M10 20h4" />
        <circle cx="16" cy="20" r="2" />
        <circle cx="8" cy="20" r="2" />
      </motion.g>
    </Icon>
  );
}

export const baggageClaimBody = '  <path d="M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2"/>\n  <path d="M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10"/>\n  <rect width="13" height="8" x="8" y="6" rx="1"/>\n  <circle cx="18" cy="20" r="2"/>\n  <circle cx="9" cy="20" r="2"/>';
export function BaggageClaim(p: IconProps) {
  const o = { transformBox: "fill-box", transformOrigin: "center" } as const;
  return (
    <Icon {...p}>
      {/* the truck draws, the case lands onto it, then the wheels seat */}
      <motion.path d="M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2" variants={drawRev} custom={[0, 0.45]} />
      <motion.path d="M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10" variants={drawFlow} custom={[0.55, 0.35]} />
      <motion.rect width="13" height="8" x="8" y="6" rx="1" variants={landOn} custom={[-1.2, 0.35]} />
      <motion.circle cx="18" cy="20" r="2" variants={popIn} custom={0.8} style={o} />
      <motion.circle cx="9" cy="20" r="2" variants={popIn} custom={0.72} style={o} />
    </Icon>
  );
}

export const briefcaseConveyorBeltBody = '  <path d="M10 20v2"/>\n  <path d="M14 20v2"/>\n  <path d="M18 20v2"/>\n  <path d="M21 20H3"/>\n  <path d="M6 20v2"/>\n  <path d="M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12"/>\n  <rect x="4" y="6" width="16" height="10" rx="2"/>';
export function BriefcaseConveyorBelt(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the belt never stops: its rollers thump in an endless wave while the
          case rides along on top */}
      <motion.path d="M6 20v2" variants={rollerWave} custom={0} />
      <motion.path d="M10 20v2" variants={rollerWave} custom={0.12} />
      <motion.path d="M14 20v2" variants={rollerWave} custom={0.24} />
      <motion.path d="M18 20v2" variants={rollerWave} custom={0.36} />
      <path d="M21 20H3" />
      <path d="M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12" />
      <rect x="4" y="6" width="16" height="10" rx="2" />
    </Icon>
  );
}

export const bathBody = '  <path d="M10 4 8 6"/>\n  <path d="M17 19v2"/>\n  <path d="M2 12h20"/>\n  <path d="M7 19v2"/>\n  <path d="M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>';
export function Bath(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the tap curls on, the water line fills across, the feet drop */}
      <motion.path d="M10 4 8 6" variants={drawFlow} custom={[0.45, 0.2]} />
      <motion.path d="M17 19v2" variants={drawFlow} custom={[0.72, 0.2]} />
      <motion.path d="M2 12h20" variants={growMiddle} transition={gm(0.55, 0.35)} />
      <motion.path d="M7 19v2" variants={drawFlow} custom={[0.65, 0.2]} />
      <motion.path d="M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" variants={drawFlow} custom={[0, 0.55]} />
    </Icon>
  );
}

export const bookImageBody = '  <path d="m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17"/>\n  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>\n  <circle cx="10" cy="8" r="2"/>';
export function BookImage(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the book draws, then the photo appears on the page */}
      <motion.path d="m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17" variants={drawRev} custom={[0.45, 0.4]} />
      <motion.path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" variants={drawFlow} custom={[0, 0.55]} />
      <motion.circle cx="10" cy="8" r="2" variants={popIn} custom={0.72} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const cableCarBody = '  <path d="M10 3h.01"/>\n  <path d="M14 2h.01"/>\n  <path d="m2 9 20-5"/>\n  <path d="M12 12V6.5"/>\n  <rect width="16" height="10" x="4" y="12" rx="3"/>\n  <path d="M9 12v5"/>\n  <path d="M15 12v5"/>\n  <path d="M4 17h16"/>';
export function CableCar(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M10 3h.01" />
      <path d="M14 2h.01" />
      <path d="m2 9 20-5" />
      {/* the gondola hangs from the cable and sways under it — the hanger at
          (12,6.5) is the real pivot */}
      <motion.g variants={sway} style={{ transformBox: "view-box", originX: "12px", originY: "6.5px" }}>
        <path d="M12 12V6.5" />
        <rect width="16" height="10" x="4" y="12" rx="3" />
        <path d="M9 12v5" />
        <path d="M15 12v5" />
        <path d="M4 17h16" />
      </motion.g>
    </Icon>
  );
}

export const caravanBody = '  <path d="M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2"/>\n  <path d="M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2"/>\n  <path d="M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9"/>\n  <circle cx="8" cy="19" r="2"/>';
export function Caravan(p: IconProps) {
  return (
    <Icon {...p}>
      {/* towed: the whole caravan surges forward with a road bump */}
      <motion.g variants={towSurge}>
        <path d="M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2" />
        <path d="M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2" />
        <path d="M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9" />
        <circle cx="8" cy="19" r="2" />
      </motion.g>
    </Icon>
  );
}

export const cigaretteBody = '  <path d="M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14"/>\n  <path d="M18 8c0-2.5-2-2.5-2-5"/>\n  <path d="M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/>\n  <path d="M22 8c0-2.5-2-2.5-2-5"/>\n  <path d="M7 12v4"/>';
export function Cigarette(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14" />
      {/* the body holds still — smoke RISES off the tip and dissipates */}
      <motion.path d="M18 8c0-2.5-2-2.5-2-5" variants={steamRise} custom={[0, 1.3]} />
      <path d="M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <motion.path d="M22 8c0-2.5-2-2.5-2-5" variants={steamRise} custom={[0.5, 1.3]} />
      <path d="M7 12v4" />
    </Icon>
  );
}

export const cigaretteOffBody = '  <path d="M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13"/>\n  <path d="M18 8c0-2.5-2-2.5-2-5"/>\n  <path d="m2 2 20 20"/>\n  <path d="M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866"/>\n  <path d="M22 8c0-2.5-2-2.5-2-5"/>\n  <path d="M7 12v4"/>';
export function CigaretteOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M18 8c0-2.5-2-2.5-2-5" variants={drawFlow} custom={[0.2, 0.3]} />
      <motion.path d="m2 2 20 20" variants={growMiddle} transition={gm(0.55, 0.4)} />
      <motion.path d="M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866" variants={drawFlow} custom={[0.3, 0.25]} />
      <motion.path d="M22 8c0-2.5-2-2.5-2-5" variants={drawFlow} custom={[0.26, 0.3]} />
      <motion.path d="M7 12v4" variants={growMiddle} transition={gm(0.36, 0.25)} />
    </Icon>
  );
}

export const conciergeBellBody = '  <path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z"/>\n  <path d="M20 16a8 8 0 1 0-16 0"/>\n  <path d="M12 4v4"/>\n  <path d="M10 4h4"/>';
export function ConciergeBell(p: IconProps) {
  return (
    <Icon {...p}>
      {/* no drawing — just RING it: the knob presses, the bell dips back */}
      <motion.path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z" variants={press} custom={[0.3, 0.16]} />
      <motion.path d="M20 16a8 8 0 1 0-16 0" variants={press} custom={[0.35, 0.12]} />
      <motion.g variants={press} custom={[0.9, 0]}>
        <path d="M12 4v4" />
        <path d="M10 4h4" />
      </motion.g>
    </Icon>
  );
}

export const helicopterBody = '  <path d="M11 17v4"/>\n  <path d="M14 3v8a2 2 0 0 0 2 2h5.865"/>\n  <path d="M17 17v4"/>\n  <path d="M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z"/>\n  <path d="M2 10v5"/>\n  <path d="M6 3h16"/>\n  <path d="M7 21h14"/>\n  <path d="M8 13H2"/>';
export function Helicopter(p: IconProps) {
  return (
    <Icon {...p}>
      {/* it HOVERS: the whole aircraft bobs continuously over the static ground */}
      <motion.g variants={hover}>
        <path d="M11 17v4" />
        <path d="M14 3v8a2 2 0 0 0 2 2h5.865" />
        <path d="M17 17v4" />
        <path d="M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z" />
        <path d="M2 10v5" />
        <path d="M6 3h16" />
        <path d="M8 13H2" />
      </motion.g>
      <path d="M7 21h14" />
    </Icon>
  );
}

export const parasolBody = '  <path d="M12.5 11.134 18.196 21"/>\n  <path d="M20.425 5.299a10 10 0 0 0-16.941 9.78c.183.563.843.774 1.355.478L20.16 6.711c.512-.296.66-.973.264-1.413"/>\n  <path d="M21 21H3"/>';
export function Parasol(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the canopy unfurls, the pole drops, the ground line strikes */}
      <motion.path d="M12.5 11.134 18.196 21" variants={drawFlow} custom={[0.45, 0.3]} />
      <motion.path d="M20.425 5.299a10 10 0 0 0-16.941 9.78c.183.563.843.774 1.355.478L20.16 6.711c.512-.296.66-.973.264-1.413" variants={drawFlow} custom={[0, 0.55]} />
      <motion.path d="M21 21H3" variants={growMiddle} transition={gm(0.62, 0.3)} />
    </Icon>
  );
}

export const planeTakeoffBody = '  <path d="M2 22h20"/>\n  <path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"/>';
export function PlaneTakeoff(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M2 22h20" />
      {/* the climb: it surges up along its heading and settles back */}
      <motion.path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z" variants={surge} custom={[0.8, -0.8, 0]} />
    </Icon>
  );
}

export const planeLandingBody = '  <path d="M2 22h20"/>\n  <path d="M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z"/>';
export function PlaneLanding(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M2 22h20" />
      {/* the approach: starts up-left on the glide slope, descends forward
          (down-right) once and stays down — no return leg */}
      <motion.path d="M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z" variants={glideIn} />
    </Icon>
  );
}

export const sailboatBody = '  <path d="M10 2v15"/>\n  <path d="M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z"/>\n  <path d="M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z"/>';
export function Sailboat(p: IconProps) {
  return (
    <Icon {...p}>
      {/* she rocks on the water, hinged at the hull — never stops */}
      <motion.g variants={rockLoop} style={{ transformBox: "view-box", originX: "12px", originY: "21px" }}>
        <path d="M10 2v15" />
        <path d="M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z" />
        <path d="M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z" />
      </motion.g>
    </Icon>
  );
}

export const tentTreeBody = '  <circle cx="4" cy="4" r="2"/>\n  <path d="m14 5 3-3 3 3"/>\n  <path d="m14 10 3-3 3 3"/>\n  <path d="M17 14V2"/>\n  <path d="M17 14H7l-5 8h20Z"/>\n  <path d="M8 14v8"/>\n  <path d="m9 14 5 8"/>';
export function TentTree(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the camp builds: tent, then the tree rises with its branches, sun last */}
      <motion.circle cx="4" cy="4" r="2" variants={popIn} custom={0.85} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="m14 5 3-3 3 3" variants={drawFlow} custom={[0.72, 0.25]} />
      <motion.path d="m14 10 3-3 3 3" variants={drawFlow} custom={[0.62, 0.25]} />
      <motion.path d="M17 14V2" variants={drawRev} custom={[0.45, 0.35]} />
      <motion.path d="M17 14H7l-5 8h20Z" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M8 14v8" variants={drawFlow} custom={[0.3, 0.25]} />
      <motion.path d="m9 14 5 8" variants={drawFlow} custom={[0.38, 0.25]} />
    </Icon>
  );
}

export const ticketsBody = '  <path d="m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8"/>\n  <path d="M6 10V8"/>\n  <path d="M6 14v1"/>\n  <path d="M6 19v2"/>\n  <rect x="2" y="8" width="20" height="13" rx="2"/>';
export function Tickets(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the stack draws, then the perforation ticks flick in — torn along the line */}
      <motion.path d="m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8" variants={drawFlow} custom={[0.3, 0.4]} />
      <motion.path d="M6 10V8" variants={drawRev} custom={[0.6, 0.18]} />
      <motion.path d="M6 14v1" variants={drawFlow} custom={[0.68, 0.18]} />
      <motion.path d="M6 19v2" variants={drawFlow} custom={[0.76, 0.18]} />
      <motion.rect x="2" y="8" width="20" height="13" rx="2" variants={drawFlow} custom={[0, 0.5]} />
    </Icon>
  );
}

export const ticketsPlaneBody = '  <path d="M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12"/>\n  <path d="m12 13.5 3.794.506"/>\n  <path d="m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8"/>\n  <path d="M6 10V8"/>\n  <path d="M6 14v1"/>\n  <path d="M6 19v2"/>\n  <rect x="2" y="8" width="20" height="13" rx="2"/>';
export function TicketsPlane(p: IconProps) {
  return (
    <Icon {...p}>
      {/* ticket draws and tears, then the plane's flight line draws across it */}
      <motion.path d="M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12" variants={drawFlow} custom={[0.8, 0.35]} />
      <motion.path d="m12 13.5 3.794.506" variants={drawFlow} custom={[0.95, 0.2]} />
      <motion.path d="m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8" variants={drawFlow} custom={[0.3, 0.4]} />
      <motion.path d="M6 10V8" variants={drawRev} custom={[0.58, 0.18]} />
      <motion.path d="M6 14v1" variants={drawFlow} custom={[0.64, 0.18]} />
      <motion.path d="M6 19v2" variants={drawFlow} custom={[0.7, 0.18]} />
      <motion.rect x="2" y="8" width="20" height="13" rx="2" variants={drawFlow} custom={[0, 0.5]} />
    </Icon>
  );
}

export const towerControlBody = '  <path d="M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z"/>\n  <path d="M8 13v9"/>\n  <path d="M16 22v-9"/>\n  <path d="m9 6 1 7"/>\n  <path d="m15 6-1 7"/>\n  <path d="M12 6V2"/>\n  <path d="M13 2h-2"/>';
export function TowerControl(p: IconProps) {
  return (
    <Icon {...p}>
      {/* legs draw up, the cab lands, the mast rises, the beacon pulses */}
      <motion.path d="M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z" variants={drawFlow} custom={[0.25, 0.5]} />
      <motion.path d="M8 13v9" variants={drawRev} custom={[0, 0.35]} />
      <motion.path d="M16 22v-9" variants={drawFlow} custom={[0, 0.35]} />
      <motion.path d="m9 6 1 7" variants={drawRev} custom={[0.5, 0.25]} />
      <motion.path d="m15 6-1 7" variants={drawFlow} custom={[0.5, 0.25]} />
      <motion.path d="M12 6V2" variants={drawRev} custom={[0.62, 0.25]} />
      <motion.path d="M13 2h-2" variants={pulse} custom={0.88} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}
