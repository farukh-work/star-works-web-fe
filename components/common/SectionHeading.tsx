import React from "react";
import SplitTextAnimation from "./HoverSplitText";

type Props = {
  children: React.ReactNode;
  className?: string;
  isline?: boolean;
  noAnim?: boolean;
};

const SectionHeading = ({
  children,
  isline = false,
  className = "",
  noAnim = false,
}: Props) => {
  const content = (
    <h2
      className={`font-voyage text-antiflash w-full gap-2 text-5xl leading-[120%]! xl:text-6xl ${className}`}
    >
      {isline && <> &mdash;</>}{" "}
      {typeof children === "string"
        ? children.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </React.Fragment>
          ))
        : children}
    </h2>
  );

  return noAnim ? content : <SplitTextAnimation>{content}</SplitTextAnimation>;
};

export default SectionHeading;
