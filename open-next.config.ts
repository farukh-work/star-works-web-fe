import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Default config: pages are rendered on demand by the Worker.
// Later, add an R2 incremental cache here to cache ISR pages between requests.
export default defineCloudflareConfig({});
