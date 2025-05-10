import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "../app/SchemaTypes"
import { dataset, projectId } from "./env"

export default defineConfig({
  name: "default",
  title: "By The Project",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
