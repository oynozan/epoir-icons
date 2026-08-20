"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Icon } from "../icon.js";
import { DrawSlash } from "../slash.js";
import type { IconProps } from "../types.js";
import { drawFlow } from "../variants.js";

// No fade (opacity) and no shrink (scale below 1) anywhere.
// Motion is translation, 2D and 3D rotation, and honest path drawing.
const E = "easeInOut";
const R = { ease: E } as const;

const eqUp: Variants = {
  normal: { scaleY: 1 },
  animate: (c: number[]) => ({ scaleY: [1, c[0], 1], transition: { duration: c[1], delay: c[2], ...R } }),
};
// waveform amplitude swells like the sound getting louder (grows, never
// shrinks below rest; peaks capped so the tall columns stay inside the viewBox)
const wavePulse: Variants = {
  normal: { scaleY: 1 },
  animate: { scaleY: [1, 1.12, 1.03, 1.08, 1], transition: { duration: 1, ...R } },
};
const nod: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -8, 8, 0], transition: { duration: 1, ...R } },
};
const nudge: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[]) => ({ x: [0, c[0], 0], y: [0, c[1], 0], transition: { duration: 0.8, ...R } }),
};
const waveOut: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[]) => ({ x: [0, c[0], 0], y: [0, c[1], 0], transition: { duration: c[2], delay: c[3], ...R } }),
};
const ring: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -12, 10, -7, 4, -2, 0], transition: { duration: 0.9, ...R } },
};
const xShake: Variants = {
  normal: { x: 0 },
  animate: { x: [0, -2.5, 2.5, -1.5, 0], transition: { duration: 0.6, ...R } },
};
const plusBounce: Variants = {
  normal: { y: 0 },
  animate: { y: [0, -3, 0, -1.4, 0], transition: { duration: 0.7, ...R } },
};
// fist shake-pump: small rise (knuckles already touch the viewBox top) with a
// defiant rotate carrying the energy
const pump: Variants = {
  normal: { y: 0, rotate: 0 },
  animate: {
    y: [0, -1, 0, -0.5, 0],
    rotate: [0, -6, 3, -2, 0],
    transition: { duration: 0.8, ...R },
  },
};
const shakeHands: Variants = {
  normal: { y: 0 },
  animate: { y: [0, -2.6, 2.6, -1.5, 0], transition: { duration: 0.75, ...R } },
};
const earsWiggle: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -9, 9, -5, 0], transition: { duration: 0.9, ...R } },
};
const radarSweep: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, 360], transition: { duration: 1.9, ease: "linear" } },
};
const cctvPan: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -7, 7, 0], transition: { duration: 1.7, ...R } },
};
// quicker, shallower pan for cctv-off so the slash can draw after it settles
const cctvPanOff: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -5, 5, 0], transition: { duration: 0.8, ...R } },
};
const spotSweep: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, 9, -9, 0], transition: { duration: 1.6, ...R } },
};
// the speaker grips the lectern and rocks it during an emphatic point
const lecternRock: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -4, 2.5, -1, 0], transition: { duration: 0.9, ...R } },
};
const beamOut: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[]) => ({ x: [0, c[0], 0], y: [0, c[1], 0], transition: { duration: 0.8, delay: c[2], ...R } }),
};
const scan: Variants = {
  normal: { x: 0 },
  animate: { x: [0, -2.5, 2.5, 0], transition: { duration: 1.4, ...R } },
};
const micNod: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -9, 9, -5, 0], transition: { duration: 0.9, ...R } },
};
const snap: Variants = {
  normal: { y: 0, rotate: 0 },
  animate: { y: [0, -2.5, 0], rotate: [0, -5, 3, 0], transition: { duration: 0.6, ...R } },
};
const videoZoom: Variants = {
  normal: { x: 0 },
  animate: { x: [0, 1.8, 0], transition: { duration: 0.9, ...R } },
};
const speakerPush: Variants = {
  normal: { x: 0 },
  animate: { x: [0, 2.6, 0, 1.6, 0], transition: { duration: 0.6, ...R } },
};
const tabPoke: Variants = {
  normal: { x: 0 },
  animate: (c: number) => ({ x: [0, 2.5, 0], transition: { duration: 0.6, delay: c, ...R } }),
};
const pinFlow: Variants = {
  normal: { y: 0 },
  animate: (c: number) => ({ y: [0, -1.8, 0], transition: { duration: 0.6, delay: c, ...R } }),
};
const flyOut: Variants = {
  normal: { x: 0, y: 0 },
  animate: (c: number[]) => ({ x: [0, -c[0] * 0.22, c[0], 0], y: [0, -c[1] * 0.22, c[1], 0], transition: { duration: 1.1, ...R } }),
};
const recWobble: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -8, 8, -4, 0], transition: { duration: 0.9, ...R } },
};

