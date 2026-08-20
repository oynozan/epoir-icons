"use client";

import Link from "next/link";
import { useMemo, type ReactNode } from "react";
import { motion } from "motion/react";
import { icons } from "epoir-icons";
import { useCustomizer } from "@/lib/customizer";
import { ArrowUpRight, Github, Moon, RotateCcw, Sun } from "@/lib/ui-icons";

const NAV = ["Icons", "Guide", "Packages"];

export function Shell({
  activeCategory,
  onSelectCategory,
  children,
}: {
  activeCategory: string | null;
  onSelectCategory: (name: string | null) => void;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-[1560px] gap-10 px-8">
      <Sidebar
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
      />
      <main className="min-w-0 flex-1 pb-20">
        <Header />
        {children}
      </main>
    </div>
  );
}

function Sidebar({
  activeCategory,
  onSelectCategory,
}: {
  activeCategory: string | null;
  onSelectCategory: (name: string | null) => void;
}) {
  const {
    color,
    setColor,
    strokeWidth,
    setStrokeWidth,
    size,
    setSize,
    absolute,
    setAbsolute,
    reset,
  } = useCustomizer();

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const icon of icons) {
      for (const name of icon.categories) {
        counts.set(name, (counts.get(name) ?? 0) + 1);
      }
    }
    return [...counts].sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  return (
    <aside className="sticky top-0 flex h-screen w-[210px] shrink-0 flex-col gap-7 overflow-y-auto border-r border-line py-7 pr-6 text-[13px]">
      <div className="sticky top-0 z-10 mt-20 rounded-2xl border border-line bg-panel p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[15px] font-semibold">Customizer</span>
          <button
            onClick={reset}
            aria-label="Reset customizer"
            className="text-muted transition-colors hover:text-fg"
          >
            <RotateCcw />
          </button>
        </div>

        <label className="mb-1.5 block font-medium">Color</label>
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-line px-2 py-1.5">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="size-5 shrink-0"
          />
          <input
            value={color}
            onChange={(e) => setColor(e.target.value)}
            spellCheck={false}
            className="w-full bg-transparent font-mono text-muted outline-none"
          />
        </div>

        <Slider
          label="Stroke width"
          value={strokeWidth}
          min={0.5}
          max={3}
          step={0.1}
          onChange={setStrokeWidth}
        />
        <Slider
          label="Size"
          value={size}
          min={24}
          max={96}
          step={1}
          onChange={setSize}
        />

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="font-medium">Absolute stroke width</span>
          <Switch checked={absolute} onChange={setAbsolute} />
        </div>
      </div>

      <div className="pl-4">
        <p className="mb-3 text-[15px] font-semibold">View</p>
        <button
          onClick={() => onSelectCategory(null)}
          className={`mb-4 block transition-colors ${
            activeCategory === null ? "text-accent" : "text-muted hover:text-fg"
          }`}
        >
          All
        </button>
        <p className="mb-3 text-[15px] font-semibold">Categories</p>
        <ul className="flex flex-col gap-2.5">
          {categories.map(([name, count]) => (
            <li key={name}>
              <button
                onClick={() => onSelectCategory(name)}
                className={`flex w-full items-center justify-between gap-2 transition-colors ${
                  activeCategory === name
                    ? "text-accent"
                    : "text-muted hover:text-fg"
                }`}
              >
                <span className="capitalize">{name}</span>
                <span className="tabular-nums opacity-70">{count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function Header() {
  const { dark, toggleTheme } = useCustomizer();
  return (
    <header className="mb-10 flex h-18 items-center gap-7 text-sm">
      <nav className="ml-auto flex items-center gap-7">
        {NAV.map((item, i) => (
          <Link
            key={item}
            href="/"
            className={`flex items-center gap-1 transition-colors ${
              i === 0 ? "text-accent" : "text-muted hover:text-fg"
            }`}
          >
            {item}
            {item === "Packages" && <ArrowUpRight />}
          </Link>
        ))}
      </nav>

      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="flex h-6 w-11 shrink-0 items-center rounded-full border border-line bg-tile px-0.5"
      >
        <span
          className={`flex size-5 items-center justify-center rounded-full bg-panel text-muted transition-transform ${
            dark ? "translate-x-5" : ""
          }`}
        >
          {dark ? <Moon /> : <Sun />}
        </span>
      </button>

      <a
        href="#"
        aria-label="GitHub"
        className="shrink-0 text-muted hover:text-fg"
      >
        <Github />
      </a>
    </header>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium">{label}</span>
        <span className="tabular-nums text-muted">{value}px</span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{
          background: `linear-gradient(to right, var(--accent) ${pct}%, var(--line) ${pct}%)`,
        }}
      />
    </div>
  );
}

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex h-6 w-11 shrink-0 items-center rounded-full px-0.5 transition-colors ${
        checked ? "bg-accent" : "bg-tile-hover"
      }`}
    >
      <motion.span
        className="size-5 rounded-full bg-white shadow"
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      />
    </button>
  );
}
