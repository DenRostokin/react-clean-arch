import { TTableState } from './consts';
import { TTableAction, EActionType } from './types';

const reducers = {
  [EActionType.CHANGE_SETTINGS_OPENED]: (state: TTableState, action: TTableAction) => ({
    ...state,
    settingsOpened: action.payload
  }),
};

export const tableReducer = (state: TTableState, action: TTableAction) => {
  const reducer = reducers[action.type];

  return reducer(state, action);
};
