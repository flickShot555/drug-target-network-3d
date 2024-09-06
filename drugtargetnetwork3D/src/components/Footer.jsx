import React from "react";
import { Button, Slider, Space } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import CustomButton from "./CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { updateSliderValue } from "./../app/features/data/dataSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const sliderValue = useSelector((state) => state.data.sliderValue);
  const sliderCurrent = useSelector((state) => state.data.currentSlider);
console.log(sliderValue , 'sliderValue')
  const handleSliderChange = (value) => {

    dispatch(updateSliderValue(value));
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
      }}>
      <CustomButton>redraw</CustomButton>
      
      <div style={{ marginTop: "5px", width: "500px" }}>
        
      </div>

      <CustomButton>Export</CustomButton>

    </div>
  );
};

export default Footer;
