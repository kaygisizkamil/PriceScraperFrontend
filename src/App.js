import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BrandFilterContainer from './containers/BrandFilterContainer';
import { useHistory } from 'react-router-dom';

import { Redirect } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Redirect from="/" to="/index.html" />
      <BrandFilterContainer />
    </Router>
  );
};

export default App;
