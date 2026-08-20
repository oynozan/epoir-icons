"use client";

import { useId } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Icon } from "../icon.js";
import { entranceSharp as ES } from "../ease.js";
import type { IconProps } from "../types.js";

const growY: Variants = {
  normal: { scaleY: 1 },
  animate: (c: number) => ({
    scaleY: [0, 1],
    transition: { duration: 0.8, delay: c, ease: ES },
  }),
};
const growX: Variants = {
  normal: { scaleX: 1 },
  animate: (c: number) => ({
    scaleX: [0, 1],
    transition: { duration: 0.8, delay: c, ease: ES },
  }),
};
const drawFwd: Variants = {
  normal: { pathLength: 1, pathOffset: 0, opacity: 1 },
  animate: (c: number) => ({
    pathLength: [0, 1],
    pathOffset: [0, 0],
    opacity: [0, 1],
    transition: { duration: 1, delay: c, ease: ES, opacity: { duration: 0.05, delay: c } },
  }),
};
const drawRev: Variants = {
  normal: { pathLength: 1, pathOffset: 0, opacity: 1 },
  animate: (c: number) => ({
    pathLength: [0, 1],
    pathOffset: [1, 0],
    opacity: [0, 1],
    transition: { duration: 1, delay: c, ease: ES, opacity: { duration: 0.05, delay: c } },
  }),
};
const popSeq: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: (c: number) => ({
    scale: [0, 1.2, 1],
    opacity: [0, 1, 1],
    transition: { duration: 0.55, delay: c, ease: ES },
  }),
};
const wipe: Variants = {
  normal: { width: 24 },
  animate: { width: [0, 24], transition: { duration: 1, ease: ES } },
};

export const chartAreaBody = '  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"/>';
export function ChartArea(p: IconProps) {
  const id = useId();
  return (
    <Icon {...p}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <defs>
        <clipPath id={id}>
          <motion.rect x="0" y="0" width="24" height="24" variants={wipe} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" />
      </g>
    </Icon>
  );
}

export const chartBarBody = '  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <path d="M7 16h8"/>\n  <path d="M7 11h12"/>\n  <path d="M7 6h3"/>';
export function ChartBar(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path d="M7 16h8" custom={0.3} variants={growX} style={{ originX: 0 }} />
      <motion.path d="M7 11h12" custom={0.15} variants={growX} style={{ originX: 0 }} />
      <motion.path d="M7 6h3" custom={0} variants={growX} style={{ originX: 0 }} />
    </Icon>
  );
}

export const chartBarBigBody = '  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <rect x="7" y="13" width="9" height="4" rx="1"/>\n  <rect x="7" y="5" width="12" height="4" rx="1"/>';
export function ChartBarBig(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.rect x="7" y="13" width="9" height="4" rx="1" custom={0.15} variants={growX} style={{ originX: 0 }} />
      <motion.rect x="7" y="5" width="12" height="4" rx="1" custom={0} variants={growX} style={{ originX: 0 }} />
    </Icon>
  );
}

export const chartBarDecreasingBody = '  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <path d="M7 11h8"/>\n  <path d="M7 16h3"/>\n  <path d="M7 6h12"/>';
export function ChartBarDecreasing(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path d="M7 11h8" custom={0.15} variants={growX} style={{ originX: 0 }} />
      <motion.path d="M7 16h3" custom={0.3} variants={growX} style={{ originX: 0 }} />
      <motion.path d="M7 6h12" custom={0} variants={growX} style={{ originX: 0 }} />
    </Icon>
  );
}

export const chartBarIncreasingBody = '  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <path d="M7 11h8"/>\n  <path d="M7 16h12"/>\n  <path d="M7 6h3"/>';
export function ChartBarIncreasing(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path d="M7 11h8" custom={0.15} variants={growX} style={{ originX: 0 }} />
      <motion.path d="M7 16h12" custom={0.3} variants={growX} style={{ originX: 0 }} />
      <motion.path d="M7 6h3" custom={0} variants={growX} style={{ originX: 0 }} />
    </Icon>
  );
}

