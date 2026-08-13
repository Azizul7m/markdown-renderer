# Markdown Renderer - Complete Usage Guide

A lightweight React Markdown renderer with built-in color scheme support, perfect for documentation sites, blogs, and knowledge bases.

---

## 🚀 Quick Start (2 minutes)

### 1. Install

```bash
npm install @azizul7m/markdown-renderer
```

### 2. Basic Usage

```tsx
import MarkdownRenderer from "@azizul7m/markdown-renderer";
import "@azizul7m/markdown-renderer/styles.css";

export function MyDocument() {
  const markdown = `
# Hello World

This is a **markdown** document with:
- Lists
- Links
- Tables
- Code blocks
  `;

  return <MarkdownRenderer md={markdown} />;
}
```

### 3. Add Color Scheme

```tsx
import { useEffect } from "react";
import MarkdownRenderer, { applyColorScheme, getColorScheme } from "@azizul7m/markdown-renderer";
import "@azizul7m/markdown-renderer/styles.css";

export function MyDocument() {
  const markdown = "# Your markdown content";

  useEffect(() => {
    // Apply a color scheme when component mounts
    const scheme = getColorScheme("catppuccin-frappe");
    applyColorScheme(scheme);
  }, []);

  return <MarkdownRenderer md={markdown} />;
}
```

Done! Your markdown now has beautiful styling with the Catppuccin Frappé theme.

---

## 🎨 Color Schemes

We include **9 carefully curated color schemes** ready to use:

### Dark Themes
| Name | Description |
|------|-------------|
| **one-dark** | VS Code One Dark - Clean and professional |
| **doom-one** | Doom Emacs - High contrast, comfortable |
| **nord** | Arctic palette - Cool blues and greens |
| **dracula** | Popular dark theme - Vibrant and energetic |
| **catppuccin-frappe** | Warm pastels - Soothing on the eyes |
| **gruvbox-dark** | Retro groove - Warm browns and oranges |

### Light Themes
| Name | Description |
|------|-------------|
| **one-light** | VS Code One Light - Clean and minimal |
| **catppuccin-latte** | Catppuccin light variant - Soft pastels |
| **gruvbox-light** | Retro light variant - Warm and inviting |

---

## 📚 Common Use Cases

### Use Case 1: Let Users Choose Their Theme

Create a theme switcher component:

```tsx
"use client"; // if using Next.js App Router

import { useEffect, useState } from "react";
import MarkdownRenderer, { 
  getAllColorSchemes, 
  applyColorScheme 
} from "@azizul7m/markdown-renderer";
import "@azizul7m/markdown-renderer/styles.css";

export function DocumentWithThemeSwitcher({ md }: { md: string }) {
  const [currentScheme, setCurrentScheme] = useState("one-dark");
  const schemes = getAllColorSchemes();

  const handleSchemeChange = (schemeName: string) => {
    const scheme = getAllColorSchemes().find(s => s.name === schemeName);
    if (scheme) {
      applyColorScheme(scheme);
      setCurrentScheme(schemeName);
      // Optionally save to localStorage
      localStorage.setItem("preferredScheme", schemeName);
    }
  };

  useEffect(() => {
    // Load saved preference on mount
    const saved = localStorage.getItem("preferredScheme");
    if (saved) handleSchemeChange(saved);
  }, []);

  return (
    <div>
      <div className="mb-4 flex gap-2">
        {schemes.map(scheme => (
          <button
            key={scheme.name}
            onClick={() => handleSchemeChange(scheme.name)}
            className={`px-3 py-1 rounded ${
              currentScheme === scheme.name 
                ? "bg-blue-500 text-white" 
                : "bg-gray-200 text-black"
            }`}
          >
            {scheme.label}
          </button>
        ))}
      </div>
      <MarkdownRenderer md={md} />
    </div>
  );
}
```

### Use Case 2: Respect System Dark Mode Preference

```tsx
import { useEffect } from "react";
import MarkdownRenderer, { getColorScheme, applyColorScheme } from "@azizul7m/markdown-renderer";
import "@azizul7m/markdown-renderer/styles.css";

export function DocumentWithSystemPreference({ md }: { md: string }) {
  useEffect(() => {
    // Detect system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const scheme = prefersDark ? "nord" : "one-light";
    applyColorScheme(getColorScheme(scheme));

    // Listen for changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newScheme = e.matches ? "nord" : "one-light";
      applyColorScheme(getColorScheme(newScheme));
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return <MarkdownRenderer md={md} />;
}
```

### Use Case 3: Print-Friendly Documents

The package includes print stylesheet for A4 formatting:

```tsx
import MarkdownRenderer from "@azizul7m/markdown-renderer";
import "@azizul7m/markdown-renderer/styles.css";

export function PrintableDocument({ md }: { md: string }) {
  return (
    <div>
      <button onClick={() => window.print()}>Print / Save as PDF</button>
      <MarkdownRenderer md={md} />
    </div>
  );
}
```

