import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export type TLocationIds = {
  id: string;
  link: string;
}[];

export const useLocationId = (data: TLocationIds) => {
  const location = useLocation();

  return useMemo(() => {
    const result = data.find(({ link }) => location.pathname.startsWith(link));

    if (!result) {
      return null;
    }

    return result.id;
  }, [location, data]);
};
