import { Select, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { updateSelection } from './../app/features/data/dataSlice';

const PIC50 = [
  { value: '4', label: '4-9' },
  { value: '5', label: '5-9' },
  { value: '6', label: '6-9' },
  { value: '7', label: '7-9' },
  { value: '8', label: '8-9' },
];

//commented sytle prop for <select style={{ width: 360 }}></select>
const SinglePIC50 = () => {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(updateSelection({ name: 'selectedpic50', value }));
  };

  return (
    <div style={{ width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
      <Select
        allowClear
        options={PIC50}
        placeholder="PIC50"
        onChange={handleChange}
        style={{ width: '100%' }}   // <-- ensures Select fills wrapper
      />
    </div>
  );
};

export default SinglePIC50;
