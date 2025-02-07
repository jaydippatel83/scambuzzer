'use client'
import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout/Layout';
import DashboardLayout from '../../../components/DashboardLayout';  
import WhitelistList from '../../../components/whitelist/WhitelistList';
import axios from 'axios';
import toast from 'react-hot-toast';

const Whitelist = () => {
    const [formData, setFormData] = useState({ xHandle: '', telegram: '', website: '', contractAddress: '' });
    const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => { 
    try {
        const res = await axios.get('/api/whitelist');
        setEntries(res.data);
    } catch (error) {
        console.error("Error fetching entries:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('/api/whitelist', formData);
        fetchEntries();
        setFormData({ xHandle: '', telegram: '', website: '', contractAddress: '' });
        toast.success('Entry added successfully');
    } catch (error) {
        console.error("Error submitting form:", error);
        toast.error('Error submitting form');
    }
  };

  const handleDelete = async (id) => {
    console.log("Attempting to delete ID:", id);
    try {
        await axios.post(`/api/whitelist/${id}`,{id});
        fetchEntries();
        toast.success('Entry deleted successfully');
    } catch (error) {
        console.error("Error deleting entry:", error);
        toast.error('Error deleting entry');
    }
  };

    return (
        <Layout>
            <DashboardLayout> 
                    <div className="flex flex-col items-center justify-center border-2 border-green-500 py-10 rounded-md h-full">
                        <form onSubmit={handleSubmit}>
                        <h1 className="text-3xl font-bold mb-4">Whitelist URLs and Contracts</h1>
                        <div className="w-full max-w-md  p-6 rounded-md">
                            <label className="block mb-2">@X Handle</label>
                            <input type="text" name="xHandle" value={formData.xHandle} onChange={handleChange} className="w-full p-2 bg-background border border-green-500 text-foreground rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" />

                            <label className="block mb-2">@Telegram</label>
                                <input type="text" name="telegram" value={formData.telegram} onChange={handleChange} className="w-full p-2 bg-background border border-green-500 text-foreground rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" />

                            <label className="block mb-2">Official Website</label>
                            <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full p-2 bg-background border border-green-500 text-foreground rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500    " />

                            <label className="block mb-2">Contract Address</label>
                            <input type="text" name="contractAddress" value={formData.contractAddress} onChange={handleChange}  className="w-full p-2 bg-background border border-green-500 text-foreground rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" />

                            <button type="submit" className="w-full p-3 bg-green-600 text-black font-bold rounded">Submit</button>
                        </div>
                        </form>
                    </div> 
                    <WhitelistList whitelist={entries} handleDelete={handleDelete} />
            </DashboardLayout>
        </Layout>
    );
};

export default Whitelist;
