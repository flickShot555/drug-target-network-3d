import { Layout, ConfigProvider } from "antd";
import Navbar from "./components/Navbar"; // Ensure correct path
import DataProcessor from "./components/DataProcessor";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // Import the CSS file
import DataProcessor2 from "./components/DataProcessor2";
import DataProcessor3 from "./components/DataProcessor3";
import DataProcessor4 from "./components/DataProcessor4";
import DataProcessor5 from "./components/DataProcessor5";

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
            <Route path="/data2" element={<DataProcessor2 />} /> {/* /data route */}
            <Route path="/data3" element={<DataProcessor3 />} /> {/* /data route */}
            <Route path="/data4" element={<DataProcessor4 />} /> {/* /data route */}
            <Route path="/data5" element={<DataProcessor5 />} /> {/* /data route */}
           <Route path="*" element={<p>ENter the current path</p>} /> {/* Fallback for unknown routes */}
          </Routes>

          {/* Footer could go here */}
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
