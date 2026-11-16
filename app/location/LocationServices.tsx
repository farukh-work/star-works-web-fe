import React from "react";
import Link from "next/link";
import {
  DesignIcon,
  DevelopmentIcon,
  IdentityIcon,
  MarketingIcon,
  commerceIcon,
  DevelopmenstIcon,
  RightIcon,
} from "@/components/common/Icons";

const services = [
  {
    Icon: IdentityIcon,
    title: "Brand Identity",
    desc: "Crafting memorable brand identities through strategic design, helping businesses stand out and connect with their audience.",
  },
  {
    Icon: DesignIcon,
    title: "Web Design",
    desc: "Our web design process focuses on creating digital experiences that not only look stunning but also perform exceptionally.",
  },
  {
    Icon: DevelopmentIcon,
    title: "Web Development",
    desc: "Building fast, scalable, and secure websites with modern technologies that ensure performance, reliability, and smooth functionality.",
  },
  {
    Icon: DevelopmenstIcon,
    title: "App Development",
    desc: "Designing and developing intuitive mobile applications that provide engaging user experiences across all devices.",
  },
  {
    Icon: commerceIcon,
    title: "E-commerce Solutions",
    desc: "Developing powerful online stores with seamless shopping experiences, secure payments, and optimized customer journeys.",
  },
  {
    Icon: MarketingIcon,
    title: "Digital Marketing",
    desc: "Driving growth through targeted digital marketing strategies that increase visibility, generate leads, and boost conversions.",
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  DesignIcon,
  DevelopmentIcon,
  IdentityIcon,
  MarketingIcon,
  commerceIcon,
  DevelopmenstIcon,
};

interface LocationServicesProps {
  data?: {
    tag?: string;
    heading?: string;
    description?: string;
    services?: Array<{
      icon?: string;
      title?: string;
      desc?: string;
      Icon?: any; // support local fallback
    }>;
  };
}

const LocationServices = ({ data }: LocationServicesProps) => {
  const tag = data?.tag || "--OUR SERVICES";
  const heading = data?.heading || "What We Do in Hisar";
  const description = data?.description || "We create modern, user-friendly, and responsive digital experiences that help businesses grow and engage their audience.";
  const servicesList = data?.services || services;

  return (
    <section className="px-4">
      <div className="container-wrapper px-0!">
        <h5 className="font-voyage text-antiflash mb-6 w-full text-center text-2xl leading-[100%]! md:text-3xl xl:text-4xl">
          {tag}
        </h5>
        <h3 className="font-voyage text-antiflash w-full gap-2 text-center text-5xl leading-[120%]! capitalize xl:text-6xl">
          {heading}
        </h3>
        <p className="about-description mx-auto mt-4 max-w-150 text-center normal-case!">
          {description}
        </p>
        <div className="section-spacing mt-10 grid grid-cols-1 gap-7 pt-0! sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {servicesList.map((service, index) => {
            const IconComponent =
              (service as any).Icon ||
              ((service as any).icon ? iconMap[(service as any).icon] : null) ||
              DesignIcon;

            const slugMap: Record<string, string> = {
              "Web Design": "web-design",
              "Web Development": "web-development",
              "Brand Identity": "brand-identity",
              "Digital Marketing": "digital-marketing",
              "E-commerce Solutions": "e-commerce-solutions",
              "App Development": "app-development",
            };
            const slug = (service as any).slug || slugMap[service.title || ""] || "";
            const href = slug ? `/services/${slug}` : "/services";

            return (
              <article
                key={index}
                className="card-location-card group flex flex-col justify-between rounded-3xl p-4 md:p-5 xl:p-7"
              >
                <div>
                  <span className="group-hover:bg-primary hover:bg-primary grid size-16 place-content-center rounded-[20px] bg-white/10 transition-all duration-300 xl:size-20">
                    <IconComponent className="size-8 text-white transition-colors duration-300 group-hover:text-black xl:size-10" />
                  </span>
                  <h4 className="font-voyage mt-10 text-3xl leading-[120%] text-white lg:tracking-[-3px] xl:text-[44px]">
                    {service.title}
                  </h4>
                  <p className="about-description mt-4">{service.desc}</p>
                </div>
                <Link
                  href={href}
                  className="group-hover:border-primary group-hover:text-primary mt-5 inline-flex w-fit items-center gap-2 border-b border-white/20 pb-1 text-sm font-semibold text-white transition-all duration-300"
                >
                  Learn More
                  <RightIcon className="group-hover:translate-x-1" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LocationServices;
