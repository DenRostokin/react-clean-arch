import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CatalogSubject } from 'entities/catalog/ui/CatalogSubject';
import { useStoreCatalog } from 'entities/catalog/model';

import { withProviders } from './providers';

const CatalogSubjectPage: FC = () => {
  const catalog = useStoreCatalog('catalogSlice');
  const { initialized, loading } = catalog.subjectInfoSelectors.useFetchingFlags();
  const { id: catalogId } = useParams();

  useEffect(() => {
    if (catalogId) {
      catalog.fetchSubjectInfo(catalogId);
    }
  }, []); // eslint-disable-line

  if (!initialized || loading) {
    return <div>Loading...</div>;
  }

  return (
    <CatalogSubject catalog={catalog} theme="dark" />
  );
};

export default withProviders(CatalogSubjectPage);
