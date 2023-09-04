import { CATALOG_INITIAL_STATE } from './consts';
import { TCatalogState } from './types';

type TCatalogSelector = ((arg0: any) => TCatalogState);

export class CatalogRegistry {
  private static instance: CatalogRegistry;
  private _catalogSelector: TCatalogSelector;

  private constructor() {
    this._catalogSelector = () => CATALOG_INITIAL_STATE;

    this.registerCatalogSelector = this.registerCatalogSelector.bind(this);
  }

  public static getRegistry(): CatalogRegistry {
    if (!CatalogRegistry.instance) {
      CatalogRegistry.instance = new CatalogRegistry();
    }

    return CatalogRegistry.instance;
  }

  public registerCatalogSelector(selector: TCatalogSelector) {
    this._catalogSelector = selector;
  }

  public get catalogSelector() {
    return this._catalogSelector;
  }
}
