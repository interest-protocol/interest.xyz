import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ChevronRightSVG } from '@/components/svg';

import { BottomButtonProps } from './user-info.types';

const BottomButton: FC<BottomButtonProps> = ({
  Icon,
  title,
  onClick,
  hasChevron,
}) => {
  return (
    <Box
      p="0.813rem"
      bg="#222222"
      width="100%"
      display="flex"
      onClick={onClick}
      borderRadius="1rem"
      cursor="pointer"
      alignItems="center"
      justifyContent="space-between"
      nHover={{
        '.button-icon': {
          backgroundColor: '#B4C5FF29',
          color: '#B4C5FF',
        },
        '.text-info': {
          color: '#fff',
        },
        '.chevron-icon': {
          color: '#fff',
        },
      }}
    >
      <Box display="flex" gap="0.75rem" alignItems="center">
        <Button
          isIcon
          variant="text"
          bg="#949E9E29"
          borderRadius="full"
          className="button-icon"
          boxShadow=" 0px 0px 0px 2px #FFFFFF0D"
        >
          <Icon maxHeight="1rem" maxWidth="1rem" width="100%" />
        </Button>
        <Typography
          size="small"
          variant="body"
          color="#949E9E"
          fontSize="1rem"
          fontWeight="500"
          lineHeight="1rem"
          fontFamily="Inter"
          className="text-info"
          transition="all 300ms ease-in-out"
        >
          {title}
        </Typography>
      </Box>
      {hasChevron && (
        <Box
          color="#949E9E"
          className="chevron-icon"
          transition="all 300ms ease-in-out"
        >
          <ChevronRightSVG
            maxWidth="1rem"
            maxHeight="1rem"
            width="100%"
            fill="inherit"
          />
        </Box>
      )}
    </Box>
  );
};

export default BottomButton;
