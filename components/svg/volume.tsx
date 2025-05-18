import { FC } from 'react';

import { SVGProps } from './svg.types';

const Volume: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 14 12"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.62037 0.375L8.15741 0.837963V3.15278H5.37963L4.91667 3.61574V5.93056H2.13889L1.67593 6.39352V10.0972H0.75V11.0231H2.13889H5.37963H8.62037H11.8611H13.25V10.0972H12.3241V0.837963L11.8611 0.375H8.62037ZM11.3981 10.0972V1.30093H9.08333V3.61574V10.0972H11.3981ZM8.15741 10.0972V4.0787H5.84259V6.39352V10.0972H8.15741ZM2.60185 6.85648H4.91667V10.0972H2.60185V6.85648Z"
      fill="currentColor"
    />
  </svg>
);

export default Volume;
