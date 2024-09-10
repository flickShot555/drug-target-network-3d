import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import Navbar from './components/Navbar'; // Ensure correct path
import './App.css'; // Import the CSS file
import DataProcessor from './components/DataProcessor';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';

const App = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Get dark mode state from Redux

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: isDarkMode ? '#001529' : '#1890ff',
          colorTextBase: isDarkMode ? '#fff' : '#000',
          colorBgBase: isDarkMode ? 'black' : '#f9f9f9',
          colorBorder: isDarkMode ? '#444' : '#d9d9d9',
        },
      }}
    >
      <Layout>
        <Navbar />
        <DataProcessor />
        <Footer />
      </Layout>
    </ConfigProvider>
  );
};

export default App;
