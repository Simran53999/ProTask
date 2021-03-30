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
//import logo_atssa from "../assets/atssa_logo.svg";
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
                    //width:"150%",
                    //marginRight:"5%"
                },
                indicator:{
                    backgroundColor:"white",
                    height: "2px",
                    top:"59px",
                    //width:"10px"
                },
                flexContainer:{
                    display:"flex",
                    paddingRight:"20%"
                }
                
            },
            MuiTab:{
                root:{
                    textTransform:"none",
                    fontSize:"2.3rem",
                    marginRight:"5%"
                    //color:"rgb(255, 255, 255)",
                    //textColorPrimary:"rgb(255, 255, 255)"
                } ,
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
                    display:"flex",
                    justifyContent:"space-evenly",
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
                {/*  <img src='img/img-2.png' alt='spaceship' width="16%"  />*/}
                  <div className={classes.heading} >
                    <text>  ProTask </text>
                    </div> 
                    <Tabs  value={selectedTab} onChange={handleChange}>
          <Tab  label={<span style={{ color: 'rgb(255, 255, 255)' }}>Dashboard</span>}
          onClick={()=>props.setTab("dashboardTask")} />
          <Tab label="My Task"
          onClick={()=>props.setTab("myTask")} />
          <Tab label="Assign Task" 
          onClick={()=> props.setTab("assignTask")} />
                </Tabs>
{/*                 <MenuItem>
                    <IconButton className="">
                        <Badge badgeContent={3} color="orange">
                            <Notifications color="#17a2b8" />
                        </Badge>
                    </IconButton>
                </MenuItem> */}
                
                <Link to="/">
                <Button className={classes.logoutbtn}
                    children="Log Out"
                    disableElevation
                   // InputProps={{ disableUnderline: true }}
                    //onClick={handleLogout}
                />
                </Link>
            </Toolbar>
            </AppBar>
            </MuiThemeProvider>
    );
//   const classes = useStyles.headerUseStyles();
//   return (
//     <div>
//       <AppBar 
//         style={{minHeight:"10vh", background: "#ffa340"}} 
//         className='appbar'
//       >
//         <Toolbar>
//           <div className={classes.heading}>
//             <h1>ProTask</h1>
//           </div>
     
//           <Tab 
//             label="DashBoard" 
//             className="tab-text"
//             onClick={()=>props.setTab("dashboardTask")} 
//           />
//           <Tab 
//             label="My Task"
//             className="tab-text"
//             onClick={()=>props.setTab("myTask")} 
//           />
//           <Tab 
//             label="Assign Task" 
//             className="tab-text"
//             onClick={()=> props.setTab("assignTask")} 
//           />
          
//           <Link to="/">
//             <Button 
//               className={classes.logoutbtn}
//               children="Log Out"
//               className="tab-text"
//               disableElevation
//             />
//           </Link>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
}