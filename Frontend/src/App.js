import React, { useState, useEffect } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
useHistory
} from "react-router-dom";
import Formlogin from "./Components/Signup/Formlogin";
import SignUp from './Components/Signup/FormSignup';
import Task from "./Components/Task2";
import Landing from "./Components/Landing/Landing"
import SubTask from "./Components/SubTask";
import Temp from "./Components/Temp";

function App() {
  
return (
    <div>
      <Router basename="/protask">
        <Switch>
          <Route path="/protask/:id/:username" component={Task}/>
          <Route path ="/:id/:taskName" exact={true} component={Temp}/>
          <Route path="/login"><Formlogin/></Route>
          <Route path="/signup"><SignUp/></Route>
          <Route path="/"><Landing/></Route>
        </Switch>
      </Router>
    </div>
  );
}


export default (App);