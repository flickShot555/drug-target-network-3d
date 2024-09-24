import React from "react";
import { Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateSliderValue } from "./../app/features/data/dataSlice";
import {
  selectProteinChildCount,
  selectParentSourceCount,
} from "./../app/features/countSlice";

const SliderComponent = () => {
  const dispatch = useDispatch();
  const sliderValue = useSelector((state) => state.data.sliderValue);
  const sliderCurrent = useSelector((state) => state.data.currentSlider);
  const ParentSourceCount = useSelector(selectParentSourceCount); // Get node counts from Redux
 
  const handleSliderChange = (value) => {
    dispatch(updateSliderValue(value));
  };

  return (
    <div style={{ marginTop: "5px", width: "200px" }}>
        <h5 style={{ padding: "2px", margin: "1px"}} > {ParentSourceCount} Connected compound </h5>
    <Slider
    style={{ padding: "2px", margin: "1px"}}
      value={sliderCurrent}
      max={sliderValue}
      onChange={handleSliderChange}
    />
  </div>
    
  );
};

export default SliderComponent;
