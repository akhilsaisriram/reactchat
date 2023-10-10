import { useDispatch, useSelector } from "react-redux";
import { authaction } from "../reduxstore/store";
import "../App.css";
import Snackbar from "@mui/material/Snackbar";

import React, { useState } from "react";
//import CryptoJS from "crypto-js";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import { orange } from "@mui/material/colors";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Chat = () => {
  const data = useSelector((state) => state.token);

  const [openale, setOpenale] = React.useState(false);

  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  ///////////////////////////////////////////////////////////////////
  const [sdata, ssetdata] = useState({
    amt: "",
    int: "",
    per: "",
  });

  console.log(sdata);
  const { amt, int, per } = { ...sdata };
  const chanfehandler = (e) => {
    ssetdata({ ...sdata, [e.target.name]: e.target.value });
  };
  const [passchange, setchange] = useState(false);
  const handleClickl = () => {
    setchange(true);
  };
  const handleClick22 = () => {
    setchange(false);
  };
  const handleClick = () => {
    //navigate('/Registation'); // Navigate to '/otherpage'

    axios
      .post("http://localhost:5000/changespass", {
        id: sessionStorage.getItem("uid"),
        pass: amt + int + per,
      })
      .then((res) => {
        setchange(false);
        setOpenale(true);
      });
  };

  //////////////////////////////////////////////////////////////
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenale(false);
  };
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;


  /////////////////////////////////////////////////
  const openchatpage =()=>{
    navigate("/chatpage")
  }
  return (
    <>
      <div className="chathome">
        <Snackbar
          open={openale}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            <h className=""> The Spasscode is updated sucessfully</h>
          </Alert>
        </Snackbar>
        <Box sx={{ flexGrow: 1 }}>
          <div>
            <AppBar
              position="static"
              style={{
                backgroundColor: isHover
                  ? "rgba(255, 0, 0, 0.35)"
                  : "rgba(159, 90, 253, 0)",
              }}
              sx={{
                position: "absolute",
                zindex: 1,
                borderRadius: 5,

                top: 0,
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <center>
                    {" "}
                    <h className="bodyhead">A Secure Chat application </h>
                  </center>
                </Typography>

                <Button color="inherit" variant="outlined">
                  <h className="bodyhead" onClick={handleClickl}>
                    Change password
                  </h>
                </Button>
                {/* <div style={{ marginLeft: 10 }}></div>
            <div className="vl"></div>
            <div style={{ marginLeft: 10 }}></div>
            <Button color="inherit" variant="outlined" onClick={handleClick}>
              <h className="bodyhead">Register</h>
            </Button> */}
              </Toolbar>
            </AppBar>
          </div>
        </Box>
        <br></br>
        <br></br>
        <br></br>
        {passchange ? (
          <div
            className="col-sm-16"
            style={{
              borderRadius: 16,
              margin: 0,
              marginTop: 0,
              marginLeft: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <Box>
              <br></br>
              <center>
                <TextField
                  onChange={chanfehandler}
                  name="amt"
                  value={amt}
                  id="outlined-basic"
                  label="Loan Amount"
                  variant="outlined"
                  color="secondary"
                />
                <TextField
                  onChange={chanfehandler}
                  name="int"
                  value={int}
                  id="outlined-basic"
                  label="Interest %"
                  variant="outlined"
                  color="secondary"
                />
                <TextField
                  onChange={chanfehandler}
                  name="per"
                  value={per}
                  id="outlined-basic"
                  label="Period in months"
                  variant="outlined"
                  color="secondary"
                />

                <Button variant="outlined" style={{ marginTop: 10 }}>
                  <h className="bodyhead" onClick={handleClick}>
                    Conform
                  </h>
                </Button>
                <Button variant="outlined" style={{ marginTop: 10 }}>
                  <h className="bodyhead" onClick={handleClick22}>
                    Close
                  </h>
                </Button>
                <br></br>
              </center>
              <br></br>
            </Box>
          </div>
        ) : (
          <h></h>
        )}

        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-4">
              <Box
                sx={{
                  height: 550,
                  //  margin: 4.5,
                  //  marginLeft: 2,
                  borderRadius: 5,
                  border: "red",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  opacity: 0.95,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0,0.6)",
                    opacity: 0.99,
                    boxShadow: "2px 3px 10px #F4AAB9",
                  },
                }}
              >
                <br></br>
                <div class="col-sm-15 bg-white" style={{ borderRadius: 10 }}>
                  <center>
                    <h1 className="bodyhead "> WEB socket chat</h1>
                  </center>
                </div>
                <br></br>
                <br></br>
                <div class="col-sm-15 text-white" style={{ borderRadius: 10 }}>
                  <center>
                    <h className="cursivefont ">
                      IN this chat application the security of the user in taken
                      utmost priority in terms of security features and messages
                      are encrypted and the chat is taken with auto generated
                      ids no data is stored in any server or database 
                    </h>
                    <br></br>
                    <br></br>
                    <h style={{color:"orange"}}>note:</h> <h style={{color:"red"}}>The both (many) user should login to chat with same id of your own and both should be online to chat as no database is connected chat history won`t be present` </h>
                    <br></br>
                    <br></br>
                    <Button variant="outlined" class="bgsb" >
                  <h className="bodyhead" onClick={openchatpage}>
                    Chat
                  </h>
                </Button>
                  </center>
                </div>
              </Box>
            </div>
            <div class="col-sm-4">
              <Box
                sx={{
                  height: 550,
                  //  margin: 4.5,
                  //  marginLeft: 2,
                  borderRadius: 5,
                  border: "red",
                  backgroundColor: "white",
                  opacity: 0.55,
                  "&:hover": {
                    backgroundColor: "white",
                    opacity: 0.89,
                  },
                }}
              >
                sdj
              </Box>
            </div>
            <div class="col-sm-4">
              <Box
                sx={{
                  height: 550,
                  //  margin: 4.5,
                  //  marginLeft: 2,
                  borderRadius: 5,
                  border: "red",
                  backgroundColor: "white",
                  opacity: 0.55,
                  "&:hover": {
                    backgroundColor: "white",
                    opacity: 0.89,
                  },
                }}
              >
                sdj
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
