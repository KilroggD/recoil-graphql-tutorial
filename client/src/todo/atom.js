import { atom } from 'recoil';

export const todoListState = atom({
    key: 'todoListState',
    default: [],
});

export const todoListFilterState = atom({
    key: 'todoListFilterState',
    default: 'Show All',
});
