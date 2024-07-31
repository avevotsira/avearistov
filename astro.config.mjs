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
    sitemap(),
  ],
  trailingSlash: "never",
  build: {
    format: "file",
  },
  output: "hybrid",
  adapter: cloudflare(),
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

