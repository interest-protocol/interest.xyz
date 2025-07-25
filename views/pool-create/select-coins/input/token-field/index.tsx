import { Box, Theme, Typography, useTheme } from '@interest-protocol/ui-kit';
import stylin from '@stylin.js/react';
import { FC, forwardRef, PropsWithRef, RefAttributes, useId } from 'react';

import { TokenFieldElementProps, TokenFieldProps } from './token-field.types';

const TokenFieldElement = stylin<
  TokenFieldElementProps & RefAttributes<unknown>
>('input')();

export const TokenField: FC<PropsWithRef<TokenFieldProps>> = forwardRef(
  (
    {
      status,
      active,
      Bottom,
      Balance,
      variant,
      disabled,
      TokenIcon,
      ButtonMax,
      fieldProps,
      onActivate,
      supportingText,
      ...props
    },
    ref
  ) => {
    const id = useId();
    const { colors } = useTheme() as Theme;

    return (
      <Box
        opacity={disabled ? 0.32 : 1}
        cursor={disabled ? 'not-allowed' : 'normal'}
      >
        <Box
          display="flex"
          borderRadius="s"
          alignItems="center"
          py={TokenIcon ? '0' : 'xs'}
          transition="all 300ms ease-in-out"
          bg={variant === 'outline' ? 'transparent' : 'container'}
          border={
            '1px solid ' +
            colors[
              status == 'error'
                ? 'error'
                : variant === 'outline'
                  ? 'outlineVariant'
                  : 'container'
            ]
          }
          {...fieldProps}
          {...(onActivate &&
            !active && {
              onClick: onActivate,
            })}
        >
          {TokenIcon}
          <Box
            flex="1"
            width="100%"
            height="2.5rem"
            display="flex"
            alignItems="stretch"
            flexDirection="column"
            justifyContent="center"
            p={TokenIcon ? 'xs' : 'm'}
            mr={status ? '0.5rem' : 'unset'}
          >
            <TokenFieldElement
              id={id}
              ref={ref}
              all="unset"
              width="100%"
              fontSize="2xl"
              lineHeight="l"
              fontWeight="500"
              color={colors.onSurface}
              {...props}
            />
            {Bottom}
          </Box>
        </Box>
        {status == 'error' && (
          <Box mt="xs">
            <Typography
              variant="body"
              size="small"
              textTransform="capitalize"
              ml="2xs"
              color="error"
            >
              {supportingText}
            </Typography>
          </Box>
        )}
        <Box
          display="flex"
          alignItems="center"
          my={status == 'error' ? 'unset' : 'xs'}
          justifyContent="space-between"
        >
          {Balance}
          {ButtonMax}
        </Box>
      </Box>
    );
  }
);

TokenField.displayName = 'TokenField';
export * from './token-field.types';
