import { FC, HTMLProps } from 'react';

import { TCatalog } from 'entities/catalog/model';

import styles from './styles.module.scss';

type TCatalogSubjectProps = HTMLProps<HTMLDivElement> & {
  catalog: TCatalog;
}

export const CatalogSubject: FC<TCatalogSubjectProps> = ({ catalog, ...props }) => {
  const subjectInfo = catalog.subjectInfoSelectors.useData();

  console.log({ subjectInfo });

  return (
    <div className={styles.description} {...props}>Catalog Subject</div>
  );
};

export default CatalogSubject;
