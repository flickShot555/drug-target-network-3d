import React, { useState, useEffect } from 'react';
import ForceNetworkGraph from './ForceNetworkGraph';

const DataProcessor = () => {
  const [graphData, setGraphData] = useState(null);

  // Fetch the JSON data from sampledata.json
  useEffect(() => {
    fetch('/sampledata.json')
      .then(response => response.json())
      .then(data => {
        const transformedData = transformData(data);
        setGraphData(transformedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Transform the data into nodes and links
  const transformData = (data) => {
    const nodes = [];
    const links = [];
    const nodeSet = new Set(); // Ensure uniqueness of nodes

    data.forEach(item => {
      const { COMPOUND_NAME, CELL_LINE_NAME, Disease_name } = item;

      // Add unique nodes
      if (!nodeSet.has(COMPOUND_NAME)) {
        nodes.push({ id: COMPOUND_NAME, group: 1 });
        nodeSet.add(COMPOUND_NAME);
      }
      if (!nodeSet.has(CELL_LINE_NAME)) {
        nodes.push({ id: CELL_LINE_NAME, group: 2 });
        nodeSet.add(CELL_LINE_NAME);
      }
      if (!nodeSet.has(Disease_name)) {
        nodes.push({ id: Disease_name, group: 3 });
        nodeSet.add(Disease_name);
      }

      // Add links between nodes
      links.push({ source: COMPOUND_NAME, target: CELL_LINE_NAME, value: 1 });
      links.push({ source: COMPOUND_NAME, target: Disease_name, value: 1 });
    });

    return { nodes, links };
  };

  // Render the graph only when graphData is available
  return (
    <div>
      <h2>3D Force Network Graph</h2>
      {graphData ? (
        <ForceNetworkGraph graphData={graphData} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default DataProcessor;
