/**
 * Seeds the `termsAndConditions` Sanity document with the content that was
 * previously hardcoded in components/terms-conditions/TermsConditionsContent.tsx
 * and TermsConditionsHero.tsx. Uses a fixed document id ("termsAndConditions")
 * matching the Studio desk structure singleton.
 *
 * Usage: node scripts/seed-terms-conditions.mjs
 */

import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

// --- read token/env from .env ---
const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
const token = env.match(/^SANITY_API_TOKEN="?([^"\n]+)"?/m)?.[1];
const projectId = env.match(/NEXT_PUBLIC_SANITY_PROJECT_ID="?([^"\n]+)"?/m)?.[1];
const dataset = env.match(/NEXT_PUBLIC_SANITY_DATASET="?([^"\n]+)"?/m)?.[1];
const apiVersion =
  env.match(/NEXT_PUBLIC_SANITY_API_VERSION="?([^"\n]+)"?/m)?.[1] || "2025-01-01";

if (!token || !projectId || !dataset) {
  throw new Error("Missing Sanity env vars (token/projectId/dataset)");
}

const base = `https://${projectId}.api.sanity.io/v${apiVersion}/data`;
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);
const span = (text, marks = []) => ({
  _key: key(),
  _type: "span",
  marks,
  text,
});

// Heading / paragraph block
const blk = (style, children) => ({
  _key: key(),
  _type: "block",
  style,
  markDefs: [],
  children: Array.isArray(children) ? children : [span(children)],
});

// Bullet list item
const li = (children) => ({
  _key: key(),
  _type: "block",
  style: "normal",
  level: 1,
  listItem: "bullet",
  markDefs: [],
  children: Array.isArray(children) ? children : [span(children)],
});

const content = [
  blk("h2", "Agreement to Terms"),
  blk(
    "normal",
    'These Terms and Conditions ("Terms") govern your use of Star Works\' website and services. By accessing or using our services, you agree to be bound by these Terms.',
  ),
  blk(
    "normal",
    "If you disagree with any part of these terms, then you may not access our services.",
  ),

  blk("h2", "Our Services"),
  blk("normal", "Star Works provides digital services including:"),
  li("Web design and development"),
  li("Mobile application development"),
  li("E-commerce solutions"),
  li("Digital marketing services"),
  li("Brand identity and design"),
  li("Consultation and support services"),

  blk("h2", "Project Terms"),
  blk("h3", "Proposals and Contracts"),
  blk(
    "normal",
    "All projects begin with a detailed proposal outlining scope, timeline, and pricing. Work commences only after signed contract and initial payment.",
  ),
  blk("h3", "Timeline and Delivery"),
  blk(
    "normal",
    "Project timelines are estimates based on agreed scope. Delays may occur due to client feedback cycles, content provision, or scope changes.",
  ),
  blk("h3", "Revisions and Changes"),
  blk(
    "normal",
    "Each project includes a specified number of revisions. Additional changes beyond scope may incur extra charges. Major scope changes require new contract amendments.",
  ),

  blk("h2", "Payment Terms"),
  li([
    span("Deposit:", ["strong"]),
    span(" 50% deposit required before project commencement"),
  ]),
  li([
    span("Payment Schedule:", ["strong"]),
    span(" Payments are due according to agreed milestones"),
  ]),
  li([
    span("Final Payment:", ["strong"]),
    span(" Final payment due before project delivery"),
  ]),
  li([
    span("Late Payments:", ["strong"]),
    span(" Late fees may apply for overdue payments"),
  ]),
  li([
    span("Refunds:", ["strong"]),
    span(" Refunds are handled case-by-case based on work completed"),
  ]),

  blk("h2", "Intellectual Property"),
  blk("h3", "Client Ownership"),
  blk(
    "normal",
    "Upon full payment, clients own the final deliverables created specifically for their project. This includes custom designs, code, and content created by Star Works.",
  ),
  blk("h3", "Star Works Rights"),
  blk("normal", "We retain rights to:"),
  li("Use projects in our portfolio and marketing materials"),
  li("Retain underlying methodologies and general knowledge"),
  li("Use third-party tools, frameworks, and libraries"),

  blk("h2", "Client Responsibilities"),
  blk("normal", "Clients are responsible for:"),
  li("Providing accurate project requirements and content"),
  li("Timely feedback and approvals"),
  li("Making payments according to agreed schedule"),
  li("Providing necessary access and credentials"),
  li("Ensuring legal compliance of provided content"),
  li("Maintaining backups of delivered work"),

  blk("h2", "Warranties and Disclaimers"),
  blk("h3", "Our Warranty"),
  blk(
    "normal",
    "We warrant that our services will be performed with professional skill and care. We provide a 30-day warranty on delivered work for bug fixes and minor issues.",
  ),
  blk("h3", "Disclaimers"),
  blk(
    "normal",
    'We cannot guarantee specific business outcomes, search engine rankings, or conversion rates. Our services are provided "as is" without warranties beyond those explicitly stated.',
  ),

  blk("h2", "Limitation of Liability"),
  blk(
    "normal",
    "Our liability for any claims arising from our services is limited to the total amount paid for the specific project. We are not liable for:",
  ),
  li("Indirect, consequential, or incidental damages"),
  li("Loss of profits, data, or business opportunities"),
  li("Issues arising from third-party services or content"),
  li("Damages resulting from client's misuse of deliverables"),

  blk("h2", "Termination"),
  blk(
    "normal",
    "Either party may terminate the agreement with written notice. Upon termination:",
  ),
  li("Client pays for all work completed to date"),
  li("Work in progress is delivered in its current state"),
  li("Confidentiality obligations continue"),
  li("Each party returns or destroys confidential information"),

  blk("h2", "Confidentiality"),
  blk(
    "normal",
    "We maintain strict confidentiality of all client information and project details. We will not disclose confidential information to third parties without explicit consent, except as required by law.",
  ),

  blk("h2", "Governing Law"),
  blk(
    "normal",
    "These Terms are governed by the laws of [Your State/Country]. Any disputes will be resolved through binding arbitration or in the courts of [Your Jurisdiction].",
  ),

  blk("h2", "Changes to Terms"),
  blk(
    "normal",
    "We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated effective date. Continued use of our services constitutes acceptance of modified Terms.",
  ),

  blk("h2", "Contact Information"),
  blk(
    "normal",
    "For questions about these Terms & Conditions, please contact us:",
  ),
];

const doc = {
  _id: "termsAndConditions",
  _type: "termsAndConditions",
  hero: {
    sectionTitle: "TERMS & CONDITIONS",
    headingOne: "Service",
    headingTwo: "Agreement",
    lastUpdated: "2024-01-01",
    lastUpdatedLabel: "Last updated:",
  },
  content,
  cta: {
    _type: "object",
    buttonText: "Contact Star Works",
    buttonLink: "/contact-us",
  },
};

async function main() {
  const res = await fetch(`${base}/mutate/${dataset}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ mutations: [{ createOrReplace: doc }] }),
  });
  const out = await res.json();
  if (!res.ok) throw new Error("Mutation failed: " + JSON.stringify(out));

  console.log("✅ termsAndConditions document seeded.");
  console.log(`   Blocks: ${content.length}`);
  console.log("   Transaction:", out.transactionId);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
