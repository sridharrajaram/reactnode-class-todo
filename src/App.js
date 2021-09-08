import './App.css';
import Task from './Task';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Register from './Register';
import Login from './Login';

function App() {

  return (

    <Router>
      <Switch>
        <Route path="/" component={Login} exact={true}></Route>
        <Route path="/login" component={Login} exact={true}></Route>
        <Route path="/register" component={Register} exact={true}></Route>
        <Route path="/todo-list" component={Task} exact={true}></Route>
      </Switch>
    </Router>

  );
}


export default App;