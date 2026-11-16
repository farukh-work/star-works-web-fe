import React from "react";
import { StarIcon } from "./Icons";

const LeftSvg = React.forwardRef<HTMLSpanElement, { className?: string }>(
  ({ className = "" }, ref) => {
    return (
      <>
        <span
          ref={ref}
          className={`${className} absolute top-[34%] left-5 aspect-square max-w-16 sm:top-[35%] sm:left-[20%] md:left-[15%] md:max-w-20`}
        >
          <StarIcon />
        </span>
      </>
    );
  },
);

LeftSvg.displayName = "LeftSvg";

export default LeftSvg;
