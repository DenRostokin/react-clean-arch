import { FC } from 'react';

import { useStoreProduct } from 'entities/product/model/entity';

const ProductList: FC = () => {
  const product = useStoreProduct('productSlice');

  const filters = product.productMeta.selectors.useFilters();

  const handleFiltersChange = () => {
    product.productMeta.actions.setFilters({
      ...filters,
      price: ['1']
    });
  };

  console.log({ filters });

  return <div>
    <h1>ProductList</h1>

    <button onClick={handleFiltersChange}>Change Filters</button>
  </div>;
}

export default ProductList;
