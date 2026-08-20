"use client";

import { motion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { Icon } from "../icon.js";
import { drawFlow, drawRev, drawOn, growMiddle } from "../variants.js";
import { entranceSharp } from "../ease.js";
import type { IconProps } from "../types.js";

// Mail language: the envelope family shares one identity beat — the flap
// V-line draws first (the mail "seals"), then the badge glyph performs.
// Lids (trash, archive) are mechanical: lift, hang, clap shut, body clunk
// (the security-lock vocabulary). Arrows draw shaft-then-head along their
// travel. Ephemera (inbox's arriving letter) invisible at rest.
const E = "easeInOut";

function gm(delay = 0, duration = 0.5): Transition {
  return { duration, delay, ease: entranceSharp, opacity: { duration: 0.08, delay } };
}
const pulse: Variants = {
  normal: { scale: 1 },
  animate: (d: number = 0) => ({ scale: [1, 1.35, 1], transition: { duration: 0.35, delay: d, ease: E } }),
};
// softer pulse for anything sitting within ~1 unit of an edge: 1.35 flat-cuts
// the mail-badge rosette against the right edge (frame check)
const pulseSoft: Variants = {
  normal: { scale: 1 },
  animate: (d: number = 0) => ({ scale: [1, 1.18, 1], transition: { duration: 0.35, delay: d, ease: E } }),
};
const thump: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({ y: [0, -1, 0], transition: { duration: 0.25, delay: d, ease: E } }),
};
// mechanical lid: lifts, hangs a beat, claps shut. custom = lift distance,
// which must be ≤ the lid's headroom (its paint top to y0) or the lid is
// flat-cut at the top edge — trash's handle only has 1 unit of clearance.
const lidLift: Variants = {
  normal: { y: 0 },
  animate: (lift: number = 1.8) => ({
    y: [0, -lift, -lift, 0],
    transition: { duration: 0.75, ease: E, times: [0, 0.35, 0.6, 0.78] },
  }),
};
// the body takes the clap: a small dip right as the lid lands. custom=delay
const bodyClunk: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({
    y: [0, 0, 0.6, 0],
    transition: { duration: 0.75, delay: d, ease: E, times: [0, 0.75, 0.87, 1] },
  }),
};
// a purposeful surge along a direction, gliding back. custom=[dx, dy, delay]
const surge: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[] = []) => ({
    x: [0, c[0] ?? 0, 0],
    y: [0, c[1] ?? 0, 0],
    transition: { duration: 0.7, delay: c[2] ?? 0, ease: E },
  }),
};
// A shredder runs continuously: the document is drawn in over and over.
// The cycle CLOSES at 0 (= rest = source) so the loop never teleports, and
// the paper only ever rises ABOVE the slot — pressing it down shoved its
// round caps through the slot bar (frame check).
const feedLoop: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, -0.8, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: E, times: [0, 0.45, 1] },
  },
};
// a shredded strip being EXTRUDED: it grows downward out of the slot,
// detaches and fades, and the next one follows — the wifi-arc pulse-draw
// archetype applied to falling paper. custom=delay
const extrudeStrip: Variants = {
  normal: { pathLength: 1, pathOffset: 0, opacity: 1 },
  animate: (d: number = 0) => ({
    pathLength: [0, 1, 1],
    pathOffset: [1, 0, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      delay: d,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.6, 1],
    },
  }),
};
// the mailbox flag flips up from lying flat — you've got mail
const flagUp: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [-55, 6, 0], transition: { duration: 0.6, delay: 0.35, ease: E } },
};
// an ephemeral letter dropping into the inbox slot. custom=[dy, delay]
const letterDrop: Variants = {
  normal: { opacity: 0 },
  animate: (c: number[] = []) => ({
    y: [0, c[0] ?? 4],
    opacity: [0, 1, 1, 0],
    transition: {
      y: { duration: 0.5, delay: c[1] ?? 0, ease: "easeIn" },
      opacity: { duration: 0.5, delay: c[1] ?? 0, times: [0, 0.2, 0.75, 1] },
    },
  }),
};
// the tray dips to catch the letter. custom=delay
const catchDip: Variants = {
  normal: { y: 0 },
  animate: (d: number = 0) => ({ y: [0, 0.6, 0], transition: { duration: 0.3, delay: d, ease: E } }),
};

// the shared envelope flap beat
const FLAP = "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7";
const FLAP_SRC = '  <path d="' + FLAP + '"/>';

