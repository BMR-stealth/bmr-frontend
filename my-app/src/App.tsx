// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Signup from './components/Signup'; // Import the Signup component
import UserTypeSelection from './components/UserTypeSelection'; // Import the User Type Selection component
import BorrowerPage from './components/BorrowerPage'; // Import the BorrowerPage component

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTypeSelection />} /> {/* New User Type Selection route */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} /> {/* Lender Signup route */}
        <Route path="/borrower" element={<BorrowerPage />} /> {/* Borrower page route */}
        <Route path="*" element={<Login />} /> {/* Default to login */}
      </Routes>
    </Router>
  );
};

export default App;
