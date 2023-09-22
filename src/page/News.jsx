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
import moment from 'moment';

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
import AddStudentCourse from "./AddCourse";
import RegisterStudent from "./RegisterStudent";
import RegisterTeacher from "./RegisterTeacher";
import StudentCourses from "./StudentCoruses";
import { useLogout } from "../hook/useLogout";
import Delete from "./Delete"
import Update from "./Update"
import { Button, Skeleton, TextField } from "@mui/material"; // Import TextField for input fields

import Updatenews from "./news/Updatenews";
import Deletenews from "./news/Deletenews";

import { useNavigate } from "react-router-dom";
import { useStore } from './../hook/Typezustand';

import Layout from './Layout';



const RegistrarPage = () => {
  
  const drawerWidth = 240;
  const navItems = ['Course'];
  const navigate = useNavigate();
  const [title, setNewsTitle] = useState("");
  const [content, setNewsContent] = useState("")
  const [news, setNews] = useState([]);
  
  const [type, setType] = useState("student");
  const [data, setData] = useState([]);
  const { logout } = useLogout();
  const responseData = useStore((state) => state.responseData);
  const typo = localStorage.getItem('type');
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(false);
  // Define state variables for new news input fields
  const datas = {
    title,
    content
  };
  // Function to handle the "Add News" button click
  const handleAddNews = () => {
    console.log(datas);
    // Make an API request to add the news on your backend
    axios
      .post(BASE_API_URL + "/news", datas)
      .then((response) => {
        // Assuming the response contains the newly added news item
        //const newNewsItem = response.data;

        // Call the function from DrawerAppBar to update the news data
        //updateNewsData(newNewsItem);

        // Clear the input fields
        setNewsTitle("");
        setNewsContent("");
      })
      .catch((error) => {
        console.error('Error adding news:', error);
      });
  };


  const getnewss = () => {
    // console.log(datas);
    // Make an API request to add the news on your backend
    axios
      .get(BASE_API_URL + "/news")
      .then((response) => {
        // Assuming the response contains the newly added news item
        //const newNewsItem = response.data;
        //console.log(response.data);
        const respond = response.data
        setNews(respond);
        setLoadings(false);

        console.log(news);

        // Call the function from DrawerAppBar to update the news data
        //updateNewsData(newNewsItem);


        // Clear the input fields
        // setTitle('');
        // setContent('');
      })
      .catch((error) => {
        console.error('Error adding news:', error);
      });
  };


  const handellogout = () => {
    logout()
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#659',
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


  useEffect(() => {
    fetchTableData();
    getnewss();
    
  }, [type]);

  const fetchTableData = () => {
    setLoading(true);

    axios
      .get(`${BASE_API_URL}/user?type=${type}`)
      .then((result) => {
        setLoading(false);
        setData(result.data);
        //console.log(result.data);

      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (


    <ThemeProvider theme={darkTheme}>

      <CssBaseline />

      <AppBar style={{ backgroundColor: '#233', color: 'white', padding: '8px 16px', display: 'flex', maxHeight: '100px' }} component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
            <img src="/Sage.png" alt="Logo" className="logo-image" />
          </Typography>
          <div style={{ display: "flex", justifyContent: "center", width: "68%", fontFamily: "Yeshuah, sans-serif" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1>Registrar</h1>
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


          {typo === '"registrar"' && <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button style={{ backgroundColor: '#151', padding: '8px 16px', marginRight: '15px' }}
                color="inherit"
                variant="text"
                onClick={() => navigate("/course")}>
                To Courses
              </Button>))}


          </Box>}
          {navItems.map((item) => (
            <Button style={{ backgroundColor: 'brown', padding: '8px 16px', marginRight: '15px' }} color="inherit" variant="text" onClick={handellogout}>
              Logout
            </Button>))}

        </Toolbar>

      </AppBar>

      <div style={{ display: "flex", flexDirection: "column", backgroundColor: '#222', alignItems: "center", height: '100vh', width: '100vw', padding: "20px", marginTop: "100px" }} className="row p-4">


        <div className="col-12">
          <div className="row">
            
            <div className="col-4">
              
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  fullWidth
                  value={type}
                  label="Gender"
                  variant="filled"
                  onChange={(e) => setType(e.target.value)}
                >
                  {typo === '"registrar"' && <MenuItem value={"teacher"}>Teacher</MenuItem>}
                  <MenuItem value={"student"}>Student</MenuItem>
                </Select>
              </FormControl>
              
            </div>
            

            <div className="col">
              {typo === '"registrar"' && <RegisterStudent fetchData={fetchTableData} />}
              {typo === '"registrar"' && <RegisterTeacher fetchData={fetchTableData} />}
            </div>
            
          </div>


          

          {typo === '"registrar"' && <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" loading={loading}>
            <TableHead>
              <TableRow>
                <TableCell>News Title</TableCell>
                <TableCell>News Content</TableCell>
                <TableCell>News Date</TableCell>
                <TableCell align="right">News Delete</TableCell>
                <TableCell align="right">News Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {news.map((newd) => (
              <TableRow key={newd.title}>
                <TableCell> {newd.title}</TableCell>
                <TableCell>{newd.content}</TableCell>
                <TableCell>{moment(newd.createdAt).format('YYYY-MM-DD')}</TableCell>
                <TableCell><Deletenews _id={newd._id} getnewss={getnewss}/></TableCell>
                <TableCell><Updatenews title={newd.title} content={newd.content} _id={newd._id} getnewss={getnewss}/></TableCell>
              </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>}

{ typo === '"registrar"' &&  <div className="col-2 mt-4">
          <TextField
            label="News Title"
            variant="outlined"
            fullWidth
            name={title}
            value={title}
            onChange={(e) => setNewsTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            label="News Content"
            variant="outlined"
            fullWidth
            multiline
            content={content}
            rows={4}
            value={content}
            onChange={(e) => setNewsContent(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddNews}>
            Add News
          </Button>
        <Button variant="contained" color="primary" onClick={getnewss}>
          Get News
        </Button>
        </div>}
          
        </div>
        

        
        
        
        </div>


    </ThemeProvider>

  );
};

export default RegistrarPage;
