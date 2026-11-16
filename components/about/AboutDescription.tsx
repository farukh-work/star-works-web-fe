import Image from "next/image";
import { urlFor } from "@/sanity/image";
const AboutDescription = ({ data }: { data?: any }) => {
  return (
    <div className="container-wrapper mt-14">
      {data?.image && (
        <Image
          src={urlFor(data.image).width(1280).format("webp").url()}
          alt="image"
          width={900}
          height={500}
          sizes="(min-width: 1536px) 1280px, 100vw"
          className="relative h-100 w-full overflow-hidden rounded-2xl object-cover sm:flex sm:items-end md:h-150 md:rounded-3xl"
          priority
        />
      )}
      <div className="mt-14">
        <div className="space-y-4 md:space-y-8">
          {data?.descriptions?.map((paragraph: string, index: number) => (
            <p
              key={index}
              className="about-page-description text-antiflash w-full text-base leading-[160%] max-md:text-center! md:text-lg md:leading-[170%] xl:text-xl"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutDescription;
