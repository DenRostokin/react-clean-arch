# Фабрика создания адаптера к стору

Фабрика создания адаптера к стору, по аналогии с [фабрикой создания адаптера к локальному стейту][state-adapter], должена реализовывать единый интерфейс для адаптеров конкретной сущности. Фабрика создания адаптера реализуется в виде react-hook'а, который возвращает адаптер.

## _Шаги создания адаптера к стору_

1. Повторить первые шаги создания адаптера к локальному стейту, описанные в [документе][state-adapter].
    - описать тип локального стейта в файле `types.ts`;
    - создать константу с дефолтным стейтом в файле `consts.ts`;
    - описать тип `actions` в виде объекта;
2. Создать фабрику `reducers` в файле `reducers.ts`. В качестве типа для `reducers` использовать глобальный тип TStoreReducers<S, P>`, где
    - S - тип `state`;
    - P - тип `actions`;
```ts
export const getStoreReducers = <D>(): TStoreReducers<TState<D>, TActionPayload<D>> => {
    [EActionType.SET_DATA]: (state, action) => {
        state.data = action.payload;
    },
    [EActionType.SET_LOADING]: (state, action) => {
        state.loading = action.payload;
    },
}
```
3. Описать тип селекторов в файле `types.ts` и создать фабрику селекторов в файле `selectors.ts`, как было описано в [документе][state-adapter].
4. Создать `Registry` в файле `registry.ts`, в котором будут сохраняться экшены и селектор слайса при создании слайса стора. По аналогии с созданием локального стейта, в сторе создаётся слайс с использованием фабрики создания слайса, а которой речь пойдёт ниже. Слайс создаётся в слое приложения `app` в файле создания стора `src/app/store/store.ts`. Чтобы связать созданный слайс с адаптером используется `Registry`, которое выполняется с использованием паттерна `Singleton`. В `Registry` сохраняются экшены и селектор слайса по имени экшена.
```ts
type TRegistrySelector<S, D> = (arg0: S) => D;
type TRegistryActions<D> = TStateActions<TActionPayload<D>>;

export class Registry<S> {
    private static instance: Registry<unknown>;
    // ниже используется "any", т.к. в Registry могут храниться селекторы и экшены, работающие с любым типом. Знать заранее, какой тип селектора и экшена будет помещён в Registry невозможно.
    private static _selectors: Record<string, TRegistrySelector<S, any> = {}; 
    private static _actions: Record<string, TRegistryActions<any>> = {};
    
    private constructor() {}
    
    // метод взятия инстанса Registry сделан дженериком из-за того, что статический метод не может использовать типовую переменную, которая указана при создании класса Registry
    public static getRegistry<S>() {
        if (!Registry.instance) {
          Registry.instance = new Registry();
        }
    
        return Registry.instance as Registry<S>;
    }
    
    public registerSelector<D>(name: string, selector: TRegistrySelector<S, D>) {
        this._selectors[name] = selector;
    }

    public registerActions<D>(name: string, actions: TRegistryActions<D>) {
        this._actions[name] = actions;
    }

    public getSelector<D>(name: string) {
        if (!(name in this._selectors)) {
          throw new Error(`Selector "${name}" isn't found!`);
        }

        return this._selectors[name] as TRegistrySelector<S, D>;
    }

    public getActions<D>(name: string) {
        if (!(name in this._actions)) {
          throw new Error(`Actions "${name}" aren't found!`);
        }
        
        return this._actions[name] as TRegistryActions<D>;
    }
}
```
5. Создать фабрику создания слайсов стора `createSlice` в файле `utils.ts`. Эта фабрика принимает в качестве параметров:
    - `name` - имя создаваемого слайса (обязательный параметр). Оно должно быть уникальным для каждого слайса в сторе, т.к. оно используется при формировании `action types`, а также для сохранения экшенов и селектора слайса (о нём речь пойдёт ниже) в `Registry`;
    - `initialState` - начальное состояние стейта слайса (необязательный параметр). В качестве `initialState` может быть передан частичный стейт;
    - `sliceSelector` - селектор слайса в сторе. Т.к. слайс, созданный через `createSlice` может быть помещён в любое место стора при его создании, необходимо указать селектор, который созвращает создаваемый слайс из общего стора.
```ts
export const createSlice = <S, D>({
  name, initialState, sliceSelector
}: TCreateSliceParams<S, D>) => {
  const reducers = getStoreReducers<D>();
  const registry = Registry.getRegistry<S>();

  const { actions, reducer } = createSlice({
    initialState: {
      ...INITIAL_STATE, // константа с дефолтным стейтом, созданная на шаге 1
      ...initialState
    },
    name,
    reducers
  });

  registry.registerSelector(name, sliceSelector);
  // экшены в redux-toolkit принимают Draft в качестве payload, что вызывает ошибку не совместимости типов. поэтому здесь применён явный кастинг к обычным экшенам. На работу кода это никак не влияет, т.к. Draft - это внутренняя история в экшенах redux-toolkit'а 
  registry.registerActions(name, actions as TStateActions<D>);

  return reducer;
};
```
6. Создать фабрику создания адаптера к стору `useStoreAdapter` в файле `adapters.ts`. В качестве параметра она должна принимать имя, которое было указано в `createSlice` при создании слайса. В фабрике из `Registry` берётся `sliceSelector` и `actions`. Необходимо `actions` привязать к функции `dispatch` стора. А на основе `sliceSelector` сделать "хуки"-селекторы, через которые компонент будет получать данные из стора, а также подписываться на изменение этих данных. Последним шагом нужно создать функцию `getState` с использованием `sliceSelector`.
```ts
export const useStoreAdapter = <D>(name: string): TAdapter<D> => {
  const store = useStore();
  const dispatch = useDispatch();
  const registry = Registry.getRegistry();
  const sliceSelector = registry.getSelector<D>(name);
  const rawSelectors = getSelectors<D>();  // созданы на шаге 3
  cosnt selectors = useMemo(() => ({
    useData() {
      return useSelector(createSelector(
        sliceSelector,
        rawSelectors.selectData
      ));
    },
    useFetchingFlags() {
      return useSelector(createSelector(
        sliceSelector,
        (state) => ({
          loading: rawSelectors.selectLoading(state),
          initialized: rawSelectors.selectInitialized(state),
        })
      ));
    },
  }), []);
  
  const getState = useCallback(() => sliceSelector(store.getState()), []);

  return useMemo(() => ({
    actions,
    selectors,
    getState,
  }), []);
};
```

Поученный адаптер реализует тот же интерфейс, что и адаптер к локальному стейту. Поэтому модель сущности может не завязываться на то, где хранятся данные. Она абстрагируется от этого с помощью адаптера.

[state-adapter]: <https://github.com/DenRostokin/react-clean-arch/blob/main/docs/LowLevelStateAdapter.md>