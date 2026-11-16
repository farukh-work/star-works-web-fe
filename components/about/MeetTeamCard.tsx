import { urlFor } from "@/sanity/image";
import Image from "next/image";
import React from "react";
import { TiltArrowIcon } from "../common/Icons";

interface MeetTeamCardProps {
  member: {
    image?: any;
    name?: string;
    role?: string;
  };
}

const MeetTeamCard = ({ member }: MeetTeamCardProps) => {
  return (
    <article className="group group/card bg-aztec shadow-s3 cursor-pointer rounded-3xl border border-white/45 p-4 transition-all duration-500 hover:border-white/80">
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-white/10">
        {member?.image ? (
          <Image
            src={urlFor(member.image)
              .width(600)
              .height(700)
              .quality(80)
              .format("webp")
              .url()}
            alt={member?.name || "team-member"}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
          />
        ) : (
          <div className="bg-placeholder-gray flex h-full w-full items-center justify-center">
            <span className="font-voyage text-6xl text-black/20">
              {member?.name?.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-antiflash font-voyage mt-4 text-3xl leading-[120%] transition-colors duration-300 group-hover/card:text-white lg:tracking-[-3%] xl:text-[44px]">
            {member.name}
          </h4>
          <span className="font-switzer text-antiflash/70 group-hover/card:text-antiflash text-sm leading-[160%] font-medium transition-colors duration-300 lg:text-lg">
            {member.role}
          </span>
        </div>
        <div className="mb-2 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:scale-110">
          <TiltArrowIcon />
        </div>
      </div>
    </article>
  );
};

export default MeetTeamCard;
