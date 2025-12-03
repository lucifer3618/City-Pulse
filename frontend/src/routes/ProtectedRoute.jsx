import { Navigate, Outlet } from "react-router-dom";
import Spinner from "@/components/common/Spinner.jsx";
import { useAuthContext } from "@/context/AuthContext.js";

function ProtectedRoute() {
    const { user, loading } = useAuthContext();

    if (loading) {
        return <Spinner />;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
