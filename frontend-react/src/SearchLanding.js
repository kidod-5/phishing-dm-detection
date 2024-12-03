/*--------------------------------------------------------------------------------------------------*
 *                                   Search Landing Page Component                                  *
 *                                         Genna Olavarri                                           *
 *                                            11-2024                                               *
 *--------------------------------------------------------------------------------------------------*/

/* This is the search landing page of the phishing detection web app. It displays the user's query, the
   analysis results, and the probability of the message being phishing.
*/

/*--------------------------------------------------------------------------------------------------*/

// React imports
import { useLocation } from 'react-router-dom';
import React from 'react';

/*--------------------------------------------------------------------------------------------------*/

const SearchLanding = () => {

    // Get the location object from React Router
    const location = useLocation();
    // Get the analysis result from the location state
    const { analysisResult } = location.state || {};

/*--------------------------------------------------------------------------------------------------*/

    return (
        <div>
        <header className="App-header">
            <a href="/">
                <img src="/images/phishinglogo.png" alt="Phishing Logo" width="200px" />
            </a>
        </header>
        <div className="Title">
            <h1>is this phishing?</h1>
            <div className="Answer" style={{ color: analysisResult.color }}>
                <h2>{ analysisResult.answer }</h2>
            </div>
        </div>
        <div className="Search-landing-body">
            <p>There is a <b>{ analysisResult.probability }%</b> chance this is a { analysisResult.type } message.</p>
            <div className="Analysis">
                <p>"<em>{ analysisResult.query }</em>"
                    <br></br><br></br>
                    This message is {analysisResult.conclusion}.
                </p>
                <hr></hr>
                <p>Our advice, {analysisResult.advice}</p>
                <p>{analysisResult.additional_qs ? analysisResult.additional_qs : ''}</p>
            </div>
        </div>
        <footer className="App-footer">
            <p>
                © 2024 Kido Douglas & Genna Olavarri
            </p>
        </footer>
    </div>
    );
}

export default SearchLanding;