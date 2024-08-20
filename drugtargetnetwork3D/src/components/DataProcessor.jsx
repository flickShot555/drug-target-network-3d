// src/components/DataProcessor.js
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
  console.log(graphData, "graphData graphData", dataStatus);
  return (
    <Row
      justify="center"
      gutter={[16, 16]}
      style={{ padding: "20px", marginTop: "40px" }}>
      {/* Legend Disease */}
      <Col xs={24} sm={12} md={6}>
        <Card title="Disease Legend" bordered>
          {legendData ? <LegendProtein legendData={legendData} /> : null}
        </Card>
      </Col>

      {/* Force Network Graph */}
      <Col xs={24} sm={24} md={12}>
        <Card title="3D Force Network Graph" bordered>
          {graphData ? <ForceNetworkGraph graphData={graphData} /> : null}
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
