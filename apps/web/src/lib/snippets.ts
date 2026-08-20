export const pascal = (name: string) =>
  name.replace(/(^|-)([a-z])/g, (_, __, letter: string) =>
    letter.toUpperCase(),
  );

export function svgMarkup(body: string, size: number, color: string, sw: number) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">\n${body}\n</svg>`;
}

export function dataUrl(body: string, size: number, color: string, sw: number) {
  return `data:image/svg+xml,${encodeURIComponent(svgMarkup(body, size, color, sw))}`;
}

export function reactSnippet(name: string, size: number, sw: number) {
  const Name = pascal(name);
  return `import { ${Name} } from "epoir-icons";\n\nexport default function Demo() {\n  return <${Name} size={${size}} strokeWidth={${sw}} />;\n}`;
}

export function vueSnippet(name: string, size: number, sw: number) {
  const Name = pascal(name);
  return `<script setup>\nimport { ${Name} } from "@epoir-icons/vue";\n</script>\n\n<template>\n  <${Name} :size="${size}" :stroke-width="${sw}" />\n</template>`;
}

export function svelteSnippet(name: string, size: number, sw: number) {
  const Name = pascal(name);
  return `<script>\n  import { ${Name} } from "@epoir-icons/svelte";\n</script>\n\n<${Name} size={${size}} strokeWidth={${sw}} />`;
}

export function angularSnippet(name: string, size: number, sw: number) {
  const Name = pascal(name);
  return `import { Component } from "@angular/core";\nimport { ${Name} } from "@epoir-icons/angular";\n\n@Component({\n  selector: "app-demo",\n  imports: [${Name}],\n  template: \`<epoir-${name} [size]="${size}" [strokeWidth]="${sw}" />\`,\n})\nexport class DemoComponent {}`;
}

export function astroSnippet(name: string, size: number, sw: number) {
  const Name = pascal(name);
  return `---\nimport { ${Name} } from "@epoir-icons/astro";\n---\n\n<${Name} size={${size}} strokeWidth={${sw}} />`;
}
