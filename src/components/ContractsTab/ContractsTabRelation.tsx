import { FC, useCallback, useContext, memo } from 'react';

import ContractsTab from './ContractsTab';
import { ContractsTableContext } from './context';

const ContractsTabRelation: FC = () => {
  const table = useContext(ContractsTableContext);

  return (
    <ContractsTab />
  );
};

export default memo(ContractsTabRelation);
