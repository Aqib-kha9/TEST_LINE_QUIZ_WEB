import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Leader Board', path: '/leader-board' },
  { label: 'Performance', path: '/quiz-summary' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 240 }}>
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton 
              sx={{ textAlign: 'center' }} 
              onClick={() => navigate(item.path)}
            >
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ 
                  sx: {
                    color: '#333', // Dark text color
                    fontSize: '1.2rem',
                    transition: "color 0.3s ease-in-out",
                    "&:hover": { color: "#1976d2" } // Highlight on hover
                  }
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
            background: "linear-gradient(to right, #cddff5, #ebf2fc) !important",
            color: 'black', // Dark text color for readability
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)', // Soft shadow for subtle effect
            borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
            height: '70px',
            justifyContent: 'center',
            transition: "all 0.3s ease-in-out",
            margin: 0, // Remove margins
            padding: 0, // Remove padding
            width: '100vw', // Full width
            top: 0, // Ensure it sticks to the top
            left: 0, // Ensure it sticks to the left
          }}
      >
        <Toolbar sx={{ height: '64px', px: 2, display: 'flex', justifyContent: 'space-between' }}>
          {/* Animated Menu Icon for Mobile */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' }, 
              transition: "transform 0.3s ease-in-out",
              "&:hover": { 
                transform: "rotate(90deg)", 
                color: "#1976d2", // Highlight on hover
                textShadow: "0px 0px 5px #1976d2" // Subtle glow effect
              }
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Brand Logo Image */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'flex-start', // Align logo to the left
              alignItems: 'center',
              cursor: 'pointer' // Make the logo clickable
            }}
            onClick={() => navigate('/')} // Redirect to Home on click
          >
            <img 
              src={logo} // Replace with your logo path
              alt="Quiz App Logo" 
              style={{ width: '80px', height: '50px' }} // Adjust image size as needed
            />
          </Box>

          {/* Navigation Buttons with Subtle Hover Effect */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 3 }}>
            {navLinks.map((item) => (
              <Button 
                key={item.label} 
                sx={{ 
                  color: 'black', // Dark text color
                  fontSize: "1rem",
                  fontWeight: "bold",
                  position: "relative",
                  "&:hover": { 
                    color: "#1976d2", // Highlight text on hover
                    textShadow: "0px 0px 5px #1976d2" // Subtle glowing effect on hover
                  },
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "3px",
                    bottom: "-5px",
                    left: "50%",
                    backgroundColor: "#1976d2", // Highlight color on hover
                    transition: "width 0.3s ease-in-out, left 0.3s ease-in-out"
                  },
                  "&:hover:after": {
                    width: "100%",
                    left: "0"
                  }
                }} 
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Screens */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, backgroundColor: "linear-gradient(to right, rgba(155, 181, 212, 0.09))"}, // White background for mobile drawer
          margin: 0, // Remove margin
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