export const chartBarStackedBody = '  <path d="M11 13v4"/>\n  <path d="M15 5v4"/>\n  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <rect x="7" y="13" width="9" height="4" rx="1"/>\n  <rect x="7" y="5" width="12" height="4" rx="1"/>';
export function ChartBarStacked(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11 13v4" custom={0.7} variants={drawFwd} />
      <motion.path d="M15 5v4" custom={0.55} variants={drawFwd} />
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.rect x="7" y="13" width="9" height="4" rx="1" custom={0.15} variants={growX} style={{ originX: 0 }} />
      <motion.rect x="7" y="5" width="12" height="4" rx="1" custom={0} variants={growX} style={{ originX: 0 }} />
    </Icon>
  );
}

export const chartCandlestickBody = '  <path d="M9 5v4"/>\n  <rect width="4" height="6" x="7" y="9" rx="1"/>\n  <path d="M9 15v2"/>\n  <path d="M17 3v2"/>\n  <rect width="4" height="8" x="15" y="5" rx="1"/>\n  <path d="M17 13v3"/>\n  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>';
export function ChartCandlestick(p: IconProps) {
  return (
    <Icon {...p}>
      {/* bodies grow first; wicks then sprout OUT of each body — upper wicks
          are authored tip-first so they use drawRev to extend upward */}
      <motion.path d="M9 5v4" custom={0.5} variants={drawRev} />
      <motion.rect width="4" height="6" x="7" y="9" rx="1" custom={0} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M9 15v2" custom={0.55} variants={drawFwd} />
      <motion.path d="M17 3v2" custom={0.65} variants={drawRev} />
      <motion.rect width="4" height="8" x="15" y="5" rx="1" custom={0.15} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M17 13v3" custom={0.7} variants={drawFwd} />
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    </Icon>
  );
}

export const chartColumnBody = '  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <path d="M18 17V9"/>\n  <path d="M13 17V5"/>\n  <path d="M8 17v-3"/>';
export function ChartColumn(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path d="M18 17V9" custom={0.3} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M13 17V5" custom={0.15} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M8 17v-3" custom={0} variants={growY} style={{ originY: 1 }} />
    </Icon>
  );
}

export const chartColumnBigBody = '  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <rect x="15" y="5" width="4" height="12" rx="1"/>\n  <rect x="7" y="8" width="4" height="9" rx="1"/>';
export function ChartColumnBig(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.rect x="15" y="5" width="4" height="12" rx="1" custom={0.15} variants={growY} style={{ originY: 1 }} />
      <motion.rect x="7" y="8" width="4" height="9" rx="1" custom={0} variants={growY} style={{ originY: 1 }} />
    </Icon>
  );
}

export const chartColumnDecreasingBody = '  <path d="M13 17V9"/>\n  <path d="M18 17v-3"/>\n  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <path d="M8 17V5"/>';
export function ChartColumnDecreasing(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M13 17V9" custom={0.15} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M18 17v-3" custom={0.3} variants={growY} style={{ originY: 1 }} />
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path d="M8 17V5" custom={0} variants={growY} style={{ originY: 1 }} />
    </Icon>
  );
}

export const chartColumnIncreasingBody = '  <path d="M13 17V9"/>\n  <path d="M18 17V5"/>\n  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <path d="M8 17v-3"/>';
export function ChartColumnIncreasing(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M13 17V9" custom={0.15} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M18 17V5" custom={0.3} variants={growY} style={{ originY: 1 }} />
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path d="M8 17v-3" custom={0} variants={growY} style={{ originY: 1 }} />
    </Icon>
  );
}

