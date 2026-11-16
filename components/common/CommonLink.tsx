import Link from "next/link";
import React from "react";
import { LeftArrow } from "./Icons";

interface IProps {
  text: string;
  link: string;
}
const CommonLink = (props: IProps) => {
  const { text, link } = props;
  return (
    <>
      <Link
        className="font-bold text-white   text-base leading-[25px] flex items-center space-x-2 border-b border-white uppercase group"
        href={link}
      >
        <span>{text}</span>
        <span className="transition-all duration-300 ease-in-out group-hover:translate-x-1">
          <LeftArrow />
        </span>
      </Link>
    </>
  );
};

export default CommonLink;
