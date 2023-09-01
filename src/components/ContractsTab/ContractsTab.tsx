import { FC, useContext, useCallback } from 'react';

import { ClientContext } from 'core/ClientEntity';

import { ContractsTableContext } from './context';

const ClientList: FC = () => {
  const client = useContext(ClientContext);
  const clientList = client.clientListSelectors.useData();

  if (!clientList) {
    return null;
  }

  return (
    <ul>
      {clientList.map(({ name, age }) => (
        <li key={name}>{`${name}: ${age}`}</li>
      ))}
    </ul>
  );
}

const ContractsTab: FC = () => {
  const client = useContext(ClientContext);
  const { 
    initialized: clientListInitialized,
    loading: clientListLoading
  } = client.clientListSelectors.useFetchingFlags();
  const table = useContext(ContractsTableContext);
  const settingsOpened = table.useSettingsOpened();
  
  const openSettings = useCallback(() => {
    table.openSettings(true);
  }, [table]);

  const closeSettings = useCallback(() => {
    table.openSettings(false);
  }, [table]);

  if (!clientListInitialized || clientListLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={openSettings}>Open Table Settings</button>

      {settingsOpened && (
        <div>
          <ClientList />

          <button onClick={closeSettings}>Close Table Settings</button>
        </div>
      )}
    </div>
  );
};

export default ContractsTab;