export const mailBody = '  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>\n  <rect x="2" y="4" width="20" height="16" rx="2"/>';
export function Mail(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the envelope seals: the flap V draws across */}
      <motion.path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" variants={drawFlow} custom={[0.05, 0.45]} />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </Icon>
  );
}

export const mailsBody = '  <path d="M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732"/>\n  <path d="m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5"/>\n  <rect x="7" y="3" width="15" height="12" rx="2"/>';
export function Mails(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the stack builds: back envelope draws in, front flap seals */}
      <motion.path d="M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5" variants={drawFlow} custom={[0.25, 0.4]} />
      <rect x="7" y="3" width="15" height="12" rx="2" />
    </Icon>
  );
}

export const mailOpenBody = '  <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/>\n  <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/>';
export function MailOpen(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
      {/* the fold draws down-and-out — opened */}
      <motion.path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" variants={drawFlow} custom={[0.1, 0.5]} />
    </Icon>
  );
}

export const mailCheckBody = '  <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/>\n' + FLAP_SRC + '\n  <path d="m16 19 2 2 4-4"/>';
export function MailCheck(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
      <motion.path d={FLAP} variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="m16 19 2 2 4-4" variants={drawOn} transition={{ duration: 0.45, delay: 0.45, ease: entranceSharp, opacity: { duration: 0.08, delay: 0.45 } }} />
    </Icon>
  );
}

export const mailMinusBody = '  <path d="M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/>\n' + FLAP_SRC + '\n  <path d="M16 19h6"/>';
export function MailMinus(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
      <motion.path d={FLAP} variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M16 19h6" variants={growMiddle} transition={gm(0.48, 0.3)} />
    </Icon>
  );
}

export const mailPlusBody = '  <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/>\n' + FLAP_SRC + '\n  <path d="M19 16v6"/>\n  <path d="M16 19h6"/>';
export function MailPlus(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
      <motion.path d={FLAP} variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M19 16v6" variants={growMiddle} transition={gm(0.58, 0.3)} />
      <motion.path d="M16 19h6" variants={growMiddle} transition={gm(0.48, 0.3)} />
    </Icon>
  );
}

export const mailXBody = '  <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9"/>\n' + FLAP_SRC + '\n  <path d="m17 17 4 4"/>\n  <path d="m21 17-4 4"/>';
export function MailX(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" />
      <motion.path d={FLAP} variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="m17 17 4 4" variants={growMiddle} transition={gm(0.48, 0.3)} />
      <motion.path d="m21 17-4 4" variants={growMiddle} transition={gm(0.58, 0.3)} />
    </Icon>
  );
}

export const mailWarningBody = '  <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"/>\n' + FLAP_SRC + '\n  <path d="M20 14v4"/>\n  <path d="M20 22v.01"/>';
export function MailWarning(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" />
      <motion.path d={FLAP} variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M20 14v4" variants={drawFlow} custom={[0.48, 0.25]} />
      <motion.path d="M20 22v.01" variants={thump} custom={0.72} />
    </Icon>
  );
}

export const mailQuestionMarkBody = '  <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"/>\n' + FLAP_SRC + '\n  <path d="M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"/>\n  <path d="M20 22v.01"/>';
export function MailQuestionMark(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" />
      <motion.path d={FLAP} variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2" variants={drawFlow} custom={[0.48, 0.35]} />
      <motion.path d="M20 22v.01" variants={thump} custom={0.85} />
    </Icon>
  );
}

export const mailSearchBody = '  <path d="M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5"/>\n' + FLAP_SRC + '\n  <path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>\n  <circle cx="18" cy="18" r="3"/>\n  <path d="m22 22-1.5-1.5"/>';
export function MailSearch(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5" />
      <motion.path d={FLAP} variants={drawFlow} custom={[0, 0.4]} />
      <path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <motion.circle cx="18" cy="18" r="3" variants={pulse} custom={0.5} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <motion.path d="m22 22-1.5-1.5" variants={drawFlow} custom={[0.62, 0.2]} />
    </Icon>
  );
}

export const mailBadgeBody = '  <path d="M22 7.7V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8.25"/>\n  <path d="M12 12.996a1.94 1.94 0 0 1-1.03-.296L2 7"/>\n  <path d="m20.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88"/>\n  <circle cx="19" cy="14" r="3"/>';
export function MailBadge(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M22 7.7V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8.25" />
      <motion.path d="M12 12.996a1.94 1.94 0 0 1-1.03-.296L2 7" variants={drawRev} custom={[0, 0.4]} />
      {/* the rosette pulses, its ribbon tails draw down */}
      <motion.path d="m20.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88" variants={drawFlow} custom={[0.6, 0.35]} />
      <motion.circle cx="19" cy="14" r="3" variants={pulseSoft} custom={0.48} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </Icon>
  );
}

