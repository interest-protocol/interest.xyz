import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CreatePoolForm } from '../../pool-create.types';
import { SelectCurveCardProps } from '../select-curve.types';
import SelectCurveStable from './select-curve-stable';
import SelectCurveVolatile from './select-curve-volatile';

const SelectCurveCard: FC<SelectCurveCardProps> = ({ name, description }) => {
  const { setValue, control } = useFormContext<CreatePoolForm>();

  const curve = useWatch({ control, name: 'curve' });

  const isSelected = curve === name;

  return (
    <Box
      p="2xl"
      gap="s"
      display="flex"
      cursor="pointer"
      borderRadius="xs"
      alignItems="center"
      flexDirection="column"
      onClick={() => setValue('curve', name)}
      transition="background 300ms ease-in-out"
      bg={isSelected ? 'primary' : 'lowestContainer'}
      nHover={{ bg: isSelected ? 'primary' : 'lowContainer' }}
    >
      <Box
        width="14rem"
        height="14rem"
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
        color={isSelected ? 'onPrimary' : 'primary'}
      >
        {name === 'stable' && <SelectCurveStable />}
        {name === 'volatile' && <SelectCurveVolatile />}
      </Box>
      <Typography
        size="small"
        variant="headline"
        color={isSelected ? 'onPrimary' : 'onSurface'}
      >
        {name}
      </Typography>
      <Typography
        size="medium"
        variant="body"
        maxWidth="12rem"
        textAlign="center"
        color={isSelected ? 'onPrimary' : 'outline'}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default SelectCurveCard;
