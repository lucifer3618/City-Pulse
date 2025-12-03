import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth.js";
import Spinner from "@/components/common/Spinner.jsx";
import {toast} from "sonner";
import apiClient from "@/api/apiClient.js";

export function AuthProvider({ children }) {
    const { user, loading, setLoading, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user && location.pathname === "/") {
            navigate("/dashboard", { replace: true });
        }
    }, [user, location.pathname, navigate]);

    async function logout() {
        try {
            setLoading(true);
            await apiClient.post("/api/v1/auth/sign-out");
            localStorage.removeItem("user");
            setUser(null);
            navigate("/", { replace: true });
            toast.success("User logged out successfully!");
        } catch (err) {
            toast.error(err.response?.data?.message || "Unsuccessful logout! Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return (
        <div className="flex w-screen, h-screen justify-center items-center">
            <Spinner />
        </div>
    );

    return (
        <AuthContext.Provider value={{ user, loading, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
