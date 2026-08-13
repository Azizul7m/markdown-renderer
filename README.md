# @azizul7m/markdown-renderer

🚀 **A lightweight React markdown renderer with 9 built-in color schemes** (Catppuccin, Doom One, Nord, Dracula, Gruvbox, and more).

Perfect for documentation sites, blogs, note-taking apps, and knowledge bases. Includes:
- ✨ **9 Color Schemes** - Catppuccin, Doom One, Nord, Dracula, Gruvbox, One Dark/Light
- 📑 **Dynamic Table of Contents** - Auto-extracted or custom
- 🖨️ **A4 Print Support** - PDF export ready
- ♿ **Accessible** - Semantic HTML, proper contrast
- 🌍 **Unicode Support** - Works with any language (Bangla, Arabic, CJK, etc.)
- 📦 **Tiny** - 7KB gzipped, zero dependencies (React peer dependency)

---

## 30-Second Setup

### 1️⃣ Install

```bash
npm install @azizul7m/markdown-renderer
```

### 2️⃣ Import & Use

```tsx
import MarkdownRenderer from "@azizul7m/markdown-renderer";
import "@azizul7m/markdown-renderer/styles.css";

export function MyDoc({ md }: { md: string }) {
  return <MarkdownRenderer md={md} />;
}
```

### 3️⃣ Add Color Scheme

```tsx
import { useEffect } from "react";
import { applyColorScheme, getColorScheme } from "@azizul7m/markdown-renderer";

useEffect(() => {
  applyColorScheme(getColorScheme("catppuccin-frappe"));
}, []);
```

✅ Done! Your markdown now has beautiful styling.

---

## 🎨 Color Schemes

Choose from **9 professionally curated themes**:

### Dark Themes
- **one-dark** — VS Code One Dark (balanced)
- **doom-one** — Doom Emacs (high contrast)
- **nord** — Arctic palette (cool blues)
- **dracula** — Vibrant darks
- **catppuccin-frappe** — Warm pastels
- **gruvbox-dark** — Retro grooves

### Light Themes
- **one-light** — VS Code One Light (minimal)
- **catppuccin-latte** — Soft pastels
- **gruvbox-light** — Warm retro

---

## 📚 Usage Examples

### Theme Switcher Component

```tsx
"use client";
import { useState, useEffect } from "react";
import MarkdownRenderer, { 
  getAllColorSchemes, 
  applyColorScheme 
} from "@azizul7m/markdown-renderer";

export function DocumentViewer({ md }: { md: string }) {
  const [theme, setTheme] = useState("one-dark");

  const handleTheme = (name: string) => {
    const scheme = getAllColorSchemes().find(s => s.name === name);
    if (scheme) {
      applyColorScheme(scheme);
      setTheme(name);
      localStorage.setItem("theme", name);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "one-dark";
    handleTheme(saved);
  }, []);

  return (
    <div>
      <select value={theme} onChange={e => handleTheme(e.target.value)}>
        {getAllColorSchemes().map(s => (
          <option key={s.name} value={s.name}>
            {s.label} {s.isDark ? "🌙" : "☀️"}
          </option>
        ))}
      </select>
      <MarkdownRenderer md={md} />
    </div>
  );
}
```

### Follow System Dark Mode

```tsx
useEffect(() => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const scheme = isDark ? "nord" : "one-light";
  applyColorScheme(getColorScheme(scheme));
}, []);
```

### Print to PDF

```tsx
<button onClick={() => window.print()}>🖨️ Save as PDF</button>
<MarkdownRenderer md={markdown} />
```

Automatically formats for A4 with proper margins, page breaks, and widow/orphan control.

---

## 🔧 API

### Main Component

```tsx
<MarkdownRenderer 
  md={string}              // Your markdown content
  hideTableOfContents?     // Omit auto-generated TOC
/>
```

### Color Scheme Functions

```tsx
import {
  getColorScheme,           // Get scheme by name
  getAllColorSchemes,       // Get all 9 schemes
  applyColorScheme,         // Apply to document
  getCurrentColorScheme,    // Get currently applied name
  generateColorSchemeCSSVariables  // Get CSS string (SSR)
} from "@azizul7m/markdown-renderer";
```

### Table of Contents

```tsx
import { TableOfContents } from "@azizul7m/markdown-renderer";

<TableOfContents 
  md={markdown}
  title="Contents"
  levels={[2, 3]}  // Extract h2, h3
/>
```

### Utilities

```tsx
import { slugifyHeading, extractHeadings } from "@azizul7m/markdown-renderer";

slugifyHeading("My Heading!");  // "my-heading"
extractHeadings(md, [2, 3]);    // Get heading objects
```

---

## 📖 Supported Markdown

- ✅ Headings (h2–h4; h1 hidden by default)
- ✅ Paragraphs, **bold**, *italic*
- ✅ Links: `[text](url)` and `[text](#anchor)`
- ✅ Lists (unordered & numbered)
- ✅ Tables (GitHub-flavored)
- ✅ Horizontal rules
- ✅ Unicode (Bangla, Arabic, CJK, etc.)

---

## 🎨 Customization

### Use Custom CSS Variables

Define your own color scheme:

```css
:root {
  --background: #fafafa;
  --surface: #ffffff;
  --surface-muted: #f0f1f2;
  --text: #282c34;
  --muted: #68717d;
  --border: #d7d9dc;
  --accent1: #4078f2;
  --accent2: #a626a4;
  --accent3: #e45649;
  --accent4: #50a14f;
  --shadow: rgba(40, 44, 52, 0.12);
}
```

### Server-Side Rendering

```tsx
import { generateColorSchemeCSSVariables, getColorScheme } from "@azizul7m/markdown-renderer";

const scheme = getColorScheme("dracula");
const cssVars = generateColorSchemeCSSVariables(scheme);
// Use in <style>{`:root { ${cssVars} }`}</style>
```

---

## ❓ FAQ

**Q: Do I need Tailwind CSS?**  
A: No, Tailwind is optional. The package exports CSS variables for styling.

**Q: Can I persist theme choice?**  
A: Yes! Save to `localStorage` and apply on mount.

**Q: Does it work with SSR/Next.js?**  
A: Yes! Use `generateColorSchemeCSSVariables()` for SSR, then `applyColorScheme()` on client.

**Q: How do I hide the table of contents?**  
A: Use `<MarkdownRenderer md={md} hideTableOfContents />`

---

## 📄 See Also

- **[USAGE_GUIDE.md](./USAGE_GUIDE.md)** — Comprehensive guide with 20+ examples
- **Peer Dependency**: React 18+

---

## 📦 Bundle Size

- **Minified**: ~15KB
- **Gzipped**: ~7KB

---

## 📄 License

MIT — Use freely in personal and commercial projects.

---

## 🤝 Support

Questions? Open an issue on [GitHub](https://github.com/Azizul7m/markdown-renderer).

Made with ❤️ by [Azizul](https://github.com/Azizul7m)