// real 3D rotation with perspective (perspective set per element via style)
const spin3D: Variants = {
  normal: { rotateY: 0 },
  animate: { rotateY: [0, 360], transition: { duration: 1.7, ease: "linear" } },
};
const flip3D: Variants = {
  normal: { rotateY: 0 },
  animate: { rotateY: [0, 360], transition: { duration: 1.7, ease: "linear" } },
};
const openCover3D: Variants = {
  normal: { rotateY: 0 },
  animate: { rotateY: [0, -48, 0], transition: { duration: 1.4, ...R } },
};
const turnBoard3D: Variants = {
  normal: { rotateY: 0 },
  animate: { rotateY: [0, -32, 0], transition: { duration: 1.4, ...R } },
};
// fresh news slides in from the left, staggered, like it is being printed
const printIn: Variants = {
  normal: { x: 0 },
  animate: (c: number) => ({ x: [-3.5, 0], transition: { duration: 0.5, delay: c, ...R } }),
};
const cardTilt3D: Variants = {
  normal: { rotateY: 0 },
  animate: { rotateY: [0, -26, 0, 26, 0], transition: { duration: 1.8, ...R } },
};
const orbit: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, 360], transition: { duration: 0.85, ease: "linear" } },
};

export const antennaBody = '  <path d="M2 12 7 2"/>\n  <path d="m7 12 5-10"/>\n  <path d="m12 12 5-10"/>\n  <path d="m17 12 5-10"/>\n  <path d="M4.5 7h15"/>\n  <path d="M12 16v6"/>';
export function Antenna(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={earsWiggle}>
        <path d="M2 12 7 2" />
        <path d="m7 12 5-10" />
        <path d="m12 12 5-10" />
        <path d="m17 12 5-10" />
        <path d="M4.5 7h15" />
      </motion.g>
      <path d="M12 16v6" />
    </Icon>
  );
}

export const audioLinesBody = '  <path d="M2 10v3"/>\n  <path d="M6 6v11"/>\n  <path d="M10 3v18"/>\n  <path d="M14 8v7"/>\n  <path d="M18 5v13"/>\n  <path d="M22 10v3"/>';
export function AudioLines(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M2 10v3" variants={eqUp} custom={[1.6, 0.6, 0]} style={{ originY: 1 }} />
      <motion.path d="M6 6v11" variants={eqUp} custom={[1.4, 0.8, 0.1]} style={{ originY: 1 }} />
      {/* tall bars capped so their peaks stay inside the 24px viewBox */}
      <motion.path d="M10 3v18" variants={eqUp} custom={[1.1, 0.7, 0.05]} style={{ originY: 1 }} />
      <motion.path d="M14 8v7" variants={eqUp} custom={[1.7, 0.9, 0.15]} style={{ originY: 1 }} />
      <motion.path d="M18 5v13" variants={eqUp} custom={[1.3, 0.65, 0.08]} style={{ originY: 1 }} />
      <motion.path d="M22 10v3" variants={eqUp} custom={[1.6, 0.75, 0.12]} style={{ originY: 1 }} />
    </Icon>
  );
}

export const audioWaveformBody = '  <path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2"/>';
export function AudioWaveform(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" variants={wavePulse} />
    </Icon>
  );
}

export const bookUserBody = '  <path d="M15 13a3 3 0 1 0-6 0"/>\n  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>\n  <circle cx="12" cy="8" r="2"/>';
export function BookUser(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={nod} style={{ originX: 0.5, originY: 0.714 }}>
        <path d="M15 13a3 3 0 1 0-6 0" />
        <circle cx="12" cy="8" r="2" />
      </motion.g>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
    </Icon>
  );
}

export const cameraBody = '  <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/>\n  <circle cx="12" cy="13" r="3"/>';
export function Camera(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={snap}>
        <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
        <circle cx="12" cy="13" r="3" />
      </motion.g>
    </Icon>
  );
}

export const cameraOffBody = '  <path d="M14.564 14.558a3 3 0 1 1-4.122-4.121"/>\n  <path d="m2 2 20 20"/>\n  <path d="M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175"/>\n  <path d="M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344"/>';
export function CameraOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={snap}>
        <path d="M14.564 14.558a3 3 0 1 1-4.122-4.121" />
        <path d="M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175" />
        <path d="M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344" />
      </motion.g>
      {/* slash waits for the snap to settle so the notches stay registered */}
      <DrawSlash d="m2 2 20 20" delay={0.65} />
    </Icon>
  );
}

export const cardSimBody = '  <path d="M12 14v4"/>\n  <path d="M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>\n  <path d="M8 14h8"/>\n  <rect x="8" y="10" width="8" height="8" rx="1"/>';
export function CardSim(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={cardTilt3D} style={{ transformPerspective: 600 }}>
        <path d="M12 14v4" />
        <path d="M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        <path d="M8 14h8" />
        <rect x="8" y="10" width="8" height="8" rx="1" />
      </motion.g>
    </Icon>
  );
}

