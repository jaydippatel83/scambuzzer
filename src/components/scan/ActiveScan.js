import React from 'react';

const ActiveScan = () => {
    return ( 
        <div className="flex flex-col items-center justify-center">
          {/* Terminal Header */}
          <div className="w-full max-w-2xl p-6 ">
            <h1 className="text-3xl font-bold text-green-400 text-center">Commando Scan Terminal</h1>
            <div className="flex items-center justify-center mt-2">
              <span className="h-3 w-3 bg-green-500 rounded-full inline-block mr-2"></span>
              <span className="text-green-400 text-lg font-semibold">Active</span>
            </div>
  
            {/* Status Details */}
            <div className="mt-4 text-green-300 text-sm">
              <p><span className="font-semibold">Logged in:</span> commando@ethglobal</p>
              <p>
                <span className="font-semibold">Last scan:</span> Thu Jan 16 13:10:08 on console: 
                <span className="text-red-400 font-semibold"> Flagged 2 URLs | 1 @X account</span>
              </p>
            </div>
  
            {/* Scanning Details */}
            <div className="mt-6 text-green-300">
              <p className="font-semibold text-green-400">Scanning Social posts...</p>
              <p className="text-sm">x.com/ethglobal/post/234234/comments/dsfsfsdf</p>
              <p className="text-sm">x.com/ethglobal/post/234234/comments/dsfsfsdf</p>
              <p className="text-sm">x.com/ethglobal/post/234234/comments/dsfsfsdf</p>
            </div>
  
            {/* Phishing Attempts */}
            <div className="mt-4 text-green-300">
              <p className="font-semibold text-green-400">Scanning Phishing URL attempts...</p>
              <p className="text-sm">x.com/ethglobal/post/234234/comments/dsfsfsdf</p>
            </div>
  
            {/* Scan Report */}
            <div className="mt-6 text-green-300 text-sm border-t border-green-500 pt-3">
              <p className="text-green-400 font-semibold">
                Scan Report: 
                <span className="text-red-400 font-semibold"> 2 X impersonating accounts | 4 Phishing URLs</span>
              </p>
            </div>
          </div>
        </div> 
    );
};

export default ActiveScan;