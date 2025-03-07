import { FC } from 'react';

import { SVGProps } from './svg.types';

const FireEmoji: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    fill="none"
    viewBox="0 0 12 13"
    {...props}
  >
    <text fill="white" fontSize="12">
      <tspan x="0" y="11">
        🔥
      </tspan>
    </text>
  </svg>
);

export default FireEmoji;
