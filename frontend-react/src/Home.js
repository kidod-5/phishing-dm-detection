/*--------------------------------------------------------------------------------------------------*
 *                                      Home Page Component                                         *
 *                                         Genna Olavarri                                           *
 *                                            11-2024                                               *
 *--------------------------------------------------------------------------------------------------*/

/* This is the home page of the phishing detection web app. It contains the search bar and takes user
   input to check if a message is phishing.
*/

/*--------------------------------------------------------------------------------------------------*/

// React imports
import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

// Axios for API requests
import axios from 'axios';

// Local imports
import { TypingEffect, LoadingEffect } from './utils.js';

/*--------------------------------------------------------------------------------------------------*/

const Home = () => {
  /* Home page component */

  // State to store the loading status
  const [isLoading, setIsLoading] = useState(false);
  // State to store the search input
  const [searchText, setSearchText] = useState('');
  // React Router navigation hook
  const navigate = useNavigate();

  // Google Cloud Function URL (hosted by admin Google account)
  const backendUrl = 'https://phishing-detection-345117673535.us-central1.run.app';

  const handleSearchClick = async (event) => {
    // Prevent the default form submission
    event.preventDefault(); 
    // Set loading to true while the request
    setIsLoading(true);
    try {
      // Send the query to the backend using Axios GET
      const response = await axios.get(`${backendUrl}/search-landing`, {
        // Pass the search text as a query parameter
        params: { query: searchText },
      });
      // Assuming the backend sends the analysis result
      const analysisResult = response.data;

      // Pause for 1.5 seconds to simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Set loading to false after the request
      setIsLoading(false);
  
      // Navigate to the search landing page with results
      navigate('/search-landing', { state: { analysisResult } });
    } catch (error) {
      console.error('Error submitting the search query:', error);

      // Set loading to false after the request
      setIsLoading(false);
    }
  };

  /*--------------------------------------------------------------------------------------------------*/

  return (
    <div className="App">
        {isLoading ? (
            <div className="Loading-page">
                <LoadingEffect />
            </div>
        ) : (
            <>
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
                        <form
                            className="Searchbar"
                            action="action_page.php"
                            onSubmit={handleSearchClick}
                        >
                            <TypingEffect
                                searchText={searchText}
                                setSearchText={setSearchText}
                            />
                            <button className="searchbtn" type="submit">
                                <i className="fa fa-search"></i>
                            </button>
                        </form>
                        <p>
                            Curious if a social media DM or comment is a scam? Enter the suspicious message
                            above to learn more.
                        </p>
                    </div>
                </div>
            </>
        )}
    </div>
  );
};

export default Home;
