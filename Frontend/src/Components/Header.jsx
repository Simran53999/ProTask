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
//import './Login.css';
//import "./Components/Signup/FormSign.css";
//import Formlogin from "./Components/Signup/Formlogin";

export default function Header(props) {
    const classes = useStyles.headerUseStyles();

    return (
            <AppBar position="fixed">
                <Toolbar>
                {/*  <img src='img/img-2.png' alt='spaceship' width="16%"  />*/}
                  <div  className={classes.heading}>
                    <text>  ProTask </text>
              </div>
             
          <Tab label="DashBoard" 
          onClick={()=>props.setTab("dashboardTask")} />
          <Tab label="My Task"
          onClick={()=>props.setTab("myTask")} />
          <Tab label="Assign Task" 
          onClick={()=> props.setTab("assignTask")} />
                <Link to="/login">
                <Button className={classes.logoutbtn}
                    children="Log Out"
                    disableElevation
                   // InputProps={{ disableUnderline: true }}
                    //onClick={handleLogout}
                />
                </Link>
                </Toolbar>
            </AppBar>
    );
}