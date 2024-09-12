// import React from "react";
import { Layout, ConfigProvider } from "antd";
import Navbar from "./components/Navbar"; // Ensure correct path
import "./App.css"; // Import the CSS file
import DataProcessor from "./components/DataProcessor";
import { useSelector } from "react-redux";

const App = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Get dark mode state from Redux
  const OriginalData = useSelector((state) => state.data.OriginalData); // Get dark mode state from Redux
  console.log(OriginalData, "OriginalData");
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: isDarkMode ? "#001529" : "#1890ff",
          colorTextBase: isDarkMode ? "#fff" : "#000",
          colorBgBase: isDarkMode ? "black" : "#f9f9f9",
          colorBorder: isDarkMode ? "#444" : "#d9d9d9",
        },
      }}>
      <Layout>
        <Navbar />
        <DataProcessor />
        {/* <Footer /> */}
      </Layout>
    </ConfigProvider>
  );
};

export default App;
