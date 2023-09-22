import React, { useEffect, useState } from "react";

import { BASE_API_URL } from "../constants/url";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from '@mui/material/Box';
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from "react-router-dom";

import { Button, Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import axios from "axios";
import RegisterCourse from "./RegisterCourse";
import { useLogout } from "../hook/useLogout";
import Registerdepartment from "./RegisterDepartment";

import { useNavigate } from "react-router-dom";
import Delete from "./DeleteCourse";
import Update from "./UpdateCourse";
const navItems = ['Course'];

const RegistrarPage = () => {
  const navigate = useNavigate();
  const {logout} = useLogout();
  const [departments, setDepartments] = useState([]);

  const handellogout = ()=>{
    logout()
  }

  const [selection, setSelection] = useState({
    department: "",
    type: "",
  });

  const [data, setData] = useState([]);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: 'rgb(142, 83, 43)',
      },
      secondary: {
        main: '#999',
      },
      text: {
        main: '#888',
        primary: '#fff',
        secondary: '#ccc',
        disabled: '#888',
        hint: '#555',
      },
      background: {
        paper: '#333', // Background color for the dropdown menu
      },
    },
    backgroundColor: {
      default: '#222',
      paper: '#333',
    },
  });
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      {/* <Typography variant="h6" sx={{ my: 2 }}>
        Sage
      </Typography> */}
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTableData();
  }, [selection]);

  const fetchTableData = () => {
    setLoading(true);

    axios
      .get(`${BASE_API_URL}/course?department=${selection.department}&type=${selection.type}`)
      //.get(`${BASE_API_URL}/course`)
      .then((result) => {
        setLoading(false);
        setData(result.data);
        //console.log(result.data);
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
  };

  return (
    <ThemeProvider theme={darkTheme}>
      
      <CssBaseline />
      
      <AppBar style={{ backgroundColor: 'rgb(72, 42, 22)', color: 'white', padding: '8px 16px', display: 'flex',maxHeight: '100px' }} component="nav">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
            <img src="/Sage.png" alt="Logo" className="logo-image" />
          </Typography>
          <div style={{ display: "flex", justifyContent: "center", width: "68%", fontFamily: "Yeshuah, sans-serif" }}>
  <div style={{ display: "flex", alignItems: "center" }}>
    <h1>Courses</h1>
  </div>
</div>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          


          {/* <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Sage
          </Typography> */}
          <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
            {navItems.map((item) => (
              <Button style={{ backgroundColor: 'rgb(142, 83, 43)', padding: '8px 16px', marginRight: '15px' }} color="inherit" variant="text" onClick={() => navigate("/registrar")}>
              To Registrar
            </Button>
            
            
            
            ))}
            {navItems.map((item) => (
              <Button style={{ backgroundColor: 'rgb(254, 203, 35)', padding: '8px 16px', marginRight: '15px' }} color="inherit" variant="text" onClick={handellogout}>
              Logout
            </Button>
            
            
            
            ))}
         



            {/* Add the Login button */}
      

      {/* Sign Up button with inline styles */}
  
          </Box>
          
        </Toolbar>
        
      </AppBar>
      <div style={{ display: "flex", flexDirection: "column", backgroundColor: '#222', alignItems: "center", height: '100vh', width: '100vw', padding: "20px", marginTop: "100px" }} className="row p-4">
      <div className="col-12 text-center mb-4">
        
       
      </div>

      <div className="col-12">
        <div className="row">
          <div className="col-4">
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                fullWidth
                value={selection.department}
                label="Gender"
                variant="filled"
                onChange={(e) =>
                setSelection({ ...selection, department: e.target.value })
                }
              >
                {departments.map(department =><MenuItem value={department}>
                  {department}
                </MenuItem>     )}
                
              </Select>
            </FormControl>
          </div>
                {/* <MenuItem value={"Department of Information Technology"}>
                  Department of Information Technology
                </MenuItem> */}

                {/* ADD DEPARTMENTS HERE!!!! */}

          <div className="col-3">
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                fullWidth
                value={selection.type}
                label="Type"
                variant="filled"
                onChange={(e) =>
                  setSelection({ ...selection, type: e.target.value })
                }
              >
                <MenuItem value={"regular"}>Regular</MenuItem>
                <MenuItem value={"extension"}>Extension</MenuItem>

                {/* ADD DEPARTMENTS HERE!!!! */}
              </Select>
            </FormControl>
          </div>
          <div className="col">
            <RegisterCourse fetchData={fetchTableData} />
            <Registerdepartment fetchData={fetchTableData}/>
          </div>
        </div>
      </div>

      <div className="col-12 mt-4">
        {loading ? (
          <Skeleton variant="rectangular" height={118} />
        ) : (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              loading={loading}
            >
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {data.map((row, idx) => (
    <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{idx + 1}</TableCell>
      <TableCell component="th" scope="row">{row.name}</TableCell>
      <TableCell component="th" scope="row"><Delete fetchTableData={fetchTableData} _id={row._id}/></TableCell>
      <TableCell component="th" scope="row"><Update name={row.name} fetchTableData={fetchTableData} _id={row._id}/></TableCell>
    </TableRow>
  ))}
</TableBody>
          
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
    </ThemeProvider>
  );
};

export default RegistrarPage;
