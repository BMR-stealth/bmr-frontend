// src/components/InfoCards.tsx
import React from 'react';

const InfoCard: React.FC<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
};

const InfoCards: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <InfoCard title="Active Loans" value="300" />
      <InfoCard title="Active Loan Amounts" value="$385,000" />
      <InfoCard title="Total Loans Won" value="70" />
      <InfoCard title="Total Loan Amounts Won" value="$2,300,000" />
    </div>
  );
};

export default InfoCards;