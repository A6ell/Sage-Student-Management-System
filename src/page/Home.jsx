import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from "@mui/material/DialogContent";
import { Link } from 'react-router-dom';
import Login from './Login';
import SignUpPage from './SignUp';
import { useAuthContext } from "../hook/useAuthcontext";
import './Style.css';
import axios from "axios";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Home from '../asset/Home.jpg';
import Avatar from '@mui/material/Avatar'; 
import teamMember1 from './teamMember1.jpg'; // Import your team member images
import teamMember2 from './teamMember2.jpg';
import teamMember3 from './teamMember3.jpg';
import teamMember4 from './teamMember4.jpg';
import Landing from './Landing.jpg';
import Registrar from './Registrar';
import { BASE_API_URL } from "../constants/url";

import Slider from 'react-slick';


const useStyles = makeStyles({
  cardHover: {
    "&:hover": {
      transform: 'scale(1.05)',
      boxShadow: '0px 0px 10px #fff',
      transition: 'all 0.3s ease-in-out'
    }
  },
  overlayText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    fontSize: '4rem', // Adjust the font size as needed
    color: 'white', // Text color
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Optional text shadow
  },
  
});






const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];


function DrawerAppBar(props) {
  
  const [slideItems, setSlideItems] = useState([]);

//   // Inside your component function, define a state variable to hold news data
// const [newsData, setNewsData] = useState([]);
// const updateNewsData = (newNewsItem) => {
//   // Add the new news item to the existing news data
//   setNewsData((prevNewsData) => [...prevNewsData, newNewsItem]);
// };
// <Registrar updateNewsData={updateNewsData} />

// Fetch news data when the component mounts
useEffect(() => {

  const fetchData = async () => {
  axios
      .get(BASE_API_URL + "/news")
      .then((response) => {
        setSlideItems(response.data)
      })
    }

    fetchData();
},[] ); 



const scrollToSection = (section, offset = 0) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      window.scrollBy({ top: -offset, behavior: 'smooth' }); // Apply the offset
      handleDrawerToggle(); // Close the mobile drawer after clicking a navigation item
    }
  };
  

  const backgroundStyle = {
    backgroundImage: `url(${Home})`, // Use the imported image
    backgroundSize: 'cover', // Adjust the background size as needed
    backgroundRepeat: 'no-repeat', // Adjust the background repeat behavior
    height: '100%', // Set the desired height
    backgroundPosition: 'center 50%' 
    // Add more styles as needed
  };
  
  
  
  
  const classes = useStyles();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const [openSignupDialog, setOpenSignupDialog] = React.useState(false);
  
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
  
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLoginClick = () => {
    setOpenLoginDialog(true);
  };
  
  const handleSignupClick = () => {
    setOpenSignupDialog(true);
  };
  
  const handleDialogClose = () => {
    setOpenLoginDialog(false);
    setOpenSignupDialog(false);
  };
  
  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center',backgroundColor: '#2339', color: 'white', padding: '8px 16px', display: 'flex', maxHeight: '100px', backdropFilter: 'blur(10px)', }}>
    <Divider />
    <List>
      {navItems.map((item) => (
        <ListItem key={item} disablePadding onClick={() => scrollToSection(item)}>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      ))}
      {/* Add the Login button */}
      <Button
  onClick={handleLoginClick}
  variant="contained"
  sx={{
    backgroundColor: 'orange',
    color: 'white',
    padding: '8px 16px',
    marginRight: '10px',
  }}
>
  Login
</Button>

<Button
  onClick={handleSignupClick}
  variant="contained"
  sx={{
    backgroundColor: 'green',
    color: 'white',
    padding: '8px 16px',
  }}
>
  Sign Up
</Button>

    </List>
  </Box>
);


