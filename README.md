# @bottoli/markdown-renderer

A small React Markdown renderer and dynamic Table of Contents for headings, paragraphs, emphasis, internal links, lists, horizontal rules, tables, and generated heading anchors.

## Install

```bash
npm install @bottoli/markdown-renderer
```

React is a peer dependency. The rendered markup uses Tailwind CSS utility classes and CSS variables such as `--text`, `--border`, and `--surface`; define those variables in the consuming project or replace the component styles before publishing a custom variant.

## Usage

```tsx
import MarkdownRenderer from "@bottoli/markdown-renderer";

export function Document({ markdown }: { markdown: string }) {
  return <MarkdownRenderer md={markdown} />;
}
```

Set `hideTableOfContents` to remove a Bangla `## সুচিপত্র` block while rendering your own navigation:

```tsx
<MarkdownRenderer md={markdown} hideTableOfContents />
```

`slugifyHeading` is also exported for building matching navigation links.

## Dynamic Table of Contents

Use `TableOfContents` with Markdown to extract headings automatically. By default, it uses level-two headings:

```tsx
import { TableOfContents } from "@bottoli/markdown-renderer";

<TableOfContents
  title="সূচিপত্র"
  md={markdown}
  levels={[2, 3]}
/>
```

You can provide custom menu items instead of extracting headings:

```tsx
<TableOfContents
  title="সূচিপত্র"
  items={[
    { label: "ভূমিকা", id: "intro" },
    { label: "সদস্যপদ", href: "#membership" },
  ]}
/>
```

When using custom IDs, ensure the corresponding headings use the same `id` values. The component renders as a collapsible popup-style menu and uses Tailwind CSS utility classes and CSS variables such as `--text`, `--border`, and `--surface`.
