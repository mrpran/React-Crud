import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home'
import Users from './components/Users'

function App() {
  return (
    <div className="app-container bg-light">
      <Nav/>
      <div className="container pt-4 pb-4">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </div>



  );
}

export default App;
