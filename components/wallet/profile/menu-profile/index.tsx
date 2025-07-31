import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import DirectionalMenu from '@/components/directional-menu';
import { SignOutSVG } from '@/components/svg';

import { MenuProfileProps } from '../profile.types';
import BottomButton from './bottom-button';
import HomeProfile from './home-profile';
import UserInfo from './user-info';

const MenuProfile: FC<MenuProfileProps> = ({ onClose, onDisconnect }) => {
  return (
    <DirectionalMenu onClose={onClose} isDirectionalRight>
      <Box
        display="flex"
        flexDirection="column"
        gap="1.5rem"
        p="1.5rem"
        flex="1"
        overflowY="auto"
      >
        <UserInfo />
        <HomeProfile />
      </Box>
      <Box
        gap="0.5rem"
        display="flex"
        flexDirection="column"
        borderTop="1px solid #FFFFFF1A"
        px="1.5rem"
        py="1rem"
        mt="auto"
        color="#949E9E"
      >
        <BottomButton
          Icon={SignOutSVG}
          title="Disconnect"
          onClick={onDisconnect}
        />
      </Box>
    </DirectionalMenu>
  );
};

export default MenuProfile;
