/* Catalog Route */
export const getCatalog = () => '/catalog';

/* Catalog Subject Route */
export const getCatalogSubject = (id: string = ":id") => `${getCatalog()}/subject/${id}`;

/* Catalog Entity Routes */
export const getCatalogEntity = (id: string = ":id") => `${getCatalog}/entity/${id}`;
export const getCatalogEntityAttributes = (id: string = ":id") => `${getCatalogEntity(id)}/attributes`;
export const getCatalogEntityRelations = (id: string = ":id") => `${getCatalogEntity(id)}/relations`;
export const getCatalogEntityBusinessRules = (id: string = ":id") => `${getCatalogEntity(id)}/business-rules`;
export const getCatalogEntityHistory = (id: string = ":id") => `${getCatalogEntity(id)}/history`;
export const getCatalogEntityNew = () => `${getCatalogEntity('new')}`;
export const getCatalogEntityNewAttributes = () => `${getCatalogEntityNew}/attributes`;
export const getCatalogEntityNewRelations = () => `${getCatalogEntityNew}/relations`;

/* Catalog Attribute Routes */
export const getCatalogAttribute = (id: string = ":id") => `${getCatalog()}/attribute/${id}`;
export const getCatalogAttributeBusibessRules = (id: string = ":id") => `${getCatalogAttribute(id)}/business-rules`;
