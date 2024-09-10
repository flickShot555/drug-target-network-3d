import React, { useState } from 'react';

const Redraw = ({ children }) => {
  const [key, setKey] = useState(0);

  const handleRedraw = () => {
    // Increment the key to force re-render
    setKey(prevKey => prevKey + 1);
  };

  return (
    <div>
      {React.isValidElement(children) 
        ? React.cloneElement(children, { key }) 
        : null}
      <CustomButton onClick={handleRedraw}>Redraw</CustomButton>
    </div>
  );
};

export default Redraw;
