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
        //border: "0px solid #f2f5f7",
        //backgroundColor: "#17a2b8",
        //color: "white",
        //fontSize: "1.2rem",
        fontFamily: "Poppins ",
        fontWeight: "bold",
        borderBottom:"none",
        '&:hover' :{
            backgroundColor: "#ff6f47",
            color: "white",
            borderBottomColor:"transparent"
        },
        '&:label': {
            textTransform: 'capitalize',
          }
    },
    heading:{
        fontSize: "4rem",
        minHeight: "4vh",
        display: "flex",
        alignItems: "center",
        //paddingLeft: "82vh",
        color: "rgb(255, 255, 255)",
        fontFamily: "Poppins ",
        fontWeight: "bold",
    }
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
       // borderBottom: "1px solid orange",
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