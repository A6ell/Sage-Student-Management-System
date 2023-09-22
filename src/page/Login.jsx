import React, { useState } from "react";
import Axios from "axios";

import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from "@mui/material/TextField";
import { BASE_API_URL } from "../constants/url";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./../hook/useAuthcontext";
import { useStore } from './../hook/Typezustand';

// ...
const Login = ({ handleClose }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {dispatch,user} = useAuthContext();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: 'rgb(254, 203, 35)',
      },
      secondary: {
        main: '#999',
      },
      text: {
        primary: '#fff',
        secondary: '#ccc',
        disabled: '#888',
        hint: '#555',
      },
      background: {
        paper: '#333',
        default: '#222',
      },
    },
  });
  
  

  const onSubmit = () => {
    if (email === "" || password === "") {
      setError("Please provide all fields");
    } else {
      setError("");

      setLoading(true);

      const data = { email, password };

      Axios.post(BASE_API_URL + "/user/login", data)
        .then((result) => {
          setLoading(false);

          const token = JSON.stringify(result.data.token);
          const type = JSON.stringify(result.data.type);
         
          // console.log(result.data.type)
          
          localStorage.setItem("user",token);
          localStorage.setItem("type",type);
          
          
          dispatch({type:'LOGIN' , payload: token})
          setLoading(false);
          
          navigate("/registrar");
          useStore.setState((state) => ({
            responseData: result.data.type,
          }));

          // if (result.data.type === "student") {
          //   navigate("/student");
          // } else if (result.data.type === "registrar") {
          //   navigate("/registrar");
          // } else if (result.data.type === "teacher") {
          //   navigate("/teacher");
          // }

        })
        .catch((error) => {
          setLoading(false);
          setError("Failed to login");
        });
    }
    
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    
    <div style={{ display: "flex", flexDirection: "column",borderRadius: '15px',  backgroundColor: '#222', alignItems: "center", maxWidth: 400 ,height:400 , padding: "20px" }} className="login-wrapper">
      <div className="row">
        {error !== "" && (
          <div className="col-12">
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </div>
        )}

        <div className="col-12 text-center mb-4">
        <h4 style={{ color: '#fff' }}>Welcome Back</h4>
        </div>
        <div className="col-12 mb-4">
          <TextField
            type="email"
            label="Email"
            variant="filled"
            fullWidth={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off" // Add this line to disable autofill for email
          />
        </div>

        <div className="col mb-4">
          <TextField
            type="password"
            label="Password"
            variant="filled"
            fullWidth={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="col-12 mb-4 text-center">
          <LoadingButton
            variant="contained"
            onClick={() => onSubmit()}
            loading={loading}
          >
            Login
          </LoadingButton>
        </div>
        {/* <Button onClick={handleClose} color="primary">
        Close
      </Button> */}
      </div>
      
    </div>
    </ThemeProvider>
  );
};

export default Login;
