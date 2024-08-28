import React from 'react';
import { Button, Slider, Space } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import CustomButton from './CustomButton';

const Footer = () => {
  return (
    <div style={{ padding: '20px', background: 'white', textAlign: 'center' , display: "flex",flexDirection :"row", justifyContent:"center" , alignContent: "center" }}>
  <CustomButton>redraw</CustomButton>
      <div style={{ marginTop: '5px', width: "200px" }}>
        <Slider defaultValue={30}   />
      </div>
      <CustomButton>Export</CustomButton>
    </div>
  );
};

export default Footer;
