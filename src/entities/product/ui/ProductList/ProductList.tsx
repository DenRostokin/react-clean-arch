import { FC } from 'react';

import { useLocalProduct } from 'entities/product/model/entity';

const ProductList: FC = () => {
  const product = useLocalProduct();

  const filters = product.productMeta.selectors.useFilters();

  console.log({ filters });

  return <div>ProductList</div>;
}

export default ProductList;
