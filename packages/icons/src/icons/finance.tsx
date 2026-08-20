"use client";

import { motion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { Icon } from "../icon.js";
import { drawFlow, drawRev, drawOn, growMiddle } from "../variants.js";
import { entranceSharp } from "../ease.js";
import type { IconProps } from "../types.js";

// Finance language: currency glyphs WRITE themselves in handwriting order —
// curves flow (drawFlow/drawRev), bars STRIKE in (growMiddle) — the same
// vocabulary as the math category. Containers (badges, rings, receipts,
// bills, wallets) stay static while the glyph performs. Dots pulse or thump,
// never vanish. Ephemera (the piggy-bank coin, the gem glint) are invisible
// at rest and may dissipate.
const E = "easeInOut";

function gm(delay = 0, duration = 0.5): Transition {
  return { duration, delay, ease: entranceSharp, opacity: { duration: 0.08, delay } };
}
// grow-only pulse for dots/coins that exist at rest. custom=delay
const pulse: Variants = {
  normal: { scale: 1 },
  animate: (d: number = 0) => ({ scale: [1, 1.35, 1], transition: { duration: 0.35, delay: d, ease: E } }),
};
// a grounded thump for h.01 marks. custom=delay
const thump: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({ y: [0, -1, 0], transition: { duration: 0.25, delay: d, ease: E } }),
};
// a coin bouncing once in place. custom=delay
const coinBounce: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({
    y: [0, -1.4, 0, -0.4, 0],
    transition: { duration: 0.6, delay: d, ease: E, times: [0, 0.3, 0.6, 0.8, 1] },
  }),
};
// a happy little hop for the whole subject. custom=delay
const hop: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({
    y: [0, -0.9, 0, -0.25, 0],
    transition: { duration: 0.55, delay: d, ease: E, times: [0, 0.3, 0.6, 0.8, 1] },
  }),
};
// the ephemeral coin: appears above the slot, drops in, gone. custom=[dy, delay]
const coinDrop: Variants = {
  normal: { opacity: 0 },
  animate: (c: number[] = []) => ({
    y: [0, c[0] ?? 3],
    opacity: [0, 1, 1, 0],
    transition: {
      y: { duration: 0.45, delay: c[1] ?? 0, ease: "easeIn" },
      opacity: { duration: 0.45, delay: c[1] ?? 0, times: [0, 0.2, 0.75, 1] },
    },
  }),
};
// the card swipe: slides through the reader, holds, returns with undershoot —
// slow enough to read (a 0.5s entranceSharp swipe was over in one frame)
const swipe: Variants = {
  normal: { x: 0 },
  animate: { x: [0, 0.6, 0.6, -0.2, 0], transition: { duration: 1, ease: E, times: [0, 0.25, 0.5, 0.78, 1] } },
};
// snap shut with a spring: presses down, holds, springs back. custom=delay
const snapShut: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({
    y: [0, 0.9, 0.9, -0.2, 0],
    transition: { duration: 0.9, delay: d, ease: E, times: [0, 0.25, 0.5, 0.78, 1] },
  }),
};
// a pour gesture: tips and rights. custom=degrees
const tiltOnce: Variants = {
  normal: { rotate: 0 },
  animate: (deg: number = -4) => ({
    rotate: [0, deg, deg * -0.5, 0],
    transition: { duration: 0.8, ease: E },
  }),
};
// soft glint ray fading in place. custom=[delay, dur]
const rayGlow: Variants = {
  normal: { opacity: 0 },
  animate: (c: number[] = []) => ({
    opacity: [0, 0.55, 0.55, 0],
    transition: { duration: c[1] ?? 0.9, delay: c[0] ?? 0, ease: E, times: [0, 0.3, 0.6, 1] },
  }),
};
// 4-ray sparkle from one point, equal steps (light-source language)
function Glint({ cx, cy, r0 = 0.7, r1 = 1.9, delay = 0.4 }: { cx: number; cy: number; r0?: number; r1?: number; delay?: number }) {
  return (
    <>
      {[45, 135, 225, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <motion.line key={i}
            x1={cx + Math.cos(rad) * r0} y1={cy + Math.sin(rad) * r0}
            x2={cx + Math.cos(rad) * r1} y2={cy + Math.sin(rad) * r1}
            strokeWidth={1.3}
            variants={rayGlow} custom={[delay + i * 0.02, 0.9]} />
        );
      })}
    </>
  );
}

