import React, { useState, useEffect } from "react";
import ForceNetworkGraph from "./ForceNetworkGraph";
import { Card, Row, Col } from "antd";
import LegendDisease from "./LegendDisease";

import LegendProtien from "./LegendProtien";

const DataProcessor = () => {
  const [graphData, setGraphData] = useState(null);
  const [legendData, setlegendData] = useState(null);
  // Fetch the JSON data from sampledata.json
  useEffect(() => {
    fetch("/sampledata.json")
      .then((response) => response.json())
      .then((data) => {
        const transformedData = transformData(data);
        setGraphData(transformedData);
        setlegendData(transformedData) 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Transform the data into nodes and links
  const transformData = (data) => {
    console.log("inital data" , data)
    const nodes = [];
    const links = [];
    const nodeSet = new Set(); // Ensure uniqueness of nodes

    data.forEach((item) => {
      const { COMPOUND_NAME, CELL_LINE_NAME, Disease_name ,Disease_class , Phase , DATASET ,MAX_PHASE ,ONCOTREE_LINEAGE } = item;

      // Add unique nodes
      if (!nodeSet.has(COMPOUND_NAME)) {
        nodes.push({ id: COMPOUND_NAME, DATASET, MAX_PHASE ,   group: 1 });
        nodeSet.add(COMPOUND_NAME);
      }
      if (!nodeSet.has(CELL_LINE_NAME)) {
        nodes.push({ id: CELL_LINE_NAME,DATASET, ONCOTREE_LINEAGE, group: 2 });
        nodeSet.add(CELL_LINE_NAME);
      }
      if (!nodeSet.has(Disease_name)) {
        nodes.push({ id: Disease_name, Disease_class , Phase,  group: 3 });
        nodeSet.add(Disease_name);
      }

      // Add links between nodes
      links.push({ source: COMPOUND_NAME, target: CELL_LINE_NAME, value: 1 });
      links.push({ source: COMPOUND_NAME, target: Disease_name, value: 1 });
    });

    return { nodes, links };
  };

  return (
    <Row justify="center" style={{ padding: "20px", marginTop: "40px" }}>
      {/* Legend - 15% width */}
      <Col span={4}>
        <Card title="Legend data " bordered={true}>
        {legendData ? (
            <LegendDisease legendData={legendData} />
          ) : (
            <p>Loading data...</p>
          )}
        </Card>
      </Col>
      
      {/* Graph - 85% width */}
      <Col span={16}>
        <Card title="3D Force Network Graph" bordered={false}>
          {graphData ? (
            <ForceNetworkGraph graphData={graphData} />
          ) : (
            <p>Loading data...</p>
          )}
      
        </Card>
      </Col>
      <Col span={4}>
        <Card title="Legend data " bordered={true}>
        {legendData ? (
            <LegendProtien legendData={legendData} />
          ) : (
            <p>Loading data...</p>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default DataProcessor;
