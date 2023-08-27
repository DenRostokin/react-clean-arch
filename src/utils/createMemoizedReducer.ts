// type TPayloadSelector<S, R> = (arg0: S) => R;
// type TReducerForMemoization<S, P = Record<string, unknown>> = (arg0: S, arg1: TAction<keyof P, P[keyof P]>) => S;
//
// const createMemoizedReducer = <S, R, P = Record<string, unknown>>(selector: TPayloadSelector<S, R>, reducer: TReducerForMemoization<S, P>) => {
//   return <P>(state: S, action: TAction<keyof P, P[keyof P]>) => {
//     const newSelectedValue = selector(state);
//
//     if (newSelectedValue === action.payload) {
//       return state;
//     }
//
//     return reducer(state, action);
//   };
// };
export const createMemoizedReducer = () => {};
