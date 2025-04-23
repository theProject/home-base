import { defineConfig } from "sanity"

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  title: "theProject Content",
  basePath: "/studio",
  plugins: [],
})
