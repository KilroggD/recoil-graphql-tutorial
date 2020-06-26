import { selector } from 'recoil';

import { userListState, userFormState } from './atom';

export const filteredUserListState = selector({
    key: 'filteredUserListState',
    get: ({get}) => {
        const users = get(userListState);
        const filter = {...get(userFormState)};        
        Object.keys(filter).forEach(key => !filter[key] && delete filter[key]);
        if (Object.keys(filter).length) {
            return users.filter(user => {
                for (let key in filter) {
                    if (filter[key] !== user[key]) {
                        return false;
                    }
                }
                return true;
            });
        }
        return users;
    },
});