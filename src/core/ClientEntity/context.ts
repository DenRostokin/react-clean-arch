import { createContext } from 'react';

import { TClient } from './entity';
import { CLIENT_DEFAULT_CONTEXT } from './consts';

export const ClientContext = createContext<TClient>(CLIENT_DEFAULT_CONTEXT);
