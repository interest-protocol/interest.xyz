import { FC } from 'react';

import { SVGProps } from './svg.types';

const Checkbox: FC<
  SVGProps & { status: 'active' | 'checked' | 'unchecked' }
> = ({ maxWidth, maxHeight, status, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 42 42"
    fill="none"
    {...props}
  >
    {status === 'checked' ? (
      <>
        <rect width="42" height="42" rx="8" fill="#B4C5FF" />
        <path
          d="M37.4751 10.4998L15.7503 32.2246L4.52539 20.9998L7.00026 18.5249L15.7503 27.2749L35.0003 8.0249L37.4751 10.4998Z"
          fill="black"
        />
      </>
    ) : status === 'active' ? (
      <>
        <rect width="42" height="42" rx="8" fill="#B4C5FF" />
        <path d="M6 19H36V23H6V19Z" fill="black" />
      </>
    ) : (
      <rect width="42" height="42" rx="8" fill="#ABABAB" />
    )}
  </svg>
);

export default Checkbox;
