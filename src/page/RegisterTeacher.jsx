import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { BASE_API_URL } from "../constants/url";

export default function RegisterTeacher({ fetchData }) {
  const [open, setOpen] = useState(false);

  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [dateofbirth, setdateofbirth] = useState("")
  const [Residentioaladdress, setResidentioaladdress]= useState("")
  const [startingmonth, setstartingmonth] = useState("")
  const [endingmonth, setendingmonth] = useState("")

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    if (
      email === "" ||
      dateofbirth === "" ||
      full_name === "" ||
      gender === "" ||
      phone === "" ||
      Residentioaladdress === "" || 
      startingmonth === "" || 
      endingmonth === "" ||
      cpassword === "" ||
      password === ""
    ) {
      setError("Please provide all fields");
    } else if (password !== cpassword) {
      setError("Password doesn't match");
    } else {
      setError("");

      setLoading(true);

      const data = {
        email,
        full_name,
        phone,
        password,
        gender,
        type: "teacher",
        dateofbirth,
        Residentioaladdress,
        startingmonth,
        endingmonth
      };

      axios
        .post(BASE_API_URL + "/user/register-student", data)
        .then((result) => {
          setLoading(false);
          fetchData();
          resetForm();
          handleClose();
        })
        .catch((error) => {
          setLoading(false);
          setError("Failed to register");
        });
    }
  };

  const resetForm = () => {
    setFullName("");
    setGender("");
    setEmail("");
    setPhone("");
    setPassword("");
    setCPassword("");
    setdateofbirth("");
    setResidentioaladdress("");
    setstartingmonth("");
    setendingmonth("");
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          float: "right",
        }}
      >
        Register Teacher
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Teacher Registration</DialogTitle>
        <DialogContent>
          <div className="row">
            {error !== "" && (
              <div className="col-12">
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              </div>
            )}

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
                
                  fullWidth
                  value={gender}
                  label="Gender"
                  variant="filled"
                  onChange={(e) => setGender(e.target.value)}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  InputProps={{
                    style: {
                      paddingTop: "10px", // Adjust the top padding as needed
                    },
                  }}
                  
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

            <div className="col-6 mb-4">
              <TextField
                type="password"
                label="Password"
                variant="filled"
                fullWidth={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="col-6 mb-4">
              <TextField
                type="password"
                label="Confirm Password"
                variant="filled"
                fullWidth={true}
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>

            <div className="col mb-4">
              <TextField
                type="text"
                label="Residentioal address"
                variant="filled"
                fullWidth={true}
                value={Residentioaladdress}
                onChange={(e) => setResidentioaladdress(e.target.value)}
              />
            </div>
            
            <div className="col mb-4">
  <TextField
    type="date"
    label="Date of birth"
    variant="filled"
    fullWidth={true}
    value={dateofbirth}
    onChange={(e) => setdateofbirth(e.target.value)}
    InputLabelProps={{
      shrink: true,
    }}
    InputProps={{
      style: {
        paddingTop: "0px", // Adjust the top padding as needed
      },
    }}
  />
</div>


            <div className="col mb-4">
              <TextField
                type="month"
                label="Starting month"
                variant="filled"
                fullWidth={true}
                value={startingmonth}
                onChange={(e) => setstartingmonth(e.target.value)}
              />
            </div>
            <div className="col mb-4">
              <TextField
                type="month"
                label="Ending month"
                variant="filled"
                fullWidth={true}
                value={endingmonth}
                onChange={(e) => setendingmonth(e.target.value)}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={loading} onClick={() => onSubmit()} autoFocus>
            Register
          </LoadingButton>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
