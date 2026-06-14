import React, { useEffect } from "react";
import Navbar from "./components/global/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import { Toaster } from "./components/ui/sonner";
import { useAuthStore } from "./store/authStore";

import ProtectedRoute from "./pages/auth/ProtectedRoute";
import PublicRoute from "./pages/auth/PublicRoute";
import { LuLoaderCircle } from "react-icons/lu";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      {isAuthenticated && <Navbar />}

      <Routes>
        <Route
          path="/auth/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          }
        />

        <Route
          path="/auth/register"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster />
    </>
  );
}
