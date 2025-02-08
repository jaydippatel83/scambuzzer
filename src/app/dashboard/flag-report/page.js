'use client'
import React, { useEffect, useState } from 'react'; 
import Layout from '../../../components/layout/Layout';
import DashboardLayout from '../../../components/DashboardLayout'; 
import axios from 'axios';

const FlagReport = () => {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    fetchReports();
  }, []);
  const fetchReports = async () => {
    try {
      const res = await axios.get('/api/reports');
      setReports(res.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  } 
  return (
    <Layout>
       <DashboardLayout>
       <div className="border border-green-500 p-10 rounded-md h-full overflow-x-auto">    
       <h1 className="text-3xl font-bold mb-4">Flag Report</h1>
      <div className="overflow-y-auto max-h-screen">
      <table className="min-w-full border border-green-500 text-left">
        <thead className="border-b border-green-500 sticky top-0 bg-background">
          <tr>
            <th className="p-2">Timestamp</th>
            <th className="p-2">Type</th>
            <th className="p-2">Flagged</th>
            <th className="p-2 hidden md:block">User</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
          <tr className="border-b border-green-500" key={report.id}>
            <td className="p-2">
              {new Date(report.createdAt).toLocaleString('en-GB', {
                timeZone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              }).replace(',', ' UTC:')}
            </td>
            <td className="p-2">{report.type} {report.targeting}</td>
            <td className="p-2">{report.link}</td>
            <td className="p-2 hidden md:block">{report?.user?.username}</td>
          </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
        </DashboardLayout>
    </Layout>
  );
};


export default FlagReport;