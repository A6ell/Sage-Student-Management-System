import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

import { Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { BASE_API_URL } from "./../../constants/url";

import { useAuthContext } from "./../../hook/useAuthcontext";

export default function Deletenews({_id,getnewss}) {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = useAuthContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletenews = () => {
    setLoading(true);
      
    axios
    .delete(`${BASE_API_URL}/news/${_id}`,{headers: {Authorization: `Bearer ${user}`}})
    .then(() => {
      getnewss();
    })
    //console.log(_id);
    setOpen(false);
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
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete? </DialogTitle>
        <DialogContent>
        <Button
        variant="outlined"
        onClick={deletenews}
        style={{
          float: "right",
        }}
      >
        Delete
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
