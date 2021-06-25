import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg'
import './App.css'
import Nav from './components/Nav'
import {Alert} from './components/Alert'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Users from './components/Users'

function App() {
  const pathname="localhost:3000/"
  return (
    <div className="app-container bg-light">
      <Nav/>
      <Alert />
      <div className="container pt-4 pb-4">
        <Switch>
        <Route exact path="/login" component={LoginPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/users/add" component={Users} />
          <Route exact path="/users/edit/:id" component={Users} />
          <Redirect from="*" to="/home" />
        </Switch>
      </div>
    </div>



  );
}

export default App;