export const inboxBody = '  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>\n  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>';
export function Inbox(p: IconProps) {
  return (
    <Icon {...p}>
      {/* you've got mail: a letter drops into the slot, the tray dips to catch */}
      <motion.polyline points="22 12 16 12 14 15 10 15 8 12 2 12" variants={catchDip} custom={0.42} />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <motion.path d="M10.5 7.5h3" variants={letterDrop} custom={[4.2, 0.08]} />
    </Icon>
  );
}

export const mailboxBody = '  <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/>\n  <polyline points="15,9 18,9 18,11"/>\n  <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2"/>\n  <line x1="6" x2="7" y1="10" y2="10"/>';
export function Mailbox(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
      {/* mail's here: the flag FLIPS UP, hinged where it meets the box */}
      <motion.polyline points="15,9 18,9 18,11" variants={flagUp} style={{ transformBox: "view-box", originX: "18px", originY: "11px" }} />
      <motion.path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2" variants={drawFlow} custom={[0, 0.4]} />
      <motion.line x1="6" x2="7" y1="10" y2="10" variants={thump} custom={0.4} />
    </Icon>
  );
}

export const archiveBody = '  <rect width="20" height="5" x="2" y="3" rx="1"/>\n  <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/>\n  <path d="M10 12h4"/>';
export function Archive(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the lid lifts, hangs, claps shut; the slot strikes at the clap */}
      <motion.rect width="20" height="5" x="2" y="3" rx="1" variants={lidLift} custom={1.8} />
      <motion.path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" variants={bodyClunk} custom={0} />
      <motion.path d="M10 12h4" variants={growMiddle} transition={gm(0.6, 0.25)} />
    </Icon>
  );
}

export const archiveRestoreBody = '  <rect width="20" height="5" x="2" y="3" rx="1"/>\n  <path d="M4 8v11a2 2 0 0 0 2 2h2"/>\n  <path d="M20 8v11a2 2 0 0 1-2 2h-2"/>\n  <path d="m9 15 3-3 3 3"/>\n  <path d="M12 12v9"/>';
export function ArchiveRestore(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.rect width="20" height="5" x="2" y="3" rx="1" variants={lidLift} custom={1.8} />
      <path d="M4 8v11a2 2 0 0 0 2 2h2" />
      <path d="M20 8v11a2 2 0 0 1-2 2h-2" />
      {/* the item surges up out of the box while the lid is open */}
      <motion.g variants={surge} custom={[0, -1.5, 0.2]}>
        <path d="m9 15 3-3 3 3" />
        <path d="M12 12v9" />
      </motion.g>
    </Icon>
  );
}

export const archiveXBody = '  <rect width="20" height="5" x="2" y="3" rx="1"/>\n  <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/>\n  <path d="m9.5 17 5-5"/>\n  <path d="m9.5 12 5 5"/>';
export function ArchiveX(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.rect width="20" height="5" x="2" y="3" rx="1" variants={lidLift} custom={1.8} />
      <motion.path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" variants={bodyClunk} custom={0} />
      <motion.path d="m9.5 17 5-5" variants={growMiddle} transition={gm(0.6, 0.28)} />
      <motion.path d="m9.5 12 5 5" variants={growMiddle} transition={gm(0.7, 0.28)} />
    </Icon>
  );
}

export const arrowsUpFromLineBody = '  <path d="m4 6 3-3 3 3"/>\n  <path d="M7 17V3"/>\n  <path d="m14 6 3-3 3 3"/>\n  <path d="M17 17V3"/>\n  <path d="M4 21h16"/>';
export function ArrowsUpFromLine(p: IconProps) {
  return (
    <Icon {...p}>
      {/* upload: the arrows surge up off the baseline, staggered */}
      <motion.g variants={surge} custom={[0, -1.6, 0]}>
        <path d="m4 6 3-3 3 3" />
        <path d="M7 17V3" />
      </motion.g>
      <motion.g variants={surge} custom={[0, -1.6, 0.18]}>
        <path d="m14 6 3-3 3 3" />
        <path d="M17 17V3" />
      </motion.g>
      <path d="M4 21h16" />
    </Icon>
  );
}

