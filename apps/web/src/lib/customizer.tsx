"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type State = {
  color: string;
  strokeWidth: number;
  size: number;
  absolute: boolean;
  dark: boolean;
};

type Customizer = State & {
  setColor: (v: string) => void;
  setStrokeWidth: (v: number) => void;
  setSize: (v: number) => void;
  setAbsolute: (v: boolean) => void;
  toggleTheme: () => void;
  reset: () => void;
  exportStroke: number;
};

const defaults: State = {
  color: "#ffffff",
  strokeWidth: 2,
  size: 24,
  absolute: false,
  dark: true,
};

const Ctx = createContext<Customizer | null>(null);

export function CustomizerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(defaults);

  // hydrate saved values after mount to avoid ssr mismatch
  useEffect(() => {
    const saved = localStorage.getItem("epoir-customizer");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ ...defaults, ...JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("epoir-customizer", JSON.stringify(state));
    document.documentElement.classList.toggle("dark", state.dark);
  }, [state]);

  const patch = (p: Partial<State>) => setState((s) => ({ ...s, ...p }));

  const value: Customizer = {
    ...state,
    setColor: (color) => patch({ color }),
    setStrokeWidth: (strokeWidth) => patch({ strokeWidth }),
    setSize: (size) => patch({ size }),
    setAbsolute: (absolute) => patch({ absolute }),
    toggleTheme: () =>
      patch({
        dark: !state.dark,
        color: state.dark ? "#000000" : "#ffffff",
      }),
    reset: () =>
      patch({
        ...defaults,
        dark: state.dark,
        color: state.dark ? "#ffffff" : "#000000",
      }),
    exportStroke: state.absolute
      ? (state.strokeWidth * 24) / state.size
      : state.strokeWidth,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCustomizer() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCustomizer needs CustomizerProvider");
  return ctx;
}
