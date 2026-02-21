import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import { Box, CircularProgress } from '@mui/material';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'ADMIN' && user?.role !== 'SELLER') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
