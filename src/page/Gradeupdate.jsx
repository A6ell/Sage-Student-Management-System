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
import Alert from "@mui/material/Alert";
import { format } from 'date-fns';

import { useAuthContext } from "./../hook/useAuthcontext";

import axios from "axios";
import { BASE_API_URL } from "../constants/url";

export default function Grade({ids,fetchTableData,_id}) {
  
  //const [changedData, setChangedData] = useState({});
  const {user} = useAuthContext();

  const [grade, Setgrade] = useState();
  
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === '') {
      setError('');
      Setgrade(inputValue);
    } else if (Number(inputValue) >= 0 && Number(inputValue) <= 100) {
      setError('');
      Setgrade(inputValue);
    } else {
      setError('Please enter a number between 0 and 100.');
    }
  };

  const onSubmit = async() => {
    setLoading(true);

   const data ={grade}
   console.log(data,_id,ids);
    axios
    .put(`${BASE_API_URL}/grades/${_id}/${ids}`,data,{headers: {Authorization: `Bearer ${user}`}})
    .then(response => {
      // Handle the response
        console.log(response.data);
        setLoading(false);
        setOpen(false);
        //fetchTableData();
    }).catch(error => {
      setError(error.response.data.message);
      console.error(error);
      setLoading(false);
    });    
    useEffect(()=>{



    },[])
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
        Edit Grade
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Add Grade</DialogTitle>
        <DialogContent>
          <div className="row">
            {error !== "" && (
              <div className="col-12">
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              </div>
            )}
              <div className="col-12 mb-4">
                <FormControl fullWidth>
                  <InputLabel>Grade</InputLabel>
                  <TextField
                  type="number"
                variant="filled"
                name="grade"
                fullWidth={true}
                onChange={handleChange}
              />
                </FormControl>
              </div>

          </div>
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={loading} onClick={() => onSubmit()} autoFocus>
            Change
          </LoadingButton>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}