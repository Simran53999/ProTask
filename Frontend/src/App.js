import React, { useState, useEffect } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import Formlogin from "./Components/Signup/Formlogin";
import SignUp from './Components/Signup/FormSignup';
import Task from "./Components/Task";

function App(props) {
  
console.log(props.task)
return (
    <div>
      <Router basename="/protask">
        <Switch>
          <Route path="/protask/:id/:username" component={Task}/>
          <Route path="/login"><Formlogin/></Route>
          <Route path="/"><SignUp/></Route>
        </Switch>
      </Router>
    </div>
  );
}


export default (App);