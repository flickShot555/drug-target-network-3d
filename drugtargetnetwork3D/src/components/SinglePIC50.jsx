
import { Select, Space } from 'antd';

const PIC50 = [
  { value: '4', label: '4-9' },
  { value: '5', label: '5-9' },
  { value: '6', label: '6-9' },
  { value: '7', label: '7-9' },
  { value: '8', label: '8-9' },
];

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const SinglePIC50 = () => (
  <Space wrap>

    <Select
      style={{
        width: 120,
      }}
      allowClear
      options={PIC50}
      placeholder="PIC50"
    />
  </Space>
);

export default SinglePIC50;
