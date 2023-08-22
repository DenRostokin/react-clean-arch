import { FC, useCallback, useContext } from 'react';

import { TableContext } from 'core/Table';

import ContractsTab from './ContractsTab';

const ContractsTabRelation: FC = () => {
  const table = useContext(TableContext);

  return (
    <ContractsTab />
  );
};

export default ContractsTabRelation;
