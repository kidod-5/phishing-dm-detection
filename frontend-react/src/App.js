import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.js';
import SearchLanding from './SearchLanding.js';

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

