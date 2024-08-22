import React from "react";
import { Checkbox } from "antd";
import CustomButton from "./CustomButton";

const Legend = ({ legendData, onLegendChange }) => {
  return (
    <div>
      <div className="legend1" id="legend1" style={{ marginLeft: "12px" }}>
        <CustomButton>Filter</CustomButton>

        {Object.keys(legendData).map((category) => (
          <div key={category}>
            <h5>{category}</h5>
            <ul>
              {Object.entries(legendData[category]).map(([value, { color, checked }]) => (
                <li key={value} style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "20px",  // Adjust dimensions for different shapes if needed
                      height: "10px",
                      backgroundColor: color,
                      marginRight: "8px",
                    }}
                  />
                  <Checkbox
                    checked={checked}
                    onChange={() => onLegendChange(category, value)}
                  >
                    {value}
                  </Checkbox>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
