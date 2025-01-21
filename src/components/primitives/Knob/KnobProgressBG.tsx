import * as React from "react";
import { SVGProps } from "react";
const KnobProgressBG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={136}
    height={122}
    fill="none"
    className="knob-progress-bg"
    {...props}
  >
    <g filter="url(#a)">
      <path
        stroke="#212529"
        strokeLinecap="round"
        strokeWidth={4}
        d="M27.5 116.558C13.155 104.821 4 86.98 4 67 4 31.654 32.654 3 68 3c35.346 0 64 28.654 64 64 0 19.98-9.156 37.821-23.5 49.558"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={136}
        height={121.558}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_19_876" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_19_876"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default KnobProgressBG;
