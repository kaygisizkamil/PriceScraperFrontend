import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BrandFilterContainer from './containers/BrandFilterContainer';


const App = () => {
  useEffect(() => {
    // Detect if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Modify the viewport based on device type
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      if (isMobile) {
        // Set viewport for desktop mode
        viewport.content = 'width=1024, initial-scale=1.0';
      } else {
        // Set default responsive viewport for mobile devices
        viewport.content = 'width=device-width, initial-scale=1.0';
      }
    }
  }, []);
  return (
    <div>
      <BrandFilterContainer />
    </div>
  );
};

export default App;
