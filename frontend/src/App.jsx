import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PublicView from './pages/PublicView';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route path="/view-doc/viewUYFUYFUYFUYFUfuFUFYpiuIHDPTIHJIDTIDTHJDTIOHJDIOTJHDIOTHJIHDITHJDIOTHgIUGIOTHOIDRH/:id" element={<PublicView />} />
      
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}