import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import history from './history';

import NavBar from './components/layouts/NavBar';

import Home from './components/pages/Home';
import About from './components/pages/About';
import AddTodo from './components/pages/AddTodo';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <NavBar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/addTodo" exact component={AddTodo} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
