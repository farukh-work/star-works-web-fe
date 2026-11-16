import Image from "next/image";
import React from "react";

type ProjectDetailsStoryProps = {
  data: {
    image: string;
    features: {
      number: string;
      title: string;
      description: string;
    }[];
  };
};

const ProjectDetailsStory = ({ data }: ProjectDetailsStoryProps) => {
  if (!data) return null;

  return (
    <section className="container-wrapper">
      {data.image && (
        <Image
          className="h-fit max-h-125 rounded-2xl object-cover md:rounded-2xl xl:rounded-3xl"
          src={data.image}
          alt="project-story"
          width={1200}
          height={500}
          unoptimized={true}
        />
      )}
      {data.features && data.features.length > 0 && (
        <div className="border-antiflash mt-14 border-y border-dashed">
          {data.features.map((item, index) => (
            <div
              key={index}
              className="border-antiflash grid grid-cols-1 gap-4 border-b border-dashed py-6 last:border-none lg:grid-cols-2"
            >
              {/* NUMBER */}
              <div className="font-voyage flex items-center gap-4 text-4xl font-bold text-white">
                <div>
                  <span>{item?.number}</span>
                </div>
                {/* TITLE */}
                <h4 className="max-sm:text-2xl"> {item?.title}</h4>
              </div>

              {/* DESCRIPTION */}
              <div>
                <p className="text-antiflash text-sm leading-[160%]">
                  {item?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectDetailsStory;
