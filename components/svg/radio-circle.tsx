import { FC, useId } from 'react';

import { SVGProps } from './svg.types';

const RadioCircle: FC<SVGProps & { isChecked: boolean }> = ({
  maxWidth,
  maxHeight,
  isChecked,
  ...props
}) => {
  const id = useId();

  if (!isChecked)
    return (
      <svg style={{ maxWidth, maxHeight }} viewBox="0 0 20 20" {...props}>
        <path
          d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z"
          fill="currentColor"
        />
      </svg>
    );

  return (
    <svg style={{ maxWidth, maxHeight }} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <g filter={`url(#filter0_${id})`}>
        <circle cx="12" cy="12" r="5" fill="white" />
      </g>
      <defs>
        <filter
          id={`filter0_${id}`}
          x="1"
          y="5"
          style={{ maxWidth, maxHeight }}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="2"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_298_22252"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0509804 0 0 0 0 0.0627451 0 0 0 0 0.0901961 0 0 0 0.04 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_298_22252"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="2"
            operator="erode"
            in="SourceAlpha"
            result="effect2_dropShadow_298_22252"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0509804 0 0 0 0 0.0627451 0 0 0 0 0.0901961 0 0 0 0.12 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_298_22252"
            result="effect2_dropShadow_298_22252"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_298_22252"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default RadioCircle;
