import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Places', icon: <HomeIcon />, path: '/' },
  { label: 'About', icon: <InfoIcon />, path: '/about' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      {/* Navigation Menu */}
      <List className="flex-1 px-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.label} disablePadding className="mb-2">
              <ListItemButton
                onClick={() => navigate(item.path)}
                className={`!rounded-xl transition-all duration-200 ${
                  isActive
                    ? '!bg-gradient-to-r from-blue-600 to-blue-700 !text-white shadow-lg'
                    : '!hover:bg-blue-50 !text-gray-700'
                }`}
              >
                <ListItemIcon className={`!min-w-0 !mr-3 ${isActive ? '!text-white' : '!text-blue-600'}`}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  className="!font-kanit"
                  primaryTypographyProps={{
                    className: `!font-semibold ${isActive ? '!text-white' : '!text-gray-700'}`,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider className="!my-4" />

      {/* Footer Info */}
      <div className="px-4 py-4 text-center">
        <p className="text-xs text-gray-500 font-kanit">© 2024 ICS Places</p>
      </div>
    </div>
  );
}
