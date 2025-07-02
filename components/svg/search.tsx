import { FC } from 'react';

import { SVGProps } from './svg.types';

const Search: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 15 15"
    fill="none"
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M16.4999 16.5002L12.1691 12.1693M12.1691 12.1693C13.3412 10.9972 13.9997 9.40741 13.9997 7.74975C13.9997 6.09208 13.3412 4.50231 12.1691 3.33016C10.9969 2.15802 9.40717 1.49951 7.7495 1.49951C6.09184 1.49951 4.50207 2.15802 3.32992 3.33016C2.15777 4.50231 1.49927 6.09208 1.49927 7.74975C1.49927 9.40741 2.15777 10.9972 3.32992 12.1693C4.50207 13.3415 6.09184 14 7.7495 14C9.40717 14 10.9969 13.3415 12.1691 12.1693Z"
      stroke="#6B7280"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Search;
