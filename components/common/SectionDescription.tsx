import React from "react";
import SplitTextReveal from "./HoverSplitText";

type Props = {
  children: React.ReactNode;
  className?: string;
  isline?: boolean;
  noAnim?: boolean;
};

const SectionDescription = ({ children, isline, className = "", noAnim = false }: Props) => {
  const content = (
    <h2
      className={`font-voyage text-antiflash w-full text-2xl leading-[100%]! md:text-3xl xl:text-4xl ${className}`}
    >
      {isline && <> &mdash;</>} {children}
    </h2>
  );

  return noAnim ? content : <SplitTextReveal>{content}</SplitTextReveal>;
};

export default SectionDescription;
