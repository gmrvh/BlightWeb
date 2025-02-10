import React from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

const HomePage = () => {
  return (
    <div className="container mx-auto ">
      {/* Sidebar component */}
      <Sidebar />
      <Dashboard/>
      
    </div>
  );
};

export default HomePage;