import React from 'react';

const BorrowerPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-6">Welcome, Borrower!</h2>
        <p>You can now explore our offerings without the need for an account.</p>
        {/* Add more borrower-specific content here */}
      </div>
    </div>
  );
};

export default BorrowerPage;
