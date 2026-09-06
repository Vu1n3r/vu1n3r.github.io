// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // TODO: replace with the club's real domain once university IT has signed off.
  // Used for canonical URLs, sitemap and RSS. Must be set before we ship.
  site: 'https://cysc.pages.dev',

  // Static output. No adapter — Cloudflare Pages serves the built files, and
  // the CTFd proxy will live in a Pages Function, not in Astro.
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
