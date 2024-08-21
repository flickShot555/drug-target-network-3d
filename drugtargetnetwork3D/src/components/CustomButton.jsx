import React from 'react';
import { Button } from 'antd';

const CustomButton = ({ children }) => {
  return (
    <Button
      style={{
        background: 'rgb(27,150,134)' ,
        background: 'linear-gradient(90deg, rgba(141,158,156,1) 9%, rgba(113,214,233,1) 91%)',
        color: 'white',
        border: 'none',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '0.888rem',
        margin: '6px 2px',
        cursor: 'pointer',
        borderRadius: '4px',
        // padding: '10px 20px', // Adjusted padding for better appearance
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

// import React, { useRef, useEffect } from "react";
// import { ForceGraph3D } from "react-force-graph";
// import * as THREE from "three";

// const ForceNetworkGraph = ({ graphData }) => {
//   const fgRef = useRef();
//   const child_colors = [
//     "#1f77b4",
//     "#ff7f0e",
//     "#2ca02c",
//     "#d62728",
//     "#9467bd",
//     "#8c564b",
//     "#e377c2",
//     "#7f7f7f",
//     "#17becf",
//     "#E75480",
//     "#ff9896",
//     "#98df8a",
//     "#aec7e8",
//     "#ffbb78",
//     "#FFD700",
//     "#00CED1",
//   ];
//   const getNodeColor = (node) => {
//     const category = node.class;
//     if (category === "Approved") return "#0bc00f";
//     if (category === "Phase I") return "#4372c4";
//     if (category === "Phase II") return "#fe0000";
//     if (category === "Phase III") return "#9B35C8";
//     if (category === "" || node.class === "Unknown") return "#fe8f01";
//     if (category === "Preclinical") return "#f99cc8";
//     if (category === "Bone") return child_colors[0];
//     if (category === "Skin") return child_colors[1];
//     if (category === "Central Nervous System") return child_colors[2];
//     if (category === "Lung") return child_colors[3];
//     if (category === "Peripheral Nervous System") return child_colors[4];
//     if (category === "Soft Tissue") return child_colors[5];
//     if (category === "Esophagus") return child_colors[6];
//     if (category === "Breast") return child_colors[7];
//     if (category === "Head and Neck") return child_colors[8];
//     if (category === "Haematopoietic and Lymphoid") return child_colors[9];
//     if (category === "Bladder") return child_colors[10];
//     if (category === "Kidney") return child_colors[11];
//     if (category === "Endometrium") return child_colors[12];
//     if (category === "Lymphoid") return child_colors[13];
//     if (category === "Adrenal Gland") return child_colors[14];
//     if (category === "Bowel") return child_colors[15];
//     if (category === "Pancreas") return child_colors[0]; // Reuse color
//     if (category === "Large Intestine") return child_colors[1];
//     if (category === "Ovary") return child_colors[2];
//     if (category === "Stomach") return child_colors[3];
//     if (category === "Biliary Tract") return child_colors[4];
//     if (category === "Small Intestine") return child_colors[5];
//     if (category === "Placenta") return child_colors[6];
//     if (category === "Prostate") return child_colors[7];
//     if (category === "Testis") return child_colors[8];
//     if (category === "Uterus") return child_colors[9];
//     if (category === "Vulva") return child_colors[10];
//     if (category === "Thyroid") return child_colors[11];
//     if (category === "Cervix") return child_colors[12];
//     if (category === "Liver") return child_colors[13];
//     if (node.class === "Behavior mechanisms") return "steelblue";
//     if (node.class === "Cardiovascular") return "red";
//     if (node.class === "Chemically-Induced disorders") return "orange";
//     if (node.class === "Congenital and neonatal") return "yellow";
//     if (node.class === "Digestive system") return "green";
//     if (node.class === "Endocrine system") return "blue";
//     if (node.class === "Eye") return "indigo";
//     if (node.class === "Female urogenital") return "violet";
//     if (node.class === "Genetic inborn") return "brown";
//     if (node.class === "Hemic and lymphatic") return "pink";
//     if (node.class === "Immune system") return "cyan";
//     if (node.class === "Infections") return "purple";
//     if (node.class === "Male urogenital") return "teal";
//     if (node.class === "Mental disorders") return "gray";
//     if (node.class === "Musculoskeletal") return "lime";
//     if (node.class === "Neoplasm") return "maroon";
//     if (node.class === "Nervous system") return "navy";
//     if (node.class === "Nutritional and Metabolic") return "olive";
//     if (node.class === "Occupational diseases") return "pink";
//     if (node.class === "Otorhinolaryngologic") return "salmon";
//     if (node.class === "Pathological conditions") return "turquoise";
//     if (node.class === "Respiratory tract") return "sienna";
//     if (node.class === "Skin and connective tissue") return "gold";
//     if (node.class === "Stomatognathic") return "plum";
//     if (node.class === "Wounds and injuries") return "coral";
//     return "black"; // Default color for unrecognized categories
//   };

//   // Function to return a custom 3D object for each node based on its type
//   const getNodeShape = (node) => {
//     const color = getNodeColor(node);

//     let geometry;
//     if (node.type === "parent_source") {
//       geometry = new THREE.SphereGeometry(5); // Circle (Sphere)
//     } else if (node.type === "protein_child") {
//       geometry = new THREE.BoxGeometry(10, 10, 10); // Rectangle (Box)
//     } else if (node.type === "disease_child") {
//       geometry = new THREE.ConeGeometry(7, 12, 3); // Triangle (Cone)
//     } else {
//       geometry = new THREE.SphereGeometry(5); // Default shape (Sphere)
//     }

//     const material = new THREE.MeshBasicMaterial({ color });
//     return new THREE.Mesh(geometry, material);
//   };

//   useEffect(() => {
//     console.log("graphData in graph" ,graphData )
//     if (fgRef.current) {
//       const fg = fgRef.current;

//       // Customize force layout here, if needed
//       fg.d3Force("link").distance((link) => 30);
//       fg.d3Force("charge").strength(-120);
//     }
//   }, [graphData]);

//   return (
//     <div
//       style={{
//         width: "100%", // Ensures the graph takes up 100% of the parent container's width
//         height: "600px", // You can adjust this height to fit your layout
//         overflow: "hidden",
//       }}>
//       <ForceGraph3D
//         ref={fgRef}
//         graphData={graphData}
//         nodeThreeObject={getNodeShape} // Custom node shape
//         nodeLabel="id"
//         linkDirectionalParticles={2}
//         linkDirectionalParticleSpeed={(d) => d.value * 0.001}
//         linkWidth={(link) => Math.sqrt(link.value)}
//         linkColor={() => "black"}
//         width={window.innerWidth * 0.8} // Explicitly setting the width
//         height={600} // Explicitly setting the height
//         backgroundColor="white"
//       />
//     </div>
//   );
// };

// export default ForceNetworkGraph;

// src/components/DataProcessor.js
// 