export const cassetteTapeBody = '  <rect width="20" height="16" x="2" y="4" rx="2"/>\n  <circle cx="8" cy="10" r="2"/>\n  <path d="M8 12h8"/>\n  <circle cx="16" cy="10" r="2"/>\n  <path d="m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3"/>';
// the shell holds still; the tape spools from the left reel onto the right —
// the visible motion a cassette actually makes at this size
export function CassetteTape(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <circle cx="8" cy="10" r="2" />
      <motion.path d="M8 12h8" variants={drawFlow} custom={[0.05, 0.6]} />
      <circle cx="16" cy="10" r="2" />
      <path d="m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3" />
    </Icon>
  );
}

export const cctvBody = '  <path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97"/>\n  <path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z"/>\n  <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15"/>\n  <path d="M2 21v-4"/>\n  <path d="M7 9h.01"/>';
export function Cctv(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={cctvPan} style={{ originX: 0.32, originY: 0.77 }}>
        <path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" />
        <path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" />
        <path d="M7 9h.01" />
      </motion.g>
      <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" />
      <path d="M2 21v-4" />
    </Icon>
  );
}

export const cctvOffBody = '  <path d="m12.309 6.652 4.797 2.401a1 1 0 0 1 .447 1.341l-.501 1.001.605.605h2.725a1 1 0 0 1 .894 1.447l-.724 1.448"/>\n  <path d="m15.166 15.166-.719 1.439a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.9 2.9 0 0 1 .873-1.037"/>\n  <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1l1.441-2.902"/>\n  <path d="m2 2 20 20"/>\n  <path d="M2 21v-4"/>\n  <path d="M7 9h.01"/>';
export function CctvOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={cctvPanOff} style={{ originX: 0.3, originY: 0.7 }}>
        <path d="m12.309 6.652 4.797 2.401a1 1 0 0 1 .447 1.341l-.501 1.001.605.605h2.725a1 1 0 0 1 .894 1.447l-.724 1.448" />
        <path d="m15.166 15.166-.719 1.439a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.9 2.9 0 0 1 .873-1.037" />
        <path d="M7 9h.01" />
      </motion.g>
      <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1l1.441-2.902" />
      {/* slash waits for the pan to settle so the notches stay registered */}
      <DrawSlash d="m2 2 20 20" delay={0.85} />
      <path d="M2 21v-4" />
    </Icon>
  );
}

export const chevronsLeftRightEllipsisBody = '  <path d="M12 12h.01"/>\n  <path d="M16 12h.01"/>\n  <path d="m17 7 5 5-5 5"/>\n  <path d="m7 7-5 5 5 5"/>\n  <path d="M8 12h.01"/>';
export function ChevronsLeftRightEllipsis(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 12h.01" variants={pinFlow} custom={0.15} />
      <motion.path d="M16 12h.01" variants={pinFlow} custom={0.3} />
      <motion.path d="m17 7 5 5-5 5" variants={nudge} custom={[2, 0]} />
      <motion.path d="m7 7-5 5 5 5" variants={nudge} custom={[-2, 0]} />
      <motion.path d="M8 12h.01" variants={pinFlow} custom={0} />
    </Icon>
  );
}

export const circleFadingPlusBody = '  <path d="M12 2a10 10 0 0 1 7.38 16.75"/>\n  <path d="M12 8v8"/>\n  <path d="M16 12H8"/>\n  <path d="M2.5 8.875a10 10 0 0 0-.5 3"/>\n  <path d="M2.83 16a10 10 0 0 0 2.43 3.4"/>\n  <path d="M4.636 5.235a10 10 0 0 1 .891-.857"/>\n  <path d="M8.644 21.42a10 10 0 0 0 7.631-.38"/>';
export function CircleFadingPlus(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={orbit}>
        <rect width="24" height="24" fill="none" stroke="none" />
        <path d="M12 2a10 10 0 0 1 7.38 16.75" />
        <path d="M2.5 8.875a10 10 0 0 0-.5 3" />
        <path d="M2.83 16a10 10 0 0 0 2.43 3.4" />
        <path d="M4.636 5.235a10 10 0 0 1 .891-.857" />
        <path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />
      </motion.g>
      <motion.g variants={plusBounce}>
        <path d="M12 8v8" />
        <path d="M16 12H8" />
      </motion.g>
    </Icon>
  );
}

export const contactBody = '  <path d="M16 2v2"/>\n  <path d="M7 21v-2a2 2 0 012-2h6a2 2 0 012 2v2"/>\n  <path d="M8 2v2"/>\n  <circle cx="12" cy="10" r="3"/>\n  <rect x="3" y="3" width="18" height="18" rx="2"/>';
export function Contact(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M16 2v2" />
      <motion.g variants={nod}>
        <path d="M7 21v-2a2 2 0 012-2h6a2 2 0 012 2v2" />
        <circle cx="12" cy="10" r="3" />
      </motion.g>
      <path d="M8 2v2" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </Icon>
  );
}

