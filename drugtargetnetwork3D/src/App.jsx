import { Layout, ConfigProvider, Spin } from "antd";
import Navbar from "./components/Navbar";
import DataProcessor from "./components/DataProcessor";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Get dark mode state from Redux
  const OriginalData = useSelector((state) => state.data.OriginalData); // Get OriginalData from Redux
  const isLoading = useSelector((state) => state.loader.isLoading); // Get the loader state from Redux

  // Log the OriginalData for debugging
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
      }}
    >
      <Router>
        <Layout>
          {/* Conditionally render the loader */}
          {isLoading && (
            <div className="loader-overlay">
              <Spin tip="Loading..." size="large" />
            </div>
          )}

          <Navbar />  

          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<DataProcessor />} /> {/* Default route */}
            <Route path="*" element={<p>Enter the current path</p>} /> {/* Fallback for unknown routes */}
          </Routes>

          {/* Footer could go here */}
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
