'use client'
import React, { useEffect, useState } from 'react'; 
import Layout from '../../../components/layout/Layout';
import DashboardLayout from '../../../components/DashboardLayout'; 
import axios from 'axios';

const FlagReport = () => {
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    url: '',
    scamType: '',
    targetPlatform: '',
    description: ''
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get('https://api.scambuzzer.com/api/phishing');
      console.log(res.data);
      setReports(res.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://api.scambuzzer.com/api/phishing', formData);
      setFormData({
        url: '',
        scamType: '',
        targetPlatform: '',
        description: ''
      });
      // Refresh reports list
      fetchReports();
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <DashboardLayout>
        <div className="border border-green-500 p-10 rounded-md h-full overflow-x-auto">    
          <h1 className="text-3xl font-bold mb-4">Flag Report</h1>
          
          {/* Add Report Form */}
          <div className="mb-8 p-6 border border-green-500 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Submit New Report</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">URL:</label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full p-2 border border-green-500 rounded-md bg-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2">Scam Type:</label>
                <input
                  type="text"
                  name="scamType"
                  value={formData.scamType}
                  onChange={handleChange}
                  className="w-full p-2 border border-green-500 rounded-md bg-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2">Target Platform:</label>
                <input
                  type="text"
                  name="targetPlatform"
                  value={formData.targetPlatform}
                  onChange={handleChange}
                  className="w-full p-2 border border-green-500 rounded-md bg-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-green-500 rounded-md bg-transparent"
                  rows="4"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Submit Report
              </button>
            </form>
          </div>

          {/* Existing Reports Table */}
          <div className="overflow-y-auto max-h-screen">
            <table className="min-w-full border border-green-500 text-left">
              <thead className="border-b border-green-500 sticky top-0 bg-background">
                <tr>
                  <th className="p-2">URL</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Target</th>
                  <th className="p-2 hidden md:block">isActive</th>
                </tr>
              </thead>
              <tbody>
                {reports.slice().reverse().map((report) => (
                <tr className="border-b border-green-500" key={report.id}>
                  <td className="p-2">
                    {report.url}
                  </td>
                  <td className="p-2">{report.scamType}</td>
                  <td className="p-2">{report.targetPlatform}</td>
                  <td className="p-2 hidden md:block">{report?.isActive ? 'Active' : 'Inactive'}</td>
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