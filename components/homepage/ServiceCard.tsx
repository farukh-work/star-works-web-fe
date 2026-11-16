import Image from "next/image";
import Link from "next/link";
import { ButtonArrowIcon } from "../common/Icons";

const ServiceCard = ({ slide }: { slide: any }) => {
  return (
    <article
      className="
        service-card
        w-[28vw]
        min-w-[28vw]
        aspect-[4/5]
        rounded-[40px]
        overflow-hidden
        relative
        shrink-0
        ml-[-120px]
      "
    >
      <Link
        href={slide.path || "#"}
        className="block w-full h-full relative group"
      >
        <Image
          src={slide.image || ""}
          alt={slide.title || ""}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end z-10">
          <h4 className="text-white text-[40px] font-voyage leading-none">
            {slide.title}
          </h4>

          <div className="size-14 rounded-full bg-white flex items-center justify-center group-hover:rotate-45 transition-all duration-300">
            <ButtonArrowIcon />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ServiceCard;
