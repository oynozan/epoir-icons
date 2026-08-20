"use client";

import { useState } from "react";
import type { IconEntry } from "epoir-icons";
import { useCustomizer } from "@/lib/customizer";
import { highlight } from "@/lib/highlight";
import {
  angularSnippet,
  astroSnippet,
  reactSnippet,
  svelteSnippet,
  svgMarkup,
  vueSnippet,
} from "@/lib/snippets";

const TABS = ["React", "SVG", "Vue", "Svelte", "Angular", "Astro"] as const;
type Tab = (typeof TABS)[number];

// svg and vue/svelte/astro read best as markup, react/angular as jsx
const LANG: Record<Tab, "xml" | "jsx"> = {
  React: "jsx",
  SVG: "xml",
  Vue: "xml",
  Svelte: "xml",
  Angular: "jsx",
  Astro: "xml",
};

export function CodeTabs({ current }: { current: IconEntry }) {
  const { size, color, strokeWidth, exportStroke } = useCustomizer();
  const [tab, setTab] = useState<Tab>("React");

  const code =
    tab === "React"
      ? reactSnippet(current.name, size, strokeWidth)
      : tab === "SVG"
        ? svgMarkup(current.body, size, color, exportStroke)
        : tab === "Vue"
          ? vueSnippet(current.name, size, strokeWidth)
          : tab === "Svelte"
            ? svelteSnippet(current.name, size, strokeWidth)
            : tab === "Angular"
              ? angularSnippet(current.name, size, strokeWidth)
              : astroSnippet(current.name, size, strokeWidth);

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel">
      <div className="flex gap-1 overflow-x-auto border-b border-line px-2">
        {TABS.map((name) => (
          <button
            key={name}
            onClick={() => setTab(name)}
            className={`-mb-px shrink-0 border-b-2 px-3 py-3 text-sm transition-colors ${
              tab === name
                ? "border-accent text-fg"
                : "border-transparent text-muted hover:text-fg"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
        <code>{highlight(code, LANG[tab])}</code>
      </pre>
    </div>
  );
}
