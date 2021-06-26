import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import './App.css'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Users from './components/Users'

function App() {
  return (


    <div className="app-container bg-light">
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute exact path="/users/add" component={Users} />
          <PrivateRoute exact path="/users/edit/:id" component={Users} />
          <Redirect from="*" to="/home" />
        </Switch>
    </div>



  );
}

export default App;
