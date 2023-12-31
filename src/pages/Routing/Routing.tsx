import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { getCatalogSubject } from 'shared/utils/routes';
import { AppLayout, CatalogSubject, NotFound } from 'pages';
import { ProductList } from 'entities/product/ui/ProductList';

const Routing: FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index path="/" element={<ProductList />} />
        <Route index path={getCatalogSubject()} element={<CatalogSubject />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Routing;
