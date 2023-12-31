# Фабрика создания модели сущности

Под сущностью в описании ниже подразумевается модель сущности.

Сущность в описываемой архитектуре является главным логическим элементом, с которым осуществляется взаимодействие других элементов кода. Сущность инкапсулирует в себе данные, с которыми осуществляется работа, и методы для работы с этими данными. Данные из сущности забираются компонентом при помощи "хуков"-селекторов, через которые компонент подключается к изменению только тех данных, которые возвращает конкретный `hook`.

Сущность является иммутабельной структурой. Это означает, что она не изменяется при изменении данных, которые она содержит. Сущность сама по себе не подключает компонент, в котором используется, к изменению своих данных, подключение осуществляется только через "хуки"-селекторы.

## _Шаги создания фабрики сущности_
1. Реализовать в файле `entity.ts` фабрику-hook для создания сущности, которая принимает в качестве параметра адаптер (к локальному или внешнему хранилищу данных), тип которого соответствует типу адаптера данной сущности. Шаги создания адаптера к локальному хранилищу описаны в [документе][local-adapter].
```ts
export const useEntity = <D>(adapter: TEntityAdapter<D>) => {...};
```
2. Реализовать в файле `methods.ts` фабрику создания методов, сущности. В качестве параметров она должна обязательно принимать объект `actions` и функцию `getState`, полученные из адаптера. По необходимости в данную фабрику можно передавать и другие данные.
```ts
export type TEntityMethodsParams<D> = Omit<TEntityAdapter<D>, 'selectors'> & {...}

export const getEntityMethods = <D>(params: TEntityMethodsParams<D>) => {...};
```
3. Вернуть из фабрики создания сущности иммутабельный объект, который содержит:
- все "хуки"-селекторы адаптера;
- все методы, полученные на шаге `3`;
- `getState` - функцию получения свежего `state` сущности. Используется при создании локальной сущности на основе `state` другой сущности того же типа;
```ts
return useMemo(() => ({
    ...stateAdapter.selectors,
    ...tableMethods,
    getState: stateAdapter.getState,
}), []);
```
## _Шаги создания фабрики сущности c локальным хранилищем_
1. Создать адаптер сущности к локальному хранилищу данных в файле `adapters.ts`. Шаги создания такого адаптера описаны в [документе][local-adapter].
2. Реализовать фабрику-hook создания сущности с локальным хранилищем.
```ts
export const useLocalEntity = <D>() => {
    const adapter = useLocalAdapter<D>();
    
    return useEntity(adapter);
}
```
3. Сущность с локальным хранилищем чаще всего придётся создавать с уже имеющимися данными для этого хранилища. Поэтому в фабрике создания такой сущности придусмотреть получение в качестве параметра частично заполненного `state`, который должен быть передан в фабрику создания локального адаптера.
```ts
export const useLocalEntity = <D>(externalState?: Partial<TLocalState<D>>) => {
    const adapter = useLocalAdapter<D>(externalState);
    
    return useEntity(adapter);
};
```

[local-adapter]: <https://github.com/DenRostokin/react-clean-arch/blob/main/docs/LowLevelStateAdapter.md>
