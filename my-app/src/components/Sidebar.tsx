// src/components/Sidebar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate(); // Hook to navigate to different routes

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing session)
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="w-60 h-screen bg-blue-900 text-white p-5 flex flex-col justify-between">
      <ul className="space-y-4">
        <li className="font-semibold">Dashboard</li>
        <li>Available Leads</li>
        <li>Active Leads</li>
        <li>History</li>
        <li>Settings</li>
      </ul>
      
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 mt-6 rounded-lg"
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;