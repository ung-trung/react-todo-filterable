import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import history from './history';

import NavBar from './components/layouts/NavBar';
import TodayNotification from './components/layouts/TodayNotification';

import Home from './components/pages/Home';
import About from './components/pages/About';
import AddTodo from './components/pages/AddTodo';
import EditTodo from './components/pages/EditTodo';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import setAuthToken from './components/utils/setAuthToken';

setAuthToken(localStorage.token);

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <NavBar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/addTodo" exact component={AddTodo} />
          <Route path="/editTodo/:id" exact component={EditTodo} />
          <Route path="/signup" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>

      <TodayNotification />
    </Provider>
  );
}

export default App;
