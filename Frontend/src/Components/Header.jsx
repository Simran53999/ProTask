import React from "react";
import {
    Toolbar,
    MenuItem,
    Badge,
    AppBar,
    Button,
    IconButton,
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

    /*const handleClick = () => {
        props.actions.fetchAllJobs(props.homePage.links.job);
        props.actions.toggleDrawer({
            drawerType: "JOBS",
            drawerSide: "bottom",
        });
    };
  */
    const handleLogout = () => {
        const link = document.createElement("a");
        link.href = `${process.env.REACT_APP_BASE_URL}/atssadoc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (

            <Toolbar position="fixed">
                <div className={classes.flexGrow}>
                {/*  <img src='img/img-2.png' alt='spaceship' width="16%"  />*/}
              <div  className={classes.heading}>
                
                    <text>  ProTask </text>
            
              
              </div>
                </div>
{/*                 <MenuItem>
                    <IconButton className="">
                        <Badge badgeContent={3} color="orange">
                            <Notifications color="#17a2b8" />
                        </Badge>
                    </IconButton>
                </MenuItem> */}
                
                <Link to="/login">
                <Button className={classes.logoutbtn}
                    //color="primary"
                                        children="Log Out"
                    disableElevation
                   // InputProps={{ disableUnderline: true }}
                    //onClick={handleLogout}
                />
                </Link>
            </Toolbar>
 
    );
}