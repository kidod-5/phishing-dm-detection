import React, { useState } from 'react';
import './App.css';
import { TypingEffect } from './utils.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [searchText, setSearchText] = useState(''); // State to store the search input
  const navigate = useNavigate(); // React Router navigation

  const backendUrl = 'https://phishing-detection-345117673535.us-central1.run.app';

  const handleSearchClick = async (event) => {
    event.preventDefault(); // Prevent form submission
    try {
      // Send the query to the backend using Axios GET
      const response = await axios.get(`${backendUrl}/search-landing`, {
        params: { query: searchText }, // Pass the search text as a query parameter
      });
      const analysisResult = response.data; // Assuming the backend sends the analysis result
  
      // Navigate to the search landing page with results
      navigate('/search-landing', { state: { analysisResult } });
    } catch (error) {
      console.error('Error submitting the search query:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <a href="/">
          <img src="/images/phishinglogo.png" alt="Phishing Logo" width="200px" />
        </a>
      </header>
      <div className="App-body" id="Home_page">
        <div className="Left-container">
          <h1>is this phishing?</h1>
        </div>
        <div className="Search-area">
          <form className="Searchbar" action="action_page.php" onSubmit={handleSearchClick}>
            <TypingEffect searchText={searchText} setSearchText={setSearchText} />
            <button className="searchbtn" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
          <p>Curious if a social media DM or comment is a scam? Enter the suspicious message above to learn more.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

