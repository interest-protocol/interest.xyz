import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TabsProps } from './tabs.types';

const Tabs: FC<TabsProps> = ({ setTab, tab, tabs }) => (
  <Box py="0.5rem" gap="0.5rem" display="flex" flexWrap="wrap">
    {tabs.map((text, index) => (
      <Button
        py="0.7rem"
        px="0.75rem"
        key={v4()}
        fontSize="1rem"
        cursor="pointer"
        fontWeight="400"
        variant="outline"
        fontFamily="Inter"
        borderRadius="624.9375rem"
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
