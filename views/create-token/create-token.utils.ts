import { Network } from '@interest-protocol/interest-aptos-v2';
import Resizer from 'react-image-file-resizer';

import { Quest } from '@/server/model/quest';

export const getBase64 = async (file: File) => {
  const stringImage = await new Promise<string>((resolve) => {
    Resizer.imageFileResizer(
      file,
      250,
      250,
      'JPEG',
      80,
      0,
      (uri) => resolve(uri.toString()),
      'base64'
    );
  });

  if (stringImage.length >= 80_000) throw new Error('Image is too big');

  return stringImage;
};

export const logCreateToken = (
  symbol: string,
  value: string,
  address: string,
  network: Network,
  txDigest: string
) =>
  fetch(`https://api.staging.interestlabs.io/v1/quest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': 'Content-Type',
      'Access-Control-Request-Method': 'POST',
    },
    body: JSON.stringify({
      name: `Create Custom Token`,
      summary: `Create Custom Token`,
      value: {
        quest: {
          address,
          txDigest,
          kind: 'createToken',
          data: {
            coin: {
              symbol,
              amount: value,
              type: 'CUSTOM',
            },
          },
        },
        profileField: 'createToken',
        network,
      },
    } as Omit<Quest, 'timestamp'>),
  });
