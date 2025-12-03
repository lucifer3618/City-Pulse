// PublicRoute.jsx
import {Navigate, Outlet} from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext.js";
import Spinner from "@/components/common/Spinner.jsx";

function PublicRoute() {
    const { user, loading } = useAuthContext();

    if (loading) return <Spinner />;

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}

export default PublicRoute;
