import { FC, Context } from 'react';

import { TApiService, useApiServiceCreator } from './entity';
import { useMockingTransport } from './transports/mockingTransport';
import { TMockingTransportParams } from './types';

export type TMockingServiceProviderParams = TMockingTransportParams & {
  Context: Context<TApiService>;
};

export const createMockingServiceProviderHOC = ({
  Context,
  ...mockingTransportParams
}: TMockingServiceProviderParams) => {
  return <P extends Record<string, unknown>>(Component: FC<P>) => {
    const MockingServiceProvider: FC<P> = (props) => {
      const mockingTransport = useMockingTransport(mockingTransportParams);
      const apiService = useApiServiceCreator(mockingTransport);

      return (
        <Context.Provider value={apiService}>
          <Component {...props} />
        </Context.Provider>
      );
    };

    return MockingServiceProvider;
  };
};
