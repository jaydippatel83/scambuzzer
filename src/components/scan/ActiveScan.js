"use client";

import { usePrivy } from '@privy-io/react-auth';
import React, { useState } from 'react';


const ActiveScan = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [riskResult, setRiskResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = usePrivy();

  // Function to trigger risk scan using real data via Covalent's SDK.
  const performRiskScan = async () => {
    if (!walletAddress.trim()) {
      setError("Please enter a wallet address.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setRiskResult(null);
    
    try {
      const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address: walletAddress })
      });
      
      if (!response.ok) {
        throw new Error("Risk assessment API error");
      }
      
      const data = await response.json();
      setRiskResult(data);
    } catch (err) {
      console.error("Error during risk scan:", err);
      setError('Failed to perform risk assessment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Terminal Header */}
      <div className="w-full max-w-2xl p-6">
        <h1 className="text-3xl font-bold text-green-400 text-center">Commando Scan</h1>
        <div className="flex items-center justify-center mt-2">
          <span className="h-3 w-3 bg-green-500 rounded-full inline-block mr-2"></span>
          <span className="text-green-400 text-lg font-semibold">Active</span>
        </div>

        {/* Status Details */}
        <div className="mt-4 text-green-300 text-sm">
          <p>
            <span className="font-semibold">Logged in:</span> {`commando@${user?.twitter?.username}`}
          </p>
         
        </div>

        {/* Input field for wallet address */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Enter wallet address (e.g., 0xabc...)"
            className="w-full p-3 rounded border border-gray-400"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>

        {/* Risk Assessment Button */}
        <div className="mt-6">
          <button
            onClick={performRiskScan}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Scanning..." : "Perform Risk Assessment"}
          </button>
          {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>

        {/* Display Risk Assessment Results */}
        {riskResult && (
          <div className="mt-4 bg-gray-800 p-4 rounded">
            <p className="text-green-400 font-semibold">
              Risk Score: <span className="text-white">{riskResult.riskScore}%</span>
            </p>
            <p className="text-green-400">
              Flags: <span className="text-white">{riskResult.alertFlags.join(", ") || 'None'}</span>
            </p>
            <p className="text-green-400">
              Explanation: <span className="text-white">{riskResult.explanation}</span>
            </p>
            <div className="mt-2 text-green-400 text-sm">
              <p>
                <span className="font-semibold">Amount (USD):</span> {riskResult.details.amountUSD}
              </p>
              <p>
                <span className="font-semibold">Transaction History Count:</span>{' '}
                {riskResult.details.senderHistoryLength}
              </p>
              <p>
                <span className="font-semibold">Token Movements:</span>{' '}
                {riskResult.details.tokenMovementsCount}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveScan;