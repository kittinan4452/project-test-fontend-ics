import React from 'react';
import { AppBar, Toolbar,  IconButton, Avatar, Badge, Menu, MenuItem, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Profile from "../../public/images/Profile.png"
import Sidebar from './Sidebar';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar   position="static" color="primary">
      
      <Toolbar className='static flex justify-end bg-[#134B8A]'>
        <Sidebar/>
      <div className='flex items-center'>
      <div>
        <Badge color="secondary"  variant="dot">
      <NotificationsIcon   fontSize="large" />

      </Badge>
    
      </div>
        <div className='flex items-center space-x-2 ml-2'>
        <Avatar src={Profile} alt="Akkarapol" />
        <h1 className='text-base/[24px]'>Akkalapol</h1>
          <IconButton onClick={handleMenu} color="inherit">
          <KeyboardArrowDownIcon/>
        </IconButton >
        </div>
        </div>
        
        
        
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
