"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "motion/react";
import type { IconEntry } from "epoir-icons";
import { useCustomizer } from "@/lib/customizer";

type Controls = ReturnType<typeof useAnimationControls>;

const gridBg = (cell: number) => ({
  backgroundImage:
    "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
  backgroundSize: `${cell}px ${cell}px`,
});

// wraps any content so hovering replays the child icon animation
export function HoverTile({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof motion.button>) {
  return (
    <motion.button
      initial="normal"
      whileHover="animate"
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

// grid and related-icon tile, replays on hover
export function IconTile({
  icon,
  active,
  playing,
  onClick,
}: {
  icon: IconEntry;
  active?: boolean;
  playing?: boolean;
  onClick?: () => void;
}) {
  const { color, strokeWidth, size, absolute } = useCustomizer();
  const Glyph = icon.component;
  return (
    <HoverTile
      title={icon.name}
      onClick={onClick}
      // the button owns the variant tree (its children register on it, not on
      // any wrapper above), so play has to be driven from here
      animate={playing ? "animate" : "normal"}
      className={`flex aspect-square items-center justify-center rounded-xl bg-tile transition-colors hover:bg-tile-hover ${
        active ? "ring-1 ring-accent" : ""
      }`}
    >
      <Glyph
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        absoluteStrokeWidth={absolute}
        initial={undefined}
        whileHover={undefined}
      />
    </HoverTile>
  );
}

// big grid-backed preview, plays on mount, replays on hover or via controls
export function IconPreview({
  icon,
  size,
  cell = 12,
  controls,
  className,
}: {
  icon: IconEntry;
  size: number;
  cell?: number;
  controls: Controls;
  className?: string;
}) {
  const { color, strokeWidth } = useCustomizer();
  const Glyph = icon.component;

  useEffect(() => {
    controls.start("animate");
  }, [icon, controls]);

  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-line ${className ?? ""}`}
      style={gridBg(cell)}
    >
      <motion.div initial="normal" whileHover="animate" animate={controls}>
        <Glyph
          size={size}
          color={color}
          strokeWidth={strokeWidth}
          initial={undefined}
          whileHover={undefined}
        />
      </motion.div>
    </div>
  );
}
