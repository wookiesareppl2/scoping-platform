import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ScopingForm from './pages/ScopingForm';
import AdminDashboard from './pages/AdminDashboard';
import Submissions from './pages/Submissions';
import Analytics from './pages/Analytics';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="scoping-form" element={<ScopingForm />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;