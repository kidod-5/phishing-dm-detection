/*--------------------------------------------------------------------------------------------------*
 *                                         Main React App                                           *
 *                                         Genna Olavarri                                           *
 *                                            11-2024                                               *
 *--------------------------------------------------------------------------------------------------*/

/* This is the main React app component. It contains the routing for the home page and search landing page. */

/*--------------------------------------------------------------------------------------------------*/

// React imports
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Local imports
import Home from './Home.js';
import SearchLanding from './SearchLanding.js';

/*--------------------------------------------------------------------------------------------------*/

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-landing" element={<SearchLanding />} />
      </Routes>
    </Router>
  );
}

export default App;

