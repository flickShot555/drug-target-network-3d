// SelectComponent.quick.jsx
import React, { useEffect } from 'react';
import { Select } from 'antd';

const css = `
/* container: single-line, hide overflow */
.no-wrap-multiselect .ant-select-selection-overflow {
  display: flex !important;
  flex-wrap: nowrap !important;
  overflow: hidden !important;
  align-items: center;
  gap: 6px;
}

/* ensure each selection item can shrink (CRITICAL) */
.no-wrap-multiselect .ant-select-selection-item {
  flex: 0 1 auto !important;  /* allow shrink but not grow */
  min-width: 0 !important;    /* allow the item to be smaller than its content */
  display: inline-flex;
  align-items: center;
  overflow: hidden;
}

/* inner content of the item — the text that should ellipsis */
.no-wrap-multiselect .ant-select-selection-item .ant-select-selection-item-content {
  display: inline-block;
  max-width: 180px; /* <- predictable max width for each visible tag; adjust to taste */
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* shrink the search input area so tags don't get pushed */
.no-wrap-multiselect .ant-select-selection-search {
  width: 2px !important;
  flex: 0 0 2px !important;
  opacity: 0;
  pointer-events: none;
}

/* Make sure the +N placeholder (if shown) stays inline and small */
.no-wrap-multiselect .ant-select-selection-item .ant-select-selection-overflow-item-content,
.no-wrap-multiselect .ant-select-selection-item:last-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* optional: reduce tag padding / font-size to better fit small heights */
.no-wrap-multiselect .ant-select-selection-item {
  padding: 0 6px;
  font-size: 13px;
  line-height: 1.2;
}
`;

const SelectComponent = ({ options, placeholder, handleChange, dropwidth = '100%', selectedValues }) => {
  // inject CSS once
  useEffect(() => {
    const STYLE_ID = 'select-component-styles';
    if (!document.getElementById(STYLE_ID)) {
      const styleEl = document.createElement('style');
      styleEl.id = STYLE_ID;
      styleEl.innerHTML = css;
      document.head.appendChild(styleEl);
    }
  }, []);

  const handleSelectChange = (newValues) => {
    handleChange(newValues);
  };

  return (
    <Select
      mode="multiple"
      className="no-wrap-multiselect"
      style={{ width: dropwidth, /* consider removing fixed height if issues persist */ padding: '0px', margin: '5px' }}
      placeholder={placeholder}
      onChange={handleSelectChange}
      options={options}
      dropdownRender={(menu) => (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {menu}
        </div>
      )}
      value={selectedValues}
      maxTagCount={2}
      maxTagTextLength={14}
      // if you want to hide +N entirely, uncomment the next line:
      // maxTagPlaceholder={() => null}
    />
  );
};

export default SelectComponent;