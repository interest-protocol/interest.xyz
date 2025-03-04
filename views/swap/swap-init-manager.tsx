import { Network } from '@interest-protocol/aptos-sr-amm';
import { useRouter } from 'next/router';
import { mergeAll } from 'ramda';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { formatDollars, updateURL } from '@/utils';

import { Aggregator, ISwapSettings } from './swap.types';

const SwapInitManager: FC = () => {
  const form = useFormContext();
  const network = useNetwork<Network>();
  const { pathname } = useRouter();

  const settings = useReadLocalStorage<ISwapSettings>(
    `${LOCAL_STORAGE_VERSION}-movement-dex-settings`
  ) ?? { slippage: '2', aggregator: Aggregator.Interest };

  const getUSDPrice = (address: string, label: 'to' | 'from') => {
    fetch(
      `https://rates-api-staging.up.railway.app/api/fetch-quote?coins=${address}`,
      {
        method: 'GET',
        headers: {
          network: 'MOVEMENT',
        },
      }
    )
      .then((response) => response.json())
      .then((data) =>
        form.setValue(`${label}.usdPrice`, formatDollars(data.price))
      )
      .catch(() => null);
  };

  useEffect(() => {
    form.reset();
    const defaultSettings = form.getValues('settings');
    form.setValue('settings', mergeAll([defaultSettings, settings]));
    getUSDPrice(form.getValues('from.type'), 'from');
    getUSDPrice(form.getValues('to.type'), 'to');
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
