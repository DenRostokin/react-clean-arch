import { FC } from 'react';

import { TableContext, useLocalStateTable } from 'core/Table';

import ContractsTabRelation from './ContractsTabRelation';

const ContractsTabProvider: FC = () => {
  const table = useLocalStateTable();

  return (
    <TableContext.Provider value={table}>
      <ContractsTabRelation />
    </TableContext.Provider>
  );
};

export default ContractsTabProvider;
