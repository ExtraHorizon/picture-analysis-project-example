import { createClient, OAuth1Client, ParamsOauth1, User } from '@extrahorizon/javascript-sdk';
import { useQuery } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import environment from '../constants/environment';

const oAuth1Params: ParamsOauth1 = {
  host: environment.host,
  consumerKey: environment.consumerKey,
  consumerSecret: environment.consumerSecret,
  token: environment.token,
  tokenSecret: environment.tokenSecret,
};

interface ExtraHorizonContextType {
  exh: OAuth1Client;
  me: User | null;
}

const ExtraHorizonContext = createContext<ExtraHorizonContextType | null>(null);

export const ExtraHorizonProvider = (props: PropsWithChildren) => {
  const [exh] = useState(() => createClient(oAuth1Params));

  const { data: me } = useQuery({
    queryKey: ['exh.me'],
    queryFn: async () => await exh.users.me(),
  });

  return (
    <ExtraHorizonContext.Provider
      value={
        {
          exh,
          me: me ?? null,
        }
      }
    >
      { props.children }
    </ExtraHorizonContext.Provider>
  );
};

export const useExtraHorizon = () => {
  const context = useContext(ExtraHorizonContext);

  if (context === null) {
    throw new Error('useExtraHorizon must be used within a ExtraHorizonProvider');
  }

  return context;
};
