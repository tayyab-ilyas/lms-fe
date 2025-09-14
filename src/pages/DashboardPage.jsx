import React from 'react';
import Layout from '../components/layout/layout';
import LeadsGrid from '../components/leads/LeadsGrid';

const DashboardPage = () => {
    return (
        <Layout>
            <LeadsGrid />
        </Layout>
    );
};

export default DashboardPage;