export const chartColumnStackedBody = '  <path d="M11 13H7"/>\n  <path d="M19 9h-4"/>\n  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <rect x="15" y="5" width="4" height="12" rx="1"/>\n  <rect x="7" y="8" width="4" height="9" rx="1"/>';
export function ChartColumnStacked(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M11 13H7" custom={0.55} variants={drawFwd} />
      <motion.path d="M19 9h-4" custom={0.7} variants={drawFwd} />
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.rect x="15" y="5" width="4" height="12" rx="1" custom={0.15} variants={growY} style={{ originY: 1 }} />
      <motion.rect x="7" y="8" width="4" height="9" rx="1" custom={0} variants={growY} style={{ originY: 1 }} />
    </Icon>
  );
}

export const chartGanttBody = '  <path d="M10 6h8"/>\n  <path d="M12 16h6"/>\n  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <path d="M8 11h7"/>';
export function ChartGantt(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M10 6h8" custom={0} variants={growX} style={{ originX: 0 }} />
      <motion.path d="M12 16h6" custom={0.3} variants={growX} style={{ originX: 0 }} />
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path d="M8 11h7" custom={0.15} variants={growX} style={{ originX: 0 }} />
    </Icon>
  );
}

export const chartLineBody = '  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <path d="m19 9-5 5-4-4-3 3"/>';
export function ChartLine(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path d="m19 9-5 5-4-4-3 3" custom={0} variants={drawRev} />
    </Icon>
  );
}

export const chartNetworkBody = '  <path d="m13.11 7.664 1.78 2.672"/>\n  <path d="m14.162 12.788-3.324 1.424"/>\n  <path d="m20 4-6.06 1.515"/>\n  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <circle cx="12" cy="6" r="2"/>\n  <circle cx="16" cy="12" r="2"/>\n  <circle cx="9" cy="15" r="2"/>';
export function ChartNetwork(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="m13.11 7.664 1.78 2.672" custom={0.7} variants={drawFwd} />
      <motion.path d="m14.162 12.788-3.324 1.424" custom={0.85} variants={drawFwd} />
      {/* path is authored tip-first, so drawRev makes it grow node -> tip */}
      <motion.path d="m20 4-6.06 1.515" custom={0.55} variants={drawRev} />
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.circle cx="12" cy="6" r="2" custom={0} variants={popSeq} />
      <motion.circle cx="16" cy="12" r="2" custom={0.3} variants={popSeq} />
      <motion.circle cx="9" cy="15" r="2" custom={0.15} variants={popSeq} />
    </Icon>
  );
}

export const chartNoAxesColumnBody = '  <path d="M5 21v-6"/>\n  <path d="M12 21V3"/>\n  <path d="M19 21V9"/>';
export function ChartNoAxesColumn(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M5 21v-6" custom={0} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M12 21V3" custom={0.15} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M19 21V9" custom={0.3} variants={growY} style={{ originY: 1 }} />
    </Icon>
  );
}

export const chartNoAxesColumnDecreasingBody = '  <path d="M5 21V3"/>\n  <path d="M12 21V9"/>\n  <path d="M19 21v-6"/>';
export function ChartNoAxesColumnDecreasing(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M5 21V3" custom={0} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M12 21V9" custom={0.15} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M19 21v-6" custom={0.3} variants={growY} style={{ originY: 1 }} />
    </Icon>
  );
}

export const chartNoAxesColumnIncreasingBody = '  <path d="M5 21v-6"/>\n  <path d="M12 21V9"/>\n  <path d="M19 21V3"/>';
export function ChartNoAxesColumnIncreasing(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M5 21v-6" custom={0} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M12 21V9" custom={0.15} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M19 21V3" custom={0.3} variants={growY} style={{ originY: 1 }} />
    </Icon>
  );
}