Features:
- ✓ A4 page size with proper margins
- ✓ Keeps headings with their content
- ✓ Avoids splitting tables and lists
- ✓ Section headings start on new pages
- ✓ Optimal for PDF export

### Use Case 4: Custom Table of Contents

```tsx
import MarkdownRenderer, { TableOfContents } from "@azizul7m/markdown-renderer";
import "@azizul7m/markdown-renderer/styles.css";

export function DocumentWithTOC({ md }: { md: string }) {
  return (
    <div className="flex gap-4">
      {/* Sidebar with TOC */}
      <aside className="w-64">
        <TableOfContents 
          title="📖 Contents"
          md={md} 
          levels={[2, 3]}
        />
      </aside>

      {/* Main content - hide built-in TOC */}
      <main className="flex-1">
        <MarkdownRenderer md={md} hideTableOfContents />
      </main>
    </div>
  );
}
```

### Use Case 5: Hide Table of Contents

```tsx
// If you want to display your own TOC, hide the default one:
<MarkdownRenderer md={markdown} hideTableOfContents />
```

---

## 🔧 API Reference

### MarkdownRenderer Component

```tsx
<MarkdownRenderer
  md={string}                // Markdown content (required)
  hideTableOfContents?       // Hide "Table of Contents" section (default: false)
/>
```

### Color Scheme Functions

#### `getColorScheme(name: ColorSchemeName): ColorScheme`
Get a color scheme by name.

```tsx
const scheme = getColorScheme("catppuccin-frappe");
applyColorScheme(scheme);
```

#### `getAllColorSchemes(): ColorScheme[]`
Get all available color schemes.

```tsx
const allSchemes = getAllColorSchemes();
allSchemes.forEach(s => console.log(s.label)); 
// "One Dark", "Catppuccin Latte", "Doom One", ...
```

#### `applyColorScheme(scheme: ColorScheme): void`
Apply a color scheme to the document (client-side only).

```tsx
const scheme = getColorScheme("dracula");
applyColorScheme(scheme);
// CSS variables are now set on document.documentElement
```

#### `getCurrentColorScheme(): ColorSchemeName | null`
Get the currently applied color scheme name.

```tsx
const current = getCurrentColorScheme(); // "dracula"
```

#### `generateColorSchemeCSSVariables(scheme: ColorScheme): string`
Generate CSS string from a color scheme (useful for SSR).

```tsx
const cssString = generateColorSchemeCSSVariables(scheme);
// Returns: "--background: #282a36;\n  --text: #f8f8f2;\n  ..."
```

### Helper Functions

#### `slugifyHeading(value: string): string`
Convert heading text to URL-safe ID.

```tsx
slugifyHeading("My Heading 123!"); // "my-heading-123"
```

#### `extractHeadings(md: string, levels?: number[]): TableOfContentsItem[]`
Extract headings from markdown for custom TOC.

```tsx
const headings = extractHeadings(markdown, [2, 3]);
// [{ label: "Introduction", id: "introduction" }, ...]
```

### TableOfContents Component

```tsx
<TableOfContents
  title?={string}          // Section title (default: "Table of contents")
  md?={string}             // Markdown to extract headings from
  items?={TableOfContentsItem[]}  // Custom items (overrides md)
  levels?={number[]}       // Heading levels to extract (default: [2])
/>
```

---

## 💾 Local Storage Integration

Persist user's theme choice:

```tsx
"use client";

import { useEffect } from "react";
import MarkdownRenderer, { 
  applyColorScheme, 
  getColorScheme 
} from "@azizul7m/markdown-renderer";
import "@azizul7m/markdown-renderer/styles.css";

const STORAGE_KEY = "markdown-renderer-theme";

export function MyDocument({ md }: { md: string }) {
  useEffect(() => {
    // On mount: load saved theme or use default
    const saved = localStorage.getItem(STORAGE_KEY) || "one-dark";
    applyColorScheme(getColorScheme(saved as any));
  }, []);

  const handleThemeChange = (themeName: string) => {
    applyColorScheme(getColorScheme(themeName as any));
    localStorage.setItem(STORAGE_KEY, themeName);
  };

  return (
    <>
      <select 
        onChange={(e) => handleThemeChange(e.target.value)}
        defaultValue={localStorage.getItem(STORAGE_KEY) || "one-dark"}
      >
        {["one-dark", "one-light", "catppuccin-frappe", "dracula", "nord"].map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <MarkdownRenderer md={md} />
    </>
  );
}
```

---

## 📝 Supported Markdown

- ✓ **Headings**: `# h1` through `#### h4` (h1 hidden by default)
- ✓ **Paragraphs**: Plain text lines
- ✓ **Bold**: `**text**`
- ✓ **Italic**: `*text*`
- ✓ **Links**: `[text](url)` and internal anchors `[text](#heading)`
- ✓ **Lists**: `- item`, `+ item`, `* item`, or numbered `1. item`
- ✓ **Horizontal rules**: `---` or `====`
- ✓ **Tables**: GitHub-flavored Markdown tables
- ✓ **Unicode**: Full support for any language (Bangla, Arabic, CJK, etc.)

