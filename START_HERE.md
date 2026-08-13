# 🚀 START HERE - @azizul7m/markdown-renderer

Welcome to the markdown-renderer package! This guide will get you up and running in 2 minutes.

---

## ⚡ Quick Start (Copy-Paste)

### Step 1: Install

```bash
npm install @azizul7m/markdown-renderer
```

### Step 2: Use It

```tsx
import MarkdownRenderer from "@azizul7m/markdown-renderer";
import "@azizul7m/markdown-renderer/styles.css";

export default function Page() {
  const markdown = `
# Hello World
This is a **markdown** document.
  `;

  return <MarkdownRenderer md={markdown} />;
}
```

✅ **That's it!** Your markdown is rendered. Move to step 3 for colors.

### Step 3: Add Color Theme

```tsx
import { useEffect } from "react";
import { applyColorScheme, getColorScheme } from "@azizul7m/markdown-renderer";

export default function Page() {
  useEffect(() => {
    // Choose a theme: one-dark, one-light, catppuccin-frappe, doom-one, nord, dracula, gruvbox-dark, gruvbox-light
    applyColorScheme(getColorScheme("catppuccin-frappe"));
  }, []);

  return <MarkdownRenderer md={markdown} />;
}
```

✅ **Done!** Your markdown now has beautiful colors.

---

## 🎨 9 Color Schemes Available

Pick your favorite:

```
Dark:  one-dark | doom-one | nord | dracula | catppuccin-frappe | gruvbox-dark
Light: one-light | catppuccin-latte | gruvbox-light
```

Try switching between them to see what you like!

---

## 📚 Documentation

### For Quick Copy-Paste:
📄 **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)**
- Minimal setup
- Common tasks
- Color scheme names
- CSS variables
- All exports

### For Learning Everything:
📄 **[USAGE_GUIDE.md](./USAGE_GUIDE.md)**
- 20+ complete examples
- Theme switcher
- Dark mode detection
- PDF export
- localStorage persistence
- SSR/Next.js
- Troubleshooting

### For Publishing:
📄 **[NPM_PUBLISHING_GUIDE.md](./NPM_PUBLISHING_GUIDE.md)**
- Step-by-step npm publish
- Checklist before publishing
- Version management

### Full API:
📄 **[README.md](./README.md)**
- Beginner-friendly overview
- API reference
- Supported markdown
- FAQ

---

## 🎯 What Can You Do?

✅ **Choose from 9 color schemes** — catppuccin, doom-one, nord, dracula, gruvbox, one dark/light

✅ **Theme switcher** — Let users pick their favorite theme

✅ **Dark mode** — Respect system dark mode preference

✅ **Save preference** — Use localStorage to remember user's choice

✅ **Print to PDF** — A4 formatting included, ready to export

✅ **Custom Table of Contents** — Auto-extract or provide your own

✅ **Full Unicode** — Works with Bangla, Arabic, CJK, any language

✅ **Customize colors** — Use CSS variables for custom styling

✅ **SSR-ready** — Works with Next.js App Router

---

## 🔥 Most Common Use Cases

### 1️⃣ Theme Switcher (Users Choose Color)

```tsx
import { useState, useEffect } from "react";
import { getAllColorSchemes, applyColorScheme } from "@azizul7m/markdown-renderer";

const schemes = getAllColorSchemes();

<select onChange={(e) => {
  const scheme = schemes.find(s => s.name === e.target.value);
  if (scheme) applyColorScheme(scheme);
}}>
  {schemes.map(s => <option key={s.name}>{s.label}</option>)}
</select>
```

### 2️⃣ Respect Dark Mode (System Preference)

```tsx
useEffect(() => {
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyColorScheme(getColorScheme(dark ? "nord" : "one-light"));
}, []);
```

### 3️⃣ Save Theme (localStorage)

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

### 4️⃣ Print to PDF

```tsx
<button onClick={() => window.print()}>Print / Save as PDF</button>
<MarkdownRenderer md={markdown} />
```

### 5️⃣ Show/Hide Table of Contents

```tsx
{/* Show TOC */}
<MarkdownRenderer md={markdown} />

{/* Hide TOC */}
<MarkdownRenderer md={markdown} hideTableOfContents />
```

---

## ❓ Common Questions

**Q: Do I need Tailwind CSS?**  
A: No, Tailwind is optional.

**Q: Which color scheme is best?**  
A: Try a few! Popular choices: `catppuccin-frappe` (cozy), `nord` (calm), `one-dark` (balanced), `dracula` (vibrant).

**Q: Can users choose their own theme?**  
A: Yes! Use `getAllColorSchemes()` to list all, then let them pick.

**Q: Works with Next.js?**  
A: Yes! Add `"use client"` to the component. Full SSR support too.

**Q: How do I hide the Table of Contents?**  
A: Use `hideTableOfContents` prop: `<MarkdownRenderer md={md} hideTableOfContents />`

**Q: Can I export to PDF?**  
A: Yes! A4 formatting included. Just call `window.print()`.

---

## 📦 What's Included

- ✨ **9 color schemes** ready to use
- 📑 **Dynamic Table of Contents**
- 🖨️ **A4 print support** (PDF-ready)
- ♿ **Accessible markup**
- 🌍 **Full Unicode support**
- 📦 **7KB gzipped** (tiny!)
- 🔧 **TypeScript support**
- 🎨 **CSS variables** for customization

---

## 🚀 Deploy to npm

Ready to publish? See [NPM_PUBLISHING_GUIDE.md](./NPM_PUBLISHING_GUIDE.md)

Quick version:
```bash
npm login
npm publish --access public
```

---

## 🆘 Troubleshooting

**Colors not showing?**
- ✅ Make sure you imported styles: `import "@azizul7m/markdown-renderer/styles.css"`
- ✅ Call `applyColorScheme()` in a `useEffect()`

**Table of Contents not rendering?**
- ✅ Check markdown has h2+ headings
- ✅ Use `hideTableOfContents` to hide it

**Need more help?**
- 📖 See [USAGE_GUIDE.md](./USAGE_GUIDE.md) for 20+ examples
- ⚡ See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for common tasks

---

## 📚 Next Steps

1. **Copy the quickstart above** — Get it working in 3 minutes
2. **Read QUICK_REFERENCE.md** — Learn common patterns (5 min)
3. **Check USAGE_GUIDE.md** — Deep dive into features (20 min)
4. **Try color schemes** — Pick your favorite theme
5. **Customize if needed** — Add more schemes or CSS variables

---

## 💡 Pro Tips

- 🌙 Users love dark themes (`nord`, `catppuccin-frappe`, `dracula`)
- ☀️ Light theme users prefer `one-light` or `catppuccin-latte`
- 💾 Save color preference to localStorage
- 🎨 Define custom CSS variables for brand colors
- 🖨️ A4 print styling works great for docs/reports
- 🌍 Full Unicode support (Bangla, Arabic, CJK)

---

## 📄 License

MIT — Use freely in personal and commercial projects.

---

**Questions? See the docs above or open an issue on GitHub! 🎉**
