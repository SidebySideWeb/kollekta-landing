// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import { SANITY_DATASET, SANITY_PROJECT_ID } from './src/lib/sanity-config.ts';

export default defineConfig({
  site: 'https://www.kollekta.gr',
  output: 'server',
  adapter: vercel(),
  security: {
    allowedDomains: [
      { hostname: 'www.kollekta.gr', protocol: 'https' },
      { hostname: 'kollekta.gr', protocol: 'https' },
    ],
  },
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/api/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      useCdn: true,
    }),
  ],
});
