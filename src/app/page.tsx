// Mark the component as a Client Component
"use client"; 

import React, { useState, useEffect } from 'react';
import { connectWebSocket, sendMessage } from './websocket';

const InterviewPage: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    connectWebSocket((message: string) => {
      setResponse(message); // Update the response when a message is received
    });
  }, []);

  const handleSendMessage = () => {
    if (question.trim() !== '') {
      sendMessage(question);
      setQuestion(''); // Clear the input field
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Interview Assistant</h2>
      <div className="mt-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 bg-blue-600 text-white py-2 px-4 rounded"
        >
          Ask Question
        </button>
      </div>
      {response && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-bold">Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;
