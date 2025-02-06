import React from 'react';

const Pointtable = () => {
  return (
    <div className=" border-2 border-green-500 p-10 rounded-md h-full">    
    <h1 className="text-3xl font-bold mb-4">Flag Report</h1>
   <table className="w-full border border-green-500 text-left">
     <thead className="border-b border-green-500">
       <tr>
         <th className="p-2">Reported At</th>
         <th className="p-2">Link</th>
         <th className="p-2">Status</th>
         <th className="p-2">Points</th>
       </tr>
     </thead>
     <tbody>
       <tr className="border-b border-green-500">
         <td className="p-2">10PM UTC: 25 Jan 2025</td>
         <td className="p-2">https://coinstopper.co</td>
         <td className="p-2">Approved</td>
         <td className="p-2">10 Points</td>
       </tr>
       <tr className="border-b border-green-500">
         <td className="p-2">11AM UTC: 26 Jan 2025</td>
         <td className="p-2">https://scamalert.com</td>
         <td className="p-2">Pending</td>
         <td className="p-2">5 Points</td>
       </tr>
       <tr className="border-b border-green-500">
         <td className="p-2">1PM UTC: 27 Jan 2025</td>
         <td className="p-2">https://fraudwatch.org</td>
         <td className="p-2">Rejected</td>
         <td className="p-2">0 Points</td>
       </tr>
       <tr className="border-b border-green-500">
         <td className="p-2">3PM UTC: 28 Jan 2025</td>
         <td className="p-2">https://phishingtest.com</td>
         <td className="p-2">Approved</td>
         <td className="p-2">15 Points</td>
       </tr>
       <tr className="border-b border-green-500">
         <td className="p-2">5PM UTC: 29 Jan 2025</td>
         <td className="p-2">https://malwarecheck.com</td>
         <td className="p-2">Approved</td>
         <td className="p-2">20 Points</td>
       </tr>
     </tbody>
   </table>
   </div>
  );
};

export default Pointtable;