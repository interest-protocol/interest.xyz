import { Box, Button, Motion } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

import { ChevronDoubleLeftSVG, CogsSVG, SignOutSVG } from '@/components/svg';
import { wrapperBG, wrapperVariants } from '@/constants/wrapper-variants';
import { useIsFirstRender } from '@/hooks';
import { noop } from '@/utils';

import MenuButton from '../../menu-button';
import { MenuProfileProps } from '../profile.types';
import BottomButton from './bottom-button';
import CurrencyProfile from './currency-profile';
import HomeProfile from './home-profile';
import SettingProfile from './setting-profile';
import UserInfo from './user-info';

const MenuProfile: FC<MenuProfileProps> = ({ isOpen, handleCloseProfile }) => {
  const firstRender = useIsFirstRender();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      inset="0"
      bg="#0007"
      width="100vw"
      height="100vh"
      zIndex="9999999999"
      position="fixed"
      alignItems="center"
      justifyContent="center"
      backdropFilter="blur(10px)"
      variants={wrapperBG}
      animate={isOpen ? 'open' : 'closed'}
      initial={isOpen || firstRender ? 'closed' : 'open'}
      //pointerEvents={isOpen ? 'auto' : 'none'}
    >
      <Motion
        zIndex={10}
        display="flex"
        bg="red"
        overflowY="auto"
        color="onSurface"
        flexDirection="row"
        borderRadius="1rem"
        variants={wrapperVariants}
        textTransform="capitalize"
        top={['0', '0', '0', '2.5vh']}
        right={['0', '0', '0', '2rem']}
        animate={isOpen ? 'open' : 'closed'}
        //pointerEvents={isOpen ? 'auto' : 'none'}
        height={['100vh', '100vh', '100vh', '95vh']}
        minWidth={['100vw', '100vw', '100vw', '24rem']}
        position={['fixed', 'fixed', 'fixed', 'absolute']}
        initial={!isOpen || firstRender ? 'closed' : 'open'}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Motion
          bg="#181919"
          display={['none', 'none', 'none', 'flex']}
          overflow="hidden"
          animate={{
            width: isHovered ? ['0', '3.5rem'] : ['3.5rem', '0'],
          }}
          transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
        >
          <Button
            variant="text"
            isIcon
            onClick={handleCloseProfile}
            m="0.75rem"
          >
            <ChevronDoubleLeftSVG
              maxWidth="1rem"
              maxHeight="1rem"
              width="100%"
            />
          </Button>
        </Motion>
        <Box
          width={['100%', '100%', '100%', '24rem']}
          border="1px solid #FFFFFF1A"
          flexDirection="column"
          display="flex"
          height="100%"
          bg="#121313"
        >
          <MenuButton handleClose={handleCloseProfile} />
          <Box
            display="flex"
            flexDirection="column"
            gap="1.5rem"
            p="1.5rem"
            flex="1"
            overflowY="auto"
          >
            <UserInfo />
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
          <Box
            gap="0.5rem"
            display="flex"
            flexDirection="column"
            borderTop="1px solid #FFFFFF1A"
            px="1.5rem"
            py="1rem"
            mt="auto"
          >
            <BottomButton
              Icon={CogsSVG}
              title="Settings"
              onClick={noop}
              hasChevron
            />
            <BottomButton Icon={SignOutSVG} title="Disconnect" onClick={noop} />
          </Box>
        </Box>
      </Motion>
    </Motion>
  );
};

export default MenuProfile;
