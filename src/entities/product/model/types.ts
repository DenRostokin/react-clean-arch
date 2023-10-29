export type TProductFilters = Record<string, string[]>;

export type TProductMeta = {
  filters: TProductFilters;
}

export type TProductState = {
  productMeta: TProductMeta;
}
