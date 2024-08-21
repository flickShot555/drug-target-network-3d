// import React from 'react';
import { Checkbox } from 'antd';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card } from "antd";
import { fetchGraphData } from "../app/features/data/dataThunks";
import {
  selectGraphData,
  selectLegendData,
  selectDataStatus,
  selectDataError,
} from "../app/features/data/dataSelectors";

const LegendProtien = () => {
    
    const graphData = useSelector(selectGraphData);
    const legendData = useSelector(selectLegendData);
    const dataStatus = useSelector(selectDataStatus);
    const dataError = useSelector(selectDataError);
console.log(" test" ,  legendData )

    
    const dispatch = useDispatch();
    useEffect(() => {
      if (dataStatus === "idle") {
        dispatch(fetchGraphData());
      }
    }, [dataStatus, dispatch]);
  
    if (dataStatus === "loading") {
      return <div>Loading...</div>;
    }
  
    if (dataStatus === "failed") {
      return <div>Error: {dataError}</div>;
    }
    // console.log(graphData, legendData, "graphData graphData", dataStatus);





  // Helper function to get unique values from an array of objects
  const getUniqueValues = (data, key) => {
    
      const values = data
      .map(item => item[key])
      .filter(value => value !== undefined && value !== null); // Filter out undefined or null values
      return [...new Set(values)];
    };
let MAX_PHASE , ONCOTREE_LINEAGE , DATASET ,METRIC ; 
    if (legendData) {
         MAX_PHASE = getUniqueValues(legendData.nodes, 'maxPhase');
         ONCOTREE_LINEAGE = getUniqueValues(legendData.nodes, 'oncotreeLineage');
         DATASET = getUniqueValues(legendData.nodes, 'dataset');
         METRIC = getUniqueValues(legendData.nodes, 'metric');
        
        // console.log(legendData, MAX_PHASE , "DATASETDATASETDATASETDATASETDATASETDATASETDATASETDATASET");
    }


    
  // Extract unique Disease_class and Phase values
 
  // Function to render checkboxes for a given list of values
  const renderCheckboxList = (list, key) => (
      list.map(value => {
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
            {renderCheckboxList(MAX_PHASE, 'maxPhase')}
        </ul>
        <h5>
        Tissue
        </h5>
        <ul>
            {renderCheckboxList(ONCOTREE_LINEAGE, 'oncotreeLineage')}
        </ul>
        <h5>
        Data platform
        </h5>
        <ul>
            {renderCheckboxList(DATASET, 'dataset')}
        </ul>
        <h5>
        METRIC
        </h5>
        <ul>
            {renderCheckboxList(METRIC, 'metric')}
        </ul>
       
      </div>
    </div>
  );
};

export default LegendProtien;
