import { Layout, ConfigProvider } from "antd";
import Navbar from "./components/Navbar"; // Ensure correct path
import DataProcessor from "./components/DataProcessor";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // Import the CSS file
const App = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Get dark mode state from Redux
  const OriginalData = useSelector((state) => state.data.OriginalData); // Get OriginalData from Redux

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
      }}>
      <Router>
        <Layout>
          <Navbar />  

          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<DataProcessor />} /> {/* Default route */}
           <Route path="*" element={<p>ENter the current path</p>} /> {/* Fallback for unknown routes */}
          </Routes>

          {/* Footer could go here */}
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
