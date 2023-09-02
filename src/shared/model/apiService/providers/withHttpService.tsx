import { FC } from 'react';

import { useHttpServiceCreator } from '../entity';
import { HttpServiceContext } from '../context';

export const withHttpService = <P extends Record<string, unknown>>(Component: FC<P>) => {
  const HttpServiceProvider: FC<P> = (props) => {
    const httpService = useHttpServiceCreator();

    return (
      <HttpServiceContext.Provider value={httpService}>
        <Component {...props} />
      </HttpServiceContext.Provider>
    );
  };

  return HttpServiceProvider;
};
