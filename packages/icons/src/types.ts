import type { ComponentType } from "react";
import type { SVGMotionProps } from "motion/react";

export interface IconProps
  extends Omit<SVGMotionProps<SVGSVGElement>, "strokeWidth"> {
  size?: number;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}

export interface IconEntry {
  name: string;
  categories: string[];
  tags: string[];
  body: string;
  component: ComponentType<IconProps>;
}