---

## 🎯 CSS Variables Reference

All color schemes define these 11 CSS variables:

| Variable | Purpose |
|----------|---------|
| `--background` | Main page background |
| `--surface` | Card and panel backgrounds |
| `--surface-muted` | Secondary surface (table headers, code blocks) |
| `--text` | Primary text color |
| `--muted` | Secondary/dim text (comments, metadata) |
| `--border` | Border and divider colors |
| `--accent1` | Headings h2, primary links, highlights |
| `--accent2` | Headings h3, secondary accents |
| `--accent3` | Headings h4, tertiary accents |
| `--accent4` | Quaternary accents, success states |
| `--shadow` | Drop shadows |

Use these in custom CSS:

```css
.my-custom-element {
  background-color: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
}
```

---

## 🚀 Server-Side Rendering (SSR)

For Next.js App Router or other SSR frameworks:

```tsx
import MarkdownRenderer, { 
  generateColorSchemeCSSVariables, 
  getColorScheme 
} from "@azizul7m/markdown-renderer";
import "@azizul7m/markdown-renderer/styles.css";

export function Document({ md, themeName }: { md: string; themeName: string }) {
  const scheme = getColorScheme(themeName as any);
  const cssVars = generateColorSchemeCSSVariables(scheme);

  return (
    <div style={{ colorScheme: scheme.isDark ? "dark" : "light" }}>
      <style>{`:root { ${cssVars} }`}</style>
      <MarkdownRenderer md={md} />
    </div>
  );
}
```

---

## 📦 Package Exports

```tsx
// Default export
import MarkdownRenderer from "@azizul7m/markdown-renderer";

// Named exports
import {
  applyColorScheme,
  getColorScheme,
  getAllColorSchemes,
  getCurrentColorScheme,
  generateColorSchemeCSSVariables,
  colorSchemes,
  slugifyHeading,
  extractHeadings,
  TableOfContents,
} from "@azizul7m/markdown-renderer";

// Styles (must import separately)
import "@azizul7m/markdown-renderer/styles.css";

// Types
import type {
  ColorSchemeName,
  ColorScheme,
  MarkdownRendererProps,
  TableOfContentsProps,
  TableOfContentsItem,
} from "@azizul7m/markdown-renderer";
```

---

## 🔍 Troubleshooting

### Colors not applying?
- Ensure you import the styles: `import "@azizul7m/markdown-renderer/styles.css"`
- Verify Tailwind CSS is installed (the styles use Tailwind utilities)
- Check that `applyColorScheme()` is called on the client side (use `useEffect`)

### Table of Contents not showing?
- By default, it shows if markdown contains h2+ headings
- Use `hideTableOfContents={true}` to hide it
- Use `extractHeadings(md, [2, 3])` to get headings programmatically

### Styles conflict with my own CSS?
- The package uses CSS variables and Tailwind classes
- Place `@azizul7m/markdown-renderer/styles.css` before your own styles in import order
- Adjust CSS variable values in `:root` if needed

### Performance issues?
- The renderer is lightweight (~7KB gzipped)
- Markdown is parsed on render; for large documents, memoize the component
- For SSR, use `generateColorSchemeCSSVariables()` to avoid client-side flashing

---

## 📄 Example: Complete Document Viewer

```tsx
"use client";

import { useEffect, useState } from "react";
import MarkdownRenderer, {
  getAllColorSchemes,
  applyColorScheme,
  getColorScheme,
  TableOfContents,
} from "@azizul7m/markdown-renderer";
import "@azizul7m/markdown-renderer/styles.css";

export default function DocumentViewer({ markdown }: { markdown: string }) {
  const [theme, setTheme] = useState("one-dark");
  const schemes = getAllColorSchemes();

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "one-dark";
    setTheme(saved);
    applyColorScheme(getColorScheme(saved as any));
  }, []);

  const handleThemeChange = (themeName: string) => {
    applyColorScheme(getColorScheme(themeName as any));
    localStorage.setItem("theme", themeName);
    setTheme(themeName);
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">📖 Documentation</h1>
        <select
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2"
        >
          {schemes.map((s) => (
            <option key={s.name} value={s.name}>
              {s.label} {s.isDark ? "🌙" : "☀️"}
            </option>
          ))}
        </select>
        <button
          onClick={() => window.print()}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          🖨️ Print
        </button>
      </div>

      <div className="flex gap-8">
        {/* TOC Sidebar */}
        <aside className="w-80 flex-shrink-0">
          <TableOfContents md={markdown} levels={[2, 3]} />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <MarkdownRenderer md={markdown} hideTableOfContents />
        </main>
      </div>
    </div>
  );
}
```

---

## 🤝 Contributing

This package is open source. Found a bug or have a feature request? Open an issue on GitHub!

---

## 📄 License

MIT - Use freely in personal and commercial projects.
