import React from 'react';

const TodoItem = props => {
    const { title, completed, user } = props;
    const completedClass = completed ? 'todo__item--completed' : '';

    return (
        <div className={`todo__item ${completedClass}`}>
            <p className='todo__title'>{title}</p>
            <div className='todo__assignee'>
                <div className = 'todo__ulabel'>Assigned To:</div>
                <p>{`${user.first_name} ${user.last_name}`}</p>
            </div>
        </div>
    );
};

export default TodoItem;
