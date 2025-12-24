import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Badge, Menu, MenuItem, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';

// Base path for GitHub Pages
const BASE_PATH = '/project-test-frontend-ics';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <AppBar position="static" elevation={0} className="!bg-gradient-to-r from-blue-700 to-blue-900 !shadow-lg">
        <Toolbar className="!px-4">
          {/* Mobile Menu Button */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileMenu}
            className="!mr-2 lg:!hidden"
          >
            <MenuIcon />
          </IconButton>

          {/* Logo - Desktop */}
          <div className="hidden lg:flex items-center gap-3 flex-1">
            <img
              src={`${BASE_PATH}/images/ics-logo.jpg`}
              alt="ICS Logo"
              className="w-10 h-10 rounded-xl object-cover"
            />
            <span className="text-white font-bold text-xl font-kanit">ICS</span>
          </div>

          {/* Right Section */}
          <Box className="flex items-center gap-2 sm:gap-4 ml-auto">
            {/* Notifications */}
            <IconButton
              color="inherit"
              className="!text-white hover:!bg-white/10"
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Profile Section */}
            <Box
              className="flex items-center gap-2 cursor-pointer hover:bg-white/10 px-2 py-1 rounded-lg transition-colors"
              onClick={handleMenu}
            >
              <Avatar
                sx={{ width: 40, height: 40 }}
                // src={`${BASE_PATH}/images/Rectangle 296.png`}
                src={`https://avatars.githubusercontent.com/u/76421734?v=4`}
                alt="tii-kittinan"
                className="!border-2 !border-white/30"
              />
              <div className="hidden sm:block text-left">
                <p className="text-white text-sm font-semibold font-kanit">tii-kittinan</p>
                <p className="text-blue-200 text-xs">Programmer</p>
              </div>
              <KeyboardArrowDownIcon className="hidden sm:!block !text-white" />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          className: '!mt-2 !rounded-xl shadow-lg',
        }}
      >
        <MenuItem onClick={handleClose} className="!gap-2">
          <span>👤</span> Profile
        </MenuItem>
        <MenuItem onClick={handleClose} className="!gap-2">
          <span>⚙️</span> Settings
        </MenuItem>
        <MenuItem onClick={handleClose} className="!gap-2">
          <span>🚪</span> Logout
        </MenuItem>
      </Menu>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img
                src={`${BASE_PATH}/images/ics-logo.jpg`}
                alt="ICS Logo"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <span className="text-gray-800 font-bold text-xl font-kanit">ICS</span>
            </div>
            <IconButton onClick={toggleMobileMenu}>
              <MenuIcon />
            </IconButton>
          </div>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
