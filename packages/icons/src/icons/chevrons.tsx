"use client";

import { motion } from "motion/react";
import { Icon } from "../icon.js";
import { nudge, nudgeTransition } from "../variants.js";
import type { IconProps } from "../types.js";

function NudgePath({
  d,
  axis,
  distance,
  delay = 0,
}: {
  d: string;
  axis: "x" | "y";
  distance: number;
  delay?: number;
}) {
  return (
    <motion.path
      d={d}
      variants={nudge(axis, distance)}
      transition={{ ...nudgeTransition, delay }}
    />
  );
}

// single chevrons nudge toward where they point

export const chevronDownBody = '  <path d="m6 9 6 6 6-6"/>';
export function ChevronDown(p: IconProps) {
  return (
    <Icon {...p}>
      <NudgePath d="m6 9 6 6 6-6" axis="y" distance={3} />
    </Icon>
  );
}

export const chevronUpBody = '  <path d="m18 15-6-6-6 6"/>';
export function ChevronUp(p: IconProps) {
  return (
    <Icon {...p}>
      <NudgePath d="m18 15-6-6-6 6" axis="y" distance={-3} />
    </Icon>
  );
}

export const chevronLeftBody = '  <path d="m15 18-6-6 6-6"/>';
export function ChevronLeft(p: IconProps) {
  return (
    <Icon {...p}>
      <NudgePath d="m15 18-6-6 6-6" axis="x" distance={-3} />
    </Icon>
  );
}

export const chevronRightBody = '  <path d="m9 18 6-6-6-6"/>';
export function ChevronRight(p: IconProps) {
  return (
    <Icon {...p}>
      <NudgePath d="m9 18 6-6-6-6" axis="x" distance={3} />
    </Icon>
  );
}

// chevron with a bar nudges toward the bar

export const chevronFirstBody = '  <path d="m17 18-6-6 6-6"/>\n  <path d="M7 6v12"/>';
export function ChevronFirst(p: IconProps) {
  return (
    <Icon {...p}>
      <NudgePath d="m17 18-6-6 6-6" axis="x" distance={-3} />
      <path d="M7 6v12" />
    </Icon>
  );
}

export const chevronLastBody = '  <path d="m7 18 6-6-6-6"/>\n  <path d="M17 6v12"/>';
export function ChevronLast(p: IconProps) {
  return (
    <Icon {...p}>
      <NudgePath d="m7 18 6-6-6-6" axis="x" distance={3} />
      <path d="M17 6v12" />
    </Icon>
  );
}

// diagonal doubles expand apart or collapse together

export const chevronsUpDownBody =
  '  <path d="m7 15 5 5 5-5"/>\n  <path d="m7 9 5-5 5 5"/>';
export function ChevronsUpDown(p: IconProps) {
  return (
    <Icon {...p}>
      <NudgePath d="m7 9 5-5 5 5" axis="y" distance={-2} />
      <NudgePath d="m7 15 5 5 5-5" axis="y" distance={2} />
    </Icon>
  );
}

export const chevronsDownUpBody =
  '  <path d="m7 20 5-5 5 5"/>\n  <path d="m7 4 5 5 5-5"/>';
export function ChevronsDownUp(p: IconProps) {
  return (
    <Icon {...p}>
      <NudgePath d="m7 4 5 5 5-5" axis="y" distance={2} />
      <NudgePath d="m7 20 5-5 5 5" axis="y" distance={-2} />
    </Icon>
  );
}

export const chevronsLeftRightBody =
  '  <path d="m9 7-5 5 5 5"/>\n  <path d="m15 7 5 5-5 5"/>';
export function ChevronsLeftRight(p: IconProps) {
  return (
    <Icon {...p}>
      <NudgePath d="m9 7-5 5 5 5" axis="x" distance={-2} />
      <NudgePath d="m15 7 5 5-5 5" axis="x" distance={2} />
    </Icon>
  );
}

export const chevronsRightLeftBody =
  '  <path d="m20 17-5-5 5-5"/>\n  <path d="m4 17 5-5-5-5"/>';
export function ChevronsRightLeft(p: IconProps) {
  return (
    <Icon {...p}>
      <NudgePath d="m20 17-5-5 5-5" axis="x" distance={-2} />
      <NudgePath d="m4 17 5-5-5-5" axis="x" distance={2} />
    </Icon>
  );
}

// same-direction doubles nudge together with a small stagger

export const chevronsUpBody =
  '  <path d="m17 11-5-5-5 5"/>\n  <path d="m17 18-5-5-5 5"/>';
export function ChevronsUp(p: IconProps) {
  return (
    <Icon {...p}>
      <NudgePath d="m17 11-5-5-5 5" axis="y" distance={-3} />
      <NudgePath d="m17 18-5-5-5 5" axis="y" distance={-3} delay={0.06} />
    </Icon>
  );
}

export const chevronsDownBody =
  '  <path d="m7 6 5 5 5-5"/>\n  <path d="m7 13 5 5 5-5"/>';
export function ChevronsDown(p: IconProps) {
  return (
    <Icon {...p}>
      <NudgePath d="m7 13 5 5 5-5" axis="y" distance={3} />
      <NudgePath d="m7 6 5 5 5-5" axis="y" distance={3} delay={0.06} />
    </Icon>
  );
}

export const chevronsLeftBody =
  '  <path d="m11 17-5-5 5-5"/>\n  <path d="m18 17-5-5 5-5"/>';
export function ChevronsLeft(p: IconProps) {
  return (
    <Icon {...p}>
      <NudgePath d="m11 17-5-5 5-5" axis="x" distance={-3} />
      <NudgePath d="m18 17-5-5 5-5" axis="x" distance={-3} delay={0.06} />
    </Icon>
  );
}

export const chevronsRightBody =
  '  <path d="m6 17 5-5-5-5"/>\n  <path d="m13 17 5-5-5-5"/>';
export function ChevronsRight(p: IconProps) {
  return (
    <Icon {...p}>
      <NudgePath d="m13 17 5-5-5-5" axis="x" distance={3} />
      <NudgePath d="m6 17 5-5-5-5" axis="x" distance={3} delay={0.06} />
    </Icon>
  );
}
