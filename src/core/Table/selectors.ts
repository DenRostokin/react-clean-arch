import { TTableState } from './consts';

export const selectSettingsOpened = (state: TTableState) => {
  return state.settingsOpened;
};
