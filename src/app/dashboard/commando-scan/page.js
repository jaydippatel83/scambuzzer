import React from 'react';
import Sidebar from '../../../components/SidebarComponent';
import Layout from '../../../components/layout/Layout';
import DashboardLayout from '../../../components/DashboardLayout';
import InactiveScan from '../../../components/scan/Inactive';
import ActiveScan from '../../../components/scan/ActiveScan';

const CommandoScan = () => {
  return (
    <Layout>
       <DashboardLayout>
       <div className=" text-center border border-green-500 py-10 rounded-md h-full ">
       {/* <InactiveScan /> */}
       <ActiveScan />
      </div>
       </DashboardLayout>
    </Layout>
  );
};

export default CommandoScan;