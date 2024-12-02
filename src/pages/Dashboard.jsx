import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TaskWidget from '../components/TaskWidget';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Navbar />
        <TaskWidget />
      </div>
    </div>
  );
};

export default Dashboard;
