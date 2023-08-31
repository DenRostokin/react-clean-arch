import { FC } from 'react';

import { useLocalTable } from 'core/TableEntity';
import { useApiService, HttpServiceContext } from 'core/ApiService';
import { useLocalClient, ClientContext } from 'core/ClientEntity';

import ContractsTabRelation from './ContractsTabRelation';
import { ContractsTableContext } from './context';
import { useMokingTransport } from './transports';
import { TClient } from './types';

const ContractsTabEntityProvider: FC = () => {
  const table = useLocalTable<TClient>();
  const client = useLocalClient();

  return (
    <ContractsTableContext.Provider value={table}>
      <ClientContext.Provider value={client}>
        <ContractsTabRelation />
      </ClientContext.Provider>
    </ContractsTableContext.Provider>
  );
};

const ContractsTabServiceProvider: FC = () => {
  const mockingTransport = useMokingTransport();
  const httpService = useApiService(mockingTransport);

  return (
    <HttpServiceContext.Provider value={httpService}>
      <ContractsTabEntityProvider />
    </HttpServiceContext.Provider>
  )
};

export default ContractsTabServiceProvider;
