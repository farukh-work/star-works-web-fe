/**
 * One-off content migration for the Privacy Policy document.
 *
 * The live `privacyPolicy` document had a corrupted "Automatically Collected
 * Information" section (duplicated text/bullets from the "Personal Information"
 * section) and stray leading/trailing newlines in many spans. The frontend page
 * was patching these at runtime by `_key`. This script persists those exact
 * corrections into Sanity so the source of truth matches what the page renders,
 * then we can delete the runtime patching from the page.
 *
 * It also seeds the new `hero.lastUpdatedLabel` and `cta` fields that were
 * previously hardcoded in components.
 *
 * Usage: node scripts/migrate-privacy-policy.mjs
 */

import { readFileSync } from "node:fs";

// --- read token from .env (not committed) ---
const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
const token = env.match(/^SANITY_API_TOKEN="?([^"\n]+)"?/m)?.[1];
const projectId = env.match(/NEXT_PUBLIC_SANITY_PROJECT_ID="?([^"\n]+)"?/m)?.[1];
const dataset = env.match(/NEXT_PUBLIC_SANITY_DATASET="?([^"\n]+)"?/m)?.[1];
const apiVersion =
  env.match(/NEXT_PUBLIC_SANITY_API_VERSION="?([^"\n]+)"?/m)?.[1] || "2025-01-01";

if (!token || !projectId || !dataset) {
  throw new Error("Missing Sanity env vars (token/projectId/dataset)");
}

const base = `https://${projectId}.api.${"sanity.io"}/v${apiVersion}/data`;
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

// Corrected text for the previously-duplicated "Automatically Collected
// Information" section. Mirrors the runtime patch the page used to apply.
const AUTO_INTRO =
  "When you visit our website, we may automatically collect certain information about your device and usage, including:";
const AUTO_BULLETS = {
  "07b741944360": "IP address and location data",
  "35794289dc99": "Device type, browser version, and operating system",
  a32c89a3e669: "Pages visited, time spent, and links clicked",
  "6f817e4b3507": "Referrer URL and search keywords that led you to our site",
  "5b3eaaa8002f": "Cookies and similar tracking technologies",
};

function patchBlock(block) {
  if (block._key === "ea093a681856") {
    return {
      ...block,
      children: block.children.map((c) => ({ ...c, text: AUTO_INTRO })),
    };
  }
  if (AUTO_BULLETS[block._key]) {
    return {
      ...block,
      children: block.children.map((c) => ({
        ...c,
        text: AUTO_BULLETS[block._key],
      })),
    };
  }
  return block;
}

// Strip leading newlines from the first span and trailing newlines from the
// last span of each block (matches the page's previous runtime trim).
function trimBlock(block) {
  if (!Array.isArray(block.children)) return block;
  const last = block.children.length - 1;
  return {
    ...block,
    children: block.children.map((child, idx) => {
      if (typeof child.text !== "string") return child;
      let text = child.text;
      if (idx === 0) text = text.replace(/^\n+/, "");
      if (idx === last) text = text.replace(/\n+$/, "");
      return { ...child, text };
    }),
  };
}

async function main() {
  // 1. Fetch current published document
  const q = encodeURIComponent('*[_id=="privacyPolicy"][0]');
  const res = await fetch(`${base}/query/${dataset}?query=${q}`, { headers });
  const { result: doc } = await res.json();
  if (!doc) throw new Error("privacyPolicy document not found");

  // 2. Apply patch + trim to content (same as old runtime logic)
  const content = (doc.content || []).map(patchBlock).map(trimBlock);

  // 3. Build corrected document, seeding the new fields
  const next = {
    ...doc,
    content,
    hero: {
      ...doc.hero,
      lastUpdatedLabel: doc.hero?.lastUpdatedLabel ?? "Last updated:",
    },
    cta: {
      _type: "object",
      buttonText: doc.cta?.buttonText ?? "Contact Star Works",
      buttonLink: doc.cta?.buttonLink ?? "/contact-us",
    },
  };
  delete next._system;

  // 4. createOrReplace the published document
  const mutations = [{ createOrReplace: next }];
  const mres = await fetch(`${base}/mutate/${dataset}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ mutations }),
  });
  const out = await mres.json();
  if (!mres.ok) throw new Error("Mutation failed: " + JSON.stringify(out));

  console.log("✅ Privacy Policy document migrated.");
  console.log("   - Fixed Automatically Collected Information section");
  console.log("   - Stripped stray leading/trailing newlines");
  console.log("   - Seeded hero.lastUpdatedLabel + cta fields");
  console.log("   Transaction:", out.transactionId);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