export const contactRoundBody = '  <path d="M16 2v2"/>\n  <path d="M17.915 21a6 6 0 10-12 0"/>\n  <path d="M8 2v2"/>\n  <circle cx="12" cy="11" r="4"/>\n  <rect x="3" y="3" width="18" height="18" rx="2"/>';
export function ContactRound(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M16 2v2" />
      <motion.g variants={nod}>
        <path d="M17.915 21a6 6 0 10-12 0" />
        <circle cx="12" cy="11" r="4" />
      </motion.g>
      <path d="M8 2v2" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </Icon>
  );
}

export const ethernetPortBody = '  <path d="M10 8v1"/>\n  <path d="M14 8v1"/>\n  <path d="M18 8v1"/>\n  <path d="M19 17a2 2 0 00-1.765 1.059l-.47.882A2 2 0 0115 20H9a2 2 0 01-1.765-1.059l-.47-.882A2 2 0 005 17H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v9a2 2 0 01-2 2z"/>\n  <path d="M6 8v1"/>';
export function EthernetPort(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 8v1" variants={pinFlow} custom={0.1} />
      <motion.path d="M14 8v1" variants={pinFlow} custom={0.2} />
      <motion.path d="M18 8v1" variants={pinFlow} custom={0.3} />
      <path d="M19 17a2 2 0 00-1.765 1.059l-.47.882A2 2 0 0115 20H9a2 2 0 01-1.765-1.059l-.47-.882A2 2 0 005 17H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v9a2 2 0 01-2 2z" />
      <motion.path d="M6 8v1" variants={pinFlow} custom={0} />
    </Icon>
  );
}

export const handFistBody = '  <path d="M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0"/>\n  <path d="M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5"/>\n  <path d="M9 5A2 2 0 1 0 5 5V10"/>\n  <path d="M9 7V4A2 2 0 1 1 13 4V7.268"/>';
export function HandFist(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={pump} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d="M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0" />
        <path d="M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5" />
        <path d="M9 5A2 2 0 1 0 5 5V10" />
        <path d="M9 7V4A2 2 0 1 1 13 4V7.268" />
      </motion.g>
    </Icon>
  );
}

export const handshakeBody = '  <path d="m11 17 2 2a1 1 0 1 0 3-3"/>\n  <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>\n  <path d="m21 3 1 11h-2"/>\n  <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>\n  <path d="M3 4h8"/>';
export function Handshake(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={shakeHands}>
        <path d="m11 17 2 2a1 1 0 1 0 3-3" />
        <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
        <path d="m21 3 1 11h-2" />
        <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
        <path d="M3 4h8" />
      </motion.g>
    </Icon>
  );
}

export const headphoneOffBody = '  <path d="M21 14h-1.343"/>\n  <path d="M9.128 3.47A9 9 0 0 1 21 12v3.343"/>\n  <path d="m2 2 20 20"/>\n  <path d="M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3"/>\n  <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364"/>';
export function HeadphoneOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={recWobble}>
        <path d="M21 14h-1.343" />
        <path d="M9.128 3.47A9 9 0 0 1 21 12v3.343" />
        <path d="M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3" />
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364" />
      </motion.g>
      <DrawSlash d="m2 2 20 20" />
    </Icon>
  );
}

export const lecternBody = '  <path d="M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3"/>\n  <path d="M18 6V3a1 1 0 0 0-1-1h-3"/>\n  <rect width="8" height="12" x="8" y="10" rx="1"/>';
export function Lectern(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={lecternRock} style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}>
        <path d="M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3" />
        <path d="M18 6V3a1 1 0 0 0-1-1h-3" />
        <rect width="8" height="12" x="8" y="10" rx="1" />
      </motion.g>
    </Icon>
  );
}

export const micBody = '  <path d="M12 19v3"/>\n  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>\n  <rect x="9" y="2" width="6" height="13" rx="3"/>';
export function Mic(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={micNod} style={{ originX: 0.5, originY: 1 }}>
        <path d="M12 19v3" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <rect x="9" y="2" width="6" height="13" rx="3" />
      </motion.g>
    </Icon>
  );
}

export const micAudioLinesBody = '  <path d="M10 3v2.341"/>\n  <path d="M12 17v4"/>\n  <path d="M14 5v.341"/>\n  <path d="M18 5v13"/>\n  <path d="M2 10v3"/>\n  <path d="M22 10v3"/>\n  <path d="M6 6v11"/>\n  <path d="M9 21h6"/>\n  <rect width="4" height="8" x="10" y="9" rx="2"/>';
export function MicAudioLines(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 3v2.341" variants={eqUp} custom={[1.8, 0.6, 0.05]} style={{ originY: 1 }} />
      <path d="M12 17v4" />
      <motion.path d="M14 5v.341" variants={eqUp} custom={[2.4, 0.55, 0.15]} style={{ originY: 1 }} />
      <motion.path d="M18 5v13" variants={eqUp} custom={[1.3, 0.7, 0.08]} style={{ originY: 1 }} />
      <motion.path d="M2 10v3" variants={eqUp} custom={[1.5, 0.65, 0]} style={{ originY: 1 }} />
      <motion.path d="M22 10v3" variants={eqUp} custom={[1.5, 0.75, 0.12]} style={{ originY: 1 }} />
      <motion.path d="M6 6v11" variants={eqUp} custom={[1.3, 0.8, 0.1]} style={{ originY: 1 }} />
      <path d="M9 21h6" />
      <rect width="4" height="8" x="10" y="9" rx="2" />
    </Icon>
  );
}

