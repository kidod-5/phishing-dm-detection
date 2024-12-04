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

    const questions = [
        {
            question: 'Does the account belong to someone you know personally?',
            explanation: 'If not, the message is more likely to be a scam. If you know the account owner, confirm their account is not compromised.',
        },
        {
            question: 'Is the message asking for personal information or financial details?',
            explanation: 'If so, the message is more likely a scam.',
        },
        {
            question: 'How many followers does the account have?',
            explanation: 'If the account has few followers, the message is more likely a scam.',
        },
        {
            question: 'Does the account have a profile picture?',
            explanation: 'If not, the message is more likely a scam.',
        },
        {
            question: 'How many accounts does the account follow?',
            explanation: 'If the account follows many accounts but has few followers, the message is more likely a scam.',
        },
        {
            question: 'Do you have any accounts that you mutually follow?',
            explanation: 'If not, the message is more likely a scam.',
        },
        {
            question: 'Does the account have any identifying information that ties them to a school, location, etc. that you are familiar with?',
            explanation: 'If not, the message is more likely a scam.',
        },
    ];

    const [flippedIndex, setFlippedIndex] = useState(null);

    const handleFlipToggle = (index) => {
        setFlippedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        const currentChartRef = chartRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimateChart(true);
                }
            },
            { threshold: 0.8 }
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

    const hamData = createPieData('Ham', analysisResult?.all_probabilities[0], '#5b9650');
    const phishingData = createPieData('Phishing', analysisResult?.all_probabilities[1], '#cc4141');
    const spamData = createPieData('Spam', analysisResult?.all_probabilities[2], '#f0d02e');

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <div>
            <header className="App-header">
                <a href="/">
                    <img src="/images/phishinglogo.png" alt="Phishing Logo" width="250px" />
                </a>
            </header>
            <div className="Title">
                <h1>is this phishing?</h1>
                <div className="Answer" style={{ color: analysisResult?.color }}>
                    <h2>{analysisResult?.answer}</h2>
                </div>
            </div>
            <div className="Search-landing-body">
                <div className="Probability">
                    <p>
                        There is a <b>{analysisResult?.probability}%</b> chance this is a{' '}
                        {analysisResult?.type} message.
                    </p>
                </div>
                <div className="Analysis">
                    <p>
                        "<em>{analysisResult?.query}</em>"
                        <br />
                        <br />
                        This message is {analysisResult?.conclusion}.
                    </p>
                    <hr />
                    <p>Our advice: {analysisResult?.advice}</p>
                    {analysisResult.answer === 'maybe' && (
                        <div className="Question-circles">
                            <h2>Consider...</h2>
                            {questions.map((q, index) => (
                                <div
                                    key={index}
                                    className={`Circle ${flippedIndex === index ? 'flipped' : ''}`}
                                    onClick={() => handleFlipToggle(index)}
                                >
                                    {flippedIndex === index ? (
                                        <p className="Explanation">{q.explanation}</p>
                                    ) : (
                                        <p className="Question">{q.question}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="Results" ref={chartRef}>
                    <h3>Results</h3>
                    {animateChart && (
                        <div className="Charts">
                            <div className="Pie-chart">
                                <Pie data={hamData} options={pieOptions} />
                            </div>
                            <div className="Pie-chart">
                                <Pie data={spamData} options={pieOptions} />
                            </div>
                            <div className="Pie-chart">
                                <Pie data={phishingData} options={pieOptions} />
                            </div>
                        </div>
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

