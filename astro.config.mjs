// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // SEO for domains
  site: 'https://michaelhowe.com.br',

  // Router settings and translation
  output: 'server',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    }
  },

  // Integrations
  integrations: [
    react(), 
    keystatic(), 
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          pt: 'pt',
        },
      },
    })
  ],

  // Performance & UX
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  // Deployment & Analytics
  adapter: vercel({
    webAnalytics: { enabled: true },
    imagesConfig: {
      sizes: [320, 640, 1280],
      domains: [],
    },
  }),
});