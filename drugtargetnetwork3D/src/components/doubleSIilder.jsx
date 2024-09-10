import React from "react";
import { Slider, ConfigProvider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { updateDoubleSliderValue } from "./../app/features/data/dataSlice";

const RangeSlider = () => {
  // Get slider min and max values from Redux store
  const sliderMin = useSelector((state) => state.data.sliderMin);
  const sliderMax = useSelector((state) => state.data.silderMax);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Adjust according to your theme slice
  
  const dispatch = useDispatch();
  
  const onChange = (value) => {
    console.log("onChange: ", value);
  };

  const onAfterChange = (value) => {
    console.log("onAfterChange: ", value);
    // Dispatch the action to update the slider min and max values in Redux store
    dispatch(updateDoubleSliderValue(value));
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: isDarkMode ? '#001529' : '#1890ff', // Change primary color based on theme
          colorTextBase: isDarkMode ? '#fff' : '#000', // Change text color based on theme
          colorBgBase: isDarkMode ? '#333' : '#f9f9f9', // Change background color based on theme
          colorBorder: isDarkMode ? '#444' : '#d9d9d9', // Change border color based on theme
        },
      }}
    >
      <div style={{ padding: "20px" }}>
        <h5 style={{ color: isDarkMode ? 'white' : 'black' }}>
          Drug response (pIC50) MIN-{sliderMin} MAX-{sliderMax}
        </h5>
        <Slider
          range
          min={4.0}
          max={9.0}
          step={0.1}
          defaultValue={[sliderMin, sliderMax]}
          onChange={onChange}
          onAfterChange={onAfterChange}
          // style={{ width: "200px", backgroundColor: isDarkMode ? '#333' : '#333' }}
        />
      </div>
    </ConfigProvider>
  );
};

export default RangeSlider;
