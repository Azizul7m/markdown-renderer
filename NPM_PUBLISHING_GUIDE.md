# NPM Publishing Checklist

## Before Publishing to npm Registry

### ✅ Quality Checks
- [x] Build succeeds (`npm run build`)
- [x] TypeScript declarations generated
- [x] All exports properly declared
- [x] React peer dependency specified
- [x] No external dependencies (except React)
- [x] Package is scoped to @azizul7m (your username/org)

### ✅ Documentation Complete
- [x] README.md - Clear, beginner-friendly setup
- [x] USAGE_GUIDE.md - Comprehensive 20+ examples
- [x] QUICK_REFERENCE.md - Cheat sheet for common tasks
- [x] API documentation complete
- [x] All color schemes documented

### ✅ Package Configuration
- [x] package.json properly configured
- [x] Entry points set correctly (main, types, exports)
- [x] Files list includes dist/, README, LICENSE, styles.css
- [x] Version bumped appropriately (currently 0.2.0)
- [x] License file present (MIT)
- [x] Keywords set for discoverability

---

## Publishing Steps

### 1️⃣ Login to npm

```bash
npm login
# Enter your npm username
# Enter your password
# Enter your email
```

### 2️⃣ Verify Files Are Correct

```bash
npm pack --dry-run
# Shows what will be published
```

### 3️⃣ Publish to npm

```bash
npm publish --access public
# For scoped packages, must use --access public
```

### 4️⃣ Verify on npm Registry

Visit: `https://www.npmjs.com/package/@azizul7m/markdown-renderer`

---

## Post-Publishing

### Update Version (if making changes)

```bash
npm version patch  # 0.2.0 → 0.2.1
npm version minor  # 0.2.0 → 0.3.0
npm version major  # 0.2.0 → 1.0.0
npm publish
```

### Update Git

```bash
git add .
git commit -m "chore: update documentation and prepare for npm publication"
git push
```

---

## Testing Installation

After publishing, test in a new project:

```bash
npm install @azizul7m/markdown-renderer
```

Then verify:
```tsx
import MarkdownRenderer from "@azizul7m/markdown-renderer";
import "@azizul7m/markdown-renderer/styles.css";
// ✅ Should work!
```

---

## Important Notes

⚠️ **Scoped Package**: Since your package name is `@azizul7m/markdown-renderer`, you must:
- Use `npm publish --access public` for public visibility
- Package will be installable as: `npm install @azizul7m/markdown-renderer`

---

## What's Included

✨ **9 Color Schemes**
- Dark: one-dark, doom-one, nord, dracula, catppuccin-frappe, gruvbox-dark
- Light: one-light, catppuccin-latte, gruvbox-light

📚 **Features**
- Zero dependencies (React peer only)
- Table of Contents extraction
- A4 print support
- Full Unicode support (Bangla, Arabic, CJK, etc.)
- SSR/Next.js compatible

📦 **Size**
- 15KB minified
- 7KB gzipped

---

## Support Resources

- GitHub: [Azizul7m/markdown-renderer](https://github.com/Azizul7m/markdown-renderer)
- npm: [@azizul7m/markdown-renderer](https://www.npmjs.com/package/@azizul7m/markdown-renderer)

---

**Ready to publish!** 🚀
