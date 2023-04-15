import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setform] = useState({username: '', password: ''});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleInputChange = (e) => {
    // https://reactjs.org/docs/forms.html#handling-multiple-inputs  
    const name = e.target.name;
    const value = e.target.value;
    setform({ ...form, [name]: value });
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (formData) => {
    setLoading(true);
    const {username, password}=formData;
    // console.log(config.endpoint);
    console.log("Result is: ", validateInput(formData))

    if (validateInput(formData)){
    let url = `${config.endpoint}/auth/login`;
    try {
      const res = await axios.post(url, { username,password });
      console.log("Result:",res);
      enqueueSnackbar("Logged in Successsfully", { variant: "success" });
      const { token, balance } = res.data;
      persistLogin(token, username, balance);
      history.push("/");
    } catch (err) {
      if (
        err.response?.status &&
        err.response?.data &&
        err.response.status >= 400 &&
        err.response.status < 500
      ) {
        console.log(err.response.data);
        let msg = err.response.data.message;
        enqueueSnackbar(msg, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
          { variant: "error" }
        );
      }
    }
    setLoading(false);
  }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    // return true;
    const { username, password } = data;
    

    // Check that username field is not empty
    if (username.length===0) {
      enqueueSnackbar(
        "Username is a required field",
        { variant: "error" });
      return false;
    }

    // Check that password field is not empty
    if (password==="") {
      enqueueSnackbar(
        "Password is a required field",
        { variant: "error" });
      return false;
    }

    // If both username and password are present, return true
    return true;
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('balance', balance);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        {loading && <CircularProgress />}
        <Stack spacing={2} className="form">
        <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={(e) => handleInputChange(e)}
          />
          <TextField
            id="password"
            variant="outlined"
            label="password"
            name="password"
            type="password"
            fullWidth
            onChange={(e) => handleInputChange(e)}
          />

          {/* {{loading} ? (
            <CircularProgress color="primary" /> // Show loading icon
          ) : (
            <Button className="button" variant="contained" onClick={()=>login(form)}>
            LOGIN TO QKART
          </Button>
          )} */}


          <Button className="button" variant="contained" onClick={()=>login(form)}>
            LOGIN TO QKART
          </Button>
          <p className="secondary-action">
            Don't have a account?{" "}
            {/* <a className="link" href="#"> */}
            <Link to="/register">Register now</Link>
              {/* Register now
            </a> */}
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
