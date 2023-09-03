import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CatalogSubject } from 'entities/catalog/ui/CatalogSubject';
import { useCatalog } from 'entities/catalog/model';
import { useCatalogStoreAdapter } from 'app/store';

import { withProviders } from './providers';

const CatalogSubjectPage: FC = () => {
  const catalogStoreAdapter = useCatalogStoreAdapter();
  const catalog = useCatalog(catalogStoreAdapter);
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
    <CatalogSubject catalog={catalog} data-theme="dark" />
  );
};

export default withProviders(CatalogSubjectPage);
