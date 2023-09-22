import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useState,useEffect } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { BASE_API_URL } from "../constants/url";

export default function Registerdepartment({ fetchData }) {
  const [open, setOpen] = useState(false);

  const [department, SetDepartment] = useState();
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const onSubmit = () => {
    if (department === "") {
      setError("Please provide all fields");
    } else {
      setError("");

      setLoading(true);

      const data = {department};
console.log(data);
      axios
        .post(BASE_API_URL + "/course/department", data)
        .then((result) => {
          //console.log(result.data);
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

  useEffect(() => {
    // const fetchDepartments = async () => {
    //   try {
    //     const response = await axios.get(`${BASE_API_URL}/course`); // Replace with your actual API endpoint
    //     const data = response.data;
    //     const uniqueDepartments = Array.from(new Set(data.map(item => item.department)));
    //     setDepartments(uniqueDepartments);
    //     //console.log(uniqueDepartments);
    //   } catch (error) {
    //     console.error('Error retrieving departments:', error);
    //   }
    // };
    // fetchDepartments();

  }, []);

  const resetForm = () => {
    setName("");
    SetDepartment("");
    setType("");
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
        Register Department
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Department Registration</DialogTitle>
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
                  <InputLabel>Department</InputLabel>
                  <TextField
                variant="filled"
                value={department}
                name="name"
                fullWidth={true}
                onChange={(e) => SetDepartment(e.target.value)}
              />
                </FormControl>
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
