import React from "react";
import {
    Toolbar,
    MenuItem,
    Badge,
    AppBar,
    Button,
    IconButton,
    Tabs,
    Tab
} from "@material-ui/core";
import { Notifications } from "@material-ui/icons";
//import logo_atssa from "../assets/atssa_logo.svg";
//import DownloadIcon from "@material-ui/icons/GetApp";
import * as useStyles from "../styles/homePageStyles";
import {Link, withRouter} from 'react-router-dom';
import './Header.css';
//import './Login.css';
//import "./Components/Signup/FormSign.css";
//import Formlogin from "./Components/Signup/Formlogin";

export default function Header(props) {
  const classes = useStyles.headerUseStyles();
  return (
    <div>
      <AppBar 
        style={{minHeight:"10vh", background: "#ffa340"}} 
        className='appbar'
      >
        <Toolbar>
          <div className={classes.heading}>
            <h1>ProTask</h1>
          </div>
     
          <Tab 
            label="DashBoard" 
            className="tab-text"
            onClick={()=>props.setTab("dashboardTask")} 
          />
          <Tab 
            label="My Task"
            className="tab-text"
            onClick={()=>props.setTab("myTask")} 
          />
          <Tab 
            label="Assign Task" 
            className="tab-text"
            onClick={()=> props.setTab("assignTask")} 
          />
          
          <Link to="/">
            <Button 
              className={classes.logoutbtn}
              children="Log Out"
              className="tab-text"
              disableElevation
            />
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}