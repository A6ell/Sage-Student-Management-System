import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useEffect, useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { BASE_API_URL } from "../constants/url";

export default function AddStudentCourse({ fetchData, id }) {
  const [open, setOpen] = useState(false);
  const [departments, setDepartments] = useState([]);

  const [department, SetDepartment] = useState("");
  const [course_id, setCourseId] = useState([]);

  const [courses, setCourses] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [department]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    if (course_id === "") {
      setError("Please provide all fields");
    } else {
      setError("");

      setLoading(true);

      const data = {
        course_id,
      };

      axios
        .post(BASE_API_URL + `/user/add-course/${id}`, data)
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
    setName("");
    SetDepartment("");
    setType("");
  };

  const fetchCourses = () => {
    if (department !== 0) {
      setLoading(true);

      axios
        .get(`${BASE_API_URL}/course?department=${department}`)
        .then((result) => {
          setLoading(false);
          setCourses(result.data);
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
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
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
                  {/* <MenuItem value={"Department of business and finance"}>
                    Department of business and finance
                  </MenuItem>
                  <MenuItem value={"Department of Information Technology"}>
                    Department of Information Technology
                  </MenuItem> */}

                  {/* ADD DEPARTMENTS HERE!!!! */}
                </Select>
              </FormControl>
            </div>

            <div className="col-12 mb-4">
              <FormControl fullWidth>
                <InputLabel>Course</InputLabel>
                <Select
                  fullWidth
                  value={course_id}
                  label="Gender"
                  variant="filled"
                  onChange={(e) => setCourseId(e.target.value)}
                >
                  {courses.map((e, idx) => (
                    <MenuItem value={e._id} key={idx}>
                      {e.name} ({e.type})
                    </MenuItem>
                  ))}
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
