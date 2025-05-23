import { Box, TextField } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { FilterSVG, SearchSVG } from '@/components/svg';

import { IPoolForm } from '../pools.types';
import Dropdown from './dropdown';
import FilterSelectedItem from './filter-selected-item';
import { ALGORITHM_DATA, POOL_TYPE_DATA } from './pool-filter.data';

const PoolFilter: FC = () => {
  const { register } = useFormContext<IPoolForm>();
  return (
    <Box
      mx="m"
      display="flex"
      color="onSurface"
      borderRadius="xs"
      flexDirection="column"
    >
      <Box
        display="flex"
        alignItems={['unset', 'unset', 'unset', 'center']}
        flexDirection={['column', 'column', 'column', 'row']}
        justifyContent={['center', 'center', 'center', 'space-between']}
      >
        <Box
          display="flex"
          alignItems={['unset', 'unset', 'unset', 'center']}
          flexDirection={['column', 'column', 'column', 'row']}
          justifyContent={['center', 'center', 'center', 'flex-start']}
        >
          <Box
            mx={['auto', 'auto', 'auto', 'xs']}
            zIndex="1"
            width="2.5rem"
            height="2.5rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="onSurface"
            borderRadius="xs"
            flexDirection="column"
          >
            <FilterSVG maxWidth="2rem" maxHeight="2rem" width="100%" />
          </Box>
          {ALGORITHM_DATA.map((filter) => (
            <Dropdown
              key={v4()}
              type={filter.type}
              label={filter.label}
              filterData={filter.data}
            />
          ))}
          {POOL_TYPE_DATA.map((filter) => (
            <Dropdown
              key={v4()}
              type={filter.type}
              label={filter.label}
              filterData={filter.data}
            />
          ))}
        </Box>
        <Box mb="xs">
          <TextField
            fontSize="medium"
            placeholder="Search pools"
            {...register('search')}
            nPlaceholder={{ opacity: 0.7 }}
            fieldProps={{
              height: '3rem',
              borderRadius: 'xs',
              bg: 'surface',
            }}
            Prefix={<SearchSVG maxWidth="1rem" maxHeight="1rem" width="100%" />}
          />
        </Box>
      </Box>

      <FilterSelectedItem />
    </Box>
  );
};

export default PoolFilter;
