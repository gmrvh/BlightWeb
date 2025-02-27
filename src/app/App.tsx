import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';

const HomePage = () => {
  return (
    <div className="flex container mx-auto  ">
      {/* Sidebar component */}
      <Dashboard/>
      
    </div>
  );
};

export default HomePage;