import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ghmj0ih1",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  // Serve published content from Sanity's edge CDN. The pages use ISR
  // (`revalidate`), so reads only happen on the server during revalidation —
  // the CDN makes those reads dramatically faster and cheaper than the
  // uncached API. Switch back to `false` only for draft/preview clients.
  useCdn: process.env.NODE_ENV === "development" ? false : true,
});
