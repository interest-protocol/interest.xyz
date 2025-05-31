import {
  Box,
  Button,
  TooltipWrapper,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { ClipboardSVG, InformationCircleSVG } from '@/components/svg';
import { copyToClipboard } from '@/utils';

import { PoolDetailAccordionItemStandardProps } from './accordion.types';

const PoolDetailsCollapseItemStandard: FC<
  PoolDetailAccordionItemStandardProps
> = ({ label, content, popupInfo, isCopyClipBoard, labelColor, loading }) => {
  const clipBoardSuccessMessage = 'Address copied to the clipboard';

  return (
    <Box
      py="s"
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        size="medium"
        color={labelColor ? labelColor : ''}
        variant="body"
      >
        {loading ? <Skeleton width="5rem" /> : label}
      </Typography>
      <Box
        px="m"
        py="xs"
        display="flex"
        borderRadius="xs"
        bg="lowContainer"
        color="onSurface"
        alignItems="center"
        justifyContent="space-between"
        width={isCopyClipBoard && !loading ? '10rem' : 'auto'}
      >
        <Box
          overflow="hidden"
          mr={(isCopyClipBoard || popupInfo) && !loading ? 'xs' : ''}
          width={isCopyClipBoard && !loading ? '8rem' : 'auto'}
        >
          <Typography
            size="medium"
            variant="body"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {loading ? <Skeleton width="5rem" /> : content.value}
          </Typography>
        </Box>
        {!loading && (
          <Box>
            {popupInfo && (
              <TooltipWrapper
                bg="onSurface"
                tooltipPosition="left"
                tooltipContent={
                  <Typography variant="body" size="small" color="surface">
                    {popupInfo}
                  </Typography>
                }
              >
                <InformationCircleSVG
                  width="0.875rem"
                  cursor="pointer"
                  maxWidth="0.875rem"
                  maxHeight="0.875rem"
                />
              </TooltipWrapper>
            )}
            {isCopyClipBoard && (
              <Button
                p="unset"
                fontSize="xs"
                border="none"
                variant="outline"
                borderRadius="2xs"
                color="onSurface"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(
                    (content.copyClipboard || '').toString(),
                    clipBoardSuccessMessage
                  );
                }}
              >
                <ClipboardSVG
                  width="1.25rem"
                  cursor="pointer"
                  maxWidth="1.25rem"
                  maxHeight="1.25rem"
                />
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PoolDetailsCollapseItemStandard;