export const dollarSignBody = '  <line x1="12" x2="12" y1="2" y2="22"/>\n  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>';
export function DollarSign(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the S writes, then the bar strikes down through it */}
      <motion.line x1="12" x2="12" y1="2" y2="22" variants={growMiddle} transition={gm(0.5, 0.4)} />
      <motion.path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" variants={drawFlow} custom={[0, 0.55]} />
    </Icon>
  );
}

export const euroBody = '  <path d="M4 10h12"/>\n  <path d="M4 14h9"/>\n  <path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/>';
export function Euro(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M4 10h12" variants={growMiddle} transition={gm(0.45, 0.35)} />
      <motion.path d="M4 14h9" variants={growMiddle} transition={gm(0.55, 0.35)} />
      <motion.path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" variants={drawFlow} custom={[0, 0.55]} />
    </Icon>
  );
}

export const poundSterlingBody = '  <path d="M18 7c0-5.333-8-5.333-8 0"/>\n  <path d="M10 7v14"/>\n  <path d="M6 21h12"/>\n  <path d="M6 13h10"/>';
export function PoundSterling(p: IconProps) {
  return (
    <Icon {...p}>
      {/* hook curls, stem drops, crossbar strikes, base underlines */}
      <motion.path d="M18 7c0-5.333-8-5.333-8 0" variants={drawRev} custom={[0, 0.35]} />
      <motion.path d="M10 7v14" variants={drawFlow} custom={[0.25, 0.35]} />
      <motion.path d="M6 21h12" variants={drawFlow} custom={[0.62, 0.3]} />
      <motion.path d="M6 13h10" variants={growMiddle} transition={gm(0.5, 0.3)} />
    </Icon>
  );
}

export const swissFrancBody = '  <path d="M10 21V3h8"/>\n  <path d="M6 16h9"/>\n  <path d="M10 9.5h7"/>';
export function SwissFranc(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 21V3h8" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M6 16h9" variants={growMiddle} transition={gm(0.55, 0.3)} />
      <motion.path d="M10 9.5h7" variants={growMiddle} transition={gm(0.45, 0.3)} />
    </Icon>
  );
}

export const japaneseYenBody = '  <path d="M12 9.5V21m0-11.5L6 3m6 6.5L18 3"/>\n  <path d="M6 15h12"/>\n  <path d="M6 11h12"/>';
export function JapaneseYen(p: IconProps) {
  return (
    <Icon {...p}>
      {/* multi-subpath d can't dash (Chromium quirk) — the Y renders as its
          3 strokes: arms write down into the junction, stem drops, bars strike */}
      <motion.path d="M12 9.5L6 3" variants={drawRev} custom={[0, 0.22]} />
      <motion.path d="M12 9.5L18 3" variants={drawRev} custom={[0.1, 0.22]} />
      <motion.path d="M12 9.5V21" variants={drawFlow} custom={[0.22, 0.3]} />
      <motion.path d="M6 15h12" variants={growMiddle} transition={gm(0.62, 0.3)} />
      <motion.path d="M6 11h12" variants={growMiddle} transition={gm(0.52, 0.3)} />
    </Icon>
  );
}

export const indianRupeeBody = '  <path d="M6 3h12"/>\n  <path d="M6 8h12"/>\n  <path d="m6 13 8.5 8"/>\n  <path d="M6 13h3"/>\n  <path d="M9 13c6.667 0 6.667-10 0-10"/>';
export function IndianRupee(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M6 3h12" variants={drawFlow} custom={[0, 0.25]} />
      <motion.path d="M6 8h12" variants={drawFlow} custom={[0.12, 0.25]} />
      {/* the leg strikes down-right last */}
      <motion.path d="m6 13 8.5 8" variants={drawFlow} custom={[0.55, 0.3]} />
      <motion.path d="M6 13h3" variants={drawFlow} custom={[0.45, 0.2]} />
      <motion.path d="M9 13c6.667 0 6.667-10 0-10" variants={drawRev} custom={[0.2, 0.35]} />
    </Icon>
  );
}

