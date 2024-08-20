import React from 'react';
import { Checkbox } from 'antd';

const LegendProtien = ({ legendData }) => {
    console.log("legendData legendData" ,legendData)
  // Helper function to get unique values from an array of objects
  const getUniqueValues = (data, key) => {
    const values = data
      .map(item => item[key])
      .filter(value => value !== undefined && value !== null); // Filter out undefined or null values
    return [...new Set(values)];
  };

  // Extract unique Disease_class and Phase values
  const MAX_PHASE = getUniqueValues(legendData.nodes, 'MAX_PHASE');
  const ONCOTREE_LINEAGE = getUniqueValues(legendData.nodes, 'ONCOTREE_LINEAGE');

  const DATASET = getUniqueValues(legendData.nodes, 'DATASET');
  
  const METRIC = getUniqueValues(legendData.nodes, 'METRIC');
  // Function to render checkboxes for a given list of values
  const renderCheckboxList = (list, key) => (
      list.map(value => {
        console.log(list ,key )  
      const isChecked = legendData.nodes.some(node => node[key] === value);
      return (
        <li key={value} style={{ listStyleType: "none" }}>
          <Checkbox defaultChecked={isChecked}>{value}</Checkbox>
        </li>
      );
    })
  );

  return (
    <div>
      <div className="legend1" id="legend1" style={{ marginLeft: '12px' }}>
        <h5>
        Drug's max clinical phase
        </h5>
        <ul>
            {renderCheckboxList(MAX_PHASE, 'MAX_PHASE')}
        </ul>
        <h5>
        Tissue
        </h5>
        <ul>
            {renderCheckboxList(ONCOTREE_LINEAGE, 'ONCOTREE_LINEAGE')}
        </ul>
        <h5>
        Data platform
        </h5>
        <ul>
            {renderCheckboxList(DATASET, 'DATASET')}
        </ul>
        <h5>
        METRIC
        </h5>
        <ul>
            {renderCheckboxList(METRIC, 'METRIC')}
        </ul>
       
      </div>
    </div>
  );
};

export default LegendProtien;
