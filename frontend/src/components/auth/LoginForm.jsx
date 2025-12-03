import { Button } from "@/components/ui/button.jsx";
import { CardContent } from "@/components/ui/card.jsx";
import InputField from "../form/InputField.jsx";
import PasswordField from "../form/PasswordField.jsx";
import { Label } from "@radix-ui/react-label";
import { useAuthForm } from "@/hooks/useAuthForm.js";
import { FcGoogle } from "react-icons/fc";
import Separator from "@/components/common/Separator.jsx";

function LoginForm({ onTrigger }) {
    const { email, setEmail, password, setPassword, errors, handleSubmit } = useAuthForm({
        type: "signin",
        endpoint: "/api/v1/auth/sign-in",
        onSuccess: onTrigger,
    })

    return (
        <CardContent className="p-0">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <InputField id="email" type="email" value={email} placeholder="example@gmail.com" setEmail={setEmail} error={errors?.email} />
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <Label htmlFor="password">Password</Label>
                            <a href="#" className="text-sm text-gray-600 cursor-pointer">Forgot your password?</a>
                        </div>
                        <PasswordField password={password} setPassword={setPassword} error={errors?.password} />
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-7">
                    <Button type="submit" className="w-full bg-[#086e57]">Sign in</Button>
                    <Separator />
                    <Button type="button" variant="outline" className="w-full" onClick={() => window.location.href = "http://localhost:5500/api/v1/auth/google/sign-in"}>
                        <span><FcGoogle size={24} /></span> Continue with Google
                    </Button>
                </div>
            </form>
        </CardContent>
    );
}

export default LoginForm;