export const philippinePesoBody = '  <path d="M20 11H4"/>\n  <path d="M20 7H4"/>\n  <path d="M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7"/>';
export function PhilippinePeso(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M20 11H4" variants={growMiddle} transition={gm(0.55, 0.3)} />
      <motion.path d="M20 7H4" variants={growMiddle} transition={gm(0.45, 0.3)} />
      <motion.path d="M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7" variants={drawFlow} custom={[0, 0.55]} />
    </Icon>
  );
}

export const russianRubleBody = '  <path d="M6 11h8a4 4 0 0 0 0-8H9v18"/>\n  <path d="M6 15h8"/>';
export function RussianRuble(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M6 11h8a4 4 0 0 0 0-8H9v18" variants={drawFlow} custom={[0, 0.55]} />
      <motion.path d="M6 15h8" variants={growMiddle} transition={gm(0.6, 0.3)} />
    </Icon>
  );
}

export const turkishLiraBody = '  <path d="M15 4 5 9"/>\n  <path d="m15 8.5-10 5"/>\n  <path d="M18 12a9 9 0 0 1-9 9V3"/>';
export function TurkishLira(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M15 4 5 9" variants={growMiddle} transition={gm(0.5, 0.3)} />
      <motion.path d="m15 8.5-10 5" variants={growMiddle} transition={gm(0.6, 0.3)} />
      {/* stem writes top-down, then sweeps the bowl */}
      <motion.path d="M18 12a9 9 0 0 1-9 9V3" variants={drawRev} custom={[0, 0.55]} />
    </Icon>
  );
}

export const georgianLariBody = '  <path d="M11.5 21a7.5 7.5 0 1 1 7.35-9"/>\n  <path d="M13 12V3"/>\n  <path d="M4 21h16"/>\n  <path d="M9 12V3"/>';
export function GeorgianLari(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11.5 21a7.5 7.5 0 1 1 7.35-9" variants={drawRev} custom={[0.25, 0.45]} />
      <motion.path d="M13 12V3" variants={drawRev} custom={[0.12, 0.3]} />
      <motion.path d="M4 21h16" variants={drawFlow} custom={[0.62, 0.3]} />
      <motion.path d="M9 12V3" variants={drawRev} custom={[0, 0.3]} />
    </Icon>
  );
}

export const saudiRiyalBody = '  <path d="m20 19.5-5.5 1.2"/>\n  <path d="M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2"/>\n  <path d="m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2"/>\n  <path d="M20 10 4 13.5"/>';
export function SaudiRiyal(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the script writes stroke by stroke */}
      <motion.path d="m20 19.5-5.5 1.2" variants={drawFlow} custom={[0.55, 0.25]} />
      <motion.path d="M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2" variants={drawFlow} custom={[0.18, 0.4]} />
      <motion.path d="m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2" variants={drawRev} custom={[0, 0.45]} />
      <motion.path d="M20 10 4 13.5" variants={growMiddle} transition={gm(0.4, 0.35)} />
    </Icon>
  );
}

export const bitcoinBody = '  <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"/>';
export function Bitcoin(p: IconProps) {
  return (
    <Icon {...p}>
      {/* pathLength can't dash a multi-subpath d (Chromium normalization
          quirk — the whole glyph stays visible), so the ₿ renders as its 8
          subpaths, each writing in handwriting order: spine, bowls, ticks */}
      <motion.path d="M7.48 20.364l3.126-17.727" variants={drawFlow} custom={[0, 0.35]} />
      <motion.path d="M12.984 12.195c4.924.869 6.14-6.025 1.215-6.893" variants={drawFlow} custom={[0.25, 0.3]} />
      <motion.path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894" variants={drawFlow} custom={[0.4, 0.3]} />
      <motion.path d="M14.199 5.301L8.29 4.26" variants={drawFlow} custom={[0.3, 0.15]} />
      <motion.path d="M11.767 19.089L5.86 18.047" variants={drawFlow} custom={[0.5, 0.15]} />
      <motion.path d="M12.984 12.195l-3.94-.694" variants={drawFlow} custom={[0.45, 0.12]} />
      <motion.path d="M14.198 5.302l.348-1.97" variants={drawFlow} custom={[0.62, 0.12]} />
      <motion.path d="M11.768 19.089l-.347 1.97" variants={drawFlow} custom={[0.7, 0.12]} />
    </Icon>
  );
}

