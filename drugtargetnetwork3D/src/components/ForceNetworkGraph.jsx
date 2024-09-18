import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { ForceGraph3D } from "react-force-graph";
import { Button } from "antd"; // Assuming you're using Ant Design for buttons

// eslint-disable-next-line react/prop-types
const ForceNetworkGraph = ({ graphData, getNodeShape, generateDataSet }) => {
  const fgRef = useRef();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;

      // Customize force layout here, if needed
      fg.d3Force("link").distance(() => 30);
      fg.d3Force("charge").strength(-120);
    }
  }, [graphData]);

  // Add node drag event handler
  const handleNodeDrag = (node) => {
    node.fx = node.x;
    node.fy = node.y;
    node.fz = node.z;
  };

  // Add node drag end event handler to stop forces after dragging
  const handleNodeDragEnd = (node) => {
    node.fx = node.x;
    node.fy = node.y;
    node.fz = node.z;
  };

  // Function to reset the nodes so they move freely again
  const resetNodePositions = () => {
    graphData.nodes.forEach((node) => {
      // Reset fixed positions, allowing nodes to move freely again
      node.fx = null;
      node.fy = null;
      node.fz = null;
    });

    // Restart the force simulation so nodes can move to new positions based on the layout
    fgRef.current.d3ReheatSimulation();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        overflow: "hidden",
        backgroundColor: isDarkMode ? "#000000" : "#ffffff", // Background color based on theme
      }}
    >
      {/* Reset Button */}
      <Button onClick={resetNodePositions} style={{ marginBottom: '10px' }}>
        Reset Nodes
      </Button>

      <ForceGraph3D
  ref={fgRef}
  graphData={graphData}
  nodeThreeObject={getNodeShape}
  nodeLabel={(node) => {
    // This returns a custom HTML structure
    return `<div style="background-color: black; color: white; padding: 5px; border-radius: 4px;">${node.id}</div>`;
  }}
  linkDirectionalParticles={2}
  linkWidth={1.5}
  linkDirectionalParticleSpeed={() => 0.01}
  linkDirectionalParticleWidth={1}
  linkDirectionalParticleColor={(link) => {
    if (link.matric === "pIC50") {
      return isDarkMode ? "lightpurple" : "purple";
    } else if (link.matric === "pEC50") {
      return isDarkMode ? "lightgrey" : "grey";
    } else if (link.matric === "pGI50") {
      return isDarkMode ? "lightgreen" : "green";
    }
  }}
  linkColor={generateDataSet || (isDarkMode ? "#ffffff" : "#000000")}
  height={600}
  backgroundColor={isDarkMode ? "#000000" : "#ffffff"}
  onNodeDrag={handleNodeDrag}
  onNodeDragEnd={handleNodeDragEnd}
/>

    </div>
  );
};

export default ForceNetworkGraph;
