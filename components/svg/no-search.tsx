import { FC } from 'react';

import { SVGProps } from './svg.types';

const NoSearch: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 1.5C5.30521 1.5 1.5 5.30521 1.5 10C1.5 14.6938 5.30527 18.5 10 18.5C14.6938 18.5 18.5 14.6938 18.5 10C18.5 5.30527 14.6938 1.5 10 1.5ZM0 10C0 4.47679 4.47679 0 10 0C15.5222 0 20 4.47673 20 10C20 15.5222 15.5222 20 10 20C4.47673 20 0 15.5222 0 10Z"
      fill="#9CA3AF"
    />
    <path
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.7451 5.4541V11.3731H9.24512V5.4541H10.7451Z"
      fill="#9CA3AF"
    />
    <path
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.24512 13.0459H10.7551V14.5459H9.24512V13.0459Z"
      fill="#9CA3AF"
    />
  </svg>
);

export default NoSearch;
