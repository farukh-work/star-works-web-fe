import TermsConditionsContent from "@/components/terms-conditions/TermsConditionsContent";
import TermsConditionsHero from "@/components/terms-conditions/TermsConditionsHero";
import { client } from "@/sanity/client";
import { termsAndConditionsQuery } from "@/sanity/termsAndConditions";
import type { TermsAndConditionsData } from "@/types/termsAndConditions";
import { generateSeo } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await client.fetch<TermsAndConditionsData | null>(
    termsAndConditionsQuery,
  );
  return generateSeo({
    seo: data?.seo || {
      metaTitle: "Terms & Conditions | Star Works",
      metaDescription: "Read the Terms and Conditions of Star Works, a web design and development agency.",
    },
    path: "/terms-conditions",
  });
}

const TermsConditionsPage = async () => {
  const data = await client.fetch<TermsAndConditionsData | null>(
    termsAndConditionsQuery,
  );

  return (
    <div className="overflow-x-hidden" data-scroll-container>
      <TermsConditionsHero data={data?.hero ?? {}} />
      <TermsConditionsContent content={data?.content ?? []} cta={data?.cta} />
    </div>
  );
};

export default TermsConditionsPage;
