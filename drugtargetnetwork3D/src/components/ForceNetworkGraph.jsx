import  { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { ForceGraph3D } from "react-force-graph";

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

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        overflow: "hidden",
        backgroundColor: isDarkMode ? "#000000" : "#ffffff", // Background color based on theme
      }}
    >
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeThreeObject={getNodeShape} // Custom node shape
        nodeLabel="id"
        linkDirectionalParticles={2}
        linkWidth={1.5}
        linkDirectionalParticleSpeed={( ) => 0.01}
        linkDirectionalParticleWidth={1} // Set the particle width
        linkDirectionalParticleColor={(link) => {
          if (link.matric === "pIC50") {
            return isDarkMode ? "lightpurple" : "purple"; // Adjust color based on theme
          } else if (link.matric === "pEC50") {
            return isDarkMode ? "lightgrey" : "grey"; // Adjust color based on theme
          } else if (link.matric === "pGI50") {
            return isDarkMode ? "lightgreen" : "green"; // Adjust color based on theme
          }
        }}
        linkColor={generateDataSet || (isDarkMode ? "#ffffff" : "#000000")} // Use the color property from the link data
        height={600}
        backgroundColor={isDarkMode ? "#000000" : "#ffffff"} // Background color based on theme
      />
    </div>
  );
};

export default ForceNetworkGraph;
