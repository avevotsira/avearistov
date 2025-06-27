import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://www.avearis.com",
  publicDir: "assets",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) =>
        !page.includes("/admin") &&
        !page.includes("/oauth") &&
        !page.includes("/oauth/callback"),
    }),
  ],
  trailingSlash: "never",
  build: {
    format: "file",
  },
  output: "hybrid",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  experimental: {
    env: {
      schema: {
        OAUTH_GITHUB_CLIENT_ID: envField.string({
          context: "server",
          access: "secret",
        }),
        OAUTH_GITHUB_CLIENT_SECRET: envField.string({
          context: "server",
          access: "secret",
        }),
      },
    },
  },
});

