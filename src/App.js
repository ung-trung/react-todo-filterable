import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/routing/PrivateRoute'
import { Provider } from 'react-redux'
import store from './store'

import NavBar from './components/layouts/NavBar'
import TodayNotification from './components/layouts/TodayNotification'

import Home from './components/pages/Home'
import About from './components/pages/About'
import AddTodo from './components/pages/AddTodo'
import EditTodo from './components/pages/EditTodo'
import Register from './components/pages/Register'
import Login from './components/pages/Login'

import setAuthToken from './components/utils/setAuthToken'

setAuthToken(localStorage.token)

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />

        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <PrivateRoute path="/addTodo" exact component={AddTodo} />
          <PrivateRoute path="/editTodo/:id" exact component={EditTodo} />
          <Route path="/signup" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>

      <TodayNotification />
    </Provider>
  )
}

export default App
