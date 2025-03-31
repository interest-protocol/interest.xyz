import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { RadioButton } from '@/components/radio-button';
import { IPoolForm } from '@/views/pools/pools.types';

import { RadioFieldProps, SelectionFieldValues } from '../../pool-form.types';

const PoolFormWithdrawReceiveType: FC<RadioFieldProps> = ({
  type,
  label,
  currentValue,
  handleSelect,
}) => {
  const [isSelected, setIsSelected] = useState(currentValue === type);

  const { setValue } = useFormContext<IPoolForm>();

  const onClick = () => {
    if (type === SelectionFieldValues.Balance)
      setValue('tokenSelected', undefined);

    if (!isSelected) {
      setIsSelected(!isSelected);
      handleSelect(type);
    }
  };

  return (
    <Box
      gap="l"
      display="flex"
      cursor="pointer"
      onClick={onClick}
      alignItems="center"
    >
      <RadioButton defaultValue={isSelected} />
      <Typography variant="body" size="large" color="onSurface">
        {label}
      </Typography>
    </Box>
  );
};

export default PoolFormWithdrawReceiveType;
