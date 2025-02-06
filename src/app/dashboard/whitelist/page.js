import React from 'react';
import Layout from '../../../components/layout/Layout';
import DashboardLayout from '../../../components/DashboardLayout';

const Whitelist = () => {
    return (
        <Layout>
            <DashboardLayout> 
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold mb-4">Whitelist URLs and Contracts</h1>
                        <div className="w-full max-w-md border border-green-500 p-6 rounded-md">
                            <label className="block mb-2">X Handle</label>
                            <input type="text" className="w-full p-2 bg-background border border-green-500 text-foreground rounded mb-4" />

                            <label className="block mb-2">Telegram</label>
                                <input type="text" className="w-full p-2 bg-background border border-green-500 text-foreground rounded mb-4" />

                            <label className="block mb-2">Official Website</label>
                            <input type="text" className="w-full p-2 bg-background border border-green-500 text-foreground rounded mb-4" />

                            <label className="block mb-2">Contract Address</label>
                            <input type="text" className="w-full p-2 bg-background border border-green-500 text-foreground rounded mb-4" />

                            <button className="w-full p-3 bg-green-600 text-black font-bold rounded">Submit</button>
                        </div>
                    </div> 
            </DashboardLayout>
        </Layout>
    );
};

export default Whitelist;