export const micOffBody = '  <path d="M12 19v3"/>\n  <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/>\n  <path d="M16.95 16.95A7 7 0 0 1 5 12v-2"/>\n  <path d="M18.89 13.23A7 7 0 0 0 19 12v-2"/>\n  <path d="m2 2 20 20"/>\n  <path d="M9 9v3a3 3 0 0 0 5.12 2.12"/>';
export function MicOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={micNod} style={{ originX: 0.5, originY: 1 }}>
        <path d="M12 19v3" />
        <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
        <path d="M16.95 16.95A7 7 0 0 1 5 12v-2" />
        <path d="M18.89 13.23A7 7 0 0 0 19 12v-2" />
        <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
      </motion.g>
      <DrawSlash d="m2 2 20 20" />
    </Icon>
  );
}

export const micSignalBody = '  <path d="M12 17v4"/>\n  <path d="M18 11a6 6 0 00-3-5.197"/>\n  <path d="M2 11a10 10 0 015-8.662"/>\n  <path d="M22 11a10 10 0 00-5-8.662"/>\n  <path d="M6 11a6 6 0 013-5.197"/>\n  <path d="M9 21h6"/>\n  <rect x="10" y="9" width="4" height="8" rx="2"/>';
export function MicSignal(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 17v4" />
      {/* pulse amplitudes halved so the outer arcs' round caps stay inside the viewBox */}
      <motion.path d="M18 11a6 6 0 00-3-5.197" variants={waveOut} custom={[0.75, -0.5, 0.8, 0]} />
      <motion.path d="M2 11a10 10 0 015-8.662" variants={waveOut} custom={[-1, -0.75, 0.9, 0.15]} />
      <motion.path d="M22 11a10 10 0 00-5-8.662" variants={waveOut} custom={[1, -0.75, 0.9, 0.15]} />
      <motion.path d="M6 11a6 6 0 013-5.197" variants={waveOut} custom={[-0.75, -0.5, 0.8, 0]} />
      <path d="M9 21h6" />
      <rect x="10" y="9" width="4" height="8" rx="2" />
    </Icon>
  );
}

export const newspaperBody = '  <path d="M15 18h-5"/>\n  <path d="M18 14h-8"/>\n  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"/>\n  <rect width="8" height="4" x="10" y="6" rx="1"/>';
export function Newspaper(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
      <motion.rect width="8" height="4" x="10" y="6" rx="1" variants={printIn} custom={0} />
      <motion.path d="M18 14h-8" variants={printIn} custom={0.12} />
      <motion.path d="M15 18h-5" variants={printIn} custom={0.24} />
    </Icon>
  );
}

export const nfcBody = '  <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36"/>\n  <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58"/>\n  <path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8"/>\n  <path d="M16.37 2a20.16 20.16 0 0 1 0 20"/>';
export function Nfc(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M6 8.32a7.43 7.43 0 0 1 0 7.36" variants={waveOut} custom={[1.5, 0, 0.8, 0]} />
      <motion.path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58" variants={waveOut} custom={[2, 0, 0.9, 0.12]} />
      <motion.path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8" variants={waveOut} custom={[2.5, 0, 1, 0.24]} />
      <motion.path d="M16.37 2a20.16 20.16 0 0 1 0 20" variants={waveOut} custom={[3, 0, 1.1, 0.36]} />
    </Icon>
  );
}

export const notebookBody = '  <path d="M2 6h4"/>\n  <path d="M2 10h4"/>\n  <path d="M2 14h4"/>\n  <path d="M2 18h4"/>\n  <rect width="16" height="20" x="4" y="2" rx="2"/>\n  <path d="M16 2v20"/>';
export function Notebook(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={openCover3D} style={{ originX: 0.08, transformPerspective: 600 }}>
        <path d="M2 6h4" />
        <path d="M2 10h4" />
        <path d="M2 14h4" />
        <path d="M2 18h4" />
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <path d="M16 2v20" />
      </motion.g>
    </Icon>
  );
}

export const notebookTabsBody = '  <path d="M2 6h4"/>\n  <path d="M2 10h4"/>\n  <path d="M2 14h4"/>\n  <path d="M2 18h4"/>\n  <rect width="16" height="20" x="4" y="2" rx="2"/>\n  <path d="M15 2v20"/>\n  <path d="M15 7h5"/>\n  <path d="M15 12h5"/>\n  <path d="M15 17h5"/>';
export function NotebookTabs(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M2 6h4" />
      <path d="M2 10h4" />
      <path d="M2 14h4" />
      <path d="M2 18h4" />
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M15 2v20" />
      <motion.path d="M15 7h5" variants={tabPoke} custom={0} />
      <motion.path d="M15 12h5" variants={tabPoke} custom={0.15} />
      <motion.path d="M15 17h5" variants={tabPoke} custom={0.3} />
    </Icon>
  );
}