export const currencyBody = '  <circle cx="12" cy="12" r="8"/>\n  <line x1="3" x2="6" y1="3" y2="6"/>\n  <line x1="21" x2="18" y1="3" y2="6"/>\n  <line x1="3" x2="6" y1="21" y2="18"/>\n  <line x1="21" x2="18" y1="21" y2="18"/>';
export function Currency(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the coin inks round while the corner ticks strike outward in rotation */}
      <motion.circle cx="12" cy="12" r="8" variants={drawFlow} custom={[0, 0.55]} />
      <motion.line x1="3" x2="6" y1="3" y2="6" variants={growMiddle} transition={gm(0.35, 0.25)} />
      <motion.line x1="21" x2="18" y1="3" y2="6" variants={growMiddle} transition={gm(0.45, 0.25)} />
      <motion.line x1="3" x2="6" y1="21" y2="18" variants={growMiddle} transition={gm(0.65, 0.25)} />
      <motion.line x1="21" x2="18" y1="21" y2="18" variants={growMiddle} transition={gm(0.55, 0.25)} />
    </Icon>
  );
}

export const gemBody = '  <path d="M10.5 3 8 9l4 13 4-13-2.5-6"/>\n  <path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z"/>\n  <path d="M2 9h20"/>';
export function Gem(p: IconProps) {
  return (
    <Icon {...p}>
      {/* facets draw, then light glints off the table */}
      <motion.path d="M10.5 3 8 9l4 13 4-13-2.5-6" variants={drawFlow} custom={[0.3, 0.45]} />
      <path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z" />
      <motion.path d="M2 9h20" variants={growMiddle} transition={gm(0.15, 0.4)} />
      <Glint cx={17.8} cy={5.6} delay={0.75} />
    </Icon>
  );
}

export const handCoinsBody = '  <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/>\n  <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/>\n  <path d="m2 16 6 6"/>\n  <circle cx="16" cy="9" r="2.9"/>\n  <circle cx="6" cy="5" r="3"/>';
export function HandCoins(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
      <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 16 6 6" />
      {/* the coins bounce in the palm one after the other */}
      <motion.circle cx="16" cy="9" r="2.9" variants={coinBounce} custom={0.15} />
      <motion.circle cx="6" cy="5" r="3" variants={coinBounce} custom={0} />
    </Icon>
  );
}

export const piggyBankBody = '  <path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/>\n  <path d="M16 10h.01"/>\n  <path d="M2 8v1a2 2 0 0 0 2 2h1"/>';
export function PiggyBank(p: IconProps) {
  return (
    <Icon {...p}>
      {/* a coin drops into the slot, the pig gives a happy hop */}
      <motion.path d="M13 1.2h.01" variants={coinDrop} custom={[2.6, 0.05]} />
      <motion.g variants={hop} custom={0.4}>
        <path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" />
        <path d="M16 10h.01" />
        <path d="M2 8v1a2 2 0 0 0 2 2h1" />
      </motion.g>
    </Icon>
  );
}

export const creditCardBody = '  <rect width="20" height="14" x="2" y="5" rx="2"/>\n  <line x1="2" x2="22" y1="10" y2="10"/>';
export function CreditCard(p: IconProps) {
  return (
    <Icon {...p}>
      {/* THE SWIPE: the whole card snaps sideways and back */}
      <motion.g variants={swipe}>
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </motion.g>
    </Icon>
  );
}

export const walletBody = '  <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/>\n  <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>';
export function Wallet(p: IconProps) {
  return (
    <Icon {...p}>
      {/* snap shut: the wallet presses closed with a spring */}
      <motion.g variants={snapShut} custom={0}>
        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
      </motion.g>
    </Icon>
  );
}

export const walletMinimalBody = '  <path d="M17 14h.01"/>\n  <path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"/>';
export function WalletMinimal(p: IconProps) {
  return (
    <Icon {...p}>
      {/* outline draws round, the clasp button thumps */}
      <motion.path d="M17 14h.01" variants={thump} custom={0.55} />
      <motion.path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" variants={drawFlow} custom={[0, 0.55]} />
    </Icon>
  );
}

