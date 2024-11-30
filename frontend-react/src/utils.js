/*--------------------------------------------------------------------------------------------------*
 *                                         Util Functions                                           *
 *                                         Genna Olavarri                                           *
 *                                            11-2024                                               *
 *--------------------------------------------------------------------------------------------------*/

/* This file contains utility functions for the phishing detection web app. */

/*--------------------------------------------------------------------------------------------------*/

// React imports
import React, { useState, useEffect } from 'react';

/*--------------------------------------------------------------------------------------------------*/

function TypingEffect({searchText, setSearchText}) {
  /*
    This component creates a typing effect in the search bar placeholder.

    Parameters:
    - searchText: the current search text
    - setSearchText: the function to update the search text

    Returns:
    - an input element with a typing effect placeholder
  */
    // Placeholder messages to cycle through
    const placeholderMessages = React.useMemo(() => [
        "Want free money??...",
        "Well hello there! I am a prince...",
        "Hey can you help me with the chem hw?...",
        "Help! I'm locked out of my account...",
        "Click here if you like free stuff!...",
        "I'm a very real person with a very real offer...",
        "Look I made this for you! https://www..."
      ], []);
    
      const [placeholder, setPlaceholder] = useState('');
      const [currentIndex, setCurrentIndex] = useState(0);
    
      useEffect(() => {
        if (!placeholderMessages || placeholderMessages.length === 0) return;
    
        let typingInterval;
        let deletingInterval;
        // Local variable to track current text
        let currentText = '';
    
        const typeMessage = (message) => {
          let charIndex = 0;
          typingInterval = setInterval(() => {
            if (charIndex < message.length) {
              // Update the local variable
              currentText += message[charIndex];
              // Update the placeholder to the current value of the local variable
              setPlaceholder(currentText);
              charIndex++;
            } else {
              clearInterval(typingInterval);
              // Pause for 1 second before deleting
              setTimeout(() => deleteMessage(message), 1000);
            }
            // Determines the typing speed (lower number = faster typing)
          }, 80);
        };
    
        const deleteMessage = (message) => {
          let charIndex = message.length;
          deletingInterval = setInterval(() => {
            if (charIndex > 0) {
              // Delete the last character from the local variable
              currentText = currentText.slice(0, -1);
              // Update the placeholder with the local variable value
              setPlaceholder(currentText);
              charIndex--;
            } else {
              clearInterval(deletingInterval);
              // Move to the next message
              setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholderMessages.length);
            }
            // Determines the deleting speed (lower number = faster deleting)
          }, 40);
        };
    
        // Start typing the first message
        typeMessage(placeholderMessages[currentIndex]);
    
        return () => {
          clearInterval(typingInterval);
          clearInterval(deletingInterval);
        };
      }, [currentIndex, placeholderMessages]);

    return <input type="text" 
                  className="Message-input"
                  placeholder={placeholder} 
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />;
}

function HandleSearch(search_input) {
  /*
    This function handles the search input from the user.

    Parameters:
    - search_input: the user's search input

    Returns:
    - a paragraph element displaying the search input
  */
    return <p>Searching for: {search_input}</p>;
}

function LoadingEffect() {
  /*
    This component creates a loading effect with dots that cycle through.

    Returns:
    - a paragraph element with a loading message
  */

  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? '' : prevDots + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <p>Loading{dots}</p>;
}

export { TypingEffect, HandleSearch, LoadingEffect };