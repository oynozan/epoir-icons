"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { X, type IconEntry } from "epoir-icons";
import { IconPreview } from "@/components/animated";
import { CategoryChips } from "@/components/bits";
import { CopyBar } from "@/components/copy-bar";
import { Maximize } from "@/lib/ui-icons";

const VERSION = "v0.1.0";

export function IconDrawer({
  current,
  onClose,
  onSelectCategory,
}: {
  current: IconEntry;
  onClose: () => void;
  onSelectCategory: (name: string) => void;
}) {
  const router = useRouter();
  const controls = useAnimationControls();
  const [copied, setCopied] = useState(false);

  function copyName() {
    navigator.clipboard.writeText(current.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <motion.section
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 16, opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto min-w-0 flex-1 rounded-2xl border border-line bg-panel shadow-2xl"
    >
      <div className="flex gap-8 p-6">
        <IconPreview
          icon={current}
          size={140}
          cell={12}
          controls={controls}
          className="size-52 shrink-0"
        />

        <div className="flex w-full flex-col">
          <div className="flex items-start gap-4">
            <div className="min-w-0">
              <div className="relative inline-block">
                <button
                  onClick={copyName}
                  title="Click to copy name"
                  className="cursor-pointer text-2xl font-semibold tracking-tight transition-colors hover:text-accent"
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
              <p className="mt-2 text-muted">
                {current.tags.join(" • ")}
              </p>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-3 text-muted">
              <span className="rounded-lg border border-line bg-tile px-3 py-2 text-xs">
                {VERSION}
              </span>
              <button
                onClick={() => router.push(`/icons/${current.name}`)}
                aria-label="Fullscreen"
                className="rounded-lg border border-line bg-tile p-2.5 transition-colors hover:text-fg"
              >
                <Maximize size={18} />
              </button>
              <button
                onClick={onClose}
                aria-label="Close panel"
                className="rounded-lg border border-line bg-tile p-2.5 transition-colors hover:text-fg"
              >
                <X size={18} initial={undefined} whileHover={undefined} />
              </button>
            </div>
          </div>

          <div className="mt-5">
            <CategoryChips
              categories={current.categories}
              onPick={onSelectCategory}
            />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => controls.start("animate")}
              className="rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white"
            >
              See in action
            </button>
            <CopyBar current={current} menuUp />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
