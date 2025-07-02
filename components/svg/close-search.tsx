import { FC } from 'react';

import { SVGProps } from './svg.types';

const CloseSearch: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
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
      d="M13.4563 7.59484L7.60363 13.4475L6.54297 12.3868L12.3956 6.53418L13.4563 7.59484Z"
      fill="#6B7280"
    />
    <path
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.59983 6.53223L13.4564 12.39L12.3956 13.4505L6.53906 7.59278L7.59983 6.53223Z"
      fill="#6B7280"
    />
    <path
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 10C-2.38419e-07 4.47715 4.47715 2.38419e-07 10 0C15.5228 -2.38419e-07 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 2.38419e-07 15.5228 0 10ZM10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 14.6944 5.30558 18.5 10 18.5C14.6944 18.5 18.5 14.6944 18.5 10C18.5 5.30558 14.6944 1.5 10 1.5Z"
      fill="#6B7280"
    />
  </svg>
);

export default CloseSearch;
