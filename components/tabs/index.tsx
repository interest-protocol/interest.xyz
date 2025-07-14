import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TabsProps } from './tabs.types';

const Tabs: FC<TabsProps> = ({ setTab, tab, tabs }) => (
  <Box gap="0.5rem" display="flex" flexWrap="wrap">
    {tabs.map((text, index) => (
      <Button
        py="0.5rem"
        px="1rem"
        key={v4()}
        fontSize="1rem"
        cursor="pointer"
        fontWeight="400"
        variant="outline"
        lineHeight="1.7rem"
        fontFamily="Inter"
        borderRadius="full"
        onClick={() => setTab(index)}
        border="none"
        color={tab === index ? '#FFFFFF' : '#9CA3AF'}
        bg={tab === index ? '#9CA3AF33' : 'transparent'}
      >
        {text}
      </Button>
    ))}
  </Box>
);

export default Tabs;
