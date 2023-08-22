import { useCallback, useState } from 'react';
// import { IApiResponseWithId } from '@rgs-core/types';
// import getOr from 'lodash/fp/getOr';
// import { ApiException } from 'src/exceptions';
// import { IApiContent } from 'src/dto';
//
// // Typescript can't infer Array from Parameters of typing variable
// // eslint-disable-next-line
// type Fetcher<A extends any[]> = (...arg: A) => Promise<IApiResponseWithId<unknown>>;
//
// export const useRequest = <T extends Fetcher<Parameters<T>>>(fetcher: T) => {
//   type TData = Required<Awaited<ReturnType<T>>>;
//
//   const [initialized, setInitialized] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<TData['responseBody'] | null>(null);
//   const [error, setError] = useState<ApiException | null>(null);
//
//   const request = useCallback(async (...arg: Parameters<T>) => {
//     try {
//       setLoading(true);
//
//       const response = await fetcher(...arg);
//
//       if (response.ok) {
//         setData(response?.responseBody || null);
//         setError(null);
//       } else {
//         const errorContent: IApiContent = getOr({}, 'responseBody.response.data', response);
//         const errorStatus = response.status;
//
//         throw new ApiException(errorContent.message || '', {
//           status: errorStatus,
//           data: errorContent.data || {},
//           code: errorContent.code || 0
//         });
//       }
//     } catch (externalError) {
//       setError(externalError as Error);
//
//       throw externalError;
//     } finally {
//       setInitialized(true);
//       setLoading(false);
//     }
//   }, [fetcher]);
//
//   const clearError = useCallback(() => setError(null), []);
//
//   return {
//     initialized, loading, data, error, request, clearError
//   };
// };
