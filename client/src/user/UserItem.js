import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = (props) => {
    const {
        id,
        first_name,
        last_name,
        todo_count,
        email,
        department,
        country
    } = props;

    return (
        <div className="user__item">
            <p className="user__name">
                {`${first_name} ${last_name}`}
            </p>
            <p className="user__row">Email: {email}</p>
            <p className="user__row">Department: {department}</p>
            <p className="user__row">Country: {country}</p>
            <Link to={`/todos/${id}/`}>View Todos ({todo_count})</Link>
        </div>
    );
};

export default UserItem;
