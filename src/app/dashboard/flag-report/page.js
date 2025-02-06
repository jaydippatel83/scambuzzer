import React from 'react'; 
import Layout from '../../../components/layout/Layout';
import DashboardLayout from '../../../components/DashboardLayout';

const FlagReport = () => {
  return (
    <Layout>
       <DashboardLayout>
       <div className=" border-2 border-green-500 p-10 rounded-md h-full">    
       <h1 className="text-3xl font-bold mb-4">Flag Report</h1>
      <table className="w-full border border-green-500 text-left">
        <thead className="border-b border-green-500">
          <tr>
            <th className="p-2">Timestamp</th>
            <th className="p-2">Type</th>
            <th className="p-2">Flagged</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-green-500">
            <td className="p-2">10PM UTC: 25 Jan 2025</td>
            <td className="p-2">Impersonating X</td>
            <td className="p-2">x.com/username</td>
          </tr>
          <tr className="border-b border-green-500">
            <td className="p-2">10PM UTC: 25 Jan 2025</td>
            <td className="p-2">Phishing URL</td>
            <td className="p-2">scamwebsite.com</td>
          </tr>
          <tr className="border-b border-green-500">
            <td className="p-2">10PM UTC: 25 Jan 2025</td>
            <td className="p-2">Phishing URL</td>
            <td className="p-2">scamwebsite.com</td>
          </tr>
          <tr className="border-b border-green-500">
            <td className="p-2">10PM UTC: 25 Jan 2025</td>
            <td className="p-2">Phishing URL</td>
            <td className="p-2">scamwebsite.com</td>
          </tr>
          <tr className="border-b border-green-500">
            <td className="p-2">10PM UTC: 25 Jan 2025</td>
            <td className="p-2">Phishing URL</td>
            <td className="p-2">scamwebsite.com</td>
          </tr>
        </tbody>
      </table>
      </div>
       </DashboardLayout>
    </Layout>
  );
};

export default FlagReport;