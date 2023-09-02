import { FC } from 'react';

import { useHttpServiceCreator } from '../entity';
import { ODataServiceContext } from '../context';

export const withODataService = <P extends Record<string, unknown>>(Component: FC<P>) => {
  const ODataServiceProvider: FC<P> = (props) => {
    const httpService = useHttpServiceCreator();

    return (
      <ODataServiceContext.Provider value={httpService}>
        <Component {...props} />
      </ODataServiceContext.Provider>
    );
  };

  return ODataServiceProvider;
};
