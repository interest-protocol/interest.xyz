import { Box, Motion } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

import { wrapperVariants } from '@/constants/wrapper-variants';
import { useIsFirstRender } from '@/hooks';

import MenuButton from '../../menu-button';
import { MenuProfileProps } from '../profile.types';
import CurrencyProfile from './currency-profile';
import HomeProfile from './home-profile';
import SettingProfile from './setting-profile';
import UserInfo from './user-info';

const MenuProfile: FC<MenuProfileProps> = ({ isOpen, handleCloseProfile }) => {
  const firstRender = useIsFirstRender();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const handleSettings = () => {
    setIsSettingsOpen(true);
    setIsCurrencyOpen(false);
  };

  const handleCurrency = () => {
    setIsCurrencyOpen(true);
    setIsSettingsOpen(false);
  };

  const handleToggleProfile = () => setIsSettingsOpen(not);

  return (
    <Motion
      p="xl"
      right="0"
      zIndex={1}
      border="1px"
      display="flex"
      bg="container"
      overflowY="auto"
      color="onSurface"
      borderRadius="2xs"
      borderStyle="solid"
      borderColor="outline"
      flexDirection="column"
      variants={wrapperVariants}
      textTransform="capitalize"
      justifyContent="space-between"
      top={['0', '0', '0', '3.5rem']}
      animate={isOpen ? 'open' : 'closed'}
      pointerEvents={isOpen ? 'auto' : 'none'}
      height={['100vh', '100vh', '100vh', '85vh']}
      width={['100vw', '100vw', '100vw', '26.875rem']}
      position={['fixed', 'fixed', 'fixed', 'absolute']}
      initial={isOpen || firstRender ? 'closed' : 'open'}
    >
      <Box display="flex" flexDirection="column">
        <Box
          pb="l"
          flexDirection="row-reverse"
          display={['flex', 'flex', 'flex', 'none']}
        >
          <MenuButton handleClose={handleCloseProfile} />
        </Box>
        <UserInfo handleSettings={handleToggleProfile} />
        {isSettingsOpen ? (
          <SettingProfile
            handleToggleProfile={handleToggleProfile}
            handleCurrency={handleCurrency}
          />
        ) : isCurrencyOpen ? (
          <CurrencyProfile handleBack={handleSettings} />
        ) : (
          <HomeProfile />
        )}
      </Box>
    </Motion>
  );
};

export default MenuProfile;
