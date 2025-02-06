import React from 'react'; 
import Layout from '../../../components/layout/Layout'; 
import ReportLayout from '../../../components/ReportLayout';
import ReportContribute from '../../../components/reports/ReportContribute';

const Reports = () => {
  return (
    <Layout>
       <ReportLayout>
       <div className=" text-center border-2 border-green-500 py-10 rounded-md h-full ">
        <ReportContribute />
      </div>
       </ReportLayout>
    </Layout>
  );
};

export default Reports;