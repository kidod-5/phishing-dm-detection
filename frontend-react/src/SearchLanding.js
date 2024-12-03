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
import { React, useState, useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

/*--------------------------------------------------------------------------------------------------*/

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const SearchLanding = () => {

    // Get the location object from React Router
    const location = useLocation();
    // Get the analysis result from the location state
    const { analysisResult } = location.state || {};

    const [animateChart, setAnimateChart] = useState(false);
    const chartRef = useRef();

    useEffect(() => {
        const currentChartRef = chartRef.current; // Copy the current ref value

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimateChart(true);
                }
            },
            { threshold: 0.8 } // Trigger when 50% of the chart is visible
        );

        if (currentChartRef) {
            observer.observe(currentChartRef);
        }

        return () => {
            if (currentChartRef) {
                observer.unobserve(currentChartRef);
            }
        };
    }, []);

    // Helper function to create pie chart data
    const createPieData = (label, probability, color) => ({
        labels: [label],
        datasets: [
            {
                data: [probability, 100 - probability],
                backgroundColor: [color, '#eaeaea'],
                hoverBackgroundColor: [color, '#cccccc'],
            },
        ],
    });

    // Define pie chart data for each message type
    const hamData = createPieData('Ham', analysisResult?.all_probabilities[0], '#36A2EB');
    const phishingData = createPieData('Phishing', analysisResult?.all_probabilities[1], '#FF6384');
    const spamData = createPieData('Spam', analysisResult?.all_probabilities[2], '#FFCE56');

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

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
                <div className="Answer" style={{ color: analysisResult?.color }}>
                    <h2>{analysisResult?.answer}</h2>
                </div>
            </div>
            <div className="Search-landing-body">
                <p>
                    There is a <b>{analysisResult?.probability}%</b> chance this is a{' '}
                    {analysisResult?.type} message.
                </p>
                <div className="Analysis">
                    <p>
                        "<em>{analysisResult?.query}</em>"
                        <br />
                        <br />
                        This message is {analysisResult?.conclusion}.
                    </p>
                    <hr />
                    <p>Our advice, {analysisResult?.advice}</p>
                    {analysisResult.answer === 'Maybe' ? (
                        <p>
                            <br />
                            <dl>
                                <dt>Does the account belong to someone you know personally?</dt>
                                    <dd>If not, the message is more likely to be a scam.</dd>
                                    <dd>Even if you know the account owner, confirm their account has not been hacked.</dd>
                                <dt>Is the message asking for personal information or financial details?</dt>
                                    <dd>If so, the message is more likely a scam.</dd>
                                <dt>How many followers does the account have?</dt>
                                    <dd>If the account has few followers, the message is more likely a scam.</dd>
                                <dt>Does the account have a profile picture?</dt>
                                    <dd>If not, the message is more likely a scam.</dd>
                                <dt>How many accounts does the account follow?</dt>
                                    <dd>If the account follows many accounts but has few followers, the message is more likely a scam.</dd>
                                <dt>Do you have any accounts that you mutually follow?</dt>
                                    <dd>If not, the message is more likely a scam.</dd>
                                <dt>Does the account have any identifying information that ties them to a school, location, etc. that you are familiar with?</dt>
                                    <dd>If not, the message is more likely a scam.</dd>
                            </dl>
                        </p>
                    ) : ( null )}
                </div>
                <div className="Results" ref={chartRef}>
                    <h3>Results</h3>
                    {animateChart && (
                        <>
                            <div className="Charts">
                                <div className="Pie-chart">
                                    <Pie className="Pie-chart" data={hamData} options={pieOptions} />
                                </div>
                                <div className="Pie-chart">
                                    <Pie className="Pie-chart" data={phishingData} options={pieOptions} />
                                </div>
                                <div className="Pie-chart">
                                    <Pie className="Pie-chart" data={spamData} options={pieOptions} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <footer className="App-footer">
                <p>© 2024 Kido Douglas & Genna Olavarri</p>
            </footer>
        </div>
    );
};

export default SearchLanding;