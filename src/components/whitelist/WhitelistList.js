'use client'
import React, { useEffect, useState } from 'react'; 

const WhitelistList = ({ whitelist, handleDelete }) => { 
    return (
       <div className="mt-6 w-full">
          <h2 className="text-xl font-bold mb-2">Whitelisted Entries</h2>
          {whitelist.map((entry) => (
            <div key={entry._id} className="p-4 border border-green-500 rounded mb-2">
              <p><strong>@X Handle:</strong> {entry.xHandle}</p>
              <p><strong>@Telegram:</strong> {entry.telegram}</p>
              <p><strong>Website:</strong> {entry.website}</p>
              <p><strong>Contract Address:</strong> {entry.contractAddress}</p>
              <button onClick={() => handleDelete(entry._id)} className="mt-2 p-2 bg-red-500 text-white rounded">Delete</button>
            </div>
          ))}
        </div>
    );
};

export default WhitelistList;