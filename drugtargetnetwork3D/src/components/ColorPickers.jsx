import React from "react";
import { Button, Popover } from "antd";

const ColorPicker = ({ colors, onSelectColor, onClose }) => {
  return (
    <Popover
      content={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 30px)",
              gap: "10px",
            }}
          >
            {colors.map((color) => (
              <div
                key={color}
                onClick={() => onSelectColor(color)}
                style={{
                  backgroundColor: color,
                  width: "30px",
                  height: "30px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        
        </div>
      }
      title="Select a Color"
      trigger="click"
      visible={true}
      onVisibleChange={onClose} // You can control visibility based on this
    >
    </Popover>
  );
};

export default ColorPicker;