export const walletCardsBody = '  <path d="M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21"/>\n  <path d="M3 7h18"/>\n  <rect x="3" y="3" width="18" height="18" rx="2"/>';
export function WalletCards(p: IconProps) {
  return (
    <Icon {...p}>
      {/* frame static; top edge draws, then the card scallop slides in */}
      <motion.path d="M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21" variants={drawFlow} custom={[0.3, 0.45]} />
      <motion.path d="M3 7h18" variants={drawFlow} custom={[0.1, 0.35]} />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </Icon>
  );
}

// ---- Badges: badge static, glyph writes inside ----------------------------
const BADGE = "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z";
const BADGE_SRC = '  <path d="' + BADGE + '"/>';

export const badgeCentBody = BADGE_SRC + '\n  <path d="M12 7v10"/>\n  <path d="M15.4 10a4 4 0 1 0 0 4"/>';
export function BadgeCent(p: IconProps) {
  return (
    <Icon {...p}>
      <path d={BADGE} />
      <motion.path d="M12 7v10" variants={growMiddle} transition={gm(0.4, 0.35)} />
      <motion.path d="M15.4 10a4 4 0 1 0 0 4" variants={drawFlow} custom={[0, 0.4]} />
    </Icon>
  );
}

export const badgeDollarSignBody = BADGE_SRC + '\n  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>\n  <path d="M12 18V6"/>';
export function BadgeDollarSign(p: IconProps) {
  return (
    <Icon {...p}>
      <path d={BADGE} />
      <motion.path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" variants={drawFlow} custom={[0, 0.45]} />
      <motion.path d="M12 18V6" variants={growMiddle} transition={gm(0.42, 0.35)} />
    </Icon>
  );
}

export const badgeEuroBody = BADGE_SRC + '\n  <path d="M7 12h5"/>\n  <path d="M15 9.4a4 4 0 1 0 0 5.2"/>';
export function BadgeEuro(p: IconProps) {
  return (
    <Icon {...p}>
      <path d={BADGE} />
      <motion.path d="M7 12h5" variants={growMiddle} transition={gm(0.4, 0.3)} />
      <motion.path d="M15 9.4a4 4 0 1 0 0 5.2" variants={drawFlow} custom={[0, 0.4]} />
    </Icon>
  );
}

export const badgeIndianRupeeBody = BADGE_SRC + '\n  <path d="M8 8h8"/>\n  <path d="M8 12h8"/>\n  <path d="m13 17-5-1h1a4 4 0 0 0 0-8"/>';
export function BadgeIndianRupee(p: IconProps) {
  return (
    <Icon {...p}>
      <path d={BADGE} />
      <motion.path d="M8 8h8" variants={drawFlow} custom={[0, 0.2]} />
      <motion.path d="M8 12h8" variants={drawFlow} custom={[0.1, 0.2]} />
      <motion.path d="m13 17-5-1h1a4 4 0 0 0 0-8" variants={drawRev} custom={[0.2, 0.4]} />
    </Icon>
  );
}

export const badgeJapaneseYenBody = BADGE_SRC + '\n  <path d="m9 8 3 3v7"/>\n  <path d="m12 11 3-3"/>\n  <path d="M9 12h6"/>\n  <path d="M9 16h6"/>';
export function BadgeJapaneseYen(p: IconProps) {
  return (
    <Icon {...p}>
      <path d={BADGE} />
      <motion.path d="m9 8 3 3v7" variants={drawFlow} custom={[0, 0.35]} />
      <motion.path d="m12 11 3-3" variants={drawRev} custom={[0.12, 0.2]} />
      <motion.path d="M9 12h6" variants={growMiddle} transition={gm(0.4, 0.25)} />
      <motion.path d="M9 16h6" variants={growMiddle} transition={gm(0.5, 0.25)} />
    </Icon>
  );
}

export const badgePoundSterlingBody = BADGE_SRC + '\n  <path d="M8 12h4"/>\n  <path d="M10 16V9.5a2.5 2.5 0 0 1 5 0"/>\n  <path d="M8 16h7"/>';
export function BadgePoundSterling(p: IconProps) {
  return (
    <Icon {...p}>
      <path d={BADGE} />
      <motion.path d="M8 12h4" variants={growMiddle} transition={gm(0.4, 0.25)} />
      <motion.path d="M10 16V9.5a2.5 2.5 0 0 1 5 0" variants={drawRev} custom={[0, 0.4]} />
      <motion.path d="M8 16h7" variants={drawFlow} custom={[0.5, 0.25]} />
    </Icon>
  );
}

