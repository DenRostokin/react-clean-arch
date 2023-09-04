import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout: FC = () => {
  return (
    <Outlet />
  );
};

export default AppLayout;
