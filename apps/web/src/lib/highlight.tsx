import type { ReactNode } from "react";

type Spec = { type: string; re: string };

// xml drives the svg snippets
const XML: Spec[] = [
  { type: "comment", re: "<!--[\\s\\S]*?-->" },
  { type: "string", re: "\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'" },
  { type: "tag", re: "</?[a-zA-Z][\\w:-]*" },
  { type: "punct", re: "/?>" },
  { type: "attr", re: "[a-zA-Z_:][\\w:.-]*(?==)" },
  { type: "punct", re: "=" },
];

// jsx drives the react snippets
const JSX: Spec[] = [
  { type: "comment", re: "//.*|/\\*[\\s\\S]*?\\*/" },
  { type: "string", re: "\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`" },
  {
    type: "keyword",
    re: "\\b(?:import|from|export|default|function|return|const|let|var|new)\\b",
  },
  { type: "tag", re: "</?[A-Za-z][\\w]*" },
  { type: "punct", re: "/?>" },
  { type: "attr", re: "[a-zA-Z_][\\w-]*(?==)" },
  { type: "fn", re: "[a-zA-Z_$][\\w$]*(?=\\()" },
  { type: "punct", re: "[{}();.,]" },
];

function scan(code: string, specs: Spec[]): ReactNode[] {
  const compiled = specs.map((s) => ({ type: s.type, re: new RegExp(s.re, "y") }));
  const nodes: ReactNode[] = [];
  let i = 0;
  let buffer = "";
  let key = 0;

  const flush = () => {
    if (buffer) {
      nodes.push(<span key={key++}>{buffer}</span>);
      buffer = "";
    }
  };

  while (i < code.length) {
    let hit = false;
    for (const c of compiled) {
      c.re.lastIndex = i;
      const m = c.re.exec(code);
      if (m && m[0]) {
        flush();
        nodes.push(
          <span key={key++} className={`tok-${c.type}`}>
            {m[0]}
          </span>,
        );
        i += m[0].length;
        hit = true;
        break;
      }
    }
    if (!hit) {
      buffer += code[i];
      i += 1;
    }
  }
  flush();
  return nodes;
}

export function highlight(code: string, lang: "xml" | "jsx") {
  return scan(code, lang === "xml" ? XML : JSX);
}
