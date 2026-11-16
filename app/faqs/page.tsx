import FaqHero from "@/components/faq/FaqHero";
export const revalidate = 60;
import BrowseCategories from "../../components/faq/BrowseCategories";
import { client } from "@/sanity/client";
import { FAQ_PAGE_QUERY } from "@/sanity/faqPage";
import AllAnswers from "@/components/faq/AllAnswers";
import CommonCtaSection from "@/components/common/CommonCtaSection";
import Explore from "@/components/service/Explore";
import { generateSeo } from "@/lib/seo";
import FaqSchema from "@/components/common/FaqSchema";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export async function generateMetadata() {
  const data = await client.fetch(FAQ_PAGE_QUERY);

  return generateSeo({
    seo: data?.seo,
    path: "/faqs",
  });
}
const Faqs = async () => {
  const faqData = await client.fetch(FAQ_PAGE_QUERY);

  const allFaqItems = faqData?.allAnswersSection?.faqGroups?.flatMap((group: any) => 
    group?.items?.map((item: any) => ({
      title: item.question || "",
      desc: item.answer || ""
    })) || []
  ) || [];
  const faqSchemaData = { items: allFaqItems };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "FAQs", url: "/faqs" },
  ];

  return (
    <>
      <FaqSchema data={faqSchemaData} />
      <BreadcrumbSchema items={breadcrumbs} />
      <FaqHero data={faqData?.heroSection} />
      <BrowseCategories data={faqData?.browseCategoriesSection} />
      <AllAnswers data={faqData?.allAnswersSection} />
      {faqData?.exploreSection && (
        <Explore data={faqData.exploreSection} className="section-spacing" />
      )}
      <CommonCtaSection data={faqData?.ctaSection} />
    </>
  );
};

export default Faqs;
