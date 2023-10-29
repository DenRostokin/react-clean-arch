import { FC } from 'react';

// import { Routing } from 'pages';

import { withProviders } from './providers';

import 'entities/catalog/styles/index.scss';
import 'shared/styles/index.scss';
import { ProductList } from 'entities/product/ui/ProductList';

const App: FC = () => (
  <ProductList />
);

// const App: FC = () => (
//   <Routing />
// );

export default withProviders(App);
