import { CatalogRegistry } from './registry';

export * from './adapters';
export * from './consts';
export * from './entity';
export * from './types';

export const registerCatalogSelector = CatalogRegistry.getRegistry().registerCatalogSelector;
