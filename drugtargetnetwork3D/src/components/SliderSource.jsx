import React from "react";
import { Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateSliderValue } from "./../app/features/data/dataSlice";

const SliderComponent = () => {
  const dispatch = useDispatch();
  const sliderValue = useSelector((state) => state.data.sliderValue);
  const sliderCurrent = useSelector((state) => state.data.currentSlider);

  const handleSliderChange = (value) => {
    dispatch(updateSliderValue(value));
  };

  return (
    <div style={{ marginTop: "5px", width: "200px" }}>
        <h5>{sliderCurrent} Connected compound </h5>
    <Slider
      value={sliderCurrent}
      max={sliderValue}
      onChange={handleSliderChange}
    />
  </div>
    
  );
};

export default SliderComponent;
