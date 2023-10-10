import React, { useState } from "react";
//import CryptoJS from "crypto-js";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
//import ButtonGroup from "@mui/material/ButtonGroup";
const Home = () => {
    const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleClick = () => {
    navigate('/Registation'); // Navigate to '/otherpage'
  };
  const handleClickl = () => {
    navigate('/Login'); // Navigate to '/otherpage'
  };
  return (
    <div className="ap">
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
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <h className="bodyhead">A Emi calculator </h>
                </Typography>

                <Button color="inherit" variant="outlined">
                  <h className="bodyhead" onClick={handleClickl}>Login</h>
                </Button>
                <div style={{ marginLeft: 10 }}></div>
                <div className="vl"></div>
                <div style={{ marginLeft: 10 }}></div>
                <Button color="inherit" variant="outlined" onClick={handleClick}>
                  <h className="bodyhead">Register</h>
                </Button>
              </Toolbar>
            </AppBar>
          </div>
        </Box>
      </div>

      
    </div>
  );
};

export default Home;
