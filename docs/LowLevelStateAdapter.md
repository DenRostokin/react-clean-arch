# Фабрика создания адаптера к локальному стейту

Фабрика создания адаптера к локальному стейту должена реализовывать единый интерфейс для адаптеров конкретной сущности. Такой интерфейс должен быть либо заранее описан, либы выведен из одной из фабрик по созданию такого адаптера (в том числе может быть выведен из фабрики создания локального адаптера, о которой пойдёт речь ниже), и использован при реализации других фабрик.

Фабрика создания адаптера реализуется в виде react-hook'а, который возвращает адаптер.
```ts
export type TLocalAdapter = {...}

export const useLocalAdapter = (): TLocalAdapter => {...}
```
или
```ts
export const useLocalAdapter = () => {...}

export type TLocalAdapter = ReturnType<typeof useLocalAdapter>
```
## _Шаги создания адаптера к локальному стейту_
1. Описать тип локального стейта в файле `types.ts`
```ts
export type TLocalState<D> = {
    data: D | null;
    initialized: boolean;
    loading: boolean;
    error: ApiException | null;
}
```
2. Создать константу с дефолтным стейтом в файле `consts.ts`
```ts
export const INITIAL_LOCAL_STATE = {
    data: null,
    initialized: false,
    loading: false,
    error: null,
}
```
3. Описать тип `actions` в виде объекта, ключами которого являются `action.type`, а значениями - `action.payload`, в файле `types.ts` (в примере ниже `action.type` вынесены в отдельный `enum`)
```ts
export const enum EActionType {
    SET_DATA = 'setData',
    SET_LOADING = 'setLoading'
    ...
}

export type TActionPayload<D> = {
    [EActionType.SET_DATA]: D | null;
    [EActionType.SET_LOADING]: boolean;
    ...
}
```
4. Создать фабрику `reducers` в файле `reducers.ts`. В качестве типа для `reducers` использовать глобальный тип `TStateReducer<S, P>`, где
- S - тип `state`
- P - тип `actions`, описанный на шаге `3`
```ts
export const getReducers = <D>(): TStateReducers<TLocalState<D>, TActionPayload<D>> => ({
    [EActionType.SET_DATA]: (state, action) => ({
        ...state,
        data: action.payload,
    }),
    [EActionType.SET_LOADING]: (state, action) => ({
        ...state,
        loading: action.payload
    }),
});
```
5. Описать тип селекторов в файле `types.ts` в виде объекта
```ts
export type TSelectors<D> = {
    selectData: (state: TLocalState<D>) => D | null;
    selectLoading: (state: TLocalState<D>) => boolean;
    ...
}
```
6. Создать фабрику селекторов в файле `selectors.ts`. В качестве типа селекторов использовать тип, описанный на шаге `5`
```ts
export const getSelectors = <D>(): TSelector<D> => ({
    selectData: (state) => state.data,
    selectLoading: (state) => state.loading,
    ...
});
```
7. Создать локальный `state`, или несколько, используя утилиту `utils/useLocalState`, в параметры которой необходимо передать дефолтный `state`, созданный на шаге `2`, и `reducers`, созданные на шаге `4`. Возвращённый результатом данной функции будут:
- `actions` - объект с `actions`, к которым уже привязан `dispatch`;
- `getState` - функция взятия самого свежего `state` (для использования внутри методов сущности в дальнейшем);
- `useSelector` - `hook`, в который при его вызове передаётся один из селекторов, описанных в шаге `6`, и который подключает компонент к `state`;
```ts
const reducers = createReducers<D>();

const { actions, useSelector, getState } = useLocalState({
    initialState: INITIAL_LOCAL_STATE,
    reducers,
});
```
8. Создать объект с "хуками"-селекторами, через которые компоненты будут получать данные из `state`, и через которые они будут подписываться на изменение этих данных. Внутри каждого "хука"-селектора нужно использовать `useSelector`, полученный на шаге `7`
```ts
const rawSelectors = getSelectors<D>();

const selectors = {
    useData() {
        return useSelector(rawSelectors.selectData);
    },
    useLoading() {
        return useSelector(rawSelectors.selectLoading);
    },
    ...
}
```
9. Вернуть из фабрики создания адаптера мемоизированный объект с тремя элементами:
- `actions` - объект с `actions`;
- `selectors` - объект с "хуками"-селекторами;
- `getState` - функция взятия свежего `state`;
## _Итог_

Описанная на последнем шаге структура является интерфейсом адаптера, который должны реализовывать все адаптеры конкретной сущности (например, адаптер подключения сущности к `Redux Store`). Структура адаптера может быть другой, в зависимости от ваших требований, но в большинстве случаев она будет такой, как описана на последнем шаге.
