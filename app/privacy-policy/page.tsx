import PrivacyPolicyContent from "@/components/privacy-policy/PrivacyPolicyContent";
import PrivacyPolicyHero from "@/components/privacy-policy/PrivacyPolicyHero";
import { client } from "@/sanity/client";
import { privacyPolicyQuery } from "@/sanity/privacyPolicy";
import type { PrivacyPolicyData } from "@/types/privacyPolicy";
import { generateSeo } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await client.fetch<PrivacyPolicyData | null>(privacyPolicyQuery);
  return generateSeo({
    seo: data?.seo || {
      metaTitle: "Privacy Policy | Star Works",
      metaDescription: "Read the Privacy Policy of Star Works, a web design and development agency.",
    },
    path: "/privacy-policy",
  });
}

const PrivacyPolicyPage = async () => {
  // All content (hero, body, contact CTA) is sourced from the
  // `privacyPolicy` document in Sanity.
  const data = await client.fetch<PrivacyPolicyData | null>(privacyPolicyQuery);

  return (
    <div className="overflow-x-hidden" data-scroll-container>
      <PrivacyPolicyHero data={data?.hero ?? {}} />
      <PrivacyPolicyContent content={data?.content ?? []} cta={data?.cta} />
    </div>
  );
};

export default PrivacyPolicyPage;
