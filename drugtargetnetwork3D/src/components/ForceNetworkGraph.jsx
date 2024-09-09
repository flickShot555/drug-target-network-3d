import React, { useRef, useEffect } from "react";
import { ForceGraph3D } from "react-force-graph";

const ForceNetworkGraph = ({ graphData, getNodeShape, generateDataSet }) => {
  const fgRef = useRef();

  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;

      // Customize force layout here, if needed
      fg.d3Force("link").distance((link) => 30);
      fg.d3Force("charge").strength(-120);
    }
  }, [graphData]);

  // Function to handle node dragging and prevent the node from moving back
  const handleNodeDragEnd = (node) => {
    node.fx = node.x; // Fix the node's x position
    node.fy = node.y; // Fix the node's y position
    node.fz = node.z; // Fix the node's z position
  };

  return (
    <div 
      style={{
        width: "100%",
        height: "600px",
        overflow: "hidden",
      }}>
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeThreeObject={getNodeShape} // Custom node shape
        nodeLabel="id"
        linkDirectionalParticles={2}
        linkWidth={3}
        linkDirectionalParticleSpeed={(d) => 0.01}
        linkDirectionalParticleWidth={1.5} // Set the particle width
        linkDirectionalParticleColor={(link) => {
          if (link.matric === "pIC50") {
            return "purple";
          } else if (link.matric === "pEC50") {
            return "grey";
          } else if (link.matric === "pGI50") {
            return "green";
          }
        }} // Set the particle color
        linkColor={generateDataSet || "black"} // Use the color property from the link data
        height={600}
        backgroundColor="white"
        onNodeDragEnd={handleNodeDragEnd} // Add drag end event to fix node position
      />
    </div>
  );
};

export default ForceNetworkGraph;
