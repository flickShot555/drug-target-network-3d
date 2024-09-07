import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card } from "antd";
import { fetchGraphData } from "../app/features/data/dataThunks";

import { filterGraphData } from "./../app/features/data/dataSlice";
import {
  selectGraphData,
  selectDataStatus,
  selectDataError,
  selectlegendfilteration,
  selectoriginalData,
} from "../app/features/data/dataSelectors";
import ForceNetworkGraph from "./ForceNetworkGraph";
import Legend from "./Legend";
import CustomButton from "./CustomButton";
import DoubleSlider from "./doubleSIilder";
import SliderComponent from "./SliderSource";
import SingleFilteration from "./SingleFilteration";
import ExportChartModal from "./ExportChartModal";
const DataProcessor = () => {
  const dispatch = useDispatch();
  const [clonedGraphData, setClonedGraphData] = useState(null);
  const graphData = useSelector(selectGraphData);

  const originalData = useSelector(selectoriginalData);
  const dataStatus = useSelector(selectDataStatus);
  const dataError = useSelector(selectDataError);
  const legendData_filters = useSelector(selectlegendfilteration);

  console.log("original ", originalData);
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
  const getNodeColor = (node, legendFilteration) => {
    const category = node.class;
  
    // Check 'maxPhase' categories
    if (legendData_filters.maxPhase && legendData_filters.maxPhase[category]) {
      return legendData_filters.maxPhase[category].color;
    }
  
    // Check 'diseaseClass' categories
    if (legendData_filters.diseaseClass && legendData_filters.diseaseClass[category]) {
      return legendData_filters.diseaseClass[category].color;
    }
  
    // Check 'oncotreeLineage' categories
    if (legendData_filters.oncotreeLineage && legendData_filters.oncotreeLineage[category]) {
      return legendData_filters.oncotreeLineage[category].color;
    }
  
    // Check 'metric' categories
    if (legendData_filters.metric && legendData_filters.metric[category]) {
      return legendData_filters.metric[category].color;
    }
  
    // Check 'dataset' categories
    if (legendData_filters.dataset && legendData_filters.dataset[category]) {
      return legendData_filters.dataset[category].color;
    }
  
    // Check 'phase' categories
    if (legendData_filters.phase && legendData_filters.phase[category]) {
      return legendData_filters.phase[category].color;
    }
  
    // Default color if category not found
    return "black";
  };

  // Function to return a custom 3D object for each node based on its type
  const getNodeShape = (node) => {
    const color = getNodeColor(node);

    let geometry;
    if (node.type === "parent_source") {
      geometry = new THREE.BoxGeometry(10, 10, 20);
    } else if (node.type === "protein_child") {
      geometry = new THREE.SphereGeometry(5);
    } else if (node.type === "disease_child") {
      geometry = new THREE.ConeGeometry(7, 12, 3);
    } else {
      geometry = new THREE.SphereGeometry(5); // Default shape
    }

    const material = new THREE.MeshBasicMaterial({ color });
    return new THREE.Mesh(geometry, material);
  };

  function generateDataSet(link) {
    const category = link.dataset;
    if (category === "GDSC1") return "#0bc00f";
    if (category === "GDSC2") return "#4372c4";
    if (category === "CCLE_NP24") return "#fe0000";
    if (category === "NCI-60") return "#9B35C8";
    if (category === "gCSI") return "#fe8f01";
    if (category === "FIMM") return "#f99cc8";
  }

  useEffect(() => {
    if (dataStatus === "idle") {
      dispatch(fetchGraphData());
    }
    if (graphData) {
      const clonedData = {
        nodes: graphData.nodes.map((node) => ({
          ...node,
          color: getNodeColor(node), // Add color property
        })),
        links: graphData.links.map((link) => ({
          ...link,
          color: generateDataSet(link),
        })),
      };
      setClonedGraphData(clonedData);
    } else {
      setClonedGraphData(null);
    }
  }, [dataStatus, graphData, dispatch]);

  if (dataStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (dataStatus === "failed") {
    return <div>Error: {dataError}</div>;
  }

  // Clone graphData and add color property to nodes

  // Clone graphData and add color property to nodes
  // Dispatch the filterGraphData action on button click
  const handleApplyClick = () => {
    dispatch(filterGraphData());
  };

  return (
    <Row
      justify="center"
      gutter={[16, 16]}
      style={{ padding: "20px", marginTop: "40px" }}>
      {/* Legend Disease */}
      <Col xs={24} sm={12} md={6}>
        <Card title="Legend" bordered>
          <div style={{ height: "600px", overflowY: "auto" }}>
            <CustomButton onClick={handleApplyClick}>Apply</CustomButton>{" "}
            {/* Attach the handler */}
            <SingleFilteration />
            <SliderComponent />
            <DoubleSlider />
            {legendData_filters ? (
              <Legend legendData={legendData_filters} />
            ) : null}
          </div>
        </Card>
      </Col>

      {/* Force Network Graph */}
      <Col xs={24} sm={24} md={18}>
        <Card
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <span>3D Force Network Graph</span>
              <ExportChartModal />
            </div>
          }
          bordered>
          {clonedGraphData ? (
            <ForceNetworkGraph
              graphData={clonedGraphData}
              getNodeShape={getNodeShape}
            />
          ) : null}
        </Card>
      </Col>
    </Row>
  );
};

export default DataProcessor;
