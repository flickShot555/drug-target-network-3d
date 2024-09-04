import React from 'react';
import { Slider } from 'antd';
import { useSelector , useDispatch } from 'react-redux';

import { updateDoubleSliderValue } from "./../app/features/data/dataSlice";
const RangeSlider = () => {
  // Get slider min and max values from Redux store
  const sliderMin = useSelector((state) => state.data.sliderMin);
  const sliderMax = useSelector((state) => state.data.silderMax);
  const dispatch = useDispatch();
  const onChange = (value) => {
    console.log('onChange: ', value);
  };

  const onAfterChange = (value) => {
    console.log('onAfterChange: ', value);
        // Dispatch the action to update the slider min and max values in Redux store
        dispatch(updateDoubleSliderValue(value));
  };

  return (
    <div>
      <h5>Drug response (pIC50)</h5> 
      <Slider
        range
        min={4.0}
        max={9.0}
        step={0.1}
        defaultValue={[sliderMin, sliderMax]}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
    </div>
  );
};

export default RangeSlider;
