/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SANITY_PROJECT_ID: string;
  readonly SANITY_DATASET: string;
  readonly SANITY_STUDIO_URL?: string;
  readonly SANITY_WRITE_TOKEN?: string;
  readonly SITE_URL?: string;
  readonly SITE_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
