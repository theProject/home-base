# agents.md – CodeX Taskfile for bytheproject.com

## 📌 Project Overview

This repository powers https://bytheproject.com. It is a Vercel-hosted, Next.js 15.3.1 app with React 19.1, Tailwind CSS v4, and a custom Payload blog at `/blog`. The blog content is managed remotely from `admin.bytheproject.com`.

---

## 🔧 Tech Stack

- Next.js 15.3.1 (App Router)
- React 19.1
- Tailwind CSS 4
- pnpm for package management
- Dynamic OG image endpoint: `/api/og?title=...`
- Payload CMS (external headless API)
- Prism.js or Shiki (pending) for blog code syntax highlighting

---

## 🧹 Task 1 – Fix `/arcade` Build Error

### ❗ Context

Build fails with:

```
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined.
```

### ✅ What CodeX Should Do

- Open `/app/arcade/page.tsx`
- Check imports for `Header`, `Footer`, `BackToTop`, etc.
- Confirm they are properly exported in:
  - `@/components/header.tsx`
  - `@/components/footer.tsx`
  - `@/components/back-to-top.tsx`

Update imports if needed:
```tsx
// For default exports
import Header from "@/components/header"

// For named exports
import { Header } from "@/components/header"
```

Ensure all components resolve and render cleanly.

---

## 🧼 Task 2 – Clean Up V0 Migration Artifacts

- Delete or archive files like `v0.tsx`, `v0-components/`, `legacy/`, etc.
- Remove any `<v0>` tags from JSX or `// v0` dev comments.
- Validate that these components aren’t being referenced elsewhere before deleting.

---

## 🔁 Task 3 – Update React + Next.js (If Needed)

- Open `package.json`
- Ensure the following are at latest stable:
  ```json
  "next": "15.3.1",
  "react": "19.1.0",
  "react-dom": "19.1.0"
  ```
- If older, update with:
  ```bash
  pnpm update next react react-dom
  ```

---

## 🎨 Task 4 – Fix Tailwind `theme()` Error

Error:
```
Could not resolve value for theme function: theme(colors.primary.light)
```

✅ In `tailwind.config.ts`, fix the color config:
```ts
colors: {
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
    light: "#A3D5FF", // Add this line
  },
}
```

---

## 📢 Task 5 – Fix `toast` Import From `sonner`

Error:
```
'toast' is not exported from '@/components/ui/sonner'
```

✅ Replace:
```ts
import { toast } from "@/components/ui/sonner"
```

With:
```ts
import { toast } from "sonner"
```

---

## 🖼️ Task 6 – Confirm OG Image Handling

- Confirm all pages call `/api/og?title=...`
- Ensure meta tags are added for Open Graph previews
- Validate metadataBase is set properly in layout or config:
```ts
export const metadata = {
  metadataBase: new URL("https://bytheproject.com"),
}
```

---

## ⚠️ Constraints

- Do not remove the `/arcade` route
- Use `pnpm` only
- Maintain Tailwind 4 structure
- Blog logic should not be touched (external via Payload)

---

## 🥪 Validation Instructions

- Run:
  ```bash
  pnpm run build
  ```
- Ensure:
  - `/arcade` compiles
  - All components are defined and rendered
  - No broken imports or color errors remain
  - No `<v0>` leftovers exist




