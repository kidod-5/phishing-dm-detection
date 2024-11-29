import { useLocation } from 'react-router-dom';
import React from 'react';

const SearchLanding = () => {

    const location = useLocation();
    const { analysisResult } = location.state || {}; // Retrieve the passed state

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
            <p>There is a <b>{ analysisResult.probability }%</b> chance this is a phishing message.</p>
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
        </div>
    );
}

export default SearchLanding;