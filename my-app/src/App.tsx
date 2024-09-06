// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Signup from './components/Signup'; // Import the Signup component

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} /> {/* New Signup route */}
        <Route path="*" element={<Login />} /> {/* Default to login */}
      </Routes>
    </Router>
  );
};

export default App;