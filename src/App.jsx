import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ScopingForm from './pages/ScopingForm';
import AdminDashboard from './pages/AdminDashboard';
import Submissions from './pages/Submissions';
import Analytics from './pages/Analytics';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="scoping" element={<ScopingForm />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="submissions" element={<Submissions />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="help" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Help & Documentation</h1><p className="text-gray-600 mt-4">Coming soon...</p></div>} />
          <Route path="privacy" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Privacy Policy</h1><p className="text-gray-600 mt-4">Coming soon...</p></div>} />
          <Route path="terms" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Terms of Service</h1><p className="text-gray-600 mt-4">Coming soon...</p></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

