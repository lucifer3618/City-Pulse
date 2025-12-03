import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import apiClient from "@/api/apiClient.js";

export function useAuthForm({ type, endpoint, onSuccess }) {
    // shared fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // extra signup fields
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptPolicy, setAcceptPolicy] = useState(false);

    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {};

        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email!";

        if (!password) newErrors.password = "Password is required!";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters!";

        if (type === "signup") {
            if (!username) newErrors.username = "Username is required!";
            if (!confirmPassword) newErrors.confirmPassword = "Confirm passwords is required!";
            if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match!";
            if (!acceptPolicy) newErrors.acceptPolicy = "You must accept the policy";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        if (!validateForm()) return

        try {
            // request body depends on type
            const body =
                type === "signin"
                    ? { email, password }
                    : { name: username, email, password }

            const res = await apiClient.post(endpoint, body);
            onSuccess(res.data.user);

            toast.success("Success!", {
                description: `Welcome ${res.data.user.name}`,
                dismissible: true,
                closeButton: true,
            });
        } catch (err) {
            toast.error("Failed!", {
                description: err.response?.data?.message || "Something went wrong!",
                dismissible: true,
                closeButton: true,
            });
        }
    }

    return {
        // shared
        email,
        setEmail,
        password,
        setPassword,
        errors,
        handleSubmit,
        // signup
        username,
        setUsername,
        confirmPassword,
        setConfirmPassword,
        acceptPolicy,
        setAcceptPolicy,
    }
}
