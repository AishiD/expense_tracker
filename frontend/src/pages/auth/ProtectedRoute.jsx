import { useAuthStore } from '@/store/authStore'
import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
  const {isAuthenticated, loading} = useAuthStore();
  if(loading) {
    return;
  }
  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
}
