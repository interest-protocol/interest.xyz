import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { TokenWithPrice } from '@/interface';

const ExposedCoinsContext = createContext<{
  exposedCoins: TokenWithPrice[];
  setExposedCoins: (coins: TokenWithPrice[]) => void;
}>({
  exposedCoins: [],
  setExposedCoins: () => {},
});

export const ExposedCoinsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [exposedCoins, setExposedCoins] = useState<TokenWithPrice[]>([]);

  return (
    <ExposedCoinsContext.Provider value={{ exposedCoins, setExposedCoins }}>
      {children}
    </ExposedCoinsContext.Provider>
  );
};

export const useExposedCoinsContext = () => useContext(ExposedCoinsContext);
