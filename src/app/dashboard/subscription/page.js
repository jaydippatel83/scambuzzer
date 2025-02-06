import React from 'react';
import Sidebar from '../../../components/SidebarComponent';
import Layout from '../../../components/layout/Layout';
import DashboardLayout from '../../../components/DashboardLayout';

const Subscription = () => {
  return (
    <Layout>
       <DashboardLayout>    
       <h1 className="text-3xl font-bold mb-4">Subscription</h1>
      <p className="text-lg">Subscribe to access premium scam detection features.</p>
      <button className="mt-4 px-6 py-3 bg-green-600 text-black font-bold rounded">Subscribe Now</button>
       </DashboardLayout>
    </Layout>
  );
};

export default Subscription;