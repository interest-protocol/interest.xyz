import { Box, Motion } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC } from 'react';

import { RadioCircleSVG } from '../svg';
import { RadioButtonProps } from './radio-button.types';

export const RadioButton: FC<RadioButtonProps> = ({
  onClick,
  disabled,
  defaultValue,
}) => {
  const selected = defaultValue ?? false;

  const color = selected ? '#B4C5FF' : '#E2E2E6';

  const variants = {
    hover: {
      boxShadow: `${disabled ? 'disabled' : `${color}14`} 0px 0px 0px 0.625rem`,
    },
    withoutHover: { boxShadow: 'unset' },
  };

  const handleChange = () => {
    if (disabled) return;
    onClick?.(not(selected));
  };

  return (
    <Box
      gap="1rem"
      display="flex"
      flexWrap="wrap"
      onClick={handleChange}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      aria-label="radioWrapper"
    >
      <Motion
        display="flex"
        width="1.25rem"
        height="1.25rem"
        whileHover="hover"
        borderRadius="50%"
        alignItems="center"
        variants={variants}
        initial="withoutHover"
        justifyContent="center"
        transition={{ duration: 0.5 }}
        color={disabled ? 'onSurface' : color}
        opacity={disabled ? '0.32' : '1'}
        role="radio"
      >
        <RadioCircleSVG
          width="100%"
          height="100%"
          maxWidth="1.25rem"
          maxHeight="1.25rem"
          isChecked={selected}
        />
      </Motion>
    </Box>
  );
};

export * from './radio-button.types';
