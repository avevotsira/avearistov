import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";
import decapCmsOauth from "astro-decap-cms-oauth";

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
    decapCmsOauth(),
  ],
  trailingSlash: "never",
  build: {
    format: "file",
  },
  output: "hybrid",
  adapter: cloudflare(),
});

