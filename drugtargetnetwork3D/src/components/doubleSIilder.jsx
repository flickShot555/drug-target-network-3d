import React from 'react';
import { Slider } from 'antd';

const RangeSlider = () => {
  const onChange = (value) => {
    console.log('onChange: ', value);
  };

  const onAfterChange = (value) => {
    console.log('onAfterChange: ', value);
  };

  return (
    <div>
      <h5>Drug response (pIC50)</h5> 
      <Slider
        range
        min={4.0}
        max={9.0}
        step={0.1}
        defaultValue={[4.0, 9.0]}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
    </div>
  );
};

export default RangeSlider;
