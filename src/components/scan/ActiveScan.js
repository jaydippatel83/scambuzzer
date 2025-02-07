'use client';
import React, { useState, useEffect } from 'react';

const ActiveScan = ({ username = 'imansi_joshi' }) => {
    const [scanData, setScanData] = useState({
        lastScan: null,
        tweets: [],
        interactions: [],
        flaggedUrls: 0,
        flaggedAccounts: 0
    });
    const [isScanning, setIsScanning] = useState(false);
    const [logs, setLogs] = useState([]);

    const fetchTwitterData = async () => {
        try {
            setIsScanning(true);
            const response = await fetch(`http://localhost:3001/api/twitter/scan?username=${username}`);

            if (!response.ok) {
                throw new Error('Failed to fetch Twitter data');
            }

            const data = await response.json();

            if (data.success) {
                setScanData({
                    lastScan: new Date(data.data.lastScan),
                    tweets: data.data.tweets || [],
                    interactions: data.data.interactions || [],
                    flaggedUrls: data.data.flaggedUrls || 0,
                    flaggedAccounts: data.data.flaggedAccounts || 0
                });
                setLogs(data.data.logs || []);
            }
        } catch (error) {
            console.error('Error fetching Twitter data:', error);
        } finally {
            setIsScanning(false);
        }
    };

    useEffect(() => {
        fetchTwitterData();
        const interval = setInterval(fetchTwitterData, 60000);
        return () => clearInterval(interval);
    }, [username]);

    // Extract URLs and mentions from tweets
    const extractFlaggedContent = () => {
        const urls = [];
        const accounts = [];

        scanData.tweets.forEach(tweet => {
            // Extract URLs
            const foundUrls = tweet.text?.match(/https?:\/\/[^\s]+/g) || [];
            urls.push(...foundUrls);

            // Extract mentions
            const foundMentions = tweet.text?.match(/@\w+/g) || [];
            accounts.push(...foundMentions);
        });

        return {
            urls: [...new Set(urls)], // Remove duplicates
            accounts: [...new Set(accounts)] // Remove duplicates
        };
    };

    const flaggedContent = extractFlaggedContent();

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Terminal Header */}
            <div className="w-full max-w-2xl p-6 ">
                <h1 className="text-3xl font-bold text-green-400 text-center">Commando Scan Terminal</h1>
                <div className="flex items-center justify-center mt-2">
                    <span className={`h-3 w-3 ${isScanning ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'} rounded-full inline-block mr-2`}></span>
                    <span className="text-green-400 text-lg font-semibold">{isScanning ? 'Scanning...' : 'Active'}</span>
                </div>

                {/* Status Details */}
                <div className="mt-4 text-green-300 text-sm">
                    <p><span className="font-semibold">Logged in:</span> commando@{username}</p>
                    <p>
                        <span className="font-semibold">Last scan:</span> {scanData.lastScan ? scanData.lastScan.toLocaleString() : 'Never'} on console:
                        <span className="text-red-400 font-semibold"> Flagged {scanData.flaggedUrls} URLs | {scanData.flaggedAccounts} @X accounts</span>
                    </p>
                </div>

                {/* Flagged URLs */}
                <div className="mt-6 text-green-300">
                    <p className="font-semibold text-green-400">Flagged URLs ({flaggedContent.urls.length}):</p>
                    {flaggedContent.urls.map((url, index) => (
                        <p key={index} className="text-sm text-yellow-300">
                            • {url}
                        </p>
                    ))}
                    {flaggedContent.urls.length === 0 && (
                        <p className="text-sm text-gray-400">No suspicious URLs detected</p>
                    )}
                </div>

                {/* Flagged Accounts */}
                <div className="mt-4 text-green-300">
                    <p className="font-semibold text-green-400">Flagged Accounts ({flaggedContent.accounts.length}):</p>
                    {flaggedContent.accounts.map((account, index) => (
                        <p key={index} className="text-sm text-red-300">
                            • {account}
                        </p>
                    ))}
                    {flaggedContent.accounts.length === 0 && (
                        <p className="text-sm text-gray-400">No suspicious accounts detected</p>
                    )}
                </div>

                {/* Scan Report */}
                <div className="mt-6 text-green-300 text-sm border-t border-green-500 pt-3">
                    <p className="text-green-400 font-semibold">
                        Scan Report:
                        <span className="text-red-400 font-semibold"> {scanData.flaggedAccounts} X impersonating accounts | {scanData.flaggedUrls} Phishing URLs</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ActiveScan;