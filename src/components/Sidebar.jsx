import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Sidebar = () => {
  return (
    <div style={{ width: '240px', backgroundColor: '#333', color: '#fff', padding: '20px' }}>
      <h2>Task Manager</h2>
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
