// import React from 'react';
import { Checkbox } from "antd";
import React from "react";

const LegendProtien = ({ legendData }) => {

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

  // Extract unique Disease_class and Phase values

  // Function to render checkboxes for a given list of values
  const renderCheckboxList = (list, key) =>
    list.map((value) => {
      const isChecked = legendData.nodes.some((node) => node[key] === value);
      console.log("value" , value  )
      return (
        <li key={value} style={{ listStyleType: "none" }}>
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
