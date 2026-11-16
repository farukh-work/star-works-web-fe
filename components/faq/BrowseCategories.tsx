import ScrollRevealCard from "../common/ScrollRevealCard";
import SectionHeading from "../common/SectionHeading";
type BrowseCategoriesProps = {
  data?: {
    sectionTitle?: string;
    description?: string;
  };
};

const BrowseCategories = ({ data }: BrowseCategoriesProps) => {
  return (
    <section className="container-wrapper">
      <ScrollRevealCard>
        <SectionHeading className="mb-8 text-center">
          {data?.sectionTitle}
        </SectionHeading>
      </ScrollRevealCard>
    </section>
  );
};

export default BrowseCategories;
