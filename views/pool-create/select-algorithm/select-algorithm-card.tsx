import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CreatePoolForm } from '../pool-create.types';
import { SelectAlgorithmCardProps } from './select-algorithm.types';

const SelectAlgorithmCLAMM: FC = () => (
  <>
    <Box width="10rem" height="10rem" bg="currentColor" borderRadius="50%" />
    <Motion
      inset="0"
      borderRadius="50%"
      position="absolute"
      backdropFilter="blur(10px)"
      animate={{ rotate: ['0deg', '365deg'] }}
      style={{ originX: 'center', originY: 'center' }}
      clipPath="polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)"
      transition={{
        duration: 8,
        ease: 'linear',
        repeat: Infinity,
      }}
    />
  </>
);

const SelectAlgorithmSRAMM: FC = () => (
  <>
    <Box width="10rem" height="10rem" bg="currentColor" />
    <Motion
      inset="0"
      position="absolute"
      backdropFilter="blur(10px)"
      style={{ originY: 'top' }}
      initial={{ y: '50%', scaleY: 0.5 }}
      animate={{
        scaleY: [0.5, 1, 1, 0.5],
        y: ['50%', '0%', '0%', '0%'],
      }}
      transition={{
        delay: 1,
        duration: 7,
        ease: 'linear',
        repeatDelay: 1,
        repeat: Infinity,
        repeatType: 'mirror',
      }}
    />
  </>
);

const SelectAlgorithmCard: FC<SelectAlgorithmCardProps> = ({
  name,
  description,
}) => {
  const { setValue, control } = useFormContext<CreatePoolForm>();

  const algorithm = useWatch({ control, name: 'algorithm' });

  const isSelected = algorithm === name;

  return (
    <Box
      p="2xl"
      gap="s"
      display="flex"
      cursor="pointer"
      borderRadius="xs"
      alignItems="center"
      flexDirection="column"
      onClick={() => setValue('algorithm', name)}
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
        {name === 'sr-amm' && <SelectAlgorithmSRAMM />}
        {name === 'clamm' && <SelectAlgorithmCLAMM />}
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

export default SelectAlgorithmCard;