export const phoneBody = '  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>';
export function Phone(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" variants={ring} />
    </Icon>
  );
}

export const phoneCallBody = '  <path d="M13 2a9 9 0 0 1 9 9"/>\n  <path d="M13 6a5 5 0 0 1 5 5"/>\n  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>';
export function PhoneCall(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M13 2a9 9 0 0 1 9 9" variants={waveOut} custom={[2.2, -2.2, 1, 0.15]} />
      <motion.path d="M13 6a5 5 0 0 1 5 5" variants={waveOut} custom={[1.6, -1.6, 0.9, 0]} />
      <motion.path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" variants={ring} />
    </Icon>
  );
}

export const phoneForwardedBody = '  <path d="M14 6h8"/>\n  <path d="m18 2 4 4-4 4"/>\n  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>';
export function PhoneForwarded(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={nudge} custom={[3, 0]}>
        <path d="M14 6h8" />
        <path d="m18 2 4 4-4 4" />
      </motion.g>
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </Icon>
  );
}

export const phoneIncomingBody = '  <path d="M16 2v6h6"/>\n  <path d="m22 2-6 6"/>\n  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>';
export function PhoneIncoming(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={nudge} custom={[-2.5, 2.5]}>
        <path d="M16 2v6h6" />
        <path d="m22 2-6 6" />
      </motion.g>
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </Icon>
  );
}

export const phoneMissedBody = '  <path d="m16 2 6 6"/>\n  <path d="m22 2-6 6"/>\n  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>';
export function PhoneMissed(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={xShake}>
        <path d="m16 2 6 6" />
        <path d="m22 2-6 6" />
      </motion.g>
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </Icon>
  );
}

export const phoneOffBody = '  <path d="M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272"/>\n  <path d="M22 2 2 22"/>\n  <path d="M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473"/>';
export function PhoneOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={ring}>
        <path d="M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272" />
        <path d="M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473" />
      </motion.g>
      <DrawSlash d="M22 2 2 22" from="tr" />
    </Icon>
  );
}

export const phoneOutgoingBody = '  <path d="m16 8 6-6"/>\n  <path d="M22 8V2h-6"/>\n  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>';
export function PhoneOutgoing(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={nudge} custom={[2.5, -2.5]}>
        <path d="m16 8 6-6" />
        <path d="M22 8V2h-6" />
      </motion.g>
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </Icon>
  );
}

export const presentationBody = '  <path d="M2 3h20"/>\n  <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/>\n  <path d="m7 21 5-5 5 5"/>';
export function Presentation(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={turnBoard3D} style={{ originX: 0.5, transformPerspective: 600 }}>
        <path d="M2 3h20" />
        <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      </motion.g>
      <path d="m7 21 5-5 5 5" />
    </Icon>
  );
}

export const projectorBody = '  <path d="M5 7 3 5"/>\n  <path d="M9 6V3"/>\n  <path d="m13 7 2-2"/>\n  <circle cx="9" cy="13" r="3"/>\n  <path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"/>\n  <path d="M16 16h2"/>';
export function Projector(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M5 7 3 5" variants={beamOut} custom={[-1.6, -1.6, 0]} />
      <motion.path d="M9 6V3" variants={beamOut} custom={[0, -2, 0.1]} />
      <motion.path d="m13 7 2-2" variants={beamOut} custom={[1.6, -1.6, 0.2]} />
      <circle cx="9" cy="13" r="3" />
      <path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" />
      <path d="M16 16h2" />
    </Icon>
  );
}

export const radarBody = '  <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"/>\n  <path d="M4 6h.01"/>\n  <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"/>\n  <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67"/>\n  <path d="M12 18h.01"/>\n  <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67"/>\n  <circle cx="12" cy="12" r="2"/>\n  <path d="m13.41 10.59 5.66-5.66"/>';
export function Radar(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
      <path d="M4 6h.01" />
      <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
      <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
      <path d="M12 18h.01" />
      <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
      <circle cx="12" cy="12" r="2" />
      <motion.path d="m13.41 10.59 5.66-5.66" variants={radarSweep} style={{ originX: -0.249, originY: 1.249 }} />
    </Icon>
  );
}

export const screenShareBody = '  <path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"/>\n  <path d="M8 21h8"/>\n  <path d="M12 17v4"/>\n  <path d="m17 8 5-5"/>\n  <path d="M17 3h5v5"/>';
export function ScreenShare(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <motion.g variants={nudge} custom={[2.5, -2.5]}>
        <path d="m17 8 5-5" />
        <path d="M17 3h5v5" />
      </motion.g>
    </Icon>
  );
}

export const screenShareOffBody = '  <path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"/>\n  <path d="M8 21h8"/>\n  <path d="M12 17v4"/>\n  <path d="m22 3-5 5"/>\n  <path d="m17 3 5 5"/>';
export function ScreenShareOff(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <motion.g variants={xShake}>
        <path d="m22 3-5 5" />
        <path d="m17 3 5 5" />
      </motion.g>
    </Icon>
  );
}

