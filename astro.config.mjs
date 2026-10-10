// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // The Pages workflow supplies its public URL; keep the Cloudflare URL for
  // local builds and any existing Cloudflare deployment.
  site: process.env.SITE_URL ?? 'https://cysc.pages.dev',

  // Static output. GitHub Pages and Cloudflare Pages both serve the built files.
  // The planned CTFd proxy would live in a Cloudflare Pages Function.
  output: 'static',

  markdown: {
    // Shiki runs at BUILD time, so code blocks ship as plain highlighted HTML
    // with zero client-side JS. See CLAUDE.md: "Static by default".
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
});
