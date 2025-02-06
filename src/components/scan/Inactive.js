import React from 'react';

const InactiveScan = () => {
    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-4">Commando Scan Terminal</h1>
            <p className="text-red-500 text-lg">● Inactive</p>
            <p className="text-lg mt-4 max-w-3xl mx-auto">
                To activate commando and start scan, please <span className="font-bold">subscribe</span> and submit whitelisting information to alert and hunt down the scams.
            </p>
            <button className="mt-6 px-6 py-3 bg-green-600 text-black font-bold rounded">Subscribe Now: $299 / Year</button>
        </div>
    );
};

export default InactiveScan;