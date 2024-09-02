import React from "react";

const ColorPicker = ({ colors, onSelectColor, onClose }) => {
  return (
    <div style={{ display: "flex", gap: "8px", position: "absolute" }}>
      {colors.map((color, index) => (
        <div
          key={index}
          onClick={() => {
            onSelectColor(color);
            onClose(); // Close the color picker after selecting
          }}
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: color,
            cursor: "pointer",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};

export default ColorPicker;