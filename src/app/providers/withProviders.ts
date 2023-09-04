import flow from 'lodash/flow';

import { withODataService } from 'shared/model/apiService';

import { withStore } from './withStore';
import { withRouter } from './withRouter';

export const withProviders = flow(withStore, withRouter, withODataService);
