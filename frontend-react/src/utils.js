import React, { useState, useEffect } from 'react';

function TypingEffect({searchText, setSearchText}) {
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
        let currentText = ''; // Local variable to track current text
    
        const typeMessage = (message) => {
          let charIndex = 0;
          typingInterval = setInterval(() => {
            if (charIndex < message.length) {
              currentText += message[charIndex]; // Update the local variable
              setPlaceholder(currentText); // Update the placeholder with the local variable
              charIndex++;
            } else {
              clearInterval(typingInterval);
              setTimeout(() => deleteMessage(message), 1000); // Pause before deleting
            }
          }, 80); // Typing speed
        };
    
        const deleteMessage = (message) => {
          let charIndex = message.length;
          deletingInterval = setInterval(() => {
            if (charIndex > 0) {
              currentText = currentText.slice(0, -1); // Remove last character from the local variable
              setPlaceholder(currentText); // Update the placeholder with the local variable
              charIndex--;
            } else {
              clearInterval(deletingInterval);
              setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholderMessages.length); // Move to the next message
            }
          }, 40); // Deleting speed
        };
    
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
                  onChange={(e) => setSearchText(e.target.value)}  // Update state on change
                />;
}

function HandleSearch(search_input) {
    return <p>Searching for: {search_input}</p>;
}

function LoadingEffect() {
  // Make each dot appear after 1 second

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