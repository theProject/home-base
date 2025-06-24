# agents.md – CodeX Taskfile for bytheproject.com

## 📌 Project Overview

This repository powers https://bytheproject.com. It is a Vercel-hosted, Next.js 15.3.1 app with React 19.1, Tailwind CSS v4, and a custom payload-driven blog at `/blog` (which receives posts via API from admin.bytheproject.com).

## 🔧 Tech Stack
- Next.js 15.3.1 (App Router)
- React 19.1
- Tailwind CSS 4
- pnpm for package management
- Payload CMS (remote; headless API consumer)
- Open Graph image generation API: `/api/og`
- Syntax highlighting pending setup: Prism.js or Shiki

---

## 🎯 Goals for CodeX

- Restore `/arcade` build functionality.
- Clean up broken or partial V0 migration remnants.
- Ensure no dev tags or placeholder elements like `<v0>` remain in production.
- Keep all packages, including React and Next.js, fully up to date and compatible.
- Ensure Tailwind 4 structure and design intent remain intact.

---

## 🧩 Task 1 – Fix `/arcade` Build Error

### ❗ Context

Vercel build is currently failing on the `/arcade` route:

