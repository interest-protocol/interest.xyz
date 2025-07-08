import { Network } from '@interest-protocol/interest-aptos-v2';
import { useRouter } from 'next/router';
import { mergeAll } from 'ramda';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { updateURL } from '@/utils';

import { Aggregator, ISwapSettings } from './swap.types';

const SwapInitManager: FC = () => {
  const form = useFormContext();
  const { pathname } = useRouter();
  const network = useNetwork<Network>();

  const settings = useReadLocalStorage<ISwapSettings>(
    `${LOCAL_STORAGE_VERSION}-movement-dex-settings`
  ) ?? { slippage: '2', aggregator: Aggregator.Interest };

  useEffect(() => {
    form.reset();
    const defaultSettings = form.getValues('settings');
    form.setValue('settings', mergeAll([defaultSettings, settings]));
    updateURL(pathname);
  }, [network]);

  useEffect(() => {
    const defaultSettings = form.getValues('settings');
    form.setValue('settings', {
      ...defaultSettings,
      ...settings,
    });
  }, [settings]);

  return null;
};

export default SwapInitManager;
