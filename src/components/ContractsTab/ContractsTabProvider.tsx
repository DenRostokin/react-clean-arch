import { FC } from 'react';

import { useLocalTable } from 'core/Table';

import ContractsTabRelation from './ContractsTabRelation';
import { ContractsTableContext } from './context';
import { TClient } from './types';

const ContractsTabProvider: FC = () => {
  const table = useLocalTable<TClient>();

  return (
    <ContractsTableContext.Provider value={table}>
      <ContractsTabRelation />
    </ContractsTableContext.Provider>
  );
};

export default ContractsTabProvider;
