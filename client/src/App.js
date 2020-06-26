import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import TodoList from './todo/TodoList';
import UserList from './user/UserList';

function App() {
  return (
    <BrowserRouter>
        <RecoilRoot>
            <Switch>
                <Route exact path='/' component={UserList}/>
                <Route path='/todos/:userId' component={TodoList}/>
            </Switch>
        </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
