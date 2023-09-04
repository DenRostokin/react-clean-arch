import { FC, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = <P extends Record<string, unknown>>(Component: FC<P>) => {
  const RouterProvider: FC<P> = (props) => (
    <BrowserRouter>
      {/* TODO change the fallback below by a loading component */}
      <Suspense fallback="Loading...">
        <Component {...props} />
      </Suspense>
    </BrowserRouter>
  );

  return RouterProvider;
};
