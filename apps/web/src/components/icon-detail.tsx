"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { icons } from "epoir-icons";
import { useCustomizer } from "@/lib/customizer";
import { Shell } from "@/components/shell";
import { HoverTile, IconPreview } from "@/components/animated";
import { CategoryChips, MetaRow } from "@/components/bits";
import { CopyBar } from "@/components/copy-bar";
import { CodeTabs } from "@/components/code-tabs";
import { InAction } from "@/components/in-action";
import { MoreLikeThis } from "@/components/more-like-this";
import { X } from "epoir-icons";

const VERSION = "v0.1.0";
const VARIANTS = [32, 40, 56];

export function IconDetail({ name }: { name: string }) {
  const router = useRouter();
  const { color, strokeWidth } = useCustomizer();
  const controls = useAnimationControls();
  const [copied, setCopied] = useState(false);
  const current = icons.find((icon) => icon.name === name);
  if (!current) return null;
  const Glyph = current.component;

  function copyName() {
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <Shell
      activeCategory={null}
      onSelectCategory={(c) => router.push(c ? `/?category=${c}` : "/")}
    >
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="w-80 shrink-0">
          <IconPreview
            icon={current}
            size={200}
            cell={14}
            controls={controls}
            className="size-80"
          />
          <div className="mt-3 flex gap-3">
            {VARIANTS.map((s) => (
              <HoverTile
                key={s}
                className="flex flex-1 items-center justify-center rounded-xl border border-line bg-tile py-4"
              >
                <Glyph
                  size={s}
                  color={color}
                  strokeWidth={strokeWidth}
                  initial={undefined}
                  whileHover={undefined}
                />
              </HoverTile>
            ))}
          </div>
          <button
            onClick={() => controls.start("animate")}
            className="mt-3 w-full rounded-xl bg-accent py-3 text-sm font-medium text-white"
          >
            See in action
          </button>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start gap-6">
            <div className="min-w-0">
              <div className="relative inline-block">
                <button
                  onClick={copyName}
                  title="Click to copy name"
                  className="cursor-pointer text-3xl font-semibold tracking-tight transition-colors hover:text-accent"
                >
                  {current.name}
                </button>
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 6, scale: 0.85 }}
                      animate={{ opacity: 1, y: -8, scale: 1 }}
                      exit={{ opacity: 0, y: -16, scale: 0.9 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-line bg-panel px-2.5 py-1 text-xs font-medium shadow-lg"
                    >
                      Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <p className="mt-2 text-muted">{current.tags.join(" • ")}</p>
            </div>
            <div className="ml-auto flex shrink-0 items-start gap-4">
              <div className="space-y-2 text-sm text-muted">
                <MetaRow label="Created" value={VERSION} />
                <MetaRow label="Last changed" value={VERSION} />
              </div>
              <button
                onClick={() => router.push("/")}
                aria-label="Back to icons"
                className="rounded-lg border border-line bg-tile p-2.5 text-muted transition-colors hover:text-fg"
              >
                <X size={18} initial={undefined} whileHover={undefined} />
              </button>
            </div>
          </div>

          <div className="mt-5">
            <CategoryChips
              categories={current.categories}
              onPick={(c) => router.push(`/?category=${c}`)}
            />
          </div>

          <div className="mt-6">
            <CopyBar current={current} />
          </div>

          <div className="mt-8">
            <CodeTabs current={current} />
          </div>
        </div>
      </div>

      <InAction current={current} />
      <MoreLikeThis current={current} />
    </Shell>
  );
}
