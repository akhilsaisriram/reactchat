import React, { useState } from "react";
import "../App.css";
//import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
//import FilledInput from "@mui/material/FilledInput";
//import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
//import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registation = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [alertm, setslertm] = useState("Something went wrong");
  const [showalert, setshowalert] = useState(false);
  const [name, setname] = useState("");
  const [username, setusernamename] = useState("");
  const [pass, setpass] = useState("");
  const [phone, setphone] = useState("");

  const onsub = (e) => {
    e.preventDefault();
    console.log("h", name);
    if (name.trim().length === 0) {
      setslertm("Invalid name");
      setshowalert(true);
    } else {
      setshowalert(false);
    }

    if (username.trim().length === 0) {
      setslertm("Invalid username");
      setshowalert(true);
    }

    if (pass.trim().length === 0) {
      setslertm("Invalid password");
      setshowalert(true);
    }

    if (phone.trim().length !== 10) {
      setslertm("Invalid phone number");
      setshowalert(true);
    }

    axios.post('http://127.0.0.1:8000/api/register',{name,email:username,password:pass,phone,spass:phone}).then(
      (res)=>{

  setslertm("User Already Exist");
      setshowalert(true);
          if(res.data!=="User Already Exist"){navigate('./Login')}
          
      
      }
     );
    
  };

  return (
    <div className="reg">
      {showalert ? (
        <Alert key="warning" variant="warning">
          <h5 className="bodyhead" style={{ color: "black" }}>
            {alertm}
          </h5>
        </Alert>
      ) : (
        <h></h>
      )}

      <div class="container">
        <div class="row">
          <div class="col"></div>
          <div class="col-4"></div>
          <div class="col-7 float-end">
            <div class="container">
              <div class="col" style={{ marginTop: 90 }}>
                <div class="col-sm-20  bg-black" style={{ borderRadius: 10 }}>
                  <center>
                    <h2 className="bodyhead" style={{ color: "white" }}>
                      Sign up
                    </h2>
                  </center>
                  <hr></hr>
                </div>
                <div class="col-6">
                  <center>
                    <TextField
                      required
                      color="secondary"
                      id="outlined-basic"
                      label="Full name"
                      variant="outlined"
                      value={name}
                      onChange={(event) => {
                        setname(event.target.value);
                      }}
                      style={{ marginLeft: 150, width: 350 }}
                    />
                    <br></br> <br></br>
                    <TextField
                      required
                      color="secondary"
                      id="outlined-basic"
                      label="username"
                      variant="outlined"
                      value={username}
                      onChange={(event) => {
                        setusernamename(event.target.value);
                      }}
                      style={{ marginLeft: 150, width: 350 }}
                    />
                    <br></br> <br></br>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="standard"
                    >
                      <InputLabel
                        htmlFor="standard-adornment-password"
                        style={{ marginLeft: 100 }}
                        color="secondary"
                      >
                        Password
                      </InputLabel>
                      <Input
                        value={pass}
                        onChange={(event) => {
                          setpass(event.target.value);
                        }}
                        style={{ marginLeft: 100, width: 350 }}
                        color="secondary"
                        id="standard-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <br></br> <br></br>
                    <TextField
                      required
                      color="secondary"
                      id="outlined-basic"
                      label="Phone number"
                      variant="outlined"
                      value={phone}
                      onChange={(event) => {
                        setphone(event.target.value);
                      }}
                      style={{ marginLeft: 150, width: 350 }}
                    />
                    <br></br>
                    <br></br>
                    <br></br>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: 150, width: 350 }}
                      onClick={onsub}
                    >
                      {" "}
                      <h style={{ color: "white" }}>Create</h>{" "}
                    </Button>
                    <br></br> <br></br>
                    <Link style={{ marginLeft: 300 }} to='/Login'>Login</Link>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registation;
