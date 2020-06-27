import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import apiService from '../ApiService';
import { todoListState } from './atom';
import { filteredTodoListState } from './selector';
import TodoItem from './TodoItem';
import TodoListFilter from './TodoListFilter';

const TodoList = () => {
    let { userId } = useParams();
    userId = parseInt(userId);
    const [isLoading, setLoading] = useState(true);
    const setTodos = useSetRecoilState(todoListState);
    const filteredTodos = useRecoilValue(filteredTodoListState);

    useEffect(() => {
        const loadTodos = async() => {
            const todos = await apiService.getTodos({userId});
            setLoading(false);
            setTodos(todos);
        };
        loadTodos();
    }, [setTodos, userId]);

    if (isLoading) {
        return 'Loading...';
    }
    return (
        <div className="container">
            <TodoListFilter />
            {
                filteredTodos.map(item => {
                    return <TodoItem key={item.id} {...item} />
                })
            }
            <Link className="todo__linkback" to='/'>
                Back to Users search
            </Link>
        </div>
    );
};

export default TodoList;
