"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { IconEntry } from "epoir-icons";
import { useCustomizer } from "@/lib/customizer";
import {
  angularSnippet,
  astroSnippet,
  dataUrl,
  pascal,
  reactSnippet,
  svelteSnippet,
  svgMarkup,
  vueSnippet,
} from "@/lib/snippets";
import { ChevronDown, Copy, ReactLogo } from "@/lib/ui-icons";

type Item = { label: string; run: () => void };

export function CopyBar({
  current,
  menuUp = false,
}: {
  current: IconEntry;
  menuUp?: boolean;
}) {
  const { size, color, strokeWidth, exportStroke } = useCustomizer();
  const [toast, setToast] = useState("");
  const body = current.body;
  const svg = svgMarkup(body, size, color, exportStroke);

  function flash(label: string) {
    setToast(label);
    setTimeout(() => setToast(""), 1400);
  }

  function copy(label: string, text: string) {
    navigator.clipboard.writeText(text);
    flash(label);
  }

  function download(name: string, href: string, label: string) {
    const a = document.createElement("a");
    a.href = href;
    a.download = name;
    a.click();
    flash(label);
  }

  function downloadPng() {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 512, 512);
      download(`${current.name}.png`, canvas.toDataURL("image/png"), "Downloaded PNG");
    };
    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
  }

  const svgItems: Item[] = [
    { label: "Copy SVG", run: () => copy("Copied SVG", svg) },
    {
      label: "Copy Data URL",
      run: () => copy("Copied Data URL", dataUrl(body, size, color, exportStroke)),
    },
    {
      label: "Download SVG",
      run: () =>
        download(
          `${current.name}.svg`,
          `data:image/svg+xml,${encodeURIComponent(svg)}`,
          "Downloaded SVG",
        ),
    },
    { label: "Download PNG", run: downloadPng },
  ];

  const jsxItems: Item[] = [
    {
      label: "Copy JSX",
      run: () => copy("Copied JSX", reactSnippet(current.name, size, strokeWidth)),
    },
    {
      label: "Copy Component Name",
      run: () => copy("Copied name", pascal(current.name)),
    },
    {
      label: "Copy Vue",
      run: () => copy("Copied Vue", vueSnippet(current.name, size, strokeWidth)),
    },
    {
      label: "Copy Svelte",
      run: () => copy("Copied Svelte", svelteSnippet(current.name, size, strokeWidth)),
    },
    {
      label: "Copy Angular",
      run: () => copy("Copied Angular", angularSnippet(current.name, size, strokeWidth)),
    },
    {
      label: "Copy Astro",
      run: () => copy("Copied Astro", astroSnippet(current.name, size, strokeWidth)),
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 text-sm font-medium">
      <Dropdown
        label="Copy SVG"
        icon={<Copy size={16} />}
        primary={svgItems[0].run}
        items={svgItems}
        up={menuUp}
      />
      <Dropdown
        label="Copy JSX"
        icon={<ReactLogo size={16} />}
        primary={jsxItems[0].run}
        items={jsxItems}
        up={menuUp}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-line bg-panel px-4 py-2.5 text-sm shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Dropdown({
  label,
  icon,
  primary,
  items,
  up,
}: {
  label: string;
  icon: React.ReactNode;
  primary: () => void;
  items: Item[];
  up?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <div className="flex items-stretch overflow-hidden rounded-xl border border-line bg-tile">
        <button
          onClick={primary}
          className="flex items-center gap-2.5 py-3 pl-4 pr-3 transition-colors hover:bg-tile-hover"
        >
          {icon}
          {label}
        </button>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={`${label} options`}
          className="flex items-center border-l border-line px-2.5 text-muted transition-colors hover:bg-tile-hover hover:text-fg"
        >
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} />
          </motion.span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: up ? 6 : -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: up ? 6 : -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute left-0 z-40 min-w-52 overflow-hidden rounded-xl border border-line bg-panel p-1.5 shadow-xl ${
              up ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top"
            }`}
          >
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.run();
                  setOpen(false);
                }}
                className="block w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-tile"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
