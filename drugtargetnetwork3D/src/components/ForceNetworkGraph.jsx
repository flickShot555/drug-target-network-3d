import React, { useRef, useEffect } from "react";
import { ForceGraph3D } from "react-force-graph";
// import * as THREE from "three";

const ForceNetworkGraph = ({ graphData  ,getNodeShape}) => {
  const fgRef = useRef();
  
  // Define a set of colors for different categories

  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;

      // Customize force layout here, if needed
      fg.d3Force("link").distance((link) => 30);
      fg.d3Force("charge").strength(-120);
      
    }
  }, [graphData]);

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
        linkDirectionalParticleSpeed={(d) => d.value * 0.001}
        linkWidth={(link) => Math.sqrt(link.value)}
        linkColor={() => "black"}
        width={window.innerWidth * 0.6}
        height={600}
        backgroundColor="white"
      />
    </div>
  );
};

export default ForceNetworkGraph;
