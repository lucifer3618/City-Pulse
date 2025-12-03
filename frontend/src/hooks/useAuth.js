import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "@/api/apiClient.js";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        apiClient.get("/api/v1/auth/me")
            .then(res => {
                if (res.data && res.data.user) {
                    setUser(res.data.user);
                } else {
                    setUser(null);
                }
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, [location.pathname]);

    return { user, setUser, loading, setLoading };
};

export default useAuth;