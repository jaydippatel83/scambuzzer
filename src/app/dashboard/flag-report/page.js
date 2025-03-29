'use client'
import React, { useEffect, useState } from 'react'; 
import Layout from '../../../components/layout/Layout';
import DashboardLayout from '../../../components/DashboardLayout'; 
import axios from 'axios';
import toast from 'react-hot-toast';


const FlagReport = () => {
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    url: '',
    scamType: '',
    targetPlatform: '',
    description: '',
    contractAddress: '',
    chainId: '',
    contractType: '',
    contractVerified: false
  });

  // Chain options similar to whitelist
  const chainOptions = [
    { id: 1, name: 'Ethereum Mainnet' },
    { id: 56, name: 'Binance Smart Chain' },
    { id: 137, name: 'Polygon' },
    { id: 42161, name: 'Arbitrum' },
    { id: 10, name: 'Optimism' },
  ];

  // Contract type options
  const contractTypes = ['token', 'nft', "dex", 'other'];

  // Add scam type options
  const scamTypes = [
    'Scam',
    'phishing',
    'fake_token',
    'honeypot',
    'rugpull',
    'ponzi',
    'fake_airdrop',
    'fake_marketplace',
    'impersonation',
    'malware',
    'other'
  ];

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
        description: '',
        contractAddress: '',
        chainId: '',
        contractType: '',
        contractVerified: false
      });
      toast.success('Report submitted successfully');
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
                <select
                  name="scamType"
                  value={formData.scamType}
                  onChange={handleChange}
                  className="w-full p-2 border border-green-500 rounded-md bg-transparent"
                >
                  <option value="">Select Scam Type</option>
                  {scamTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block mb-2">Target Platform:</label>
                <input
                  type="text"
                  name="targetPlatform"
                  value={formData.targetPlatform}
                  onChange={handleChange}
                  className="w-full p-2 border border-green-500 rounded-md bg-transparent"
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
                />
              </div>

              {/* New Contract Fields */}
              <div>
                <label className="block mb-2">Contract Address:</label>
                <input
                  type="text"
                  name="contractAddress"
                  value={formData.contractAddress}
                  onChange={handleChange}
                  className="w-full p-2 border border-green-500 rounded-md bg-transparent"
                  placeholder="0x..."
                />
              </div>
              
              <div>
                <label className="block mb-2">Chain:</label>
                <select
                  name="chainId"
                  value={formData.chainId}
                  onChange={handleChange}
                  className="w-full p-2 border border-green-500 rounded-md bg-transparent"
                >
                  <option value="">Select Chain</option>
                  {chainOptions.map((chain) => (
                    <option key={chain.id} value={chain.id}>
                      {chain.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block mb-2">Contract Type:</label>
                <select
                  name="contractType"
                  value={formData.contractType}
                  onChange={handleChange}
                  className="w-full p-2 border border-green-500 rounded-md bg-transparent"
                >
                  <option value="">Select Type</option>
                  {contractTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="contractVerified"
                  checked={formData.contractVerified}
                  onChange={(e) => setFormData({
                    ...formData,
                    contractVerified: e.target.checked
                  })}
                  className="border border-green-500 rounded bg-transparent"
                />
                <label>Contract Verified</label>
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