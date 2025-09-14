import React from 'react';
import Layout from '../components/layout/Layout';
import LeadsGrid from '../components/leads/LeadsGrid';

const DashboardPage = () => {
    return (
        <Layout>
            <LeadsGrid />
        </Layout>
    );
};

export default DashboardPage;