import { colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BorderBottom, FormatUnderlined } from "@material-ui/icons";

export const headerUseStyles = makeStyles((theme) => ({
    flexGrow: {
        //flexGrow: 5,
        //backgroundColor:"transparent",
    },
    logoutbtn:{
        color: "white",
        backgroundColor: "#17a2b8",
        transition: "all 0.3s ease",
        cursor: "pointer",
        width:"7vw",
        //border: "0px solid #f2f5f7",
        //backgroundColor: "#17a2b8",
        //color: "white",
        //fontSize: "1.2rem",
        fontFamily: "Poppins ",
        fontWeight: "bold",
        fontSize:"1vw",
        borderBottom:"none",
        '&:hover' :{
            backgroundColor: "#ff6f47",
            color: "white",
            borderBottom:"transparent",
        },
        '&:label': {
            textTransform: 'capitalize',
          }
    },
goBackToTaskBtn:{
  color: "white",
  backgroundColor: "#17a2b8",
  transition: "all 0.3s ease",
  cursor: "pointer",
  width:"6vw",
  //border: "0px solid #f2f5f7",
  //backgroundColor: "#17a2b8",
  //color: "white",
  //fontSize: "1.2rem",
  fontFamily: "Poppins ",
  fontWeight: "bold",
  fontSize:"1vw",
  borderBottom:"none",
  marginTop:"1%",
  marginLeft:"90%",
  '&:hover' :{
      backgroundColor: "#ff6f47",
      color: "white",
      borderBottom:"transparent",
  },
  '&:label': {
      textTransform: 'capitalize',
    }
},
    heading:{
        fontSize: "3.5vw",
        minHeight: "4vh",
        display: "flex",
        //alignItems: "center",
        //paddingLeft: "82vh",
        //marginRight:"50px",
        position:"relative",
        right:"20%",
        color: "rgb(255, 255, 255)",
        fontFamily: "Poppins ",
        fontWeight: "bold",
        '&:label':{
          fontWeight: "bold",
          fontSize: "4rem"
        }
    },
   /*  tabLabel:{
      fontSize:"2rem",
      color:"rgb(255, 255, 255)"
    } */
/*     logoutbtn: {
        animation: "hover",
        backgroundColor: "#ff6f47",
        color: "white"
      }, */
    /* formlogoutbtn: {
        width: "80%",
        height: "50px",
        marginTop: "15px",
        borderRadius: "2px",
        background: "linear-gradient(
          90deg,
          rgb(39, 176, 255) 0%,
          rgb(0, 232, 236) 100%
        )",
        outline: "none",
        border: "none",
        color: "#fff",
        fontSize: "1.52rem"
      }
      
      .form-input-btn:hover {
        cursor: pointer;
        background: linear-gradient(
          90deg,
          rgb(39, 143, 255) 0%,
          rgb(12, 99, 250) 100%
        );
        transition: all 0.4s ease-out;
      } */
    
}));
export const MainContainerStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    grid: {
        height: "100vh",
    },
    paperTop: {
        height: "64px",
       //borderBottom: "1px solid orange",
    },
    navBar:{
     width:"60% ",
     backgroundColor:"transparent",
     //height:"50px",
     padding :"10px"

    }
}));

export const AppBarStyles = makeStyles((theme) => ({
  backgroundColor:{

  }
}));