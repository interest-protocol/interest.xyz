import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import Avatar from '@/components/account-info/avatar';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';

import MenuProfile from './menu-profile';

const BOX_ID = 'wallet-box';

const Profile: FC = () => {
  const { query } = useRouter();
  const { account: currentAccount } = useWallet();
  const [isOpenProfile, setIsOpenProfile] = useState(Boolean(query.profile));

  const [menuIsDropdown] = useState(isOpenProfile);

  const closeDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == BOX_ID) ||
      event?.composedPath()?.some((node: any) => node?.id == BOX_ID)
    )
      return;

    handleCloseProfile();
  };

  const connectedBoxRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  const handleOpenProfile = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('profile', 'true');

    window.history.pushState('', '', url.toString());
    setIsOpenProfile(true);
  };

  const handleCloseProfile = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('profile');
    window.history.pushState('', '', url.toString());
    setIsOpenProfile(false);
  };

  return (
    <Box
      id={BOX_ID}
      display="flex"
      cursor="pointer"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={connectedBoxRef}
      flexDirection="column"
      justifyContent="center"
      top={menuIsDropdown ? ['-2rem', '-2rem', '-2rem', 'unset'] : 'unset'}
      right={menuIsDropdown ? ['-2rem', '-2rem', '-2rem', 'unset'] : 'unset'}
      width={menuIsDropdown ? ['110vw', '110vw', '110vw', 'unset'] : 'unset'}
      height={menuIsDropdown ? ['100vh', '100vh', '100vh', 'unset'] : 'unset'}
      bg={
        menuIsDropdown
          ? ['container', 'container', 'container', 'unset']
          : 'unset'
      }
      position={
        menuIsDropdown
          ? ['absolute', 'absolute', 'absolute', 'relative']
          : 'relative'
      }
    >
      <Box
        gap="m"
        alignItems="center"
        onClick={isOpenProfile ? handleCloseProfile : handleOpenProfile}
        display={[
          menuIsDropdown ? 'none' : 'flex',
          menuIsDropdown ? 'none' : 'flex',
          menuIsDropdown ? 'none' : 'flex',
          'flex',
        ]}
      >
        <Avatar
          isLarge
          withNameOrAddress
          nameOrAddressPosition="left"
          accountAddress={currentAccount?.address}
        />
      </Box>
      <MenuProfile
        isOpen={isOpenProfile}
        handleCloseProfile={handleCloseProfile}
      />
    </Box>
  );
};

export default Profile;
