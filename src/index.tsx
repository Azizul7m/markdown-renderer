import React from "react";

export function slugifyHeading(value: string) {
  return value
    .toLocaleLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/[\s-]+/g, "-");
}

export type MarkdownRendererProps = {
  md: string;
  hideTableOfContents?: boolean;
};

export type TableOfContentsItem = {
  label: string;
  id?: string;
  href?: string;
};

export function extractHeadings(md: string, levels = [2]): TableOfContentsItem[] {
  const usedIds = new Set<string>();

  return md.split(/\r?\n/).flatMap((line) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (!match || !levels.includes(match[1].length)) return [];
    const label = match[2].trim();
    const baseId = slugifyHeading(label);
    let id = baseId;
    let suffix = 2;
    while (usedIds.has(id)) id = `${baseId}-${suffix++}`;
    usedIds.add(id);
    return [{ label, id }];
  });
}

export type TableOfContentsProps = {
  title?: string;
  md?: string;
  items?: TableOfContentsItem[];
  levels?: number[];
};

export function TableOfContents({ title = "Table of contents", md = "", items, levels = [2] }: TableOfContentsProps) {
  const navigationItems = items ?? extractHeadings(md, levels);

  return React.createElement("details", { className: "print:hidden group relative" },
    React.createElement("summary", { className: "flex cursor-pointer list-none items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-bold text-[var(--text)] shadow-[0_8px_24px_var(--shadow)] [&::-webkit-details-marker]:hidden" },
      title,
      React.createElement("span", { "aria-hidden": true, className: "transition-transform group-open:rotate-180" }, "⌄")
    ),
    React.createElement("nav", { className: "absolute left-0 right-0 z-10 mt-2 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[0_12px_35px_var(--shadow)]", "aria-label": title },
      React.createElement("ol", { className: "m-0 space-y-1 p-0 text-sm" }, navigationItems.map((item) =>
        React.createElement("li", { key: item.href ?? item.id ?? item.label },
          React.createElement("a", { className: "block rounded-lg px-2 py-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--accent2)]", href: item.href ?? `#${item.id ?? slugifyHeading(item.label)}` }, item.label)
        )
      ))
    )
  );
}

export default function MarkdownRenderer({ md, hideTableOfContents = false }: MarkdownRendererProps) {
  const lines = md.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] | null = null;
  let hidingTableOfContents = false;

  function renderInline(text: string) {
    const tokens = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^\)]+\))/g).filter(Boolean);
    return tokens.map((token, index) => {
      const strong = token.match(/^\*\*(.+)\*\*$/);
      const link = token.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
      if (strong) return React.createElement("strong", { key: index }, strong[1]);
      if (link) {
        const href = link[2].startsWith("#") ? `#${slugifyHeading(link[2].slice(1))}` : link[2];
        return React.createElement("a", { key: index, href }, link[1]);
      }
      return token;
    });
  }

  function heading(level: 2 | 3 | 4, text: string, className: string, key: number) {
    return React.createElement(`h${level}`, { key, id: slugifyHeading(text), className: `${className} scroll-mt-6` }, renderInline(text));
  }

  function flushList() {
    if (!listBuffer) return;
    elements.push(React.createElement("ul", { key: `list-${elements.length}`, className: "my-3 mb-5 list-disc space-y-1.5 pl-5" }, listBuffer.map((li, i) => React.createElement("li", { key: i }, renderInline(li)))));
    listBuffer = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (hideTableOfContents && line.trim() === "## সুচিপত্র") {
      flushList();
      hidingTableOfContents = true;
      continue;
    }
    if (hidingTableOfContents) {
      if (/^---+$/.test(line.trim())) hidingTableOfContents = false;
      continue;
    }
    if (!line.trim()) { flushList(); continue; }
    if (line.startsWith("# ")) { flushList(); elements.push(React.createElement("h1", { key: i, className: "hidden" }, line.replace(/^#\s+/, "").trim())); continue; }
    if (line.startsWith("## ")) { flushList(); const text = line.replace(/^##\s+/, "").trim(); elements.push(heading(2, text, "mt-10 mb-3 border-b border-[var(--border)] pb-2 text-[clamp(1.35rem,3vw,1.8rem)] font-semibold text-[var(--accent1)]", i)); continue; }
    if (line.startsWith("### ")) { flushList(); const text = line.replace(/^###\s+/, "").trim(); elements.push(heading(3, text, "mt-7 mb-2 text-lg font-semibold text-[var(--accent2)]", i)); continue; }
    if (line.startsWith("#### ")) { flushList(); const text = line.replace(/^####\s+/, "").trim(); elements.push(heading(4, text, "mt-5 mb-2 text-base font-semibold text-[var(--accent3)]", i)); continue; }
    if (/^---+$/.test(line.trim())) { flushList(); elements.push(React.createElement("hr", { key: i, className: "my-8 border-0 border-t border-[var(--border)]" })); continue; }
    if (line.includes("|") && lines[i + 1]?.trim().match(/^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/)) {
      flushList();
      const parseRow = (row: string) => row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
      const headers = parseRow(line); const rows: string[][] = []; i += 2;
      while (i < lines.length && lines[i].includes("|")) { rows.push(parseRow(lines[i])); i += 1; }
      i -= 1;
      elements.push(React.createElement("div", { key: `table-${i}`, className: "my-4 overflow-x-auto" }, React.createElement("table", { className: "w-full border-collapse text-left" }, React.createElement("thead", null, React.createElement("tr", null, headers.map((cell, index) => React.createElement("th", { key: index, className: "border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 font-semibold" }, renderInline(cell))))), React.createElement("tbody", null, rows.map((row, rowIndex) => React.createElement("tr", { key: rowIndex }, row.map((cell, cellIndex) => React.createElement("td", { key: cellIndex, className: "border border-[var(--border)] px-3 py-2" }, renderInline(cell)))))) )));
      continue;
    }
    if (/^[*+-]\s+/.test(line)) { const item = line.replace(/^([*+-])\s+/, "").trim(); if (!listBuffer) listBuffer = []; listBuffer.push(item); continue; }
    flushList();
    elements.push(React.createElement("p", { key: i, className: "my-3 text-justify leading-relaxed text-[var(--text)] max-sm:text-left" }, renderInline(line)));
  }
  flushList();
  return React.createElement("article", { className: "print-document rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-[clamp(1rem,4vw,3rem)] shadow-[0_12px_35px_var(--shadow)] [&_a]:font-semibold [&_a]:text-[var(--accent1)]" }, elements);
}
