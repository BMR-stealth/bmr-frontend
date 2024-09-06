// src/pages/Dashboard.tsx
import React from 'react';
import Sidebar from '../components/Sidebar'; // Ensure the path is correct
import Header from '../components/Header';   // Ensure the path is correct
import InfoCards from '../components/InfoCards'; // Ensure the path is correct
import LoanTable from '../components/LoanTable'; // Ensure the path is correct

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* InfoCards - Cards that display active loans and other metrics */}
        <InfoCards />

        {/* Loan Table */}
        <LoanTable />
      </div>
    </div>
  );
};

export default Dashboard;