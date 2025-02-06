import React from 'react';
import Layout from '../../../components/layout/Layout';
import ReportLayout from '../../../components/ReportLayout';
import Pointtable from '../../../components/points/Pointtable';

const Leaderboard = () => {
  return (
    <Layout>
      <ReportLayout>
        <h1>Leaderboard</h1>
        <Pointtable />
      </ReportLayout>
    </Layout>
  );
};

export default Leaderboard;