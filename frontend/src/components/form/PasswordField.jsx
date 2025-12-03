import React, { useState } from "react";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({ password, setPassword, error }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col">
        <div className="relative">
            <Input
                id=""
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`h-[45px] pr-10 ${error ? "border-red-500" : "border-gray-300"}`}
            />
            <Button type="button" variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 p-1" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
        </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
