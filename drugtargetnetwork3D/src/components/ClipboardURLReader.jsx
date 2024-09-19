import React, { useEffect } from 'react';

const LogURL = () => {
  useEffect(() => {
    // Log the current URL to the console
    console.log(window.location.href);
  }, []);

  return (
    <div>
      <h1>Check the console for the current URL</h1>
    </div>
  );
};

export default LogURL;
