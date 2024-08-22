import React, { useEffect } from "react";
import { Checkbox } from "antd";

const Legend = () => {
  return (
    <div>
      <div className="legend1" id="legend1" style={{ marginLeft: "12px" }}>
        <h5 className="legenddata" id="Drug_disease_phase">
          Disease clinical phase
        </h5>
        <ul id="phases_disease">
          <li style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "20px",
                height: "2px", // Line thickness
                backgroundColor: "#000", // Change color as needed
                marginRight: "8px",
              }}
            />
            <Checkbox>Coming soon</Checkbox>
          </li>
        </ul>
        <h5 className="legenddata" id="Disease_class_heading">
          Disease class
        </h5>
        <ul id="disease_Class">
          <li style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "0",
                height: "0",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "20px solid #000", // Change color as needed
                marginRight: "8px",
              }}
            />
            <Checkbox>Coming soon</Checkbox>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Legend;
