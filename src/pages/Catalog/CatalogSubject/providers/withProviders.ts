import flow from 'lodash/flow';

import { withMockingService } from './withMockingService';

export const withProviders = flow(withMockingService);
