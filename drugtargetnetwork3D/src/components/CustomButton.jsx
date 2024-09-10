import React from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

const CustomButton = ({ onClick, children }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Get the current theme

  const buttonStyle = {
    background: isDarkMode 
      ? 'grey' 
      : 'linear-gradient(90deg, rgba(141,158,156,1) 9%, rgba(113,214,233,1) 91%)',
    color: isDarkMode ? 'white' : 'white', // Text color remains white for both themes
    border: 'none',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '0.888rem',
    margin: '6px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
    // padding: '10px 20px', // Adjusted padding for better appearance
  };

  return (
    <Button onClick={onClick} style={buttonStyle}>
      {children}
    </Button>
  );
};

export default CustomButton;