const container = window !== undefined ? () => window().document.body : undefined;


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};


  return (
    <ThemeProvider  theme={darkTheme}>
       <Box sx={{ display: 'flex', backgroundColor: '#222', height: '15%', width: '100vw', ...backgroundStyle }}>
        <CssBaseline />
        <AppBar style={{ backgroundColor: 'rgba(72, 42, 22, 0.5)', color: 'white', padding: '8px 16px', display: 'flex', maxHeight: '100px', backdropFilter: 'blur(10px)', }} component="nav">
          
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
              <img src="/Sage.png" alt="Logo" className="logo-image" />
            </Typography>
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
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button
                  color="inherit"
                  style={{ padding: '8px 16px', marginRight: '10px', cursor: 'pointer' }}
                  key={item}
                  sx={{ color: '#fff' }}
                  onClick={() => scrollToSection(item)}
                >
                  {item}
                </Button>
              ))}
              {/* Add the Login button */}
              <Button
                // className={!isRegistrarPage ? "show-button" : "hide-button"}
                color="inherit"
                style={{ backgroundColor: 'rgb(254, 203, 35)', padding: '8px 16px', marginRight: '10px' }}
                onClick={handleLoginClick}
              >
                Login
              </Button>

              {/* Sign Up button with inline styles */}
              <Button
                color="inherit"
                style={{ backgroundColor: 'rgb(142, 83, 43)', color: 'white', padding: '8px 16px' }}
                onClick={handleSignupClick}
              >
                Sign Up
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3, mt: 5 }}>
          <Toolbar />
          <Typography variant="h4" id="Home" sx={{ textAlign: 'center' }}>
            {/* Your main content here */}

            {/* Welcome to Sage Institute  */}
          </Typography>
          <Box
  sx={{
    backgroundImage: `url(${Landing})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: 15,
    height: '600px', // Set the desired height
    backgroundPosition: 'center',
  }}
  
/>
<Typography variant="h2" className={classes.overlayText}>Welcome To Sage Learning Institute</Typography>

          <Typography variant="h4" gutterBottom sx={{ mt: 5, textAlign: 'center' }} >
            Courses
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.root}>
              <Card
  className={classes.cardHover}
  style={{
    background: 'linear-gradient(135deg,rgb(142, 83, 43, 0.25), rgb(30, 30, 30) ',borderRadius: 50,backdropFilter: 'blur(10px)'
  }}
>
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ mt: 5, textAlign: 'center' }}>
                      Department of business and finance
                    </Typography>
                    <Typography sx={{ mt: 5 }}>
                      * Modern accountancy and auditing with Peachtree.<br />
                      * IFRS,IPSAS, QuickBooks, and Peachtree<br />
                      * Banking, Insurance and Capital market<br />
                      * Business Management and Marketing<br />
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 5, textAlign: 'center' }}>
                      Regular/Extension
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
            <Card
  className={classes.cardHover}
  style={{
    background: 'linear-gradient(135deg,rgb(142, 83, 43, 0.25), rgb(30, 30, 30)',borderRadius: 50, backdropFilter: 'blur(10px)'
  }}
>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ mt: 5, textAlign: 'center' }}>
                    Department of Information Technology
                  </Typography>
                  <Typography sx={{ mt: 5 }}>
                    * Web development (full-stack program)<br />
                    * Fundamental programming<br />
                    * CISCO and Computer Networking<br />
                    * Basic operating computer and maintenance<br />
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 5, textAlign: 'center' }}>
                    Reguar/Extension
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
            <Card
  className={classes.cardHover}
  style={{
    background: 'linear-gradient(135deg,rgb(142, 83, 43, 0.25), rgb(30, 30, 30)',borderRadius: 50, backdropFilter: 'blur(10px)'
  }}
>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ mt: 5, textAlign: 'center' }}>
                    Department of Designing Software
                  </Typography>
                  <Typography sx={{ mt: 5 }}>
                    * Graphics design with video editing and digital marketing<br />
                    * Architectural software<br />
                    * Interior design<br />
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 5, textAlign: 'center' }}>
                    Reguar/Extension
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
            <Card
  className={classes.cardHover}
  style={{
    background: 'linear-gradient(135deg,rgb(142, 83, 43, 0.25), rgb(30, 30, 30)',borderRadius: 50, backdropFilter: 'blur(10px)'
  }}
>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ mt: 5, textAlign: 'center' }}>
                    Department of Language
                  </Typography>
                  <Typography sx={{ mt: 5 }}>
                    * Dutch,
                    French,
                    Arabic< br />
                    * Amharic,
                    Geez,
                    Afaan Oromo,
                    Somali
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 5, textAlign: 'center' }}>
                  Reguar/Extension
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
            <Card
  className={classes.cardHover}
  style={{
    background: 'linear-gradient(135deg,rgb(142, 83, 43, 0.25), rgb(30, 30, 30)',borderRadius: 50, backdropFilter: 'blur(10px)'
  }}
>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ mt: 5, textAlign: 'center' }}>
                    International Exam Preparation,
                  </Typography>
                  <Typography sx={{ mt: 5 }}>
                  * SAT 
                  GRE, 
                  ETS, 
                  IELTS, 
                  TOEFL
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 5 ,textAlign: 'center' }}>
                  Reguar/Extension
                  </Typography>
                </CardContent>
              </Card>
            </Grid>



            <Grid item xs={12} sm={6} md={4}>
            <Card
  className={classes.cardHover}
  style={{
    background: 'linear-gradient(135deg,rgb(142, 83, 43, 0.25), rgb(30, 30, 30)',borderRadius: 50, backdropFilter: 'blur(10px)'
  }}
>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ mt: 5, textAlign: 'center' }}>
                    Social Science
                  </Typography>
                  <Typography>
                  * Journalism
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 5, textAlign: 'center' }}>
                  Reguar/Extension
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

          </Grid>


          {/* Add the News section */}
          <Typography variant="h4" id="News" sx={{ mt: 5, textAlign: 'center' }}>
  Announcements
</Typography>
{/* 
<Slider {...settings}>
{slideItems.map((item) => (
  <div key={item.id}>
    <h3>{item.title}</h3>
    <p>{item.content}</p>
  </div>
))}
</Slider> */}

<Grid container spacing={3}>
  {slideItems.map((newsItem) => (
    <Grid item xs={12} sm={6} md={4} key={newsItem.id}>
      <Card
        className={classes.cardHover}
        style={{
          background: 'linear-gradient(135deg, rgb(254, 203, 35, 0.25), rgba(128, 0, 0, 0.25), rgba(255, 255, 255, 0.25))',borderRadius: 50, // Red gradient
          backdropFilter: 'blur(10px)',
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ mt: 5, textAlign: 'center' }}>
            {newsItem.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 5 }}>
  {newsItem.content}
</Typography>

        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

          {/* End of News section */}
    
          <Box mt={8}>
  {/* About section */}
  <Typography variant="h3" id="About" sx={{ mt: 5, textAlign: 'center' }}>
  About Us
</Typography>

<Typography sx={{ mt: 5, textAlign: 'center', marginLeft: '200px', marginRight: '200px'  }}>
  Welcome to Sage Institute, your gateway to excellence in education. Established with a commitment to empower
  individuals through knowledge and skills, we offer a diverse range of courses to shape your future and career.{' '}
  At Sage Institute, we believe that education is a transformative journey, and we are here to guide you every step
  of the way. Our institute is dedicated to fostering an environment of innovation, creativity, and intellectual growth.{' '}
  Our dedicated team of educators and professionals are committed to providing you with the highest quality of education.
  Whether you are pursuing a career in finance, technology, design, language, or preparing for international exams,
  Sage Institute is your partner in success.{' '}
  Thank you for choosing Sage Institute as your educational destination. We look forward to helping you achieve your dreams
  and reach new heights in your academic and professional journey.
</Typography>
<Typography variant="h4" id="About" sx={{ mt: 5, textAlign: 'center' }}>
  Meet the Team
</Typography>
<Grid container spacing={2} sx={{ mt: 5 }}>
  {/* Team Member 1 */}
  <Grid item xs={12} sm={6} md={3}>
    <Avatar alt="Team Member 1" src={teamMember1} sx={{ width: 150, height: 150, margin: '0 auto' }} />
    <Typography variant="subtitle1" sx={{ textAlign: 'center', marginTop: 2 }}>John Doe</Typography>
    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>Role: Developer</Typography>
  </Grid>

  {/* Team Member 2 */}
  <Grid item xs={12} sm={6} md={3}>
    <Avatar alt="Team Member 2" src={teamMember2} sx={{ width: 150, height: 150, margin: '0 auto' }} />
    <Typography variant="subtitle1" sx={{ textAlign: 'center', marginTop: 2 }}>Jane Smith</Typography>
    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>Role: Designer</Typography>
  </Grid>

  {/* Team Member 3 */}
  <Grid item xs={12} sm={6} md={3}>
    <Avatar alt="Team Member 3" src={teamMember3} sx={{ width: 150, height: 150, margin: '0 auto' }} />
    <Typography variant="subtitle1" sx={{ textAlign: 'center', marginTop: 2 }}>Alice Johnson</Typography>
    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>Role: Manager</Typography>
  </Grid>

  {/* Team Member 4 */}
  <Grid item xs={12} sm={6} md={3}>
    <Avatar alt="Team Member 4" src={teamMember4} sx={{ width: 150, height: 150, margin: '0 auto' }} />
    <Typography variant="subtitle1" sx={{ textAlign: 'center', marginTop: 2 }}>Bob Williams</Typography>
    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>Role: Instructor</Typography>
  </Grid>
</Grid>
<Box sx={{ mt: 8 }}>
  <Typography variant="h4" id="Contact" sx={{ mt: 5, textAlign: 'center' }}>
    Contact Us
  </Typography>
  <Grid container spacing={3} sx={{ mt: 5 }}>
    {/* Contact Information */}
    <Grid item xs={12} md={6}>
      <Typography variant="h5" gutterBottom>
        Contact Information
      </Typography>
      <Typography variant="body1">
        If you have any questions or need assistance, please feel free to contact us using the information below:
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> <a href="mailto:contact@sageinstitute.com">contact@sageinstitute.com</a>
      </Typography>
      <Typography variant="body1">
        <strong>Phone:</strong> <a href="tel:+1234567890">+ (251) 906-777-799</a>
      </Typography>
    </Grid>

    {/* Google Map */}
    <Grid item xs={12} md={6}>
      <Typography variant="h5" gutterBottom>
        Location
      </Typography>
      <Typography variant="body1">
        You can find us at the following address:
      </Typography>
      <Typography variant="body1">
        <strong>Address:</strong>Eliana Mall Piazza, Churchill Avenue, Addis Ababa 1000, Ethiopia
      </Typography>
      <Box sx={{ mt: 2  }}>
        {/* Replace the `src` with your Google Map embed URL */}
        <iframe
        
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3649274708864!2d38.748539124585484!3d9.030436138967382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b113e0daab%3A0x8a821180a5fb4dbd!2sSage%20Training%20Institute!5e0!3m2!1sen!2sus!4v1692990170956!5m2!1sen!2sus"
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: 15 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </Box>
    </Grid>

    {/* Telegram Link */}
    <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Join Us on Telegram
      </Typography>
      <Typography variant="body1">
        Stay updated with our latest news and announcements on Telegram.
      </Typography>
      <Button
        variant="contained"
        color="inherit"
                style={{ backgroundColor: 'rgb(254, 203, 35)', color: 'white', padding: '8px 16px' }}
        href="https://t.me/SageInstitute"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ mt: 2 }}
      >
        Join Telegram
      </Button>
    </Grid>
  </Grid>
</Box>



</Box>


        </Box>
        {/* Add the Dialog component */}

        <Dialog
          open={openLoginDialog}
          onClose={handleDialogClose}
          PaperProps={{
            sx: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set the background color to your desired color
              borderRadius: '25px', // Set the border radius if needed
              border: 'solid 5px', // Add a border if needed
              borderColor: '#210', // Set the border color (you can replace #000 with your desired color)
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Add a subtle shadow effect
            },
          }}
        >
          {/* Render the Login component from the separate file */}
          <Login handleClose={handleDialogClose} />
        </Dialog>


        <Dialog
          open={openSignupDialog}
          onClose={handleDialogClose}
          PaperProps={{
            sx: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set the background color to your desired color
              borderRadius: '25px', // Set the border radius if needed
              border: 'solid 5px', // Add a border if needed
              borderColor: '#020', // Set the border color (you can replace #000 with your desired color)
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Add a subtle shadow effect
            },
          }}
        >
          {/* Render the SignUpPage component from the separate file */}
          <SignUpPage handleClose={handleDialogClose} />
        </Dialog>

      </Box>
    </ThemeProvider>


  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};


export default DrawerAppBar;

