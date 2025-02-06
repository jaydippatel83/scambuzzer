'use client';
import React, { useState } from 'react';

const ReportContribute = () => {
  const [link, setLink] = useState('');
  const [type, setType] = useState('Phishing');
  const [targeting, setTargeting] = useState('X');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ link, type, targeting });
    // Handle form submission logic
  };

  return (
    <form onSubmit={handleSubmit} className=" p-8 rounded w-full max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Report & Contribute</h2>
          <div className="mb-4 flex justify-start ">
            <label className="block mb-2 text-lg font-semibold mr-4">Link</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2 border border-green-400 bg-background text-green-400 rounded focus:outline-none"
            />
          </div>

          <div className="mb-4 flex justify-start ">
            <label className="block mb-2 text-lg font-semibold mr-4">Type: </label>
            <div className="flex space-x-4">
              {['Phishing', 'Impersonation', 'Drainer contract'].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={option}
                    checked={type === option}
                    onChange={() => setType(option)}
                    className="form-radio text-green-400"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6 flex justify-start ">
            <label className="block mb-2 text-lg font-semibold mr-4">Targeting: </label>
            <div className="flex space-x-4">
              {['X', 'Telegram', 'Crypto'].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={option}
                    checked={targeting === option}
                    onChange={() => setTargeting(option)}
                    className="form-radio text-green-400"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-400 text-black font-bold rounded hover:bg-green-500 transition"
          >
            Submit
          </button>
        </form>
  );
};

export default ReportContribute;
