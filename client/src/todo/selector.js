import { selector } from 'recoil';
import { todoListState, todoListFilterState } from './atom';

export const filteredTodoListState = selector({
    key: 'filteredTodoListState',
    get: ({get}) => {
        const filter = get(todoListFilterState);
        const list = get(todoListState);

        switch (filter) {
            case 'Show Completed':
                return list.filter(item => item.isComplete);
            case 'Show Uncompleted':
                return list.filter(item => !item.isComplete);
            default:
                return list;
        }
    },
});
