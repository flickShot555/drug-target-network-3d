import React, { useRef, useEffect } from "react";
import { ForceGraph3D } from "react-force-graph";

const ForceNetworkGraph = ({ graphData }) => {
  console.log("graphData graphData" , graphData)
  const fgRef = useRef();

  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;
      console.log(fg , "fg")

      // Customize force layout here, if needed
      fg.d3Force("link").distance((link) => 30);
      fg.d3Force("charge").strength(-120);
    }
  }, [graphData]);

  return (
    <div
      style={{
        width: "100%", // Ensures the graph takes up 100% of the parent container's width
        height: "600px", // You can adjust this height to fit your layout
        overflow: "hidden",
      }}
    >
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeLabel="id"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={(d) => d.value * 0.001}
        linkWidth={(link) => Math.sqrt(link.value)}
        // linkColor={() => "rgba(255, 255, 255, 0.6)"}
        // linkColor={() => "black"}
        width={window.innerWidth * 0.8} // Explicitly setting the width
        height={600} // Explicitly setting the height
        backgroundColor="white"
      />
    </div>
  );
};

export default ForceNetworkGraph;
