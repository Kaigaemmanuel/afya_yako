// Home.js
import React from 'react';
import Navbar from '../common/Navbar';
import FloatingActionButton from '../common/FloatingActionButton';

const Home = () => {
  return (
    <div>
      <Navbar username="Dr. Irene Tumain Kafuma" />
      {/* Add your home page content here */}
      <FloatingActionButton />
    </div>
  );
}

export default Home;
