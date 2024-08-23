import React from 'react';
import { Button } from 'antd';

const CustomButton = ({ children }) => {
  return (
    <Button
      style={{
        background: 'rgb(27,150,134)' ,
        background: 'linear-gradient(90deg, rgba(141,158,156,1) 9%, rgba(113,214,233,1) 91%)',
        color: 'white',
        border: 'none',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '0.888rem',
        margin: '6px 2px',
        cursor: 'pointer',
        borderRadius: '4px',
        // padding: '10px 20px', // Adjusted padding for better appearance
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
