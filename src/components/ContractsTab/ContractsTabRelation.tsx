import { FC, useCallback, useContext, memo, useEffect } from 'react';

import { ClientContext } from 'core/ClientEntity';

import ContractsTab from './ContractsTab';
import { ContractsTableContext } from './context';

const ContractsTabRelation: FC = () => {
  const table = useContext(ContractsTableContext);
  const client = useContext(ClientContext);

  useEffect(() => {
    client.fetchClientList();
  }, []); //eslint-disable-line

  return (
    <ContractsTab />
  );
};

export default memo(ContractsTabRelation);
