import React, { useState, useEffect } from "react";
import Axios from "axios";

import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { BASE_API_URL } from "../constants/url";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./../hook/useAuthcontext";

import { useStore } from "./../hook/Typezustand";

const SignUpPage = ({ handleClose }) => {
  const navigate = useNavigate();

  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch, user } = useAuthContext();
  
  const [password1, setPassword1] = useState("");

  const resetFormFields = () => {
    setFullName("");
    setEmail("");
    setGender("");
    setPhone("");
    setPassword("");
    setCPassword("");
    setError("");
    setLoading(false);
  };
  useEffect(() => {
    // Call the resetFormFields function when the component mounts
    resetFormFields();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: 'rgb(142, 83, 43)',
      },
      secondary: {
        main: "#999",
      },
      text: {
        main: "#888",
        primary: "#fff",
        secondary: "#ccc",
        disabled: "#888",
        hint: "#555",
      },
      background: {
        paper: "#333", // Background color for the dropdown menu
        rememberedEmailsField: "#666", // Custom background color for the remembered emails field
      },
    },
    backgroundColor: {
      default: "#222",
      paper: "#333",
    },
  });

  // const view = () => {
  //   if (password1 === "123@ab") {
  //     // If the correct password is given, show the form
  //     setFormVisible(true);
  //   } else {
  //     setError("Incorrect password");
  //   }
  // };

  const onSubmit = () => {
    if (
      email === "" ||
      password === "" ||
      full_name === "" ||
      gender === "" ||
      phone === "" ||
      cpassword === ""
    ) {
      setError("Please provide all fields");
    } else if (password !== cpassword) {
      setError("Password doesn't match");
    } else {
      setError("");

      setLoading(true);
      resetFormFields();

      const data = {
        email,
        password,
        full_name,
        phone,
        gender,
        type: "registrar",
      };

      Axios.post(BASE_API_URL + "/user", data)
        .then((result) => {
          setLoading(false);

          const token = JSON.stringify(result.data.token);
          const type = JSON.stringify(result.data.type);

          // useStore.setResponseData(result.data.type);

          localStorage.setItem("user", token);
          localStorage.setItem("type", type);

          dispatch({ type: "LOGIN", payload: token });
          setLoading(false);

          navigate("/registrar");
          // useStore.setState((state) => ({
          //   responseData: result.data.type,
          // }));
        })
        .catch((error) => {
          setLoading(false);
          setError("Failed to sign up");
        });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          borderRadius: "15px",
          backgroundColor: "#222",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 400,
          height: 450,
          padding: "20px",
        }}
        className="signup-wrapper"
      >
          <div className="row">
                      {error !== "" && (
            <div className="col-12">
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            </div>
          )}

          <div className="col-12 text-center mb-4">
            <h4 style={{ color: "#fff" }}>Registrar Sign Up</h4>
          </div>
          <div className="col-6 mb-4">
            <TextField
              label="Full Name"
              variant="filled"
              fullWidth={true}
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="col-6 mb-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>

              <Select
                select
                fullWidth
                value={gender}
                label="Gender"
                variant="outlined"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="col-6 mb-4">
            <TextField
              type="email"
              label="Email"
              variant="filled"
              fullWidth={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="col-6 mb-4">
            <TextField
              label="Phone"
              variant="filled"
              fullWidth={true}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            />
          </div>

          <div className="col mb-4">
            <TextField
              type="password"
              label="Confirm Password"
              variant="filled"
              fullWidth={true}
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </div>

          <div className="col-12 mb-4 text-center">
            <LoadingButton
              variant="contained"
              onClick={() => onSubmit()}
              loading={loading}
            >
              Sing Up
            </LoadingButton>
          </div>
          </div>
      </div>
    </ThemeProvider>
  );
};

export default SignUpPage;
