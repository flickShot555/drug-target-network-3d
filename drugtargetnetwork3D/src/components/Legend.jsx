import React from "react";
import { Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { toggleLegendItem } from "./../app/features/data/dataSlice";

const Legend = ({ legendData}) => {
  console.log(legendData , "legendData in legnd ")
  const dispatch = useDispatch();

  const handleCheckboxChange = (category, value) => {
    dispatch(toggleLegendItem({ category, value }));
  };
  // Function to determine the shape and size based on category and value
  const renderShape = (category, color) => {
    switch (category) {
      case "phase":
        return (
          <div
            style={{
              width: "20px",
              height: "2px", // Line thickness for phases
              backgroundColor: color,
              marginRight: "8px",
            }}
          />
        );
      case "diseaseClass":
        return (
          <div
            style={{
              width: "0",
              height: "0",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: `20px solid ${color}`, // Triangle for disease class
              marginRight: "8px",
            }}
          />
        );
      case "maxPhase":
        return (
          <div
            style={{
              width: "20px",  // Rectangle width
              height: "10px", // Rectangle height
              backgroundColor: color,
              marginRight: "8px",
            }}
          />
        );
      case "oncotreeLineage":
        return (
          <div
            style={{
              width: "10px",  // Circle diameter
              height: "10px", // Circle diameter
              borderRadius: "50%", // Makes it a circle
              backgroundColor: color,
              marginRight: "8px",
            }}
          />
        );
      case "dataset":
      case "metric":
        return (
          <div
            style={{
              width: "20px",
              height: "2px", // Line thickness for dataset/metric
              backgroundColor: color,
              marginRight: "8px",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="legend1" id="legend1" style={{ marginLeft: "12px" }}>
        {/* <CustomButton>Filter</CustomButton> */}

        {Object.keys(legendData).map((category) => (
          <div key={category}>
            <h5>{category}</h5>
            <ul>
              {Object.entries(legendData[category]).map(([value, { color, checked }]) => (
                <li key={value} style={{ display: "flex", alignItems: "center" }}>
                  {renderShape(category, color)}
                  <Checkbox
                    checked={checked}
                    onChange={() =>  handleCheckboxChange(category, value)}
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
