import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BrandFilterContainer from './containers/BrandFilterContainer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrandFilterContainer />} />
      </Routes>
    </Router>
  );
};

export default App;
