import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProtectedRoute from './components/Admin/ProtectedRoute';

import { DataProvider } from './context/DataContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <DataProvider>
            <Home />
          </DataProvider>
        } />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard/*" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
