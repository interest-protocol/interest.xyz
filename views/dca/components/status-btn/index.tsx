import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { StatusBtnProps } from './status-btn.types';
import { styles } from './styles';

const StatusBtn: FC<StatusBtnProps> = ({ status }) => {
  const style = styles[status];

  return (
    <Button
      py="0.125rem"
      px="0.375rem"
      bg={style.bg}
      display="flex"
      variant="outline"
      fontWeight="500"
      cursor="pointer"
      fontFamily="Inter"
      alignItems="center"
      minWidth="4.125rem"
      height="1.1875rem"
      color={style.color}
      fontSize="0.875rem"
      borderRadius="0.75rem"
      justifyContent="center"
      border={`1px solid ${style.bg}`}
    >
      {status === 'in-progress'
        ? 'In progress'
        : status.charAt(0).toUpperCase() + status.slice(1)}
    </Button>
  );
};

export default StatusBtn;
