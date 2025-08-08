import React, { useState, useEffect, useRef } from "react";
import { useSelector ,useDispatch  } from "react-redux";
import { ForceGraph3D } from "react-force-graph";
import { Button ,message} from "antd";
import PopupTable from "./PopupTable"; // Assuming PopupTable is in the same directory
import "../components/Stylesfiles/forceGraph.css";
import axios from "axios";
import { setLoading } from "./../app/features/loaderSlice"; // Import loader actions

const ForceNetworkGraph = ({ graphData, getNodeShape, generateDataSet }) => {
  
  const dispatch = useDispatch();
  const fgRef = useRef();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // State for Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;

      // Customize force layout
      fg.d3Force("link").distance(() => 1000);
      fg.d3Force("charge").strength(-200);
    }
  }, [graphData]);

  // Function to reset node positions
  const resetNodePositions = () => {
    graphData.nodes.forEach((node) => {
      node.fx = null; // Free the x-axis position
      node.fy = null; // Free the y-axis position
      node.fz = null; // Free the z-axis position (for 3D)
    });

    // Restart the force simulation so the nodes are repositioned
    if (fgRef.current) {
      fgRef.current.d3ReheatSimulation();
    }
  };

  // Handle Node Dragging
  const handleNodeDrag = (node) => {
    node.fx = node.x;
    node.fy = node.y;
    node.fz = node.z;
  };

  const handleNodeDragEnd = (node) => {
    // Node remains fixed at the position where the drag ended
    node.fx = node.x;
    node.fy = node.y;
    node.fz = node.z;
  };

  // Handle Node Click (for opening the popup modal)
  const handleNodeClick = async (node) => {
    if (node.type === "parent_source") {
      try {
        dispatch(setLoading(true)); // Start global loading
        const response = await axios.post(
          "https://entertainmentbuz.com/drug_target_network/getDataForCompoundTable.php",
          {
            drugName: node.id,
          }
        );
        
      console.log(response.data, "response ");
      
      message.success("success to fetch data.");
      setTableData(response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data.");
      } finally {
        dispatch(setLoading(false)); // Stop global loading
        
    setIsModalVisible(true); // Open Modal
      }
    } else if (node.type === "protein_child") {
      try {
        dispatch(setLoading(true)); // Start global loading
        const response = await axios.post(
          "https://entertainmentbuz.com/drug_target_network/getDataFor3d.php",
          {
            drugName2: node.id,
          }
        );
        
      message.success("success to fetch data.");
      console.log(response.data[0], "response ");
      setTableData(response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data.");
      } finally {
        dispatch(setLoading(false)); // Stop global loading
        
    setIsModalVisible(true); // Open Modal
      }

    }
    setSelectedNode(node.id);

    console.log(node, "node");

  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "75vh",
        overflow: "hidden",
        backgroundColor: isDarkMode ? "#000000" : "#ffffff",
      }}>
      <Button onClick={resetNodePositions} style={{ marginBottom: "10px" }}>
        Reset Nodes
      </Button>

      {/* Force Graph 3D */}
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeThreeObject={getNodeShape}
        onNodeClick={handleNodeClick}
        onNodeDrag={handleNodeDrag}
        onNodeDragEnd={handleNodeDragEnd}
        nodeLabel={(node) => {
          return `<div style="background-color: black; color: white; padding: 5px; border-radius: 4px;">${node.id}</div>`;
        }}
        linkDirectionalParticles={2}
        linkWidth={3}
        linkDirectionalParticleSpeed={() => 0.01}
        linkDirectionalParticleWidth={1}
        linkColor={generateDataSet || (isDarkMode ? "#ffffff" : "#000000")}
        height={650}
        backgroundColor={isDarkMode ? "#000000" : "#ffffff"}
      />

      {/* Popup Table */}
      <PopupTable
        visible={isModalVisible}
        onClose={handleModalClose}
        nodeId={selectedNode}
        tableData={tableData}
      />
    </div>
  );
};

export default ForceNetworkGraph;
