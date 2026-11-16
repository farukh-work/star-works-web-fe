import React from "react";

interface CurvedTextProps {
  text: string;
  className?: string;
}

const CurvedText: React.FC<CurvedTextProps> = ({ text, className = "" }) => {
  return (
    <div
      className={`md:flex justify-center items-center w-full overflow-visible hidden ${className}`}
    >
      <svg
        viewBox="-200 0 1400 400"
        className="w-full max-w-[1400px] h-auto overflow-visible"
      >
        <path
          id="curvePath"
          d="M -150,300 Q 500,50 1150,300"
          fill="transparent"
        />
        <text className="curved-text fill-antiflash font-voyage text-[60px] md:text-[80px] lg:text-[100px]">
          <textPath
            xlinkHref="#curvePath"
            startOffset="50%"
            textAnchor="middle"
          >
            {text.split("").map((char, i) => (
              <tspan key={i} className="curved-char">
                {char}
              </tspan>
            ))}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CurvedText;
