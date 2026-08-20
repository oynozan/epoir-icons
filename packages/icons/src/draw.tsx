"use client";

import { motion } from "motion/react";
import { createElement, type ElementType } from "react";
import { Icon } from "./icon.js";
import { drawOn } from "./variants.js";
import { entranceSharp } from "./ease.js";
import type { IconProps } from "./types.js";

export type IconNode = [string, Record<string, string | number>];

const MOTION: Record<string, ElementType> = {
  path: motion.path,
  circle: motion.circle,
  line: motion.line,
  rect: motion.rect,
  ellipse: motion.ellipse,
  polygon: motion.polygon,
  polyline: motion.polyline,
};

// every stroke draws on in order for a progressive reveal
export function createDrawIcon(nodes: IconNode[]) {
  return function DrawIcon(props: IconProps) {
    return (
      <Icon {...props}>
        {nodes.map(([tag, attrs], i) => {
          const element = MOTION[tag] ?? motion.path;
          const delay = Math.min(i, 6) * 0.07;
          return createElement(element, {
            key: i,
            ...attrs,
            variants: drawOn,
            transition: {
              duration: 0.5,
              delay,
              ease: entranceSharp,
              opacity: { duration: 0.08, delay },
            },
          });
        })}
      </Icon>
    );
  };
}
