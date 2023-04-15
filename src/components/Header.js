import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import { useHistory} from "react-router-dom";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {

  const history = useHistory();

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, call an API to log out the user
    console.log("Logged out");
    // Clear the user's login status in local storage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('balance');
    history.push("/");
    window.location.reload();
  }

  const username = localStorage.getItem('username');
  

   

    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
        >
          Back to explore
        </Button>
        ):(
          username ? (<Stack direction="row" spacing={1} alignItems="center">
          <Avatar alt={username} src="avatar.png" />
          <p>{username}</p>
          {/* <p>{username.charAt(0).toUpperCase() + username.slice(1)}</p> */}
          <Button onClick={handleLogout} variant="text">LOGOUT</Button>
        </Stack>):(<Stack direction="row" spacing={1} alignItems="center">
        <Button onClick={() => history.push("/login")}  variant="text">LOGIN</Button>
        <Button onClick={()=>history.push("/register")} variant="contained">REGISTER</Button>
      </Stack>)
        
        
        )} 
        
        
      </Box>
    );
};

export default Header;
