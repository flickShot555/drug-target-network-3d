import React from 'react';
import { Checkbox } from "antd";
import * as THREE from 'three'; // Assuming THREE.js is being used

const LegendProtien = ({legendData}) => {

  const getUniqueValues = (data, key) => {
    const values = data
      .map((item) => item[key])
      .filter((value) => value !== undefined && value !== null); // Filter out undefined or null values
    return [...new Set(values)];
  };

  let MAX_PHASE, ONCOTREE_LINEAGE, DATASET, METRIC;
  if (legendData) {
    MAX_PHASE = getUniqueValues(legendData.nodes, "maxPhase");
    ONCOTREE_LINEAGE = getUniqueValues(legendData.nodes, "oncotreeLineage");
    DATASET = getUniqueValues(legendData.nodes, "dataset");
    METRIC = getUniqueValues(legendData.nodes, "metric");
  }
  const child_colors = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#17becf",
    "#E75480",
    "#ff9896",
    "#98df8a",
    "#aec7e8",
    "#ffbb78",
    "#FFD700",
    "#00CED1",
  ];

  // Function to determine node color based on its category
  const getNodeColor = (node) => {
    const category = node.class;
    if (category === "Approved") return "#0bc00f";
    if (category === "Phase I") return "#4372c4";
    if (category === "Phase II") return "#fe0000";
    if (category === "Phase III") return "#9B35C8";
    if (category === "" || node.class === "Unknown") return "#fe8f01";
    if (category === "Preclinical") return "#f99cc8";
    if (category === "Bone") return child_colors[0];
    if (category === "Skin") return child_colors[1];
    if (category === "Central Nervous System") return child_colors[2];
    if (category === "Lung") return child_colors[3];
    if (category === "Peripheral Nervous System") return child_colors[4];
    if (category === "Soft Tissue") return child_colors[5];
    if (category === "Esophagus") return child_colors[6];
    if (category === "Breast") return child_colors[7];
    if (category === "Head and Neck") return child_colors[8];
    if (category === "Haematopoietic and Lymphoid") return child_colors[9];
    if (category === "Bladder") return child_colors[10];
    if (category === "Kidney") return child_colors[11];
    if (category === "Endometrium") return child_colors[12];
    if (category === "Lymphoid") return child_colors[13];
    if (category === "Adrenal Gland") return child_colors[14];
    if (category === "Bowel") return child_colors[15];
    if (category === "Pancreas") return child_colors[0]; // Reuse color
    if (category === "Large Intestine") return child_colors[1];
    if (category === "Ovary") return child_colors[2];
    if (category === "Stomach") return child_colors[3];
    if (category === "Biliary Tract") return child_colors[4];
    if (category === "Small Intestine") return child_colors[5];
    if (category === "Placenta") return child_colors[6];
    if (category === "Prostate") return child_colors[7];
    if (category === "Testis") return child_colors[8];
    if (category === "Uterus") return child_colors[9];
    if (category === "Vulva") return child_colors[10];
    if (category === "Thyroid") return child_colors[11];
    if (category === "Cervix") return child_colors[12];
    if (category === "Liver") return child_colors[13];
    if (node.class === "Behavior mechanisms") return "steelblue";
    if (node.class === "Cardiovascular") return "red";
    if (node.class === "Chemically-Induced disorders") return "orange";
    if (node.class === "Congenital and neonatal") return "yellow";
    if (node.class === "Digestive system") return "green";
    if (node.class === "Endocrine system") return "blue";
    if (node.class === "Eye") return "indigo";
    if (node.class === "Female urogenital") return "violet";
    if (node.class === "Genetic inborn") return "brown";
    if (node.class === "Hemic and lymphatic") return "pink";
    if (node.class === "Immune system") return "cyan";
    if (node.class === "Infections") return "purple";
    if (node.class === "Male urogenital") return "teal";
    if (node.class === "Mental disorders") return "gray";
    if (node.class === "Musculoskeletal") return "lime";
    if (node.class === "Neoplasm") return "maroon";
    if (node.class === "Nervous system") return "navy";
    if (node.class === "Nutritional and Metabolic") return "olive";
    if (node.class === "Occupational diseases") return "pink";
    if (node.class === "Otorhinolaryngologic") return "salmon";
    if (node.class === "Pathological conditions") return "turquoise";
    if (node.class === "Respiratory tract") return "sienna";
    if (node.class === "Skin and connective tissue") return "gold";
    if (node.class === "Stomatognathic") return "plum";
    if (node.class === "Wounds and injuries") return "coral";
    return "black"; // Default color for unrecognized categories
  };


  // Function to return a custom shape icon for each node based on its type
  const getNodeShapeIcon = (node) => {
    const color = getNodeColor(node);
    let shapeIcon;

    switch (node.type) {
      case "parent_source":
        shapeIcon = "⬛"; // Square
        break;
      case "protein_child":
        shapeIcon = "⚪"; // Circle
        break;
      case "disease_child":
        shapeIcon = "🔺"; // Triangle
        break;
      default:
        shapeIcon = "⚪"; // Default to circle
    }

    return <span style={{ color, marginRight: '8px' }}>{shapeIcon}</span>;
  };

  // Function to render checkboxes for a given list of values
  const renderCheckboxList = (list, key, type) =>
    list.map((value) => {
      const node = legendData.nodes.find((node) => node[key] === value);
      const isChecked = node !== undefined;
      return (
        <li key={value} style={{ listStyleType: "none" }}>
          {getNodeShapeIcon(node)}
          <Checkbox defaultChecked={isChecked}>{value}</Checkbox>
        </li>
      );
    });

  return (
    <div>
      <div className="legend1" id="legend1" style={{ marginLeft: "12px" }}>
        <h5>Drug's max clinical phase</h5>
        <ul>{renderCheckboxList(MAX_PHASE, "maxPhase")}</ul>
        <h5>Tissue</h5>
        <ul>{renderCheckboxList(ONCOTREE_LINEAGE, "oncotreeLineage")}</ul>
        <h5>Data platform</h5>
        <ul>{renderCheckboxList(DATASET, "dataset")}</ul>
        <h5>METRIC</h5>
        <ul>{renderCheckboxList(METRIC, "metric")}</ul>
      </div>
    </div>
  );
};

export default LegendProtien;
