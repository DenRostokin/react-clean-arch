import { FC, useContext, useCallback } from 'react';

import { ContractsTableContext } from './context';

const ContractsTab: FC = () => {
  const table = useContext(ContractsTableContext);
  const settingsOpened = table.useSettingsOpened();

  const openSettings = useCallback(() => {
    table.openSettings(true);
  }, [table]);

  const closeSettings = useCallback(() => {
    table.openSettings(false);
  }, [table]);

  return (
    <div>
      <button onClick={openSettings}>Open Table Settings</button>

      {settingsOpened && (
        <div>
          <h2>Table Settings</h2>

          <button onClick={closeSettings}>Close Table Settings</button>
        </div>
      )}
    </div>
  );
};

export default ContractsTab;
