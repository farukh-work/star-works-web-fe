import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// `npm run build` runs the OpenNext build (so Cloudflare's default build command works).
// OpenNext calls this to build the Next.js app itself.
// Later, add an R2 incremental cache here to cache ISR pages between requests.
export default {
  ...defineCloudflareConfig({}),
  buildCommand: "npm run build:next",
};
