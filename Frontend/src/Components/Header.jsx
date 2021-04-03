import React from "react";
import {
    Toolbar,
    MenuItem,
    Badge,
    AppBar,
    Button,
    IconButton,
    Tabs,
    Tab,
    Typography,
    colors
} from "@material-ui/core";
import { Notifications } from "@material-ui/icons";
import logo from '../Utils/logo.png'
//import DownloadIcon from "@material-ui/icons/GetApp";
import * as useStyles from "../styles/homePageStyles";
import {Link, withRouter} from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
//import './Header.css';
//import './Login.css';
//import "./Components/Signup/FormSign.css";
//import Formlogin from "./Components/Signup/Formlogin";

export default function Header(props) {
    const classes = useStyles.headerUseStyles();

    const appBarTheme = createMuiTheme({
      /*  palette:{
            primary:{
            backgroundColor:"transparent"
            }
        }, */
        
        shadows:["none"],
        typography:{
            fontFamily: "Poppins",
            justifyContent:"space-between",
            textAlign:"space-between"
 //           fontSize:"2rem"
        },
        overrides:{
            MuiTabs:{
                root:{
                    width:"60%",
                    display:"flex",
                    //marginRight:"5%"
                },
                indicator:{
                    backgroundColor:"white",
                    height: "2px",
                    top:"90%",
                    outline:"none"
                    //width:"10px"
                },
                flexContainer:{
                    display:"flex",
                    justifyContent:"space-around",
                    width:"100%"
                }
                
            },
            MuiTab:{
                root:{
                    
                    textTransform:"none",
                    fontSize:"2vw",
                    textAlign:"center",
                    '&:focus':{
                      outline:"none",  
                    },
                    //color:"rgb(255, 255, 255)",
                    //textColorPrimary:"rgb(255, 255, 255)"
                },
                textColorInherit:{
                    //opacity:"3"
                }

            },
            MuiAppBar:{
                spacing:15,
                root:{
                   // height:"22%",
                },
                colorPrimary:{
                    color:"white",
                    backgroundColor:"transparent"
                },
                
            },
            MuiToolbar:{
                root:{
                    width: "90%",
                    display:"flex",
                    justifyContent:"space-around",
                    //variant: "dense"
                },
                disableGutters:["false"]
            }
/*             MuiPaper:{
                elevation4:{
                    boxShadow="none"
                }
            } */
        
        }

      })

      const [selectedTab, setSelectedTab] = React.useState(0);

      const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
      };

    return (
        <MuiThemeProvider theme={appBarTheme}>
            <AppBar position="static" >
                <Toolbar >
                    <div style={{width:"20%",display:"flex"}}>
                        <img src={logo} alt="Logo" style={{width:"25%",height:"auto",paddingBottom:"5%"}} />
                        <text style={{paddingLeft:"5%",fontSize:"3.5vw"}}>ProTask</text>
                    </div>
                    
                    <Tabs value={selectedTab} onChange={handleChange}>
                        <Tab  
                            label="DashBoard"
                            style={{minWidth:"20px"}}
                            onClick={()=>props.setTab("dashboardTask")} 
                        />
                        <Tab 
                            label="My Task"
                            style={{minWidth:"20px"}}
                            onClick={()=>props.setTab("myTask")} 
                        />
                        <Tab 
                            label="Assign Task" 
                            style={{minWidth:"20px"}}
                            onClick={()=> props.setTab("assignTask")} 
                        />
                    </Tabs>
                
                    <Link to="/">
                        <Button className={classes.logoutbtn}
                            children="Log Out"
                            disableElevation
                        />
                    </Link>
                </Toolbar>
            </AppBar>
        </MuiThemeProvider>
    );
}