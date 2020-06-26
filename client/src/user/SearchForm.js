import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { userFormState } from './atom';

const SearchForm = () => {
    const [formState, setFormState] = useState({});
    const [filterState, setFilterState] = useRecoilState(userFormState);

    const handleChange = (event) => {
        const {name, value} = event.target;
        const newState = {...formState};
        newState[name] = value;
        setFormState(newState);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newFilterState = {...filterState, ...formState};
        setFilterState(newFilterState);
    }

    return (
        <form className="user__form" onSubmit={handleSubmit}>
            <label>
                First Name:
                <input
                    type="text" 
                    name="first_name" 
                    value={formState.first_name || ''} 
                    onChange={handleChange} 
                />
            </label>
            <label>
                Last Name:
                <input 
                    type="text" 
                    name="last_name" 
                    value={formState.last_name || ''} 
                    onChange={handleChange} 
                />
            </label>
            <label>
            Department:
                <select 
                    name="department" 
                    value={formState.department || ''} 
                    onChange={handleChange}
                >
                    <option value=''>Select department</option>
                    <option value="Development">Development</option>
                    <option value="Support">Support</option>
                    <option value="Legal">Legal</option>
                </select>
            </label>
            <label>
                Country:
                <select 
                    name="country" 
                    value={formState.country || ''} 
                    onChange={handleChange}
                >
                    <option value=''>Select country</option>
                    <option value="Ireland">Ireland</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                </select>
            </label>
            <label>
                <input type="submit" value="Submit" />
            </label>
        </form>
    );
};

export default SearchForm;
