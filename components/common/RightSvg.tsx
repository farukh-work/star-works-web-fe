import React from "react";
import { Star2Icon } from "./Icons";

const RightSvg = React.forwardRef<HTMLSpanElement, { className?: string }>(
  ({ className = "" }, ref) => {
    return (
      <>
        <span
          ref={ref}
          className={`${className} absolute top-[104%] right-5 aspect-square max-w-16 sm:top-full sm:right-[20%] md:max-w-20`}
        >
          <Star2Icon />
        </span>
      </>
    );
  },
);

RightSvg.displayName = "RightSvg";

export default RightSvg;
