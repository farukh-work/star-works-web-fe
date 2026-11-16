import CurvedText from "../common/CurvedText";
import SectionDescription from "../common/SectionDescription";
import SectionHeading from "../common/SectionHeading";

const AboutHeader = ({ data }: { data?: any }) => {
  return (
    <div className="container-wrapper text-center">
      <div className="about-page-small-heading overflow-hidden">
        <SectionDescription className="mb-6" isline={true} noAnim={true}>
          {data?.smallHeading}
        </SectionDescription>
      </div>
      <div className="about-page-main-heading overflow-hidden">
        <SectionHeading noAnim={true}>{data?.heading}</SectionHeading>
      </div>
    </div>
  );
};

export default AboutHeader;
