import { FC } from 'react';

import { TCatalog } from 'entities/catalog/model';

type TCatalogSubjectProps = {
  catalog: TCatalog;
}

export const CatalogSubject: FC<TCatalogSubjectProps> = ({ catalog }) => {
  const subjectInfo = catalog.subjectInfoSelectors.useData();

  console.log({ subjectInfo });

  return (
    <div>Catalog Subject</div>
  );
};

export default CatalogSubject;