export const chartNoAxesCombinedBody = '  <path d="M12 16v5"/>\n  <path d="M16 14.639V21"/>\n  <path d="M20 10.656V21"/>\n  <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/>\n  <path d="M4 18.463V21"/>\n  <path d="M8 14.656V21"/>';
export function ChartNoAxesCombined(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M12 16v5" custom={0.3} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M16 14.639V21" custom={0.45} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M20 10.656V21" custom={0.6} variants={growY} style={{ originY: 1 }} />
      <motion.path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" custom={0} variants={drawRev} />
      <motion.path d="M4 18.463V21" custom={0} variants={growY} style={{ originY: 1 }} />
      <motion.path d="M8 14.656V21" custom={0.15} variants={growY} style={{ originY: 1 }} />
    </Icon>
  );
}

export const chartNoAxesGanttBody = '  <path d="M6 5h12"/>\n  <path d="M4 12h10"/>\n  <path d="M12 19h8"/>';
export function ChartNoAxesGantt(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M6 5h12" custom={0} variants={growX} style={{ originX: 0 }} />
      <motion.path d="M4 12h10" custom={0.15} variants={growX} style={{ originX: 0 }} />
      <motion.path d="M12 19h8" custom={0.3} variants={growX} style={{ originX: 0 }} />
    </Icon>
  );
}

export const chartPieBody = '  <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/>\n  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>';
export function ChartPie(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" custom={0.55} variants={popSeq} />
      <motion.path d="M21.21 15.89A10 10 0 1 1 8 2.83" custom={0} variants={drawFwd} />
    </Icon>
  );
}

export const chartScatterBody = '  <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>\n  <circle cx="18.5" cy="5.5" r=".5" fill="currentColor"/>\n  <circle cx="11.5" cy="11.5" r=".5" fill="currentColor"/>\n  <circle cx="7.5" cy="16.5" r=".5" fill="currentColor"/>\n  <circle cx="17.5" cy="14.5" r=".5" fill="currentColor"/>\n  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>';
export function ChartScatter(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.circle cx="7.5" cy="7.5" r=".5" fill="currentColor" custom={0} variants={popSeq} />
      <motion.circle cx="18.5" cy="5.5" r=".5" fill="currentColor" custom={0.45} variants={popSeq} />
      <motion.circle cx="11.5" cy="11.5" r=".5" fill="currentColor" custom={0.15} variants={popSeq} />
      <motion.circle cx="7.5" cy="16.5" r=".5" fill="currentColor" custom={0.3} variants={popSeq} />
      <motion.circle cx="17.5" cy="14.5" r=".5" fill="currentColor" custom={0.6} variants={popSeq} />
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    </Icon>
  );
}

export const chartSplineBody = '  <path d="M3 3v16a2 2 0 0 0 2 2h16"/>\n  <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7"/>';
export function ChartSpline(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" custom={0} variants={drawFwd} />
    </Icon>
  );
}

export const folderKanbanBody = '  <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>\n  <path d="M8 10v4"/>\n  <path d="M12 10v2"/>\n  <path d="M16 10v6"/>';
export function FolderKanban(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
      <motion.path d="M8 10v4" custom={0} variants={growY} style={{ originY: 0 }} />
      <motion.path d="M12 10v2" custom={0.15} variants={growY} style={{ originY: 0 }} />
      <motion.path d="M16 10v6" custom={0.3} variants={growY} style={{ originY: 0 }} />
    </Icon>
  );
}

export const kanbanBody = '  <path d="M5 3v14"/>\n  <path d="M12 3v8"/>\n  <path d="M19 3v18"/>';
export function Kanban(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M5 3v14" custom={0} variants={growY} style={{ originY: 0 }} />
      <motion.path d="M12 3v8" custom={0.15} variants={growY} style={{ originY: 0 }} />
      <motion.path d="M19 3v18" custom={0.3} variants={growY} style={{ originY: 0 }} />
    </Icon>
  );
}

export const squareChartGanttBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="M9 8h7"/>\n  <path d="M8 12h6"/>\n  <path d="M11 16h5"/>';
export function SquareChartGantt(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="M9 8h7" custom={0} variants={growX} style={{ originX: 0 }} />
      <motion.path d="M8 12h6" custom={0.15} variants={growX} style={{ originX: 0 }} />
      <motion.path d="M11 16h5" custom={0.3} variants={growX} style={{ originX: 0 }} />
    </Icon>
  );
}

