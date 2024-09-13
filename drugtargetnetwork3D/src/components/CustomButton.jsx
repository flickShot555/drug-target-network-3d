import { Button } from 'antd';
import PropTypes from 'prop-types'; // Import PropTypes
import { useSelector } from 'react-redux';

const CustomButton = ({ onClick, children }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const buttonStyle = {
    background: isDarkMode 
      ? 'grey' 
      : 'linear-gradient(90deg, rgba(141,158,156,1) 9%, rgba(113,214,233,1) 91%)',
    color: 'white', // Text color remains white for both themes
    border: 'none',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '0.888rem',
    margin: '6px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
  };

  return (
    <Button onClick={onClick} style={buttonStyle}>
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired, // Ensure onClick is provided
  children: PropTypes.node.isRequired, // Explicitly require children prop
};

export default CustomButton;
