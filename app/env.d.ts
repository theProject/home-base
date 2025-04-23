declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SANITY_PROJECT_ID: string
    NEXT_PUBLIC_SANITY_DATASET: string
    POSTMARK_API_TOKEN: string
    POSTMARK_FROM_EMAIL: string
    NEON_DATABASE_URL: string
  }
}
