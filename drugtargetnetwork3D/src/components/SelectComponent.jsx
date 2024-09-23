import React from 'react';
import { Select } from 'antd';

const SelectComponent = ({ options, placeholder, handleChange, dropwidth, selectedValues }) => {
  const handleSelectChange = (newValues) => {
    handleChange(newValues); // Call the handleChange function with new selected values
  };

  return (
    <Select
      mode="multiple"
      style={{ width: dropwidth, height: '30px', padding: '0px', margin: '5px' }}
      placeholder={placeholder}
      onChange={handleSelectChange}
      options={options}
      dropdownRender={(menu) => (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {menu}
        </div>
      )}
      value={selectedValues} // Set the current selected values
    />
  );
};

export default SelectComponent;
