/* eslint-disable no-undef */
import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card } from "antd";
import { fetchGraphData4 } from "../app/features/data/dataThunks4";
import { filterGraphData } from "./../app/features/data/dataSlice";
import {
  selectGraphData,
  selectDataStatus,
  selectDataError,
  selectlegendfilteration,
  
} from "../app/features/data/dataSelectors";
import ForceNetworkGraph from "./ForceNetworkGraph";
import Legend from "./Legend";
import CustomButton from "./CustomButton";
import DoubleSlider from "./doubleSIilder";
import SliderComponent from "./SliderSource";
import SingleFilteration from "./SingleFilteration";
import ExportChartModal from "./ExportChartModal";

const DataProcessor4 = () => {
  const dispatch = useDispatch();
  const [clonedGraphData, setClonedGraphData] = useState(null);
  const graphData = useSelector(selectGraphData);
  const dataStatus = useSelector(selectDataStatus);
  const dataError = useSelector(selectDataError);
  const legendData_filters = useSelector(selectlegendfilteration);

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const getNodeColor = (node) => {
    const category = node.class;

    if (legendData_filters.maxPhase && legendData_filters.maxPhase[category]) {
      return legendData_filters.maxPhase[category].color;
    }
    if (legendData_filters.diseaseClass && legendData_filters.diseaseClass[category]) {
      return legendData_filters.diseaseClass[category].color;
    }
    if (legendData_filters.oncotreeLineage && legendData_filters.oncotreeLineage[category]) {
      return legendData_filters.oncotreeLineage[category].color;
    }
    if (legendData_filters.metric && legendData_filters.metric[category]) {
      return legendData_filters.metric[category].color;
    }
    if (legendData_filters.dataset && legendData_filters.dataset[category]) {
      return legendData_filters.dataset[category].color;
    }
    if (legendData_filters.phase && legendData_filters.phase[category]) {
      return legendData_filters.phase[category].color;
    }

    return isDarkMode ? "#ffffff" : "#000000"; // Default color based on theme
  };

  const getNodeShape = (node) => {
    const color = getNodeColor(node);

    let geometry;
    if (node.type === "parent_source") {
      // eslint-disable-next-line no-undef
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

  const generateDataSet = (link) => {
    const category = link.dataset;
    if (legendData_filters.dataset && legendData_filters.dataset[category]) {
      return legendData_filters.dataset[category].color;
    }
  };

  useEffect(() => {
    if (dataStatus === "idle") {
      dispatch(fetchGraphData4());
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

  const handleApplyClick = () => {
    dispatch(filterGraphData());
  };
  const scrollbarStyle = {
    height: "600px",
    overflowY: "auto",
    scrollbarWidth: isDarkMode ? 'thin' : 'auto', // For Firefox
    scrollbarColor: isDarkMode ? '#555 #333' : '#ddd #f1f1f1', // For Firefox
  };
  return (
    <Row
      justify="center"
      gutter={[16, 16]}
      style={{ padding: "20px", marginTop: "40px" }}
    >
      <Col xs={24} sm={12} md={6}>
        <Card title="Legend" bordered>
          <div style={scrollbarStyle}>
            <CustomButton onClick={handleApplyClick}>Apply</CustomButton>
            <SingleFilteration />
            <SliderComponent />
            <DoubleSlider />
            {legendData_filters ? (
              <Legend legendData={legendData_filters} />
            ) : null}
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={18}>
        <Card
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>3D Force Network Graph</span>
              <div>
                <ExportChartModal />
              </div>
            </div>
          }
          bordered
        >
          {clonedGraphData ? (
            <ForceNetworkGraph
              graphData={clonedGraphData}
              getNodeShape={getNodeShape}
              generateDataSet={generateDataSet}
            />
          ) : null}
        </Card>
      </Col>
    </Row>
  );
};

export default DataProcessor4;
