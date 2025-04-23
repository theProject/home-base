declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SANITY_PROJECT_ID: string
    NEXT_PUBLIC_SANITY_DATASET: string
    BREVO_SMTP_USER: string
    BREVO_SMTP_PASSWORD: string
    BREVO_FROM_EMAIL: string
    NEON_DATABASE_URL: string
  }
}