export const containerBody = '  <path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"/>\n  <path d="M10 21.9V14L2.1 9.1"/>\n  <path d="m10 14 11.9-6.9"/>\n  <path d="M14 19.8v-8.1"/>\n  <path d="M18 17.5V9.4"/>';
export function Container(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z" />
      {/* the container assembles: seam sweeps, then the ribs slot in */}
      <motion.path d="M10 21.9V14L2.1 9.1" variants={drawRev} custom={[0, 0.4]} />
      <motion.path d="m10 14 11.9-6.9" variants={drawFlow} custom={[0.2, 0.35]} />
      <motion.path d="M14 19.8v-8.1" variants={drawRev} custom={[0.42, 0.25]} />
      <motion.path d="M18 17.5V9.4" variants={drawRev} custom={[0.54, 0.25]} />
    </Icon>
  );
}

export const forwardBody = '  <path d="m15 17 5-5-5-5"/>\n  <path d="M4 18v-2a4 4 0 0 1 4-4h12"/>';
export function Forward(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the arrow travels: shaft flows toward the turn, head flicks out */}
      <motion.path d="m15 17 5-5-5-5" variants={drawFlow} custom={[0.32, 0.25]} />
      <motion.path d="M4 18v-2a4 4 0 0 1 4-4h12" variants={drawFlow} custom={[0, 0.4]} />
    </Icon>
  );
}

export const replyBody = '  <path d="M20 18v-2a4 4 0 0 0-4-4H4"/>\n  <path d="m9 17-5-5 5-5"/>';
export function Reply(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M20 18v-2a4 4 0 0 0-4-4H4" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="m9 17-5-5 5-5" variants={drawFlow} custom={[0.32, 0.25]} />
    </Icon>
  );
}

export const replyAllBody = '  <path d="m12 17-5-5 5-5"/>\n  <path d="M22 18v-2a4 4 0 0 0-4-4H7"/>\n  <path d="m7 17-5-5 5-5"/>';
export function ReplyAll(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="m12 17-5-5 5-5" variants={drawFlow} custom={[0.32, 0.25]} />
      <motion.path d="M22 18v-2a4 4 0 0 0-4-4H7" variants={drawFlow} custom={[0, 0.4]} />
      <motion.path d="m7 17-5-5 5-5" variants={drawFlow} custom={[0.42, 0.25]} />
    </Icon>
  );
}

export const paperclipBody = '  <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"/>';
export function Paperclip(p: IconProps) {
  return (
    <Icon {...p}>
      {/* one perfect signature: the clip draws itself end to end */}
      <motion.path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" variants={drawFlow} custom={[0, 0.85]} />
    </Icon>
  );
}

export const shredderBody = '  <path d="M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5"/>\n  <path d="M14 2v5a1 1 0 0 0 1 1h5"/>\n  <path d="M10 22v-5"/>\n  <path d="M14 19v-2"/>\n  <path d="M18 20v-3"/>\n  <path d="M2 13h20"/>\n  <path d="M6 20v-3"/>';
export function Shredder(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the machine runs: the document is drawn in again and again while the
          shredded strips stream out below in a staggered wave */}
      <motion.g variants={feedLoop}>
        <path d="M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      </motion.g>
      <motion.path d="M10 22v-5" variants={extrudeStrip} custom={0.35} />
      <motion.path d="M14 19v-2" variants={extrudeStrip} custom={0.7} />
      <motion.path d="M18 20v-3" variants={extrudeStrip} custom={1.05} />
      <path d="M2 13h20" />
      <motion.path d="M6 20v-3" variants={extrudeStrip} custom={0} />
    </Icon>
  );
}

export const trashBody = '  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>\n  <path d="M3 6h18"/>\n  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>';
export function Trash(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" variants={bodyClunk} custom={0} />
      {/* the lid (rim + handle as one) lifts, hangs, claps shut */}
      <motion.g variants={lidLift} custom={0.9}>
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </motion.g>
    </Icon>
  );
}

export const trash2Body = '  <path d="M10 11v6"/>\n  <path d="M14 11v6"/>\n  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>\n  <path d="M3 6h18"/>\n  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>';
export function Trash2(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 11v6" variants={thump} custom={0.62} />
      <motion.path d="M14 11v6" variants={thump} custom={0.68} />
      <motion.path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" variants={bodyClunk} custom={0} />
      <motion.g variants={lidLift} custom={0.9}>
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </motion.g>
    </Icon>
  );
}