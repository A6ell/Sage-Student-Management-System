import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DialogActions from "@mui/material/DialogActions";
import LoadingButton from "@mui/lab/LoadingButton";
import { format } from 'date-fns';

import { useAuthContext } from "./../hook/useAuthcontext";

import axios from "axios";
import { BASE_API_URL } from "../constants/url";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";


export default function Update({full_name,email,gender,phone,program,_id,type,fetchTableData,dateofbirth,startingmonth,endingmonth,Residentioaladdress}) {
  
  const [formdata,setformdata] =useState({
    full_name,
    email,
    gender,
    phone,
    program,
    startingmonth,
    dateofbirth,
    endingmonth,
    Residentioaladdress
    // _id
  })
  //const [changedData, setChangedData] = useState({});
  const {user} = useAuthContext();

  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updatedata = () => {
    setLoading(true);

    //const data = {full_name,email,gender,phone,program}


    //console.log(formdata.startingmonth.substr(0, 10));
    axios
    .put(`${BASE_API_URL}/user/${_id}`,formdata,{headers: {Authorization: `Bearer ${user}`}})
    .then(response => {
      // Handle the response
        console.log(user);
        setLoading(false);
        setOpen(false);
        fetchTableData();
      }).catch(error => {
        // Handle the error
        console.error(error);
      });
      
  };
  return (
    <div>
     <IconButton
  onClick={handleClickOpen}
  color="primary"
  aria-label="edit"
  style={{
    float: "right",
  }}
>
  <EditIcon />
</IconButton>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Student Registration</DialogTitle>
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
                name="full_name"
                fullWidth={true}
                defaultValue={formdata.full_name}
                onChange={handleChange}
              />
            </div>

            <div className="col-6 mb-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  fullWidth
                  defaultValue={formdata.gender}
                  label="Gender"
                  name="gender"
                  variant="filled"
                  onChange={handleChange}
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
                name="email"
                variant="filled"
                fullWidth={true}
                defaultValue={formdata.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-6 mb-4">
              <TextField
                type="number"
                label="Phone"
                name="phone"
                variant="filled"
                fullWidth={true}
                defaultValue={formdata.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-6 mb-4">
              <TextField
                label="Residentioaladdress"
                name="Residentioaladdress"
                variant="filled"
                fullWidth={true}
                defaultValue={formdata.Residentioaladdress}
                onChange={handleChange}
              />
            </div>
            
            <div className="col-6 mb-4">
              <TextField
                type="date"
                label="dateofbirth"
                name="dateofbirth"
                variant="filled"
                fullWidth={true}
                defaultValue={formdata.dateofbirth.substr(0, 10)}
                onChange={handleChange}
                />
            </div>

            <div className="col-6 mb-4">
              <TextField
                type="month"
                label="startingmonth"
                name="startingmonth"
                variant="filled"
                fullWidth={true}
                defaultValue={formdata.startingmonth.substr(0,7)}
                onChange={handleChange}
                />
            </div>
                           
            <div className="col-6 mb-4">
              <TextField
                type="month"
                label="endingmonth"
                name="endingmonth"
                variant="filled"
                fullWidth={true}
                defaultValue={formdata.endingmonth.substr(0, 7)}
                onChange={handleChange}
              />
            </div>

            {type === "student" && <div className="col-12 mb-4">
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  fullWidth
                  defaultValue={formdata.program}
                  label="Program"
                  name="program"
                  variant="filled"
                  onChange={handleChange}
                >
                 <MenuItem value={"regular"}>Regular</MenuItem>
                  <MenuItem value={"extension"}>Extension</MenuItem>
                </Select>
              </FormControl>
            </div>}
          </div>
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={loading} onClick={() => updatedata()} autoFocus>
            Update
          </LoadingButton>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}