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

import { useAuthContext } from "./../../hook/useAuthcontext";

import axios from "axios";
import { BASE_API_URL } from "./../../constants/url";

export default function Updatenews({content,title,_id,getnewss}) {
  
  const [formdata,setformdata] =useState({
    content,
    title
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
    .put(`${BASE_API_URL}/news/${_id}`,formdata,{headers: {Authorization: `Bearer ${user}`}})
    .then(response => {
      // Handle the response
        //console.log(user);
        setLoading(false);
        setOpen(false);
        getnewss();
      }).catch(error => {
        // Handle the error
        console.error(error);
      });
      
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
        Update
      </Button>

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
                label="title"
                variant="filled"
                name="title"
                fullWidth={true}
                defaultValue={formdata.title}
                onChange={handleChange}
              />
            </div>
            <div className="col-6 mb-4">
              <TextField
                label="content"
                variant="filled"
                name="content"
                fullWidth={true}
                defaultValue={formdata.content}
                onChange={handleChange}
              />
            </div>
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