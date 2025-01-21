import * as React from "react";
import { SVGProps } from "react";
import styled from "styled-components";

const KnobProgressBarBase = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={136}
    height={122}
    fill="none"
    className="knob-progress-bar"
    {...props}
  >
    <g filter="url(#a)">
      <path
        className="knob-progress-bar-path"
        stroke="#3BC9DB"
        strokeLinecap="round"
        strokeWidth={4}
        pathLength="100"
        strokeDasharray={100}
        strokeDashoffset={0}
        d="M27.5 116.558C13.155 104.821 4 86.98 4 67 4 31.654 32.654 3 68 3c35.346 0 64 28.654 64 64 0 19.98-9.156 37.821-23.5 49.558"
        // d="M37.5 100.558C23.155 88.821 14 70.98 14 51c0-13.616 4.252-26.238 11.5-36.612"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={51.5}
        height={114.171}
        x={0}
        y={0.388}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.133333 0 0 0 0 0.721569 0 0 0 0 0.811765 0 0 0 0.8 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_19_877" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={6} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.133333 0 0 0 0 0.721569 0 0 0 0 0.811765 0 0 0 0.8 0" />
        <feBlend
          in2="effect1_dropShadow_19_877"
          result="effect2_dropShadow_19_877"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_19_877"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

type Props = {
  percent: number;
};

const KnobProgressBar = styled(KnobProgressBarBase)<Props>`
  position: absolute;
  bottom: 0;
  left: 0;

  & .knob-progress-bar-path {
    stroke: ${({ theme }) => theme.colors.primary.default};
    stroke-dashoffset: ${({ percent }) => 100 - percent};
  }
`;

export default KnobProgressBar;
