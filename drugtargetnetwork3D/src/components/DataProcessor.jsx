// import React, { useState, useEffect } from "react";
// import ForceNetworkGraph from "./ForceNetworkGraph";
// import { Card, Row, Col } from "antd";
// import LegendDisease from "./LegendDisease";
// import LegendProtien from "./LegendProtien";

// const DataProcessor = () => {
//   const [graphData, setGraphData] = useState(null);
//   const [legendData, setlegendData] = useState(null);
//   // Fetch the JSON data from sampledata.json
//   useEffect(() => {
//     fetch("/sampledata.json")
//       .then((response) => response.json())
//       .then((data) => {
//         const transformedData = transformData(data);

//         setGraphData(transformedData);
//         setlegendData(transformedData) 
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   console.log(graphData,legendData , 'legendData legendData' )
//   const transformData = (data) => {
//     const nodes = [];
//     const links = [];
//     const nodeSet = new Set();
  
//     data.forEach((item) => {
//       const {
//         COMPOUND_NAME,
//         CELL_LINE_NAME,
//         Disease_name,
//         Disease_class,
//         Phase,
//         DATASET,
//         MAX_PHASE,
//         ONCOTREE_LINEAGE,
//         METRIC,
//       } = item;
  
//       // Add unique nodes
//       if (!nodeSet.has(COMPOUND_NAME)) {
//         nodes.push({
//           id: COMPOUND_NAME,
//           class: MAX_PHASE,
//           type: 'parent_source',
//           dataset: DATASET,
//           maxPhase: MAX_PHASE,
//           metric: METRIC,
//           group: 1,
//         });
//         nodeSet.add(COMPOUND_NAME);
//       }
  
//       if (!nodeSet.has(CELL_LINE_NAME)) {
//         nodes.push({
//           id: CELL_LINE_NAME,
//           class: ONCOTREE_LINEAGE,
//           type: 'protein_child',
//           dataset: DATASET,
//           oncotreeLineage: ONCOTREE_LINEAGE,
//           metric: METRIC,
//           group: 2,
//         });
//         nodeSet.add(CELL_LINE_NAME);
//       }
  
//       if (!nodeSet.has(Disease_name)) {
//         nodes.push({
//           id: Disease_name,
//           class: Disease_class,
//           type: 'disease_child',
//           diseaseClass: Disease_class,
//           phase: Phase,
//           metric: METRIC,
//           group: 3,
//         });
//         nodeSet.add(Disease_name);
//       }
  
//       // Add links between nodes
//       links.push({
//         source: COMPOUND_NAME,
//         target: CELL_LINE_NAME,
//         value: 1,
//       });
//       links.push({
//         source: COMPOUND_NAME,
//         target: Disease_name,
//         value: 1,
//       });
//     });
  
//     return { nodes, links };
//   };
  
//   // Transform the data into nodes and links
//   const transformData2 = (data) => {
//     console.log("inital data" , data)
//     const nodes = [];
//     const links = [];
//     const nodeSet = new Set(); // Ensure uniqueness of nodes

//     data.forEach((item) => {
//       const { COMPOUND_NAME, CELL_LINE_NAME, Disease_name ,Disease_class , Phase , DATASET ,MAX_PHASE ,ONCOTREE_LINEAGE ,METRIC } = item;

//       // Add unique nodes
//       if (!nodeSet.has(COMPOUND_NAME)) {
//         nodes.push({ id: COMPOUND_NAME, class :MAX_PHASE ,type :"parent_source"  , DATASET, MAX_PHASE , METRIC,  group: 1 });
//         nodeSet.add(COMPOUND_NAME);
//       }
//       if (!nodeSet.has(CELL_LINE_NAME)) {
//         nodes.push({ id: CELL_LINE_NAME, class :ONCOTREE_LINEAGE ,type: "protien_child"  ,DATASET,ONCOTREE_LINEAGE ,METRIC, group: 2 });
//         nodeSet.add(CELL_LINE_NAME);
//       }
//       if (!nodeSet.has(Disease_name)) {
//         nodes.push({ id: Disease_name, class: Disease_class, type: "disease_child" ,Disease_class ,Phase,METRIC, group: 3 });
//         nodeSet.add(Disease_name);
//       }

//       // Add links between nodes
//       links.push({ source: COMPOUND_NAME, target: CELL_LINE_NAME, value: 1 });
//       links.push({ source: COMPOUND_NAME, target: Disease_name, value: 1 });
//     });

//     return { nodes, links };
//   };

//   return (
//     <Row justify="center" style={{ padding: "20px", marginTop: "40px" }}>
//       {/* Legend - 15% width */}
//       <Col span={4}>
//         <Card title="Legend data " bordered={true}>
//         {legendData ? (
//             <LegendDisease legendData={legendData} />
//           ) : (
//             <p>Loading data...</p>
//           )}
//         </Card>
//       </Col>
      
//       {/* Graph - 85% width */}
//       <Col span={16}>
//         <Card title="3D Force Network Graph" bordered={false}>
//           {graphData ? (
//             <ForceNetworkGraph graphData={graphData} />
//           ) : (
//             <p>Loading data...</p>
//           )}
      
//         </Card>
//       </Col>
//       <Col span={4}>
//         <Card title="Legend data " bordered={true}>
//         {legendData ? (
//             <LegendProtien legendData={legendData} />
//           ) : (
//             <p>Loading data...</p>
//           )}
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default DataProcessor;

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
import ForceNetworkGraph from "./ForceNetworkGraph";
import LegendDisease from "./LegendDisease";
import LegendProtein from "./LegendProtien";

const DataProcessor = () => {
  const dispatch = useDispatch();

  const graphData = useSelector(selectGraphData);
  const legendData = useSelector(selectLegendData);
  const dataStatus = useSelector(selectDataStatus);
  const dataError = useSelector(selectDataError);

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

  // Clone graphData to ensure immutability
  const clonedGraphData = graphData
    ? {
        nodes: graphData.nodes.map((node) => ({ ...node })),
        links: graphData.links.map((link) => ({ ...link })),
      }
    : null;

  console.log(clonedGraphData, "clonedGraphData");

  return (
    <Row justify="center" gutter={[16, 16]} style={{ padding: "20px", marginTop: "40px" }}>
      {/* Legend Disease */}
      <Col xs={24} sm={12} md={6}>
        <Card title="Disease Legend" bordered>
          {legendData ? <LegendDisease legendData={legendData} /> : null}
        </Card>
      </Col>

      {/* Force Network Graph */}
      <Col xs={24} sm={24} md={12}>
        <Card title="3D Force Network Graph" bordered>
          {clonedGraphData ? <ForceNetworkGraph graphData={clonedGraphData} /> : null}
        </Card>
      </Col>

      {/* Legend Protein */}
      <Col xs={24} sm={12} md={6}>
        <Card title="Protein Legend" bordered>
          {legendData ? <LegendProtein legendData={legendData} /> : null}
        </Card>
      </Col>
    </Row>
  );
};

export default DataProcessor;
