import { atom } from 'recoil';

export const userListState = atom({
    key: 'userListState',
    default: [],
});

export const userFormState = atom({
    key: 'userFormState',
    default: {
        first_name: '',
        last_name: '',
        department: '',
        country: '',        
    }
});
