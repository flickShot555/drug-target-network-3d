import React from 'react';
import { Layout , Row } from 'antd';
import Navbar from './components/Navbar.jsx'; // Ensure correct path
import './App.css'; // Import the CSS file
import DataProcessor from './components/DataProcessor.jsx';
import Footer from './components/Footer.jsx';
const App = () => {
  return (
    <Layout>
      <Navbar />
      <DataProcessor/>
      <Footer/>
    </Layout>
  );
};
export default App;
