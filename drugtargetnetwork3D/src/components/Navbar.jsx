import React from 'react';
import { Layout, Row, Col } from 'antd';
import SelectComponent from './SelectComponent'; // Ensure correct path
import CustomButton from './CustomButton'; // Ensure correct path
import './Stylesfiles/Navbar.css'; // Import any specific styles for Navbar

const { Header } = Layout;

// Sample Data for Dropdowns
const dropdownOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]; 

const handleChange = (value) => {
  console.log('Selected:', value);
};

const Navbar = () => {
  return (
    <Header className="header">
      <Row>
        <Col>
          <CustomButton>200+</CustomButton>
          <CustomButton>200+</CustomButton>
        </Col>
        <Col>
          <SelectComponent
            options={dropdownOptions}
            placeholder="Tissues"
            handleChange={handleChange}
            dropwidth = "100px"
          />
        </Col>
        <Col>
          <SelectComponent
            options={dropdownOptions}
            placeholder="Max clinical phase"
            handleChange={handleChange}
              dropwidth = "150px"
          />
        </Col>
        <Col>
          <SelectComponent
            options={dropdownOptions}
            placeholder="GDSC1"
            handleChange={handleChange}
              dropwidth = "100px"
          />
        </Col>
        <Col>
          <SelectComponent
            options={dropdownOptions}
            placeholder="PIC50"
            handleChange={handleChange}
              dropwidth = "90px"
          />
        </Col>
        <Col>
          <SelectComponent
            options={dropdownOptions}
            placeholder="Cell line lineage"
            handleChange={handleChange}
              dropwidth = "150px"
          />
        </Col>
        <Col>
          <SelectComponent
            options={dropdownOptions}
            placeholder="Disease class"
            handleChange={handleChange}
              dropwidth = "120px"
          />
        </Col>
        <Col>
          <SelectComponent
            options={dropdownOptions}
            placeholder="Compound class"
            handleChange={handleChange}
              dropwidth = "150px"
          />
        </Col>
        <Col>
          <CustomButton>Soon</CustomButton>
          <CustomButton>Apply Filter</CustomButton>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