export const badgeRussianRubleBody = BADGE_SRC + '\n  <path d="M9 16h5"/>\n  <path d="M9 12h5a2 2 0 1 0 0-4h-3v9"/>';
export function BadgeRussianRuble(p: IconProps) {
  return (
    <Icon {...p}>
      <path d={BADGE} />
      <motion.path d="M9 16h5" variants={growMiddle} transition={gm(0.45, 0.25)} />
      <motion.path d="M9 12h5a2 2 0 1 0 0-4h-3v9" variants={drawFlow} custom={[0, 0.45]} />
    </Icon>
  );
}

export const badgeSwissFrancBody = BADGE_SRC + '\n  <path d="M11 17V8h4"/>\n  <path d="M11 12h3"/>\n  <path d="M9 16h4"/>';
export function BadgeSwissFranc(p: IconProps) {
  return (
    <Icon {...p}>
      <path d={BADGE} />
      <motion.path d="M11 17V8h4" variants={drawRev} custom={[0, 0.4]} />
      <motion.path d="M11 12h3" variants={growMiddle} transition={gm(0.4, 0.25)} />
      <motion.path d="M9 16h4" variants={growMiddle} transition={gm(0.5, 0.25)} />
    </Icon>
  );
}

export const badgeTurkishLiraBody = '  <path d="M11 7v10a5 5 0 0 0 5-5"/>\n  <path d="m15 8-6 3"/>\n  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76"/>';
export function BadgeTurkishLira(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11 7v10a5 5 0 0 0 5-5" variants={drawFlow} custom={[0, 0.45]} />
      <motion.path d="m15 8-6 3" variants={growMiddle} transition={gm(0.45, 0.25)} />
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76" />
    </Icon>
  );
}

// ---- Circles: ring static, glyph writes inside ----------------------------
export const circleDollarSignBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>\n  <path d="M12 18V6"/>';
export function CircleDollarSign(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      <motion.path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" variants={drawFlow} custom={[0, 0.45]} />
      <motion.path d="M12 18V6" variants={growMiddle} transition={gm(0.42, 0.35)} />
    </Icon>
  );
}

export const circleEuroBody = '  <path d="M15 9.4a4 4 0 1 0 0 5.2"/>\n  <path d="M7 12h5"/>\n  <circle cx="12" cy="12" r="10"/>';
export function CircleEuro(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M15 9.4a4 4 0 1 0 0 5.2" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M7 12h5" variants={growMiddle} transition={gm(0.4, 0.3)} />
      <circle cx="12" cy="12" r="10" />
    </Icon>
  );
}

export const circlePoundSterlingBody = '  <circle cx="12" cy="12" r="10"/>\n  <path d="M10 16V9.5a1 1 0 0 1 5 0"/>\n  <path d="M8 12h4"/>\n  <path d="M8 16h7"/>';
export function CirclePoundSterling(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      <motion.path d="M10 16V9.5a1 1 0 0 1 5 0" variants={drawRev} custom={[0, 0.4]} />
      <motion.path d="M8 12h4" variants={growMiddle} transition={gm(0.4, 0.25)} />
      <motion.path d="M8 16h7" variants={drawFlow} custom={[0.5, 0.25]} />
    </Icon>
  );
}

// ---- Banknotes: bill static, value beat, then the action ------------------
export const banknoteBody = '  <rect width="20" height="12" x="2" y="6" rx="2"/>\n  <circle cx="12" cy="12" r="2"/>\n  <path d="M6 12h.01M18 12h.01"/>';
export function Banknote(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="20" height="12" x="2" y="6" rx="2" />
      {/* cha-ching: the denomination pulses, the side marks thump */}
      <motion.circle cx="12" cy="12" r="2" variants={pulse} custom={0.1} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="M6 12h.01M18 12h.01" variants={thump} custom={0.3} />
    </Icon>
  );
}

