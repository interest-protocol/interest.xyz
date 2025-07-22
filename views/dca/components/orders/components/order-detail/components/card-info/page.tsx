import { Box, Typography } from '@interest-protocol/ui-kit';
import { ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { CardInfoProps, ImageValue, ValueType } from './card-info.types';

const isImageValue = (value: unknown): value is ImageValue => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'url' in value &&
    typeof (value as ImageValue).url === 'string'
  );
};

const renderValue = (value: ValueType): ReactNode => {
  if (isImageValue(value)) {
    return (
      <Box gap="0.5rem" display="flex" alignItems="center">
        <img
          width={20}
          height={20}
          src={value.url}
          alt={value.alt || 'Imagem'}
          style={{
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
        {value.alt && (
          <Typography
            size="medium"
            variant="label"
            color="#FFFFFF"
            fontWeight="400"
            fontFamily="Inter"
            fontSize="0.875rem"
          >
            {value.alt}
          </Typography>
        )}
      </Box>
    );
  }

  if (value === null || value === undefined) return '';

  return value.toString();
};

const CardInfo = <T extends Record<string, unknown>>({
  width = '25.125rem',
  title,
  headers,
  keys,
  values,
  isLoading = false,
}: CardInfoProps<T>) => {
  const items = keys.reduce<{ label: string; value: ReactNode }[]>(
    (acc, key, index) => {
      if (index >= headers.length || !(key in values)) return acc;

      const rawValue = values[key];
      const resolvedValue =
        typeof rawValue === 'function'
          ? (rawValue as (raw: unknown) => ReactNode)(values)
          : renderValue(rawValue as ValueType);

      if (
        resolvedValue === '' ||
        resolvedValue === null ||
        resolvedValue === undefined
      )
        return acc;

      acc.push({
        label: headers[index],
        value: resolvedValue,
      });

      return acc;
    },
    []
  );

  return (
    <Box
      p="1rem"
      gap="1rem"
      height="auto"
      display="flex"
      bg="#9CA3AF1A"
      flexDirection="column"
      borderRadius="0.75rem"
      border="1px solid #F3F4F61A"
      width={['100%', `${width}`]}
    >
      <Typography
        size="medium"
        variant="label"
        color="#FFFFFF"
        fontSize="1rem"
        fontWeight="500"
        fontFamily="Inter"
      >
        {title}
      </Typography>

      {isLoading ? (
        <Skeleton width="100%" height="0.75rem" count={keys.length} />
      ) : items.length ? (
        <Box gap="1rem" width="100%" display="flex" flexDirection="column">
          {items.map((item) => (
            <Box
              key={v4()}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                size="medium"
                variant="label"
                color="#9CA3AF"
                fontWeight="400"
                fontFamily="Inter"
                fontSize="0.875rem"
              >
                {item.label}
              </Typography>
              <Box
                flex="1"
                mx="0.5rem"
                height="1px"
                borderBottom="1px dashed #4B556380"
              />
              <Box
                maxWidth="50%"
                color="#FFFFFF"
                fontWeight="400"
                fontFamily="Inter"
                fontSize="0.875rem"
                wordBreak="break-word"
              >
                {item.value}
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography
          size="medium"
          variant="label"
          color="#9CA3AF"
          fontWeight="400"
          fontFamily="Inter"
          fontSize="0.875rem"
        >
          No Info
        </Typography>
      )}
    </Box>
  );
};

export default CardInfo;
