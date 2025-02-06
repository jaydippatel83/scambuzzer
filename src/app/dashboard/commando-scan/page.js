import React from 'react';
import Sidebar from '../../../components/SidebarComponent';
import Layout from '../../../components/layout/Layout';
import DashboardLayout from '../../../components/DashboardLayout';

const CommandoScan = () => {
  return (
    <Layout>
       <DashboardLayout>
       <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Commando Scan Terminal</h1>
        <p className="text-red-500 text-lg">● Inactive</p>
        <p className="text-lg mt-4">
          To activate Commando Scan, please <span className="font-bold">subscribe</span> and whitelist your information.
        </p>
        <button className="mt-6 px-6 py-3 bg-green-600 text-black font-bold rounded">Subscribe Now: $299 / Year</button>
      </div>
       </DashboardLayout>
    </Layout>
  );
};

export default CommandoScan;