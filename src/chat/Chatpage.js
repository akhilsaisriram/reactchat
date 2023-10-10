import React, { useState,useEffect } from "react";
import axios from "axios";
//import CryptoJS from "crypto-js";
import "../App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import io from "socket.io-client";
import Mainchat from "./Mainchat";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from "@mui/material/colors";
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import LinearProgress from '@mui/material/LinearProgress';

//const socket = io.connect("http://localhost:5000");

//import ButtonGroup from "@mui/material/ButtonGroup";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Chatpage = () => {


  /////////////////////////////////////////////
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  ////////////////////////////////////////
  const navigate = useNavigate();
  const [room_name, setroom] = useState("");
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };


  const handleClickl = () => {
    navigate("/Registation/Login/Dashbord/Chat"); // Navigate to '/otherpage'
  };

// const [data,setdata]=useState([])
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/myprofile", {
//         headers: {
//           "x-token": sessionStorage.getItem("token"),
//         },
//       })
//       .then((res) => {setdata(res.data);
//         setUsername(res.data.name)      
//     })

//     },[])


    const [dataa,setdataa]=useState([])
    useEffect(() => {
      axios.post('http://127.0.0.1:8000/api/user',{token:sessionStorage.getItem("token")})
          .then((res) => {setdataa(res.data);
            setUsername(res.data.name) ;
          if(res.data==="User not found" || res.data==="Invalid credentials"){
          }
          
        })

        },[])
  /////////////////////////////////////////////////////////////////////////////////////////////
  
  const [username, setUsername] = useState("");
  const [chatwith, setUsername11] = useState("");
  const [showChat, setShowChat] = useState(false);

  const [key, setKey] = useState(false);
  const [kk, setKeyk] = useState(false);
  const[socket,setso]=useState({});
  const joinRoom = () => {
    if (username !== "" && room_name !== "") {
        console.log("ok");
         setKeyk(true)
        const socketa = new WebSocket(`ws://localhost:8000/ws/${room_name}/${username}/`);
        socketa.onopen = function (event) {
          setKey(event.isTrusted)
          console.log('WebSocket connection established:', event);
          // Handle acknowledgment message here
      };
   
        setso(socketa);
      setShowChat(true);
    }
  };
  const [onlineUsers, setOnlineUsers] = useState([]);

  console.log("online",onlineUsers)

  return (
    <div class="mainchatbg">
      
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <div>
            <AppBar
              position="static"
              style={{
                backgroundColor: isHover
                  ? "rgba(159, 90, 253, 0.25)"
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
                </IconButton>   <h className="bodyhead">Hi {username} </h>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             
                  <center>
                    <h className="bodyhead">The Chat Window </h>
                    {key===true?<div><h style={{color:"green"}}>Connected<CheckCircleIcon/> </h><h>id :{room_name}</h></div>:<h style={{color:"red"}}></h>}
                    
                  </center>
                </Typography>
                 
                <Button color="inherit" variant="outlined">
                  <h className="bodyhead" onClick={handleClickl}>
                    Back
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
      </div>
      <br></br> <br></br>
      <hr></hr>
      {key===false? <div
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
          
          <hr></hr>
          {kk===true?<div> <LinearProgress color="secondary" /></div>:<h></h>}
          <center>
            
            <TextField
              onChange={(e) => setroom(e.target.value)}
              name="room"
              value={room_name}
              id="outlined-basic"
              label="Chat id"
              variant="outlined"
              color="secondary"
            />

            <Button variant="outlined" style={{ marginTop: 10 }}>
              <h className="bodyhead" onClick={joinRoom}>
                <SendIcon/>
              </h>
            </Button>
           
            
            {key===true?<h style={{color:"green"}}>Connected<CheckCircleIcon/></h>:<h style={{color:"red"}}>NOt connected<CancelIcon/></h>}
            
          </center>
          <hr></hr>
        </Box>
      </div> :<h></h>}
      <div class="container-fluid">
        <div class="row">
          {/* <div class="col-sm-4">
            <div
              style={{
                scrollbehaviour: "smooth",
              }}
            >
              <Box
                sx={{
                  height: 370,
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
                <div
                  style={{
                    // Set the width of the div
                    height: "420px", // Set the height of the div
                    overflow: "auto", // Enable scrolling when the content exceeds the div size
                    // Add a border for visual clarity
                    // Add padding to the content to prevent it from touching the edges
                    borderRadius: 10,
                  }}
                >
                  <center>
                    <h1 className="bodyhead" >
                      People online
                    </h1>

                  </center>
                </div>
              </Box>
            </div>
          </div> */}
          <div class="col-sm-7">
            {" "}
            <div
              style={{
                scrollbehaviour: "smooth",
              }}
            >
              <Box
               
              >
                <div

                >
                  <center>

                 
                  </center>
                  <Mainchat socket={socket} username={username} room={room_name} />
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
