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

export default function RegisterCourse({ fetchData }) {
  const [open, setOpen] = useState(false);
  const [departments, setDepartments] = useState([]);

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
    if (name === "" || department === "" || type === "") {
      setError("Please provide all fields");
    } else {
      setError("");

      setLoading(true);

      const data = {
        name,
        department,
        type,
      };
console.log(data);
      axios
        .post(BASE_API_URL + "/course", data)
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
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/course`); // Replace with your actual API endpoint
        const data = response.data;
        const uniqueDepartments = Array.from(new Set(data.map(item => item.department)));
        setDepartments(uniqueDepartments);
        //console.log(uniqueDepartments);
      } catch (error) {
        console.error('Error retrieving departments:', error);
      }
    };
    fetchDepartments();

  }, [department]);

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
        Register Course
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Course Registration</DialogTitle>
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
                <Select
                  fullWidth
                  value={department}
                  label="Department"
                  variant="filled"
                  onChange={(e) => SetDepartment(e.target.value)}
                >
                  {departments.map(department =><MenuItem value={department}>
                  {department}
                </MenuItem>     )}
                </Select>
              </FormControl>
            </div>

              <div className="col-12 mb-4">
                <FormControl fullWidth>
                  <InputLabel>Course</InputLabel>
                  <TextField
                variant="filled"
                name="name"
                fullWidth={true}
                onChange={(e) => setName(e.target.value)}
              />
                </FormControl>
              </div>

            <div className="col-12 mb-4">
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  fullWidth
                  value={type}
                  label="Type"
                  variant="filled"
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value={"regular"}>Regular</MenuItem>
                  <MenuItem value={"extension"}>Extension</MenuItem>
                </Select>
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
