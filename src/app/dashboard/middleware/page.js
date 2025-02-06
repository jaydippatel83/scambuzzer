import React from 'react';
import Sidebar from '../../../components/SidebarComponent';
import Layout from '../../../components/layout/Layout';
import DashboardLayout from '../../../components/DashboardLayout';

const Middleware = () => {
  return (
    <Layout>
       <DashboardLayout>
       <h1 className="text-3xl font-bold mb-4">API Middleware</h1>
       <p className="text-lg">Integrate with our API to protect users from scams.</p>
       </DashboardLayout>
    </Layout>
  );
};

export default Middleware;