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
      <Slider
        range
        step={10}
        defaultValue={[20, 50]}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
    </div>
  );
};

export default RangeSlider;
