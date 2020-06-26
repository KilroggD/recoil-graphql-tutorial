import React, { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import apiService from '../ApiService';
import { userListState } from './atom';
import { filteredUserListState } from './selector';
import SearchForm from './SearchForm';
import UserItem from './UserItem';

const UserList = () => {
    const setUsers = useSetRecoilState(userListState);
    const [isLoading, setLoading] = useState(true);
    const filteredUsers = useRecoilValue(filteredUserListState);
    
    useEffect(() => {
        const getUsers = async () => {
            const users = await apiService.getUsers();
            setLoading(false);
            setUsers(users);        
        };
        getUsers();
    }, [setLoading, setUsers]);   

    if (isLoading) {
        return 'Loading...';
    }

    return (
        <div className="container">
            <SearchForm />
            <div className="user__list">
                {
                    filteredUsers.map(user => {
                        return <UserItem key={user.id} {...user} />
                    })
                }
            </div>        
        </div>
    );
};

export default UserList;
