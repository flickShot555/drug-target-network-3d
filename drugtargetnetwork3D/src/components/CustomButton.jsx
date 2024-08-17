import React from 'react';
import { Button } from 'antd';

const CustomButton = ({ children }) => {
  return (
    <Button
      style={{
        backgroundColor: '#28a5fb',
        color: 'white',
        border: 'none',
        padding: '10px 10px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '0.888rem',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '4px',
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
