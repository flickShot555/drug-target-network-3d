import React from 'react';
import { Layout } from 'antd';
import Navbar from './components/Navbar.jsx'; // Ensure correct path

import './App.css'; // Import the CSS file

const { Header } = Layout;

// Sample Data for Dropdowns
const dropdownOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const handleChange = (value) => {
  console.log('Selected:', value);
};

const App = () => {
  return (
    <Layout>
      <Navbar />

    </Layout>
  );
};

export default App;