export const sendBody = '  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/>\n  <path d="m21.854 2.147-10.94 10.939"/>';
export function Send(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={flyOut} custom={[6, -6]}>
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
        <path d="m21.854 2.147-10.94 10.939" />
      </motion.g>
    </Icon>
  );
}

export const sendHorizontalBody = '  <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/>\n  <path d="M6 12h16"/>';
export function SendHorizontal(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={flyOut} custom={[7, 0]}>
        <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
        <path d="M6 12h16" />
      </motion.g>
    </Icon>
  );
}

export const smartphoneNfcBody = '  <rect width="7" height="12" x="2" y="6" rx="1"/>\n  <path d="M13 8.32a7.43 7.43 0 0 1 0 7.36"/>\n  <path d="M16.46 6.21a11.76 11.76 0 0 1 0 11.58"/>\n  <path d="M19.91 4.1a15.91 15.91 0 0 1 .01 15.8"/>';
export function SmartphoneNfc(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="7" height="12" x="2" y="6" rx="1" />
      <motion.path d="M13 8.32a7.43 7.43 0 0 1 0 7.36" variants={waveOut} custom={[1.5, 0, 0.8, 0]} />
      <motion.path d="M16.46 6.21a11.76 11.76 0 0 1 0 11.58" variants={waveOut} custom={[2, 0, 0.9, 0.12]} />
      <motion.path d="M19.91 4.1a15.91 15.91 0 0 1 .01 15.8" variants={waveOut} custom={[2.5, 0, 1, 0.24]} />
    </Icon>
  );
}

export const smilePlusBody = '  <path d="M22 11v1a10 10 0 1 1-9-10"/>\n  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>\n  <line x1="9" x2="9.01" y1="9" y2="9"/>\n  <line x1="15" x2="15.01" y1="9" y2="9"/>\n  <path d="M16 5h6"/>\n  <path d="M19 2v6"/>';
export function SmilePlus(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={nod}>
        <path d="M22 11v1a10 10 0 1 1-9-10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
      </motion.g>
      <motion.g variants={plusBounce}>
        <path d="M16 5h6" />
        <path d="M19 2v6" />
      </motion.g>
    </Icon>
  );
}

export const spoolBody = '  <path d="M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66"/>\n  <path d="m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178"/>';
export function Spool(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={spin3D} style={{ transformPerspective: 600 }}>
        <path d="M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66" />
        <path d="m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178" />
      </motion.g>
    </Icon>
  );
}

export const spotlightBody = '  <path d="M15.295 19.562 16 22"/>\n  <path d="m17 16 3.758 2.098"/>\n  <path d="m19 12.5 3.026-.598"/>\n  <path d="M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z"/>\n  <path d="M8 9V2"/>';
export function Spotlight(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M15.295 19.562 16 22" variants={beamOut} custom={[1.4, 1.4, 0]} />
      <motion.path d="m17 16 3.758 2.098" variants={beamOut} custom={[1.6, 1, 0.1]} />
      <motion.path d="m19 12.5 3.026-.598" variants={beamOut} custom={[1.8, -0.6, 0.2]} />
      <motion.path d="M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z" variants={spotSweep} style={{ originX: 0.365, originY: 0.06 }} />
      <path d="M8 9V2" />
    </Icon>
  );
}

export const switchCameraBody = '  <path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/>\n  <path d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5"/>\n  <circle cx="12" cy="12" r="3"/>\n  <path d="m18 22-3-3 3-3"/>\n  <path d="m6 2 3 3-3 3"/>';
export function SwitchCamera(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={flip3D} style={{ transformPerspective: 600 }}>
        <path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
        <path d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" />
        <circle cx="12" cy="12" r="3" />
        <path d="m18 22-3-3 3-3" />
        <path d="m6 2 3 3-3 3" />
      </motion.g>
    </Icon>
  );
}

export const tvBody = '  <path d="m17 2-5 5-5-5"/>\n  <rect width="20" height="15" x="2" y="7" rx="2"/>';
export function Tv(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="m17 2-5 5-5-5" variants={earsWiggle} style={{ originX: 0.5, originY: 1 }} />
      <rect width="20" height="15" x="2" y="7" rx="2" />
    </Icon>
  );
}

export const videoBody = '  <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/>\n  <rect x="2" y="6" width="14" height="12" rx="2"/>';
export function Video(p: IconProps) {
  return (
    <Icon {...p}>
      {/* body and lens cone nudge together — the wedge must not detach (R5) */}
      <motion.g variants={videoZoom}>
        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
      </motion.g>
    </Icon>
  );
}

export const videoOffBody = '  <path d="M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196"/>\n  <path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/>\n  <path d="m2 2 20 20"/>';
export function VideoOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={recWobble}>
        <path d="M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196" />
        <path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
      </motion.g>
      <DrawSlash d="m2 2 20 20" />
    </Icon>
  );
}

