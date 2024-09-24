import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ForceGraph3D } from "react-force-graph";
import { Button } from "antd";
import PopupTable from "./PopupTable"; // Assuming PopupTable is in the same directory
import "../components/Stylesfiles/forceGraph.css";

const ForceNetworkGraph = ({ graphData, getNodeShape, generateDataSet }) => {
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
      fg.d3Force("link").distance(() => 30);
      fg.d3Force("charge").strength(-120);
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
  const handleNodeClick = (node) => {
    setSelectedNode(node.id);
    // Dummy table data for now, replace with PHP call later
    setTableData([
      { key: "1", field: "CELL_LINE_NAME", value: "NCI-H720" },
      { key: "2", field: "CELL_LINE_SYNONYM", value: "H720; H-720; NCIH720" },
      { key: "3", field: "RRID", value: "CVCL_1583" },
      { key: "4", field: "COSMIC_ID", value: "687600" },
      { key: "5", field: "SANGER_MODEL_ID", value: "SIDM01120" },
      { key: "6", field: "TCGA_STUDY_CODE", value: "UNCLASSIFIED" },
      { key: "7", field: "ONCOTREE_CODE", value: "LUCA" },
      { key: "8", field: "ONCOTREE_LINEAGE", value: "Lung" },
    ]);
    setIsModalVisible(true); // Open Modal
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
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
        linkWidth={1.5}
        linkDirectionalParticleSpeed={() => 0.01}
        linkDirectionalParticleWidth={1}
        linkColor={generateDataSet || (isDarkMode ? "#ffffff" : "#000000")}
        height={600}
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
