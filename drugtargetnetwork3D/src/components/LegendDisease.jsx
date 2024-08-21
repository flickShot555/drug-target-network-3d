import React, { useEffect } from "react";
import { Checkbox } from 'antd';
const LegendDisease = ({legendData}) => {

  // Helper function to get unique values from an array of objects
  const getUniqueValues = (data, key) => {
    if(legendData){
      const values = data
        .map(item => item[key])
        .filter(value => value !== undefined && value !== null); // Filter out undefined or null values
      return [...new Set(values)];
    }
  };

  // Extract unique Disease_class and Phase values
  const uniqueDiseaseClasses = getUniqueValues(legendData.nodes, 'diseaseClass');
  const uniquePhases = getUniqueValues(legendData.nodes, 'phase');

  // Function to render checkboxes for a given list of values
  const renderCheckboxList = (list, key) => (
   
    list.map(value => {
      const isChecked = legendData.nodes.some(node => node[key] === value);
      return (
        <li key={value} style={{ listStyleType: "none", }}>
          <Checkbox defaultChecked={isChecked}>{value}</Checkbox>
        
        </li>
      );
    })
  );

  return (
    <div>
      <div className="legend1" id="legend1" style={{ marginLeft: '12px' }}>
        <h5 className="legenddata" id="Drug_disease_phase">
          Disease clinical phase
         
        </h5>
        <ul id="phases_disease">
            {renderCheckboxList(uniquePhases, 'phase')}
        </ul>

        <h5 className="legenddata" id="Disease_class_heading">
          Disease class
        </h5>
        <ul id="disease_Class">
          {renderCheckboxList(uniqueDiseaseClasses, 'diseaseClass')}
        </ul>
      </div>
    </div>
  );
};

export default LegendDisease;
