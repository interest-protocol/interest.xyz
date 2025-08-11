import {
  Box,
  Button,
  Tag,
  TooltipWrapper,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { ArrowObliqueSVG } from '@/components/svg';

import { TAG_COLOR, TAG_TOOLTIP } from './pool-card.data';
import { PoolCardHeaderProps } from './pool-card.types';

const PoolCardHeader: FC<PoolCardHeaderProps> = ({ tags }) => (
  <Box display="flex" justifyContent="space-between" height="1.7rem">
    <Box display="flex" flexWrap="wrap">
      {tags.map((tag) =>
        tag ? (
          <TooltipWrapper
            bg="onSurface"
            borderRadius="0.5rem"
            width="max-content"
            tooltipPosition="top"
            tooltipContent={
              <Typography
                size="small"
                variant="body"
                textAlign="center"
                whiteSpace="pre-line"
              >
                {TAG_TOOLTIP[tag]}
              </Typography>
            }
            key={v4()}
          >
            <Tag
              px="0"
              py="0"
              mr="2xs"
              size="small"
              height="1.4rem"
              variant="outline"
              bg={TAG_COLOR[tag].bg}
              color={TAG_COLOR[tag].color}
              borderColor={TAG_COLOR[tag].color}
            >
              <Typography size="small" variant="label">
                {tag}
              </Typography>
            </Tag>
          </TooltipWrapper>
        ) : (
          true
        )
      )}
    </Box>
    <Button
      isIcon
      mb="auto"
      p="0.125rem"
      variant="text"
      display="none"
      color="onSurface"
      className="arrow-wrapper"
      nHover={{ color: 'primary', bg: 'surface' }}
    >
      <ArrowObliqueSVG maxHeight="1.5rem" maxWidth="1.5rem" width="1.5rem" />
    </Button>
  </Box>
);

export default PoolCardHeader;
