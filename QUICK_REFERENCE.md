# Quick Reference Card

## Installation

```bash
npm install @azizul7m/markdown-renderer
```

---

## Minimal Setup (Copy-Paste)

```tsx
import MarkdownRenderer, { applyColorScheme, getColorScheme } from "@azizul7m/markdown-renderer";
import "@azizul7m/markdown-renderer/styles.css";
import { useEffect } from "react";

export default function Page() {
  const markdown = `
# Welcome
This is **markdown** content.
  `;

  useEffect(() => {
    // Pick a theme: one-dark, one-light, catppuccin-frappe, doom-one, nord, dracula, gruvbox-dark, gruvbox-light
    applyColorScheme(getColorScheme("catppuccin-frappe"));
  }, []);

  return <MarkdownRenderer md={markdown} />;
}
```

---

## Color Schemes Cheat Sheet

```tsx
// All 9 schemes:
"one-dark"           // Dark - VS Code balanced
"one-light"          // Light - VS Code minimal
"catppuccin-frappe"  // Dark - Warm pastels
"catppuccin-latte"   // Light - Soft pastels
"doom-one"           // Dark - High contrast
"nord"               // Dark - Cool arctic
"dracula"            // Dark - Vibrant
"gruvbox-dark"       // Dark - Retro warm
"gruvbox-light"      // Light - Retro light
```

---

## Common Tasks

### Display All Themes (Dropdown)

```tsx
import { getAllColorSchemes, applyColorScheme } from "@azizul7m/markdown-renderer";

const schemes = getAllColorSchemes();

<select onChange={(e) => applyColorScheme(schemes.find(s => s.name === e.target.value)!)}>
  {schemes.map(s => (
    <option key={s.name} value={s.name}>{s.label} {s.isDark ? "🌙" : "☀️"}</option>
  ))}
</select>
```

### Save Theme to LocalStorage

```tsx
const handleTheme = (name: string) => {
  applyColorScheme(getColorScheme(name as any));
  localStorage.setItem("theme", name);
};

useEffect(() => {
  const saved = localStorage.getItem("theme") || "one-dark";
  applyColorScheme(getColorScheme(saved as any));
}, []);
```

### Respect System Dark Mode

```tsx
useEffect(() => {
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyColorScheme(getColorScheme(dark ? "nord" : "one-light"));
}, []);
```

### Hide Table of Contents

```tsx
<MarkdownRenderer md={markdown} hideTableOfContents />
```

### Print to PDF

```tsx
<button onClick={() => window.print()}>Print / PDF</button>
```

### Use Custom Table of Contents

```tsx
import { TableOfContents } from "@azizul7m/markdown-renderer";

<TableOfContents 
  md={markdown}
  title="Contents"
  levels={[2, 3]}  // h2, h3
/>
```

---

## CSS Variables (For Styling)

```css
:root {
  --background: /* page bg */;
  --surface: /* card bg */;
  --surface-muted: /* secondary */;
  --text: /* main text */;
  --muted: /* dim text */;
  --border: /* dividers */;
  --accent1: /* h2, links */;
  --accent2: /* h3 */;
  --accent3: /* h4 */;
  --accent4: /* accents */;
  --shadow: /* shadows */;
}
```

---

## Exports

```tsx
// Component
import MarkdownRenderer from "@azizul7m/markdown-renderer";

// Functions
import {
  applyColorScheme,
  getColorScheme,
  getAllColorSchemes,
  getCurrentColorScheme,
  generateColorSchemeCSSVariables,
  slugifyHeading,
  extractHeadings,
  TableOfContents,
  colorSchemes,
} from "@azizul7m/markdown-renderer";

// Types
import type {
  ColorSchemeName,
  ColorScheme,
  MarkdownRendererProps,
  TableOfContentsProps,
} from "@azizul7m/markdown-renderer";

// CSS
import "@azizul7m/markdown-renderer/styles.css";
```

---

## Supported Markdown Syntax

| Syntax | Example |
|--------|---------|
| Heading 2-4 | `## Title` `### Subtitle` |
| Bold | `**text**` |
| Italic | `*text*` |
| Link | `[text](url)` |
| Anchor | `[text](#heading-id)` |
| List | `- item` or `1. item` |
| Horizontal Rule | `---` or `====` |
| Table | GitHub-flavored tables |

---

## Props

```tsx
<MarkdownRenderer
  md={string}              // Required
  hideTableOfContents?     // Optional, default: false
/>

<TableOfContents
  title?="Contents"        // Optional
  md?={string}            // Optional (OR use items)
  items?=[...]            // Optional (OR use md)
  levels?={[2, 3]}        // Optional, default: [2]
/>
```

---

## File Size

- **Minified**: ~15KB
- **Gzipped**: ~7KB

---

## Browser Support

- Modern browsers (ES2020+)
- React 18+
- SSR/Next.js compatible

---

## Need Help?

1. **See Examples**: `USAGE_GUIDE.md` in npm package
2. **Report Issues**: GitHub repo
3. **Check Docs**: Full API in README.md

---

**Made with ❤️ — MIT License**
