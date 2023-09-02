import { FC } from 'react';

import { Routing } from 'pages';

import { withProviders } from './providers';

const App: FC = () => (
  <Routing />
);

export default withProviders(App);
