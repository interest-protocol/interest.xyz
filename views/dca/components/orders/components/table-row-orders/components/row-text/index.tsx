import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import LabelText from '../label-text';
import { RowTextProps } from './row-text.props';

const RowText: FC<RowTextProps> = ({ children, width }) => (
  <Box width={width}>
    <LabelText>{children}</LabelText>
  </Box>
);

export default RowText;
