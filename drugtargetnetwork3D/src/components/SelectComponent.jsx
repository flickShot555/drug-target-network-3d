import React from 'react';
import { Select } from 'antd';

const SelectComponent = ({ options, placeholder, handleChange }) => (
  <Select 
    mode="multiple"
    style={{width : "120px", height:"30px" , padding: "0px" , margin : "5px"}}
    placeholder={placeholder}
    onChange={handleChange}
    options={options}
  />
);

export default SelectComponent;