export const banknoteArrowDownBody = '  <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/>\n  <path d="m16 19 3 3 3-3"/>\n  <path d="M18 12h.01"/>\n  <path d="M19 16v6"/>\n  <path d="M6 12h.01"/>\n  <circle cx="12" cy="12" r="2"/>';
export function BanknoteArrowDown(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
      {/* the transfer: shaft flows down, head lands */}
      <motion.path d="m16 19 3 3 3-3" variants={drawFlow} custom={[0.5, 0.25]} />
      <motion.path d="M18 12h.01" variants={thump} custom={0.3} />
      <motion.path d="M19 16v6" variants={drawFlow} custom={[0.35, 0.3]} />
      <motion.path d="M6 12h.01" variants={thump} custom={0.2} />
      <motion.circle cx="12" cy="12" r="2" variants={pulse} custom={0.05} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const banknoteArrowUpBody = '  <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/>\n  <path d="M18 12h.01"/>\n  <path d="M19 22v-6"/>\n  <path d="m22 19-3-3-3 3"/>\n  <path d="M6 12h.01"/>\n  <circle cx="12" cy="12" r="2"/>';
export function BanknoteArrowUp(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
      <motion.path d="M18 12h.01" variants={thump} custom={0.3} />
      {/* shaft flows up (path runs bottom→top from y22), head lands above */}
      <motion.path d="M19 22v-6" variants={drawFlow} custom={[0.35, 0.3]} />
      <motion.path d="m22 19-3-3-3 3" variants={drawFlow} custom={[0.5, 0.25]} />
      <motion.path d="M6 12h.01" variants={thump} custom={0.2} />
      <motion.circle cx="12" cy="12" r="2" variants={pulse} custom={0.05} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const banknoteCheckBody = '  <path d="M11.748 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4.875"/>\n  <path d="m16 19 2 2 4-4"/>\n  <path d="M18 12h.01"/>\n  <path d="M6 12h.01"/>\n  <circle cx="12" cy="12" r="2"/>';
export function BanknoteCheck(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M11.748 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4.875" />
      <motion.path d="m16 19 2 2 4-4" variants={drawOn} transition={{ duration: 0.45, delay: 0.42, ease: entranceSharp, opacity: { duration: 0.08, delay: 0.42 } }} />
      <motion.path d="M18 12h.01" variants={thump} custom={0.25} />
      <motion.path d="M6 12h.01" variants={thump} custom={0.15} />
      <motion.circle cx="12" cy="12" r="2" variants={pulse} custom={0} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const banknoteXBody = '  <path d="M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/>\n  <path d="m17 17 5 5"/>\n  <path d="M18 12h.01"/>\n  <path d="m22 17-5 5"/>\n  <path d="M6 12h.01"/>\n  <circle cx="12" cy="12" r="2"/>';
export function BanknoteX(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
      <motion.path d="m17 17 5 5" variants={growMiddle} transition={gm(0.42, 0.3)} />
      <motion.path d="M18 12h.01" variants={thump} custom={0.25} />
      <motion.path d="m22 17-5 5" variants={growMiddle} transition={gm(0.52, 0.3)} />
      <motion.path d="M6 12h.01" variants={thump} custom={0.15} />
      <motion.circle cx="12" cy="12" r="2" variants={pulse} custom={0} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

// ---- Receipts: paper static, the amount writes ----------------------------
const RCPT = "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z";
const RCPT_SRC = '  <path d="' + RCPT + '"/>';

export const receiptBody = '  <path d="M12 17V7"/>\n  <path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/>\n' + RCPT_SRC;
export function Receipt(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 17V7" variants={growMiddle} transition={gm(0.42, 0.35)} />
      <motion.path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8" variants={drawFlow} custom={[0, 0.45]} />
      <path d={RCPT} />
    </Icon>
  );
}

export const receiptCentBody = '  <path d="M12 7v10"/>\n  <path d="M14.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0"/>\n' + RCPT_SRC;
export function ReceiptCent(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 7v10" variants={growMiddle} transition={gm(0.4, 0.35)} />
      <motion.path d="M14.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0" variants={drawFlow} custom={[0, 0.4]} />
      <path d={RCPT} />
    </Icon>
  );
}

export const receiptEuroBody = '  <path d="M15.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0"/>\n' + RCPT_SRC + '\n  <path d="M8 12h5"/>';
export function ReceiptEuro(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M15.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0" variants={drawFlow} custom={[0, 0.4]} />
      <path d={RCPT} />
      <motion.path d="M8 12h5" variants={growMiddle} transition={gm(0.4, 0.3)} />
    </Icon>
  );
}

export const receiptIndianRupeeBody = RCPT_SRC + '\n  <path d="M8 11h8"/>\n  <path d="M8 7h8"/>\n  <path d="M9 7a4 4 0 0 1 0 8H8l3 2"/>';
export function ReceiptIndianRupee(p: IconProps) {
  return (
    <Icon {...p}>
      <path d={RCPT} />
      <motion.path d="M8 11h8" variants={drawFlow} custom={[0.12, 0.2]} />
      <motion.path d="M8 7h8" variants={drawFlow} custom={[0, 0.2]} />
      <motion.path d="M9 7a4 4 0 0 1 0 8H8l3 2" variants={drawFlow} custom={[0.24, 0.4]} />
    </Icon>
  );
}

export const receiptJapaneseYenBody = '  <path d="m12 10 3-3"/>\n' + RCPT_SRC + '\n  <path d="M9 11h6"/>\n  <path d="M9 15h6"/>\n  <path d="m9 7 3 3v7"/>';
export function ReceiptJapaneseYen(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="m12 10 3-3" variants={drawRev} custom={[0.12, 0.2]} />
      <path d={RCPT} />
      <motion.path d="M9 11h6" variants={growMiddle} transition={gm(0.4, 0.25)} />
      <motion.path d="M9 15h6" variants={growMiddle} transition={gm(0.5, 0.25)} />
      <motion.path d="m9 7 3 3v7" variants={drawFlow} custom={[0, 0.35]} />
    </Icon>
  );
}

