import { RefObject, useCallback, useEffect, useState } from 'react';


export const useIsOverflow = (ref: RefObject<HTMLDivElement>,currentHeight: number, callback?: (b: boolean) => void ) => {
  const [isOverflow, setIsOverflow] = useState<boolean|undefined>(undefined);

  const checkOverflow = useCallback(() => {
    if (!ref.current) return;

    const hasOverflow = ref.current?.scrollHeight > currentHeight;
    if(currentHeight > 0){
      setIsOverflow(hasOverflow);
    }
    callback?.(hasOverflow);
  }, [callback,currentHeight]); // eslint-disable-line

  useEffect(() => {
    if (ref.current) {
      if ('ResizeObserver' in window) {
        new ResizeObserver(checkOverflow).observe(ref.current);
      }
      // TODO: check why scrollHeight does not always have time to calc correct
      setTimeout(() => {
        checkOverflow();
      }, 100)
    }
  }, [callback, checkOverflow]); // eslint-disable-line

  return { isOverflow, scrollHeight: ref.current?.scrollHeight } ;
};