import React from 'react';
import { Layout, Row, Col } from 'antd';
import SelectComponent from './components/SelectComponent'; // Import your SelectComponent
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
                <SelectComponent
                  options={dropdownOptions}
                  placeholder="Dropdown 2"
                  handleChange={handleChange}
                />
              </Col>
              <Col>
                <SelectComponent
                  options={dropdownOptions}
                  placeholder="Dropdown 1"
                  handleChange={handleChange}
                />
              </Col>
              <Col>
                <SelectComponent
                  options={dropdownOptions}
                  placeholder="Dropdown 1"
                  handleChange={handleChange}
                />
              </Col>
              <Col>
                <SelectComponent
                  options={dropdownOptions}
                  placeholder="Dropdown 1"
                  handleChange={handleChange}
                />
              </Col>
              <Col>
                <SelectComponent
                  options={dropdownOptions}
                  placeholder="Dropdown 1"
                  handleChange={handleChange}
                />
              </Col>
              <Col>
                <SelectComponent
                  options={dropdownOptions}
                  placeholder="Dropdown 1"
                  handleChange={handleChange}
                />
              </Col>
              <Col>
                <SelectComponent
                  options={dropdownOptions}
                  placeholder="Dropdown 1"
                  handleChange={handleChange}
                />
              </Col>

        </Row>

      </Header>
    </Layout>
  );
};

export default App;
