import React from 'react';
import Sidebar from '../../../components/SidebarComponent';
import Layout from '../../../components/layout/Layout';
import DashboardLayout from '../../../components/DashboardLayout';
import ActiveSubs from '../../../components/subscribe/ActiveSubs';
import InactiveSubs from '../../../components/subscribe/InactiveSubs';

const Subscription = () => {
  return (
    <Layout>
       <DashboardLayout>   
        {/* <ActiveSubs /> */}
        <InactiveSubs />
       </DashboardLayout>
    </Layout>
  );
};

export default Subscription;