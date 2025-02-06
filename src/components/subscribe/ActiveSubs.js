import React from 'react';

const ActiveSubs = () => {
    return (
        <div className="w-full h-full border border-green-500 p-6 rounded-md">
        <h1 className="text-3xl font-bold text-green-400 text-center ">Subscription</h1>

        {/* Subscription Status */}
        <div className="my-10 mx-auto text-green-300 text-sm  w-full max-w-2xl flex flex-col items-center justify-center">
          <div className="flex items-center">
            <span className="font-semibold w-32">Subscription:</span> 
            <span className="h-3 w-3 bg-green-500 rounded-full inline-block mr-2"></span>
            <span className="text-green-400 font-semibold">Active</span>
          </div>

          <div className="flex items-center mt-2">
            <span className="font-semibold w-32">Valid from:</span>
            <span>7 February 2025</span>
          </div>

          <div className="flex items-center mt-2">
            <span className="font-semibold w-32">Valid till:</span>
            <span>6 February 2026</span>
          </div>

          <div className="flex items-center mt-2">
            <span className="font-semibold w-32">Deployed on:</span>
            <span>Base</span>
          </div>

          <div className="flex items-center mt-2">
            <span className="font-semibold w-32">Transaction:</span>
            <a href="https://basescan.org/ssfdsf" className="text-green-400 underline">
              basescan.org/ssfdsf
            </a>
          </div>
        </div>
      </div>
    );
};

export default ActiveSubs;