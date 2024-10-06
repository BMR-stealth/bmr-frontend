import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTypeSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleLenderClick = () => {
    navigate('/lender/signup');
  };

  const handleBorrowerClick = () => {
    navigate('/borrower');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-6">Sign Up As:</h2>
        <button
          onClick={handleLenderClick}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mb-4"
        >
          Lender
        </button>
        <button
          onClick={handleBorrowerClick}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Borrower
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelection;