export const receiptPoundSterlingBody = '  <path d="M10 17V9.5a1 1 0 0 1 5 0"/>\n' + RCPT_SRC + '\n  <path d="M8 13h5"/>\n  <path d="M8 17h7"/>';
export function ReceiptPoundSterling(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 17V9.5a1 1 0 0 1 5 0" variants={drawRev} custom={[0, 0.4]} />
      <path d={RCPT} />
      <motion.path d="M8 13h5" variants={growMiddle} transition={gm(0.4, 0.25)} />
      <motion.path d="M8 17h7" variants={drawFlow} custom={[0.5, 0.25]} />
    </Icon>
  );
}

export const receiptRussianRubleBody = RCPT_SRC + '\n  <path d="M8 11h5a2 2 0 0 0 0-4h-3v10"/>\n  <path d="M8 15h5"/>';
export function ReceiptRussianRuble(p: IconProps) {
  return (
    <Icon {...p}>
      <path d={RCPT} />
      <motion.path d="M8 11h5a2 2 0 0 0 0-4h-3v10" variants={drawFlow} custom={[0, 0.45]} />
      <motion.path d="M8 15h5" variants={growMiddle} transition={gm(0.5, 0.25)} />
    </Icon>
  );
}

export const receiptSwissFrancBody = '  <path d="M10 11h4"/>\n  <path d="M10 17V7h5"/>\n' + RCPT_SRC + '\n  <path d="M8 15h5"/>';
export function ReceiptSwissFranc(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 11h4" variants={growMiddle} transition={gm(0.4, 0.25)} />
      <motion.path d="M10 17V7h5" variants={drawRev} custom={[0, 0.4]} />
      <path d={RCPT} />
      <motion.path d="M8 15h5" variants={growMiddle} transition={gm(0.5, 0.25)} />
    </Icon>
  );
}

export const receiptTextBody = '  <path d="M13 16H8"/>\n  <path d="M14 8H8"/>\n  <path d="M16 12H8"/>\n' + RCPT_SRC;
export function ReceiptText(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the lines print in top-down */}
      <motion.path d="M13 16H8" variants={drawRev} custom={[0.3, 0.25]} />
      <motion.path d="M14 8H8" variants={drawRev} custom={[0, 0.25]} />
      <motion.path d="M16 12H8" variants={drawRev} custom={[0.15, 0.25]} />
      <path d={RCPT} />
    </Icon>
  );
}

export const receiptTurkishLiraBody = '  <path d="M10 7v10a5 5 0 0 0 5-5"/>\n  <path d="m14 8-6 3"/>\n' + RCPT_SRC;
export function ReceiptTurkishLira(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 7v10a5 5 0 0 0 5-5" variants={drawFlow} custom={[0, 0.45]} />
      <motion.path d="m14 8-6 3" variants={growMiddle} transition={gm(0.45, 0.25)} />
      <path d={RCPT} />
    </Icon>
  );
}