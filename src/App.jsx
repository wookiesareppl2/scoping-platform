import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import ScopingForm from './pages/ScopingForm';
import AdminDashboard from './pages/AdminDashboard';
import Analytics from './pages/Analytics';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="scoping-form" element={<ScopingForm />} />
              <Route path="admin" element={<AdminDashboard />} />
              {/* Redirect old submissions route to admin dashboard */}
              <Route path="submissions" element={<Navigate to="/admin" replace />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
          </Routes>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;