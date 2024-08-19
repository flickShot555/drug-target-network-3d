import React, { useRef, useEffect } from "react";
import { ForceGraph3D } from "react-force-graph";

const ForceNetworkGraph = ({ graphData }) => {
  const fgRef = useRef();

  useEffect(() => {
    console.log(fgRef, "fgref");
    if (fgRef.current) {
      const fg = fgRef.current;

      // Customize force layout here, if needed
      fg.d3Force("link").distance((link) => 30);
      fg.d3Force("charge").strength(-120);
    }
  }, [graphData]); // Add graphData as a dependency to re-render on data change

  return (
    <ForceGraph3D
      ref={fgRef}
      graphData={graphData}
      nodeAutoColorBy="group"
      nodeLabel="id"
      linkDirectionalParticles={2}
      linkDirectionalParticleSpeed={(d) => d.value * 0.001}
      linkWidth={(link) => Math.sqrt(link.value)}
      linkColor={() => "rgba(255, 255, 255, 0.6)"}
    />
  );
};

export default ForceNetworkGraph;
