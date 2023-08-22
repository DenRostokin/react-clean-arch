import { FC } from 'react';

import { TableContext, useLocalTable } from 'core/Table';

import ContractsTabRelation from './ContractsTabRelation';

const ContractsTabProvider: FC = () => {
  const table = useLocalTable();

  return (
    <TableContext.Provider value={table}>
      <ContractsTabRelation />
    </TableContext.Provider>
  );
};

export default ContractsTabProvider;
