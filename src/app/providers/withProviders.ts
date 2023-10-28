import flow from 'lodash/flow';

import { createODataServiceProviderHOC } from 'shared/utils/apiService';

import { withStore } from './withStore';
import { withRouter } from './withRouter';

const withODataService = createODataServiceProviderHOC();

export const withProviders = flow(withStore, withRouter, withODataService);
