/* eslint-disable no-undef */
import { useState, useEffect } from "react";
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
  const ProteinChildCount = useSelector(selectProteinChildCount); // Get node counts from Redux
  const ParentSourceCount = useSelector(selectParentSourceCount); // Get node counts from Redux

  // 1) track whether the modal is shown
  const [showPredictModal, setShowPredictModal] = useState(false);
  // 2) track the textarea’s value
  const [predictText, setPredictText] = useState("");
 
  const { getNodeColor, getNodeShape, generateDataSet } = useColorShape();


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
    scrollbarWidth: isDarkMode ? "thin" : "auto", // For Firefox
    scrollbarColor: isDarkMode ? "#555 #333" : "#ddd #f1f1f1", // For Firefox
  };

  // Check if nodeCounts is defined and has the expected structure
   // OPEN the modal
   const openPredictModal = () => {
    setShowPredictModal(true);
  };

  // CLOSE the modal
  const closePredictModal = () => {
    setShowPredictModal(false);
  };

  // SUBMIT the modal
  const submitPredictModal = () => {
    console.log("Predict Modal Input:", predictText);
    const encoded = encodeURIComponent(predictText);
    console.log("encoded Predict Modal Input:", encoded);

    window.location.href = 
      `https://bioicawtech.com/drugtargetnetwork/smilies_table.php?text=${encoded}`;

    // optionally hide the modal after redirect
    setShowPredictModal(false);
  };

  return (
    <Row
      justify="center"
      gutter={[16, 16]}
      style={{ padding: "10px", marginTop: "1px"  , height :"100vh"  }}
    >
      {/*<!--Dialog for Smilies modal-->*/}
      {showPredictModal && (
        <div
          id="modalOverlay_predict"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id="modalBox_predict"
            style={{
              background: "white",
              padding: "20px",
              width: "550px",
              maxWidth: "95%",
              position: "relative",
              borderRadius: "8px",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Close Button */}
            <button
              id="closeBtn_predict"
              onClick={closePredictModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                fontSize: "24px",
                cursor: "pointer",
                border: "none",
                background: "transparent",
                color: "black",
              }}
            >
              &times;
            </button>

            {/* Controlled textarea */}
            <textarea
              id="inputText_predict"
              placeholder="Enter Smilies here. Use new line as separator"
              value={predictText}
              onChange={(e) => setPredictText(e.target.value)}
              style={{
                width: "100%",
                height: "150px",
                marginTop: "20px",
                padding: "10px",
                fontSize: "16px",
              }}
            ></textarea>

            {/* Submit Button */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                id="submitModal_predict"
                onClick={submitPredictModal}
                style={{
                  marginTop: "15px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  backgroundColor: "#28a5fb",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <Col xs={24} sm={12} md={5} >
        <Card title="Legend" bordered  style={{height :"90vh"}}>
          <DarkModeEnabler />
          <div style={scrollbarStyle}>
            <CustomButton onClick={handleApplyClick}>Apply</CustomButton>
            <CustomButton  id="predictBtn" onClick={openPredictModal}>Predict</CustomButton>
            <SingleFilteration />
            <SliderComponent />
            <DoubleSlider />
            {legendData_filters ? (
              <Legend legendData={legendData_filters} />
            ) : null}
          </div>
        </Card>
      </Col>

          

      <Col xs={24} sm={24} md={19} >
        <Card style={{height :"90vh"}}
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center", 
                
              }}
            >
              <span>3D Force Network Graph</span>
              <p className="font-size">
                Total compounds visible: {ParentSourceCount}
              </p>
              <p className="font-size">
                Total cell lines visible: {ProteinChildCount}
              </p>
              <div>
                <ExportChartModal />
              </div>
            </div>
          }
          bordered
        >
          {clonedGraphData ? (
        
            <div      >
              <ForceNetworkGraph
                graphData={clonedGraphData}
                getNodeShape={getNodeShape}
                generateDataSet={generateDataSet}
              />
              <NodeCountUpdater graphData={clonedGraphData} />
            </div>
          ) : null}
        </Card>
      </Col>
    </Row>
  );
};

export default DataProcessor;
