/* DataProcessor.jsx */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card } from "antd";
import { fetchGraphData } from "../app/features/data/dataThunks";
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
import DarkModeEnabler from "./DarkModeEnabler";
import useColorShape from "./ColorShape";
import NodeCountUpdater from "./NodeCountUpdater";
import {
  selectProteinChildCount,
  selectParentSourceCount,
} from "./../app/features/countSlice";

const DataProcessor = () => {
  const dispatch = useDispatch();
  const [clonedGraphData, setClonedGraphData] = useState(null);
  const graphData = useSelector(selectGraphData);
  const dataStatus = useSelector(selectDataStatus);
  const dataError = useSelector(selectDataError);
  const legendData_filters = useSelector(selectlegendfilteration);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const ProteinChildCount = useSelector(selectProteinChildCount);
  const ParentSourceCount = useSelector(selectParentSourceCount);

  const [showPredictModal, setShowPredictModal] = useState(false);
  const [predictText, setPredictText] = useState("");

  const { getNodeColor, getNodeShape, generateDataSet } = useColorShape();

  // --- IMPORTANT: two separate refs ---
  const exportRef = useRef(null); // wrapper that contains both columns (Row)
  const chartRef = useRef(null);  // inner graph container (div that wraps ForceNetworkGraph)

  useEffect(() => {
    if (dataStatus === "idle") {
      dispatch(fetchGraphData());
    }
    if (graphData) {
      const clonedData = {
        nodes: graphData.nodes.map((node) => ({
          ...node,
          color: getNodeColor(node),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    height: "75vh",
    overflowY: "auto",
    scrollbarWidth: isDarkMode ? "thin" : "auto",
    scrollbarColor: isDarkMode ? "#555 #333" : "#ddd #f1f1f1",
  };

  const openPredictModal = () => setShowPredictModal(true);
  const closePredictModal = () => setShowPredictModal(false);
  const submitPredictModal = () => {
    const encoded = encodeURIComponent(predictText);
    window.location.href = `https://bioicawtech.com/drugtargetnetwork/smilies_table.php?text=${encoded}`;
    setShowPredictModal(false);
  };

  return (
    <div ref={exportRef} data-export-ref="1" style={{ height: "100vh" }}>
      <Row
        justify="center"
        gutter={[16, 16]}
        style={{ padding: "10px", marginTop: "1px", height: "100%" }}
      >
        {/* Left: Legend */}
        <Col xs={24} sm={12} md={5}>
          <Card title="Legend" bordered style={{ height: "90vh" }}>
            <DarkModeEnabler />
            <div style={scrollbarStyle}>
              <CustomButton onClick={handleApplyClick}>Apply</CustomButton>
              <CustomButton id="predictBtn" onClick={openPredictModal}>
                Predict
              </CustomButton>
              <SingleFilteration />
              <SliderComponent />
              <DoubleSlider />
              {legendData_filters ? <Legend legendData={legendData_filters} /> : null}
            </div>
          </Card>
        </Col>

        {/* Right: Graph */}
        <Col xs={24} sm={24} md={19}>
          <Card
            style={{ height: "90vh" }}
            title={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>3D Force Network Graph</span>
                <p className="font-size">Total compounds visible: {ParentSourceCount}</p>
                <p className="font-size">Total cell lines visible: {ProteinChildCount}</p>
                <div>
                  {/* pass both refs: exportRef (wrapper) and chartRef (graph) */}
                  <ExportChartModal chartRef={chartRef} exportRef={exportRef} fileName="3d_force_network" />
                </div>
              </div>
            }
            bordered
          >
            {clonedGraphData ? (
              // chartRef must be attached only to this div (graph container)
              <div ref={chartRef} style={{ height: "85vh" }}>
                <ForceNetworkGraph graphData={clonedGraphData} getNodeShape={getNodeShape} generateDataSet={generateDataSet} />
                <NodeCountUpdater graphData={clonedGraphData} />
              </div>
            ) : null}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataProcessor;
