import React from 'react';
import { Layout } from 'antd';
import Navbar from './components/Navbar.jsx'; // Ensure correct path
import './App.css'; // Import the CSS file
import DataProcessor from './components/DataProcessor.jsx';
const App = () => {
  return (
    <Layout>
      <Navbar />
      <DataProcessor/>
    </Layout>
  );
};
export default App;
