import React, { useState } from "react";
import { Checkbox, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleLegendItem, updateLegendColor } from "../app/features/data/dataSlice";
import ColorPicker from "./ColorPickers"; // Import the ColorPicker component

const Legend = ({ legendData }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Get the current theme

  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [colorPickerPosition, setColorPickerPosition] = useState({ x: 0, y: 0 });

  const handleColorClick = (category, value, event) => {
    setSelectedCategory(category);
    setSelectedValue(value);
    setColorPickerVisible(true);

    // Set position for the color picker
    const rect = event.target.getBoundingClientRect();
    setColorPickerPosition({ x: rect.right, y: rect.top });
  };

  const handleColorSelect = (color) => {
    if (selectedCategory && selectedValue) {
      dispatch(updateLegendColor({ category: selectedCategory, value: selectedValue, color }));
    }
    setColorPickerVisible(false);
  };

  const handleCheckboxChange = (category, value) => {
    dispatch(toggleLegendItem({ category, value }));
  };

  const renderShape = (category, color, value) => {
    switch (category) {
      case "phase":
        return (
          <div
            style={{
              width: "20px",
              height: "2px",
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
              borderBottom: `20px solid ${color}`,
              marginRight: "8px",
            }}
          />
        );
      case "maxPhase":
        return (
          <div
            style={{
              width: "20px",
              height: "10px",
              backgroundColor: color,
              marginRight: "8px",
              cursor: "pointer",
            }}
            onClick={(event) => handleColorClick(category, value, event)}
          />
        );
      case "oncotreeLineage":
        return (
          <div
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor: color,
              marginRight: "8px",
            }}
          />
        );
      case "dataset":
        return (
          <div
            style={{
              width: "20px",
              height: "5px",
              backgroundColor: color,
              marginRight: "8px",
            }}
            onClick={(event) => handleColorClick(category, value, event)}
          />
        );
      case "metric":
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              marginRight: "8px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: color,
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: color,
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: color,
                borderRadius: "50%",
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
  
      <div>
        <div
          className="legend1"
          id="legend1"
          style={{
            marginLeft: "12px",
            color: isDarkMode ? 'white' : 'black',
            padding: '10px',
            borderRadius: '4px',
          }}
        >
          {Object.keys(legendData).map((category) => (
            <div key={category}>
              <h5 style={{ color: isDarkMode ? 'white' : 'black' }}>{category}</h5>
              <ul>
                {Object.entries(legendData[category]).map(([value, { color, checked }]) => (
                  <li
                    key={value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: isDarkMode ? 'white' : 'black',
                    }}
                  >
                    {renderShape(category, color, value)}
                    <Checkbox
                      checked={checked}
                      onChange={() => handleCheckboxChange(category, value)}
                      style={{ color: isDarkMode ? 'white' : 'black' }}
                    >
                      {value}
                    </Checkbox>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {colorPickerVisible && (
          <div
            style={{
              position: "absolute",
              top: colorPickerPosition.y - 140,
              left: colorPickerPosition.x - 20,
              zIndex: 1000,
              background: isDarkMode ? '#333' : '#fff',
              border: `1px solid ${isDarkMode ? '#555' : '#d9d9d9'}`,
              padding: '10px',
              borderRadius: '4px',
            }}
          >
            <ColorPicker
              colors={["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"]}
              onSelectColor={handleColorSelect}
              onClose={() => setColorPickerVisible(false)}
            />
          </div>
        )}
      </div>
  );
};

export default Legend;
