"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { IconEntry } from "epoir-icons";
import { pascal } from "@/lib/snippets";
import {
  Bug,
  Calendar,
  Clipboard,
  Copy,
  FileText,
  Folder,
  Heart,
  MessageCircle,
  Plus,
  Rocket,
  Scissors,
} from "@/lib/ui-icons";

// the current icon replays when its card is hovered
function Star({ current, size }: { current: IconEntry; size: number }) {
  const Glyph = current.component;
  return (
    <Glyph
      size={size}
      color="currentColor"
      strokeWidth={2}
      initial={undefined}
      whileHover={undefined}
    />
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="normal"
      whileHover="animate"
      className="rounded-2xl bg-panel p-4 sm:p-5"
    >
      <div className="rounded-xl border border-line bg-bg p-5">{children}</div>
    </motion.div>
  );
}

function Bar({ w = "100%" }: { w?: string }) {
  return (
    <div
      className="h-2.5 rounded-full bg-tile-hover"
      style={{ width: w }}
      aria-hidden
    />
  );
}

function Field({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line px-3 py-2.5 text-sm text-muted">
      {icon}
      <span>{text}</span>
    </div>
  );
}

const TONE = {
  red: "bg-red-500/15 text-red-400",
  indigo: "bg-indigo-500/15 text-indigo-400",
  emerald: "bg-emerald-500/15 text-emerald-400",
};

function Badge({
  tone,
  icon,
  children,
}: {
  tone: keyof typeof TONE;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${TONE[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}

function ListRow({
  icon,
  label,
  right,
  active,
}: {
  icon: ReactNode;
  label: string;
  right?: ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border border-line px-3 py-2.5 text-sm ${
        active ? "bg-tile" : ""
      }`}
    >
      <span className="text-muted">{icon}</span>
      <span>{label}</span>
      <span className="ml-auto text-muted">{right}</span>
    </div>
  );
}

function Circle({
  children,
  badge,
}: {
  children: ReactNode;
  badge?: string;
}) {
  return (
    <span className="relative flex size-11 items-center justify-center rounded-full bg-tile text-muted">
      {children}
      {badge && (
        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
          {badge}
        </span>
      )}
    </span>
  );
}

export function InAction({ current }: { current: IconEntry }) {
  const Name = pascal(current.name);

  return (
    <section className="mt-16 border-t border-line pt-12">
      <h2 className="text-center text-2xl font-semibold tracking-tight">
        See this icon in action
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <div className="space-y-3">
            <Bar w="70%" />
            <Bar />
            <Bar w="85%" />
            <Bar w="45%" />
            <div className="flex gap-3 pt-2">
              <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
                <Star current={current} size={16} />
                {Name}
              </button>
              <button className="rounded-lg bg-tile px-4 py-2 text-sm text-muted">
                Cancel
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-3">
            <Bar w="40%" />
            <Field icon={<Calendar size={18} />} text="Enter a date..." />
            <Bar w="55%" />
            <Field
              icon={<Star current={current} size={18} />}
              text="Enter a value..."
            />
          </div>
        </Card>

        <Card>
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <Bar w="55%" />
              <Badge tone="red" icon={<Bug size={14} />}>
                Bug
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <Bar w="60%" />
              <Badge tone="indigo" icon={<Rocket size={14} />}>
                Feature
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <Bar w="50%" />
              <Badge tone="emerald" icon={<Star current={current} size={14} />}>
                {Name}
              </Badge>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-2.5">
            <ListRow
              icon={<Folder size={18} />}
              label="Documents"
              right={<Plus size={16} />}
            />
            <ListRow icon={<FileText size={18} />} label="Readme" />
            <ListRow
              icon={<Star current={current} size={18} />}
              label={Name}
              active
              right={
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-white">
                  12
                </span>
              }
            />
          </div>
        </Card>

        <Card>
          <div className="space-y-3">
            <Bar />
            <Bar w="90%" />
            <Bar w="95%" />
            <Bar w="60%" />
            <div className="flex items-center gap-6 pt-2 text-sm text-muted">
              <span className="flex items-center gap-2">
                <Heart size={18} />
                112
              </span>
              <span className="flex items-center gap-2">
                <MessageCircle size={18} />8
              </span>
              <span className="flex items-center gap-2">
                <Star current={current} size={18} />
                11
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-5">
            <div className="flex gap-2">
              <Circle>
                <Copy size={18} />
              </Circle>
              <Circle>
                <Scissors size={18} />
              </Circle>
              <Circle>
                <Clipboard size={18} />
              </Circle>
              <Circle badge="2">
                <Star current={current} size={18} />
              </Circle>
            </div>
            <div className="space-y-2.5">
              <Bar />
              <Bar w="92%" />
              <Bar w="96%" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
