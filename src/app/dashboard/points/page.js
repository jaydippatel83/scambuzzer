import React from 'react';
import Layout from '../../../components/layout/Layout';
import ReportLayout from '../../../components/ReportLayout';
import Pointtable from '../../../components/points/Pointtable';

const Points = () => {
  return (
    <Layout>
      <ReportLayout>
        <Pointtable />
      </ReportLayout>
    </Layout>
  );
};

export default Points;