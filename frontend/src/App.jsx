import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import ProtectedRoute from "@/routes/ProtectedRoute.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import PublicRoute from "@/routes/PublicRoute.jsx";
import {AuthProvider} from "@/providers/AuthProvider.jsx";
import DashboardLayout from "@/pages/DashboardLayout.jsx";

function App() {
    return (
        <AuthProvider>
            <Toaster position="bottom-right" richColors />
            <Routes>
                {/* Public Routes */}
              <Route element={<PublicRoute />}>
                <Route path="/" element={<AuthPage />} />
              </Route>


              {/* Protected Routes */}
                <Route element={<ProtectedRoute />} >
                    <Route path="/dashboard" element={<DashboardLayout />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App
