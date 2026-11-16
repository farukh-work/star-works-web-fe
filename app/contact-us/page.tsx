import ContactUs from "@/components/contact/ContactUs";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";
import { client } from "@/sanity/client";
import { contactPageQuery } from "@/sanity/contactPage";
import { generateSeo } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await client.fetch(contactPageQuery);
  return generateSeo({
    seo: data?.seo,
    path: "/contact-us",
  });
}

const ContactUsPage = async () => {
  const data = await client.fetch(contactPageQuery);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact-us" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <div className="overflow-x-hidden">
        <ContactUs heading={data?.heading} subHeading={data?.subHeading} />
      </div>
    </>
  );
};

export default ContactUsPage;
