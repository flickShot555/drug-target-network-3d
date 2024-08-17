import React from 'react';
import { Layout, Row, Col } from 'antd';
import SelectComponent from './components/SelectComponent'; // Import your SelectComponent
import CustomButton from './components/CustomButton';

import './App.css'; // Import the CSS file

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

const App = () => {
  return (
    <Layout>
      <Header className="header">
        <Row >
          <Col>
          {/* <p>add more</p> */}
          <CustomButton>200+</CustomButton>
          <CustomButton>200+</CustomButton>
          </Col>
              <Col>
                <SelectComponent
                  options={dropdownOptions}
                  placeholder="Tissues"
                  handleChange={handleChange}
                />
              </Col>
              <Col>
                <SelectComponent
                  options={dropdownOptions}
                  placeholder=" Max clinical phase"
                  handleChange={handleChange}
                />
              </Col>
              <Col>
                <SelectComponent
                  options={dropdownOptions}
                  placeholder="GDSC1"
                  handleChange={handleChange}
                />
              </Col>
              <Col>
                <SelectComponent
                  options={dropdownOptions}
                  placeholder="PIC50"
                  handleChange={handleChange}
                />
              </Col>
              <Col>
                <SelectComponent
                  options={dropdownOptions}
                  placeholder="Cell line lineage"
                  handleChange={handleChange}
                />
              </Col>
              <Col>
                <SelectComponent
                  options={dropdownOptions}
                  placeholder="Disease class"
                  handleChange={handleChange}
                />
              </Col>
              <Col>
                <SelectComponent
                  options={dropdownOptions}
                  placeholder="Compound class"
                  handleChange={handleChange}
                />
              </Col>
             
              <Col>
          <CustomButton>Soon</CustomButton>
          <CustomButton>Apply Filter</CustomButton>
              </Col>

        </Row>

      </Header>
    </Layout>
  );
};

export default App;
