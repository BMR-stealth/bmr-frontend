// src/components/LoanTable.tsx
import React from 'react';

const LoanTable: React.FC = () => {
  const loans = [
    { id: '50055691', amount: '$350,000', score: 760, dti: '40%' },
    { id: '50055670', amount: '$400,000', score: 650, dti: '57%' },
    // Add more loans here
  ];

  return (
    <div className="p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Loan ID</th>
            <th className="p-2">Loan Amount</th>
            <th className="p-2">FICO Score</th>
            <th className="p-2">Debt to Income</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id} className="border-b">
              <td className="p-2">{loan.id}</td>
              <td className="p-2">{loan.amount}</td>
              <td className="p-2">{loan.score}</td>
              <td className="p-2">{loan.dti}</td>
              <td className="p-2">
                <button className="bg-blue-500 text-white px-4 py-1 rounded">
                  Actions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanTable;