import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import CryptoJS from "crypto-js";
//import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Decript from "./Decript";
import FileBase64 from "react-file-base64";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InputAdornment from "@mui/material/InputAdornment";
import DialogTitle from "@mui/material/DialogTitle";
import PdfViewer from "./pdfviewr";
import { IconButton, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import pako from "pako";
import Slide from "@mui/material/Slide";
import { Image } from "antd";
import { green, red } from "@mui/material/colors";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Mainchat({ socket, username, room }) {
  ////////////////////////////////////
  const [open, setOpen] = React.useState(false);
  const [imagedi, setimage] = React.useState("");
  const handleClickOpen = (kk) => {
    console.log(kk);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  ////////////////////////////////////////
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messageRef = useRef(null);
  const [cipherText, setCipherText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [mess, setDe] = useState("");
  const [compressedPDF, setCompressedPDF] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);

  const [persontyping, settyping] = useState("");

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     if (data.message.length > 100) {
  //     }

  //     setMessageList((list) => [...list, data]);
  //   });
  //   socket.on("rectypeing", (username) => {
  //     settyping(username);
  //     //console.log("typ",username)
  //   });

  //   socket.on("stoprectypeing", (username) => {
  //     settyping("");
  //   });
  // }, [socket]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [kl, set] = useState(null);
  const[issend,setsend]=useState(true);
  useEffect(() => {
    // socket.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   setMessageList((prevMessages) => [...prevMessages, message]);
    // };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if(data.type==="acknowledge"){
        console.log("ack",data)
        if(data.message==="Message received and acknowledged."){
          setsend(true)
        }
      }
      if(data.username==="typeing"){
        console.log("typeing",data)
        if(data.stat===1 &&data.message!==username ){
          settyping(data.message)
        }
        if(data.stat===0){
          settyping("")
        }
        // if(data.message==="Message received and acknowledged."){
        //   setsend(true)
        // }
      }
      if (data.username) {
        if (data.username === "system") {
          // Handle system messages (user join/leave)
          if (data.message) {
            // Update the online users list based on the system message
            setOnlineUsers((prevOnlineUsers) => {
              if (data.message.includes("joined")) {
                return [...prevOnlineUsers, data.message.split(" ")[0]];
              } else if (data.message.includes("left")) {
                return prevOnlineUsers.filter(
                  (user) => user !== data.message.split(" ")[0]
                );
              } else {
                return prevOnlineUsers;
              }
            });
          }
        } 
        else {
          console.log(data);

          // console.log("got", data.message);
          // const uint8Array = new Uint8Array(data.message);
          // set(uint8Array);
          if(data.type!=="acknowledge" && data.username!=="typeing"  && data.username !== "system"){
            setMessageList((prevMessages) => [...prevMessages, data]);
          }
          
        }
      }
    };
  }, [socket]);

  useEffect(() => {
    try{
    if(socket){
      const messageDataa = {
        room: room,
        username: username,
        message: 1,
        time:"username_type"
      };
  
      socket.send(JSON.stringify(messageDataa));
  
      const interval = setInterval(() => {
               const messageDataa = {
            room: room,
            username:username,
            message: 0,
            time:"username_type"
          };
  
          socket.send(JSON.stringify(messageDataa));
      }, 10000);
  
      return () => clearInterval(interval);
      
    }
  }
  catch (error) {

    console.error('An error occurred:', error);
  
  }
  }, [currentMessage]);

  const uniqueItems = [...new Set(messageList.map((item) => item.time))].map(
    (time) => {
      return messageList.find((item) => item.time === time);
    }
  );
  console.log("online", onlineUsers);
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const fileInputRef = useRef(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    setSelectedPDF(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        // The result contains the base64 representation of the image
        // const base64String = reader.result.split(",")[1];
        const base64String = e.target.result;
        setBase64Image(base64String);
        console.log(base64String);
        setCurrentMessage(base64String);
        sendMessage();
      };

      // Read the image as a data URL
      reader.readAsDataURL(file);
    }
  };
  const handleButtonClick = () => {
    // Trigger the hidden file input when the button is clicked
    fileInputRef.current.click();
  };
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [socket, currentMessage, messageList]);

  const sendMessage = async () => {
    setsend(false)
    if (selectedPDF && selectedPDF.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const pdfData = event.target.result;
        const pdfDataArray = new Uint8Array(pdfData);
        const compressedData = pako.gzip(pdfDataArray);
        console.log(pdfDataArray);
        console.log("send");

        const dataArray = Array.from(compressedData);

        const uint8Array = Uint8Array.from(dataArray);
        console.log("data arr", pdfDataArray);
        console.log("uin", uint8Array);
        const messageData = {
          room: room,
          username: username,
          message: dataArray,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes() +
            ":" +
            new Date(Date.now()).getSeconds(),
        };

        socket.send(JSON.stringify(messageData));
        setMessageList((list) => [...list, messageData]);
        console.log(messageData);
        setSelectedPDF(null);
        setCurrentMessage("");

       // setCompressedPDF(compressedData);
      };
      reader.readAsArrayBuffer(selectedPDF);
    } else {
      if (currentMessage !== "") {
        // console.log("as",CryptoJS.AES.encrypt(currentMessage, 'secretKey').toString())
        // if(currentMessage.length>100 ){
        // setDe(currentMessage)
        // }else{
        //   setDe(CryptoJS.AES.encrypt(currentMessage, "secretKey").toString())
        // }

        const messageData = {
          room: room,
          username: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes() +
            ":" +
            new Date(Date.now()).getSeconds(),
        };

        socket.send(JSON.stringify(messageData));
        console.log(messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    }
  };

  return (
    <div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
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
                    <h1 className="bodyhead">People online</h1>
                    <ul>
                      {onlineUsers.map((user) => (
                        <li key={user}>{user}</li>
                      ))}
                    </ul>
                  </center>
                </div>
              </Box>
            </div>
          </div>
          <div class="col-sm-6">
            {" "}
            <div
              style={{
                scrollbehaviour: "smooth",
              }}
            >
              <Box>
                <div>
                  <center>
                    <Box
                      sx={{
                        width: 800,
                        height: 490,
                        //  margin: 4.5,
                        //  marginLeft: 2,
                        borderRadius: 5,
                        border: "red",
                        backgroundColor: "white",
                        opacity: 0.7,
                        "&:hover": {
                          backgroundColor: "white",
                          opacity: 0.89,
                        },
                      }}
                    >
                      <center>
                        {" "}
                        <span>
                          {" "}
                          <h className="bodyhead">Live Chat</h>{" "}
                          
                          <h>
                            {persontyping.length ? (
                              <h style={{ text: "bold", color: "red" }}>
                                {persontyping} is tying
                              </h>
                            ) : (
                              <h></h>
                            )}{" "}
                          </h>
                          <br></br>
                          {issend ===true?<h className="bodyhead" style={{color:"green"}}>Send</h>:<h className="bodyhead" style={{color:"red"}}>sending ....</h>}
                        </span>{" "}
                      </center>
                      <div
                        // style={{
                        //   // Set the width of the div
                        //   height: "380px", // Set the height of the div
                        //   overflow: "auto", // Enable scrolling when the content exceeds the div size
                        //   // Add a border for visual clarity
                        //   // Add padding to the content to prevent it from touching the edges
                        //   borderRadius: 10,
                        // }}
                        ref={messageRef}
                        style={{
                          height: "390px",
                          overflowY: "scroll",
                          border: "1px solid #ccc",
                        }}
                      >
                        {uniqueItems.map((messageContent) => (
                          <div class="container-fluid">
                            <div class="row">
                              <div class="col-sm-6  ">
                                <div class="bgsmcontentl">
                                  {messageContent.username === username ? (
                                    <span>
                                      {" "}
                                      {/* <h>{messageContent.message}</h> */}
                                      <div>
                                        {messageContent.message.length >
                                        1000 ? (
                                          <div>
                                            {/* <img
                                              onClick={handleClickOpen}
                                              alt="imagedsend"
                                              src={`data:image/jpeg;base64,${messageContent.message}`}
                                              style={{
                                                width: 360,
                                                height: 280,
                                              }}
                                            /> */}
                                            {messageContent.message
                                              .slice(0, 50)
                                              .includes("image") ? (
                                              // <embed
                                              //   src={messageContent.message}
                                              //   type="application/pdf"
                                              //   width="100%"
                                              //   height="330px"
                                              // />
                                              <Image
                                                alt="imagedsend"
                                                src={`${messageContent.message}`}
                                                style={{
                                                  width: 360,
                                                  height: 280,
                                                }}
                                              />
                                            ) : (
                                              <PdfViewer
                                                base64Data={
                                                  messageContent.message
                                                }
                                              />
                                            )}

                                            <Dialog
                                              maxWidth={"md"}
                                              open={open}
                                              TransitionComponent={Transition}
                                              keepMounted
                                              onClose={handleClose}
                                              aria-describedby="alert-dialog-slide-description"
                                              style={{
                                                border: "5px solid red",
                                              }}
                                            >
                                              <DialogContentText>
                                                no previous data preview will be
                                                available as node data is stored
                                                in server
                                              </DialogContentText>

                                              <DialogContent>
                                                <div>
                                                  {/* <img
                                                    alt="imagedsend"
                                                    src={`data:image/jpeg;base64,${messageContent.message}`}
                                                    style={{
                                                      width: "100%",
                                                      height: "100%",
                                                    }}
                                                  /> */}
                                                  {messageContent.message
                                                    .slice(0, 50)
                                                    .includes("image") ? (
                                                    // <embed
                                                    //   src={
                                                    //     messageContent.message
                                                    //   }
                                                    //   type="application/pdf"
                                                    //   width="100%"
                                                    //   height="330px"
                                                    // />
                                                    <Image
                                                      alt="imagedsend"
                                                      src={`${messageContent.message}`}
                                                      style={{
                                                        width: 360,
                                                        height: 280,
                                                      }}
                                                    />
                                                  ) : (
                                                    <PdfViewer
                                                      base64Data={
                                                        messageContent.message
                                                      }
                                                    />
                                                  )}
                                                </div>
                                              </DialogContent>
                                            </Dialog>
                                          </div>
                                        ) : (
                                          <h>{messageContent.message}</h>
                                        )}
                                      </div>
                                      {/* <Decript socket={messageContent.message} />  */}
                                      <sub>
                                        <sub1 style={{ color: "white" }}>
                                          {messageContent.username} at{" "}
                                          {messageContent.time}{" "}
                                        </sub1>
                                      </sub>
                                      <sub></sub>
                                    </span>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <br></br>
                              </div>
                              <div class="col-sm-6 ">
                                <div class="bgsmcontentl">
                                  {messageContent.username !== username ? (
                                    <span>
                                      {" "}
                                      <div>
                                        {messageContent.message.length >
                                        1000 ? (
                                          <div>
                                            {/* <img
                                              onClick={handleClickOpen}
                                              alt="imagedsend"
                                              src={`data:image/jpeg;base64,${messageContent.message}`}
                                              style={{
                                                width: 360,
                                                height: 280,
                                              }}
                                            /> */}
                                            {messageContent.message
                                              .slice(0, 50)
                                              .includes("image") ? (
                                              // <embed
                                              //   src={messageContent.message}
                                              //   type="application/pdf"
                                              //   width="100%"
                                              //   height="330px"
                                              // />
                                              <Image
                                                alt="imagedsend"
                                                src={`${messageContent.message}`}
                                                style={{
                                                  width: 360,
                                                  height: 280,
                                                }}
                                              />
                                            ) : (
                                              <PdfViewer
                                                base64Data={
                                                  messageContent.message
                                                }
                                              />
                                            )}
                                            <Dialog
                                              maxWidth={"md"}
                                              open={open}
                                              TransitionComponent={Transition}
                                              keepMounted
                                              onClose={handleClose}
                                              aria-describedby="alert-dialog-slide-description"
                                              style={{
                                                border: "5px solid red",
                                              }}
                                            >
                                              <DialogContentText>
                                                no previous data preview will be
                                                available as node data is stored
                                                in server
                                              </DialogContentText>

                                              <DialogContent>
                                                <div>
                                                  {/* <img
                                                    alt="imagedsend"
                                                    src={`data:image/jpeg;base64,${messageContent.message}`}
                                                    style={{
                                                      width: "100%",
                                                      height: "100%",
                                                    }}
                                                  /> */}
                                                  {messageContent.message
                                                    .slice(0, 50)
                                                    .includes("image") ? (
                                                    // <embed
                                                    //   src={
                                                    //     messageContent.message
                                                    //   }
                                                    //   type="application/pdf"
                                                    //   width="100%"
                                                    //   height="330px"
                                                    // />
                                                    <Image
                                                      alt="imagedsend"
                                                      src={`${messageContent.message}`}
                                                      style={{
                                                        width: 360,
                                                        height: 280,
                                                      }}
                                                    />
                                                  ) : (
                                                    <PdfViewer
                                                      base64Data={
                                                        messageContent.message
                                                      }
                                                    />
                                                  )}
                                                </div>
                                              </DialogContent>
                                            </Dialog>
                                          </div>
                                        ) : (
                                          <h>{messageContent.message}</h>
                                        )}
                                      </div>
                                      {/* <Decript socket={messageContent.message} />  */}
                                      {/* <Decript socket= /> */}
                                      <sub>
                                        <sub1 style={{ color: "white" }}>
                                          {messageContent.username} at{" "}
                                          {messageContent.time}{" "}
                                        </sub1>
                                      </sub>
                                      <sub></sub>
                                    </span>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <br></br>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <center>
                        <div className="chat-footer">
                          <input
                            type="file"
                            // accept=".pdf,image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            style={{ display: "none" }}
                          />
                          <TextField
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  <label
                                    htmlFor="file-input"
                                    className="file-label"
                                  >
                                    <AttachFileIcon
                                      onClick={handleButtonClick}
                                      className="upload-icon"
                                    />
                                  </label>
                                  {/* <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                    /> */}
                                </InputAdornment>
                              ),
                            }}
                            style={{ width: 400 }}
                            id="outlined-basic"
                            label="Message"
                            variant="outlined"
                            type="text"
                            value={
                              currentMessage.length > 1000
                                ? "click send "
                                : currentMessage
                            }
                            placeholder="Hey..."
                            onChange={(event) => {
                              setCurrentMessage(event.target.value);
                            }}
                            onKeyPress={(event) => {
                              event.key === "Enter" && sendMessage();
                            }}
                            //
                          ></TextField>

                          {/* <FileBase64 type="file" multiple={false} onDone={handlePdfUpload} /> */}
                          <Button
                            variant="outlined"
                            style={{ height: 55 }}
                            onClick={sendMessage}
                          >
                            &#9658;
                          </Button>
                          <br></br>
                          {/* <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
      
        onChange={handleImageChange}
      /> */}
                        </div>
                      </center>
                    </Box>
                  </center>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainchat;
