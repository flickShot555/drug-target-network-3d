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
import SmartFooterAwareFloatingButton from "./SmartFooterAwareFloatingButton";

const DataProcessor = () => {
  document.querySelectorAll('.scene-nav-info').forEach(el => el.style.display = 'none');
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

  /**
    useEffect(() => {
      // grab elements after mount
      const overlay = document.getElementById("modalOverlay_predict");
      const closeBtn = document.getElementById("closeBtn_predict");
      const submitBtn = document.getElementById("submitModal_predict");
      const predictBtnEl = document.getElementById("predictBtn"); // your CustomButton has this id already
    
      // guard helpers
      const openModal = () => {
        if (overlay) overlay.style.display = "flex";
      };
      const closeModal = () => {
        if (overlay) overlay.style.display = "none";
      };
      const submitModal = () => {
        const input = document.getElementById("inputText_predict");
        const text = input ? input.value : "";
        // debug
        console.log("Predict Modal Input:", text);
        const encoded = encodeURIComponent(text);
        console.log("encoded Predict Modal Input:", encoded);
        window.location.href = `https://bioicawtech.com/drugtargetnetwork/smilies_table.php?text=${encoded}`;
        // optionally close overlay after submit:
        // if (overlay) overlay.style.display = 'none';
      };
    
      // attach listeners (only if nodes exist)
      if (predictBtnEl) predictBtnEl.addEventListener("click", openModal);
      if (closeBtn) closeBtn.addEventListener("click", closeModal);
      if (submitBtn) submitBtn.addEventListener("click", submitModal);
    
      // cleanup
      return () => {
        if (predictBtnEl) predictBtnEl.removeEventListener("click", openModal);
        if (closeBtn) closeBtn.removeEventListener("click", closeModal);
        if (submitBtn) submitBtn.removeEventListener("click", submitModal);
      };
    }, []); // run once after mount
  */

    const styles = {
      overlay: {
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
        justifyContent: "center",
        alignItems: "center",
      },
      modalBox: {
        background: "white",
        padding: "20px",
        width: "550px",
        maxWidth: "95%",
        position: "relative",
        borderRadius: "8px",
        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
      },
      closeBtn: {
        position: "absolute",
        top: "10px",
        right: "15px",
        fontSize: "24px",
        cursor: "pointer",
        border: "none",
        background: "transparent",
        color: "black",
      },
      textarea: {
        width: "100%",
        height: "150px",
        marginTop: "20px",
        padding: "10px",
        fontSize: "16px",
      },
      submitWrapper: {
        display: "flex",
        justifyContent: "center",
      },
      submitBtn: {
        marginTop: "15px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#28a5fb",
        color: "white",
        border: "none",
        borderRadius: "5px",
      },
    };

    
  const handleApplyClick = () => {
    dispatch(filterGraphData());
  };

  const scrollbarStyle = {
    marginTop: "15px",
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
    <div ref={exportRef} data-export-ref="1" style={{ height: "93vh" }}>
      {/* Smilies Prediction Modal (JSX) */}
      {showPredictModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            ...styles.overlay,
            display: "flex", // ensure overlay is visible when showPredictModal is true
          }}
        >
          <div style={styles.modalBox}>
            <button
              type="button"
              aria-label="Close predict modal"
              style={styles.closeBtn}
              onClick={closePredictModal}
            >
              &times;
            </button>

            <textarea
              value={predictText}
              onChange={(e) => setPredictText(e.target.value)}
              placeholder="Enter Smilies here. Use new line as separator"
              style={styles.textarea}
            />

            <div style={styles.submitWrapper}>
              <button
                type="button"
                onClick={submitPredictModal}
                style={styles.submitBtn}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <Row
        justify="center"
        gutter={[16, 6]}
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
                <span>PharmacoProfiler</span>
                <p className="font-size">Total compounds visible: {ParentSourceCount}</p>
                <p className="font-size">Total cell lines visible: {ProteinChildCount}</p>
                <div>
                  {/* pass both refs: exportRef (wrapper) and chartRef (graph) */}
                  <ExportChartModal chartRef={chartRef} exportRef={exportRef} fileName="3d_force_network" />
                </div>
              </div>
            }
            
          >
            {clonedGraphData ? (
              // chartRef must be attached only to this div (graph container)
              <div ref={chartRef} style={{ height: "65vh" }}>
                <ForceNetworkGraph graphData={clonedGraphData} getNodeShape={getNodeShape} generateDataSet={generateDataSet} />
                <NodeCountUpdater graphData={clonedGraphData} />
              </div>
            ) : null}
          </Card>
        </Col>
      </Row>
      <SmartFooterAwareFloatingButton url="http://bioicawtech.com/drugtargetnetwork" />
    </div>
  );
};

export default DataProcessor;
