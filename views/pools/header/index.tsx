import { Box, Tabs, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import useEventListener from '@/hooks/use-event-listener';

import { FormFilterValue } from '../pool-card/pool-card.types';
import { FilterItemProps, FilterTypeEnum, IPoolForm } from '../pools.types';
import FindPoolButton from './find-pool-button';
import { HeaderProps } from './header.types';
import HeaderMetrics from './header-metrics';

const Header: FC<HeaderProps> = ({ currentTab, setTab }) => {
  const { setValue, control } = useFormContext<IPoolForm>();
  const [showSearchField, setShowSearchField] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const filterList = useWatch({ control, name: 'filterList' });

  const router = useRouter();
  const { query } = router;

  const handleSetDesktop = useCallback(() => {
    const mediaIsMobile = !window.matchMedia('(min-width: 65em)').matches;
    !mediaIsMobile && setShowSearchField(false);
    setIsMobile(mediaIsMobile);
  }, []);

  useEventListener('resize', handleSetDesktop, true);

  const cleanInvalidFilters = useCallback(() => {
    const validFilters = { ...query };
    const validValues = Object.values(FormFilterValue);
    let updated = false;

    ['algorithm'].forEach((key) => {
      if (
        validFilters[key] &&
        !validValues.includes(validFilters[key] as FormFilterValue)
      ) {
        delete validFilters[key];
        updated = true;
      }
    });

    if (updated) {
      router.replace(
        { pathname: router.pathname, query: validFilters },
        undefined,
        { shallow: true }
      );
    }

    return validFilters;
  }, [query, router]);

  useEffect(() => {
    const validFilters = cleanInvalidFilters();
    const filters: Array<FilterItemProps> = [];

    ['algorithm'].forEach((key) => {
      if (validFilters[key]) {
        filters.push({
          type: FilterTypeEnum.ALGORITHM,
          value: validFilters[key] as FormFilterValue,
        });
      }
    });

    if (filters.length) {
      setValue('filterList', filters);
    }
  }, [cleanInvalidFilters, setValue, filterList]);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      overflow="none"
      alignItems="center"
      justifyContent="space-between"
    >
      <HeaderMetrics />
      <Box
        gap="s"
        width="100%"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        display={isMobile ? (showSearchField ? 'none' : 'flex') : 'flex'}
      >
        <Tabs
          type="square"
          onChangeTab={(index: number) => {
            setTab(index);
            setValue('isFindingPool', false);
            setValue('tokenList', []);
            setValue('filterList', []);
          }}
          defaultTabIndex={currentTab}
          items={['Pools', 'My Position'].map((tab) => (
            <Typography
              key={v4()}
              variant="label"
              size={isMobile ? 'small' : 'medium'}
            >
              {tab}
            </Typography>
          ))}
        />
        <Box display="flex" justifyContent="space-between" gap="s">
          <FindPoolButton />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
