import { Box, ProgressIndicator } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import useSWR from 'swr';

import { DefaultTokenSVG, ETHChainSVG, SVGProps } from '@/components/svg';

import { TOKEN_ICONS } from './token-icon.data';
import { TokenIconProps } from './token-icon.types';
import { isTokenIconUrl } from './token-icon.utils';

const PADDING_BORDER_SYMBOLS = ['nETH'];

const CHAIN_ICON: Record<string, FC<SVGProps>> = {
  e: ETHChainSVG,
};

const TokenIcon: FC<TokenIconProps> = ({
  url,
  symbol,
  withBg,
  network,
  rounded,
  size = '1.5rem',
  loaderSize = 16,
}) => {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const stopLoad = () => setLoading(false);
  const errorOnLoad = () => setLoadError(true);

  const icon = TOKEN_ICONS[network]?.[symbol] ?? null;

  const { data: iconSrc, isLoading } = useSWR(
    `${network}-${symbol}`,
    async () => {
      if (icon) return null;

      if (url) return url;

      return null;
    }
  );

  const chain = symbol.split('.')[1];
  const ChainIcon = CHAIN_ICON[chain];

  if (loadError)
    return (
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          bg="black"
          color="white"
          display="flex"
          overflow="hidden"
          position="relative"
          alignItems="center"
          justifyContent="center"
          width={`calc(${size} * 1.66)`}
          height={`calc(${size} * 1.66)`}
          borderRadius={rounded || !withBg ? 'full' : 'xs'}
          {...(withBg && { bg: 'onSurface', color: 'surface' })}
        >
          <DefaultTokenSVG
            width="100%"
            maxWidth={size ?? '1.5rem'}
            maxHeight={size ?? '1.5rem'}
          />
        </Box>
      </Box>
    );

  if (icon && isTokenIconUrl(icon))
    return (
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          display="flex"
          position="relative"
          alignItems="center"
          justifyContent="center"
          width={`calc(${size} * 1.66)`}
          height={`calc(${size} * 1.66)`}
          borderRadius={rounded ? 'full' : 'xs'}
          {...(withBg && { bg: 'onSurface', color: 'surface' })}
        >
          <Box
            overflow="hidden"
            width={`calc(${size} * 1.66)`}
            height={`calc(${size} * 1.66)`}
            borderRadius={rounded ? 'full' : 'xs'}
          >
            {loading && (
              <Box position="absolute" top="-0.5rem" left="0.9rem">
                <ProgressIndicator size={loaderSize} variant="loading" />
              </Box>
            )}
            <img
              width="100%"
              alt={symbol}
              src={icon.url}
              onLoad={stopLoad}
              onError={errorOnLoad}
            />
          </Box>
        </Box>
        {ChainIcon && (
          <Box
            right="-0.5rem"
            bottom="-0.3rem"
            overflow="hidden"
            position="absolute"
            borderRadius="full"
          >
            <ChainIcon maxHeight={size} maxWidth={size} width="100%" />
          </Box>
        )}
      </Box>
    );

  if (icon && !isTokenIconUrl(icon))
    return (
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          display="flex"
          overflow="hidden"
          position="relative"
          alignItems="center"
          justifyContent="center"
          width={`calc(${size} * 1.66)`}
          height={`calc(${size} * 1.66)`}
          borderRadius={rounded ? 'full' : 'xs'}
          {...(withBg && {
            bg: icon.bg || 'onSurface',
            color: icon.color || 'surface',
          })}
        >
          <icon.Icon
            width="100%"
            maxWidth={
              PADDING_BORDER_SYMBOLS.includes(symbol)
                ? `calc(${size} * 1.66)`
                : (size ?? '1.5rem')
            }
            maxHeight={
              PADDING_BORDER_SYMBOLS.includes(symbol)
                ? `calc(${size} * 1.66)`
                : (size ?? '1.5rem')
            }
          />
        </Box>
        {ChainIcon && (
          <Box
            right="-0.5rem"
            bottom="-0.3rem"
            overflow="hidden"
            position="absolute"
            borderRadius="full"
          >
            <ChainIcon maxHeight={size} maxWidth={size} width="100%" />
          </Box>
        )}
      </Box>
    );

  if (url)
    return (
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          display="flex"
          position="relative"
          alignItems="center"
          justifyContent="center"
          width={`calc(${size} * 1.66)`}
          height={`calc(${size} * 1.66)`}
          borderRadius={rounded ? 'full' : 'xs'}
        >
          <Box
            overflow="hidden"
            width={`calc(${size} * 1.66)`}
            height={`calc(${size} * 1.66)`}
            borderRadius={rounded ? 'full' : 'xs'}
          >
            {loading && (
              <Box position="absolute" top="-0.5rem" left="0.9rem">
                <ProgressIndicator size={loaderSize} variant="loading" />
              </Box>
            )}
            <img
              src={url}
              width="100%"
              alt={symbol}
              onLoad={stopLoad}
              onError={errorOnLoad}
              style={{
                objectFit: 'cover',
                width: `calc(${size} * 1.66)`,
                height: `calc(${size} * 1.66)`,
              }}
            />
          </Box>
        </Box>
        {ChainIcon && (
          <Box
            right="-0.5rem"
            bottom="-0.3rem"
            overflow="hidden"
            position="absolute"
            borderRadius="full"
          >
            <ChainIcon maxHeight={size} maxWidth={size} width="100%" />
          </Box>
        )}
      </Box>
    );

  if (isLoading || iconSrc)
    return (
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          display="flex"
          position="relative"
          alignItems="center"
          justifyContent="center"
          width={`calc(${size} * 1.66)`}
          height={`calc(${size} * 1.66)`}
          borderRadius={rounded ? 'full' : 'xs'}
        >
          <Box
            overflow="hidden"
            width={`calc(${size} * 1.66)`}
            height={`calc(${size} * 1.66)`}
            borderRadius={rounded ? 'full' : 'xs'}
          >
            {isLoading && (
              <Box position="absolute" top="-0.5rem" left="0.9rem">
                <ProgressIndicator size={loaderSize} variant="loading" />
              </Box>
            )}
            {iconSrc && (
              <img
                width="100%"
                alt={symbol}
                src={iconSrc}
                onLoad={stopLoad}
                onError={errorOnLoad}
                style={{
                  objectFit: 'cover',
                  width: `calc(${size} * 1.66)`,
                  height: `calc(${size} * 1.66)`,
                }}
              />
            )}
          </Box>
        </Box>
        {ChainIcon && (
          <Box
            right="-0.5rem"
            bottom="-0.3rem"
            overflow="hidden"
            position="absolute"
            borderRadius="full"
          >
            <ChainIcon maxHeight={size} maxWidth={size} width="100%" />
          </Box>
        )}
      </Box>
    );

  return (
    <Box
      display="flex"
      position="relative"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="black"
        color="white"
        display="flex"
        overflow="hidden"
        position="relative"
        alignItems="center"
        justifyContent="center"
        width={`calc(${size} * 1.66)`}
        height={`calc(${size} * 1.66)`}
        borderRadius={rounded || !withBg ? 'full' : 'xs'}
        {...(withBg && { bg: 'onSurface', color: 'surface' })}
      >
        <DefaultTokenSVG
          width="100%"
          maxWidth={size ?? '1.5rem'}
          maxHeight={size ?? '1.5rem'}
        />
      </Box>
      {ChainIcon && (
        <Box
          right="-0.5rem"
          bottom="-0.3rem"
          overflow="hidden"
          position="absolute"
          borderRadius="full"
        >
          <ChainIcon maxHeight={size} maxWidth={size} width="100%" />
        </Box>
      )}
    </Box>
  );
};

export default TokenIcon;
