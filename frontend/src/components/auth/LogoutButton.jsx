import { useAuthContext } from "@/context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/apiClient.js";

function LogoutButton() {
    const { setUser } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await apiClient.post("/api/v1/auth/sign-out",);

            const data = await response.json();

            if (response.ok) {
                setUser(null);
                navigate("/");
            } else {
                console.error("Logout failed:", data.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;