import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import { Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { BASE_API_URL } from "../constants/url";

import { useAuthContext } from "./../hook/useAuthcontext";

export default function Dropcourse({_id,fetchTableData,ids}) {
  const [open, setOpen] = useState(false);

  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = useAuthContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  const deletedata = () => {
    setLoading(true);

    const deleteGrade1 = axios.delete(`${BASE_API_URL}/user/delete-course/${_id}/${ids}`);
    const deleteGrade2 = axios.delete(`${BASE_API_URL}/grades/${_id}/${ids}`);

    axios.all([deleteGrade1, deleteGrade2])
  .then(axios.spread((res1, res2) => {
    console.log('Grade 1 deleted successfully',res1);
    console.log('Grade 2 deleted successfully',res2);
    fetchTableData();
    setOpen(false);
    setLoading(false);
    // Handle the responses individually if needed
  }))
  .catch(error => {
    console.error(error);
    // Handle the error, show an error message, etc.
  });

    // axios
    // .delete(`${BASE_API_URL}/user/delete-course/${_id}/${ids}`)
    // .then(() => {
    //     return axios.delete(`${BASE_API_URL}/grades/${_id}/${ids}`);
    //   })
    //   .then(() => {
    //     //console.log(r1,r2);
    //     fetchTableData();
    //     setOpen(false);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     //setError(error.response.data.message);
    //     console.error(error);
    //   });;
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
        Drop
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Are you sure you want to Drop this Course? </DialogTitle>
        <DialogContent>

        {error !== "" && (
        <div className="col-12">
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </div>
      )}

        <Button
        variant="outlined"
        onClick={deletedata}
        style={{
          float: "right",
        }}
      >
        Drop
      </Button>
      <Button
        variant="outlined"
        onClick={handleClose}
        style={{
          float: "left",
        }}
      >
        Cancel
      </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