export const videotapeBody = '  <rect width="20" height="16" x="2" y="4" rx="2"/>\n  <path d="M2 8h20"/>\n  <circle cx="8" cy="14" r="2"/>\n  <path d="M8 12h8"/>\n  <circle cx="16" cy="14" r="2"/>';
// the shell holds still; the tape spools from the left reel across to the
// right reel (the featureless hubs cannot show rotation, so the tape line
// carries the motion)
export function Videotape(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="M2 8h20" />
      <circle cx="8" cy="14" r="2" />
      <motion.path d="M8 12h8" variants={drawFlow} custom={[0.05, 0.6]} />
      <circle cx="16" cy="14" r="2" />
    </Icon>
  );
}

export const volumeBody = '  <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>';
export function Volume(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" variants={speakerPush} />
    </Icon>
  );
}

export const volume1Body = '  <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>\n  <path d="M16 9a5 5 0 0 1 0 6"/>';
export function Volume1(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" variants={speakerPush} />
      <motion.path d="M16 9a5 5 0 0 1 0 6" variants={waveOut} custom={[1.8, 0, 0.8, 0]} />
    </Icon>
  );
}

export const volume2Body = '  <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>\n  <path d="M16 9a5 5 0 0 1 0 6"/>\n  <path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>';
export function Volume2(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" variants={speakerPush} />
      <motion.path d="M16 9a5 5 0 0 1 0 6" variants={waveOut} custom={[1.6, 0, 0.8, 0]} />
      <motion.path d="M19.364 18.364a9 9 0 0 0 0-12.728" variants={waveOut} custom={[2.2, 0, 0.9, 0.15]} />
    </Icon>
  );
}

// Lucide volume-off geometry, but every cut end is extended so it TOUCHES the
// slash line (y=x) — no whitespace notches. The waves are their full arcs (their
// lower ends land 0.7 from the slash, so the round caps visually merge with it).
export const volumeOffBody = '  <path d="M16 9a5 5 0 0 1 0 6"/>\n  <path d="M19.364 5.636a9 9 0 0 1 0 12.728"/>\n  <path d="m2 2 20 20"/>\n  <path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"/>\n  <path d="M7 7l2.797-2.796a.705.705 0 0 1 1.203.498V11"/>';
export function VolumeOff(p: IconProps) {
  return (
    <Icon {...p}>
      {/* the icon draws itself on, then the mute slash strikes over the top */}
      <motion.path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11" variants={drawFlow} custom={[0, 0.5]} />
      <motion.path d="M7 7l2.797-2.796a.705.705 0 0 1 1.203.498V11" variants={drawFlow} custom={[0.25, 0.35]} />
      <motion.path d="M16 9a5 5 0 0 1 0 6" variants={drawFlow} custom={[0.42, 0.3]} />
      <motion.path d="M19.364 5.636a9 9 0 0 1 0 12.728" variants={drawFlow} custom={[0.52, 0.35]} />
      <DrawSlash d="m2 2 20 20" delay={0.95} />
    </Icon>
  );
}

export const volumeXBody = '  <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>\n  <line x1="22" x2="16" y1="9" y2="15"/>\n  <line x1="16" x2="22" y1="9" y2="15"/>';
export function VolumeX(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" variants={speakerPush} />
      <motion.g variants={xShake}>
        <line x1="22" x2="16" y1="9" y2="15" />
        <line x1="16" x2="22" y1="9" y2="15" />
      </motion.g>
    </Icon>
  );
}

export const webcamBody = '  <circle cx="12" cy="10" r="8"/>\n  <circle cx="12" cy="10" r="3"/>\n  <path d="M7 22h10"/>\n  <path d="M12 22v-4"/>';
export function Webcam(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="10" r="8" />
      <motion.circle cx="12" cy="10" r="3" variants={scan} />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </Icon>
  );
}

export const webcamOffBody = '  <path d="M12 22v-4"/>\n  <path d="M12.754 7.096a3 3 0 0 1 2.15 2.15"/>\n  <path d="M12.863 12.873a3 3 0 0 1-3.736-3.735"/>\n  <path d="M16.566 16.57A8 8 0 0 1 5.43 5.433"/>\n  <path d="m2 2 20 20"/>\n  <path d="M7 22h10"/>\n  <path d="M8.478 2.817a8 8 0 0 1 10.705 10.705"/>';
export function WebcamOff(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.g variants={recWobble} style={{ originX: 0.5, originY: 1 }}>
        <path d="M12 22v-4" />
        <path d="M12.754 7.096a3 3 0 0 1 2.15 2.15" />
        <path d="M12.863 12.873a3 3 0 0 1-3.736-3.735" />
        <path d="M16.566 16.57A8 8 0 0 1 5.43 5.433" />
        <path d="M8.478 2.817a8 8 0 0 1 10.705 10.705" />
        <path d="M7 22h10" />
      </motion.g>
      {/* slash waits for the wobble to settle so the notches stay registered */}
      <DrawSlash d="m2 2 20 20" delay={0.95} />
    </Icon>
  );
}

