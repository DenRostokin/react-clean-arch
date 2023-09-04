import { FC, HTMLProps } from 'react';

import { TCatalog } from 'entities/catalog/model';

import styles from './styles.module.scss';

type TCatalogSubjectProps = HTMLProps<HTMLDivElement> & {
  catalog: TCatalog;
  theme?: 'light' | 'dark';
}

export const CatalogSubject: FC<TCatalogSubjectProps> = ({ catalog, theme, ...props }) => {
  const subjectInfo = catalog.subjectInfoSelectors.useData();

  console.log({ subjectInfo });

  return (
    <div className={styles.description} {...props} data-theme={theme}>Catalog Subject</div>
  );
};

export default CatalogSubject;
