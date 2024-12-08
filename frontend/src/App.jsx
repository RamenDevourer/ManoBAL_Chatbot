import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaUserAlt, FaRobot } from 'react-icons/fa'; // Import icons for user and bot
import './App.css';

function App() {
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', message: 'Hello! 😊 I’m ManoBAL, your mental health companion. What should I call you?', timestamp: new Date().toLocaleTimeString() }
  ]); // Initialize chat with a greeting message
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null); // Reference to the end of the chat history

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const updatedChatHistory = [
      ...chatHistory,
      { role: 'user', message: userMessage, timestamp: new Date().toLocaleTimeString() },
    ];
    setChatHistory(updatedChatHistory);
    setUserMessage('');
    setIsLoading(true);

    try {
      // change link for localhost or deployment
      const response = await axios.post('https://manobal-backend.vercel.app/api/chat', {
        userMessage,
        chatHistory: updatedChatHistory,
      });

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        {
          role: 'bot',
          message: response.data.reply,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        {
          role: 'bot',
          message: 'Sorry, something went wrong. Please try again later.',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-scroll to the latest message whenever chatHistory changes
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  return (
    <div className="chat-app">
      <div className="chat-history">
        {chatHistory.map((entry, index) => (
          <div key={index} className={`chat-bubble ${entry.role}`}>
            <div className="chat-icon">
              {entry.role === 'user' ? <FaUserAlt /> : <FaRobot />}
            </div>
            <div>
              <p>{entry.message}</p>
              <span className="timestamp">{entry.timestamp}</span>
            </div>
          </div>
        ))}
        {/* Reference for auto-scrolling */}
        <div ref={chatEndRef}></div>
      </div>
      <div className="chat-input">
        <textarea
          rows="1"
          placeholder="Type a message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={handleInputKeyPress}
        ></textarea>
        <button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default App;