export const squareDashedKanbanBody = '  <path d="M8 7v7"/>\n  <path d="M12 7v4"/>\n  <path d="M16 7v9"/>\n  <path d="M5 3a2 2 0 0 0-2 2"/>\n  <path d="M9 3h1"/>\n  <path d="M14 3h1"/>\n  <path d="M19 3a2 2 0 0 1 2 2"/>\n  <path d="M21 9v1"/>\n  <path d="M21 14v1"/>\n  <path d="M21 19a2 2 0 0 1-2 2"/>\n  <path d="M14 21h1"/>\n  <path d="M9 21h1"/>\n  <path d="M5 21a2 2 0 0 1-2-2"/>\n  <path d="M3 14v1"/>\n  <path d="M3 9v1"/>';
export function SquareDashedKanban(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M8 7v7" custom={0} variants={growY} style={{ originY: 0 }} />
      <motion.path d="M12 7v4" custom={0.15} variants={growY} style={{ originY: 0 }} />
      <motion.path d="M16 7v9" custom={0.3} variants={growY} style={{ originY: 0 }} />
      <path d="M5 3a2 2 0 0 0-2 2" />
      <path d="M9 3h1" />
      <path d="M14 3h1" />
      <path d="M19 3a2 2 0 0 1 2 2" />
      <path d="M21 9v1" />
      <path d="M21 14v1" />
      <path d="M21 19a2 2 0 0 1-2 2" />
      <path d="M14 21h1" />
      <path d="M9 21h1" />
      <path d="M5 21a2 2 0 0 1-2-2" />
      <path d="M3 14v1" />
      <path d="M3 9v1" />
    </Icon>
  );
}

export const squareKanbanBody = '  <rect width="18" height="18" x="3" y="3" rx="2"/>\n  <path d="M8 7v7"/>\n  <path d="M12 7v4"/>\n  <path d="M16 7v9"/>';
export function SquareKanban(p: IconProps) {
  return (
    <Icon {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="M8 7v7" custom={0} variants={growY} style={{ originY: 0 }} />
      <motion.path d="M12 7v4" custom={0.15} variants={growY} style={{ originY: 0 }} />
      <motion.path d="M16 7v9" custom={0.3} variants={growY} style={{ originY: 0 }} />
    </Icon>
  );
}

export const trendingDownBody = '  <path d="M16 17h6v-6"/>\n  <path d="m22 17-8.5-8.5-5 5L2 7"/>';
export function TrendingDown(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M16 17h6v-6" custom={0.55} variants={popSeq} />
      <motion.path d="m22 17-8.5-8.5-5 5L2 7" custom={0} variants={drawRev} />
    </Icon>
  );
}

export const trendingUpBody = '  <path d="M16 7h6v6"/>\n  <path d="m22 7-8.5 8.5-5-5L2 17"/>';
export function TrendingUp(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M16 7h6v6" custom={0.55} variants={popSeq} />
      <motion.path d="m22 7-8.5 8.5-5-5L2 17" custom={0} variants={drawRev} />
    </Icon>
  );
}

export const trendingUpDownBody = '  <path d="M14.828 14.828 21 21"/>\n  <path d="M21 16v5h-5"/>\n  <path d="m21 3-9 9-4-4-6 6"/>\n  <path d="M21 8V3h-5"/>';
export function TrendingUpDown(p: IconProps) {
  return (
    <Icon {...p}>
      <motion.path d="M14.828 14.828 21 21" custom={0} variants={drawFwd} />
      <motion.path d="M21 16v5h-5" custom={0.7} variants={popSeq} />
      <motion.path d="m21 3-9 9-4-4-6 6" custom={0} variants={drawRev} />
      <motion.path d="M21 8V3h-5" custom={0.55} variants={popSeq} />
    </Icon>
  );
}
