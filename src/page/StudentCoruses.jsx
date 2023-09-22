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
import { BASE_API_URL } from "../constants/url";
import Grade from "./Grade";
import Gradeview from "./Gradeview";
import Gradeupdate from "./Gradeupdate";
import Dropcourse from "./Dropcourse"
import { useAuthContext } from "./../hook/useAuthcontext";
import { useStore } from './../hook/Typezustand';

export default function StudentCourses({ ids, _id }) {
  const [open, setOpen] = useState(false);
  const [resources, setResources] = useState([]);

  const [data, setData] = useState([]);
  const [grade, Setgrade] = useState();
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuthContext();
  const responseData = useStore((state) => state.responseData);
  const typo = localStorage.getItem('type');

  useEffect(() => {
    if (open) fetchTableData();
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchTableData = async () => {
    setLoading(true);


    console.log(typo);
    axios
      .get(`${BASE_API_URL}/course?ids=${ids}`)
      .then((result) => {
        setLoading(false);
        setData(result.data);
        //console.log(user);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
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
        Courses
      </Button>
      {typo === '"student"' && <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Student Courses</DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              {loading ? (<Skeleton variant="rectangular" height={118} />) : (

                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 550 }}
                    aria-label="simple table"
                    loading={loading}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Course</TableCell>
                        <TableCell align="left">Grade</TableCell>
                        <TableCell align="left">Add</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {data.map((row, idx) => (

                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {idx + 1}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.name} <b>({row.type})</b>
                          </TableCell>
                          <TableCell>
                            {/* {resources
                .filter((grades) => grades.courseid === row._id)
                .map((grades) => (
                  <TableCell>{grades.grade}</TableCell>
          ))} */}

                            {/* <TableCell><Grade ids={row._id} _id={_id} /></TableCell> */}
                            <TableCell><Gradeview ids={row._id} _id={_id} /></TableCell>
                            {/* <TableCell><Gradeupdate ids={row._id} _id={_id} /></TableCell> */}
                            {/* <TableCell><Dropcourse fetchTableData={fetchTableData} ids={row._id} _id={_id} /></TableCell> */}
                          </TableCell>
                        </TableRow>

                      ))}
                    </TableBody>

                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>}


      {typo === '"registrar"' && <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Student Courses</DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              {loading ? (<Skeleton variant="rectangular" height={118} />) : (

                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 550 }}
                    aria-label="simple table"
                    loading={loading}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Course</TableCell>
                        <TableCell align="left">Grade</TableCell>
                        <TableCell align="left">Add</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {data.map((row, idx) => (

                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {idx + 1}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.name} <b>({row.type})</b>
                          </TableCell>
                          <TableCell>
                            {/* {resources
                .filter((grades) => grades.courseid === row._id)
                .map((grades) => (
                  <TableCell>{grades.grade}</TableCell>
          ))} */}

                            {/* <TableCell><Grade ids={row._id} _id={_id} /></TableCell> */}
                            <TableCell><Gradeview ids={row._id} _id={_id} /></TableCell>
                            {/* <TableCell><Gradeupdate ids={row._id} _id={_id} /></TableCell> */}
                            {/* <TableCell><Dropcourse fetchTableData={fetchTableData} ids={row._id} _id={_id} /></TableCell> */}
                          </TableCell>
                        </TableRow>

                      ))}
                    </TableBody>

                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>}

      {typo === '"teacher"' && <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Student Courses</DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              {loading ? (<Skeleton variant="rectangular" height={118} />) : (

                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 550 }}
                    aria-label="simple table"
                    loading={loading}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Course</TableCell>
                        <TableCell align="left">Grade</TableCell>
                        <TableCell align="left">Add</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {data.map((row, idx) => (

                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {idx + 1}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.name} <b>({row.type})</b>
                          </TableCell>
                          <TableCell>
                            {/* {resources
                .filter((grades) => grades.courseid === row._id)
                .map((grades) => (
                  <TableCell>{grades.grade}</TableCell>
          ))} */}

                            <TableCell><Grade ids={row._id} _id={_id} /></TableCell>
                            <TableCell><Gradeview ids={row._id} _id={_id} /></TableCell>
                            <TableCell><Gradeupdate ids={row._id} _id={_id} /></TableCell>
                            {/* <TableCell><Dropcourse fetchTableData={fetchTableData} ids={row._id} _id={_id} /></TableCell> */}
                          </TableCell>
                        </TableRow>

                      ))}
                    </TableBody>

                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>}

    </div>
  );
}