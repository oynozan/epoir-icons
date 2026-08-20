"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { icons } from "epoir-icons";
import { useCustomizer } from "@/lib/customizer";
import { Shell } from "@/components/shell";
import { IconTile } from "@/components/animated";
import { IconDrawer } from "@/components/icon-drawer";
import { Filter, Play, Search } from "@/lib/ui-icons";

export default function Page() {
  const { size } = useCustomizer();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [scrolled, setScrolled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // longest icon animation is ~1.3s (emanate: 1s + 0.3s stagger)
  function playAll() {
    setPlaying(true);
    setTimeout(() => setPlaying(false), 1400);
  }

  // adopt icon and category from the url on load and history moves
  useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      setSelected(params.get("icon"));
      setCategory(params.get("category"));
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        search.current?.focus();
      }
      if (e.key === "Escape") {
        setSelected(null);
        const params = new URLSearchParams(window.location.search);
        params.delete("icon");
        const qs = params.toString();
        window.history.pushState(null, "", qs ? `/?${qs}` : "/");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function pushUrl(next: { category?: string | null; icon?: string | null }) {
    const params = new URLSearchParams();
    if (next.category) params.set("category", next.category);
    if (next.icon) params.set("icon", next.icon);
    const qs = params.toString();
    window.history.pushState(null, "", qs ? `/?${qs}` : "/");
  }

  function open(name: string) {
    setSelected(name);
    pushUrl({ category, icon: name });
  }

  function close() {
    setSelected(null);
    pushUrl({ category, icon: null });
  }

  function selectCategory(name: string | null) {
    setCategory(name);
    pushUrl({ category: name, icon: selected });
  }

  const q = query.trim().toLowerCase();
  const visible = icons
    .filter(
      (icon) =>
        (!category || icon.categories.includes(category)) &&
        (!q || icon.name.includes(q) || icon.tags.some((t) => t.includes(q))),
    )
    .sort((a, b) =>
      sortDir === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );
  const current = icons.find((icon) => icon.name === selected);
  const elevate = `pointer-events-auto transition-[box-shadow,color] ${
    scrolled ? "shadow-[0_10px_30px_-8px_rgb(0_0_0/0.45)]" : ""
  }`;

  return (
    <>
      <Shell activeCategory={category} onSelectCategory={selectCategory}>
        <div className="pointer-events-none sticky top-0 z-20 -mt-4 mb-5 flex items-center gap-4 py-4">
          <div
            className={`${elevate} flex h-14 flex-1 items-center gap-3 rounded-xl border border-line bg-panel px-4`}
          >
            <span className="text-muted">
              <Search size={20} />
            </span>
            <input
              ref={search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${icons.length} icons...`}
              className="h-full w-full bg-transparent text-[15px] outline-none placeholder:text-muted"
            />
            <kbd className="rounded-md border border-line px-2 py-1 font-mono text-xs text-muted">
              Ctrl+K
            </kbd>
          </div>
          <button
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            className={`${elevate} flex h-14 shrink-0 items-center gap-3 rounded-xl border border-line bg-panel px-5 text-[15px] text-muted hover:text-fg`}
          >
            <Filter size={20} />
            {sortDir === "asc" ? "A → Z" : "Z → A"}
          </button>
          <button
            onClick={playAll}
            aria-label="Play all animations"
            className={`${elevate} flex size-14 shrink-0 items-center justify-center rounded-xl bg-accent text-white`}
          >
            <Play size={20} />
          </button>
        </div>

        <div style={{ paddingBottom: selected ? 340 : 0 }}>
          {visible.length === 0 ? (
            <p className="py-20 text-center text-muted">No icons found</p>
          ) : (
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(${Math.max(
                  56,
                  size + 32,
                )}px, 1fr))`,
              }}
            >
              {visible.map((icon) => (
                <IconTile
                  key={icon.name}
                  icon={icon}
                  active={selected === icon.name}
                  playing={playing}
                  onClick={() => open(icon.name)}
                />
              ))}
            </div>
          )}
        </div>
      </Shell>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30">
        <div className="mx-auto flex max-w-[1560px] gap-10 px-8">
          <div className="w-[210px] shrink-0" aria-hidden />
          <AnimatePresence>
            {current && (
              <IconDrawer
                key="drawer"
                current={current}
                onClose={close}
                onSelectCategory={selectCategory}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
