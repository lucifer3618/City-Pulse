import { Button } from "@/components/ui/button.jsx";
import { CardContent } from "@/components/ui/card.jsx";
import InputField from "../form/InputField.jsx";
import PasswordField from "../form/PasswordField.jsx";
import { Label } from "@radix-ui/react-label";
import { useAuthForm } from "@/hooks/useAuthForm.js";
import { FcGoogle } from "react-icons/fc";
import Separator from "@/components/common/Separator.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";

function SignupForm({ onTrigger }) {
    const { email, setEmail,
        password, setPassword,
        username, setUsername,
        confirmPassword, setConfirmPassword,
        acceptPolicy, setAcceptPolicy,
        errors,
        handleSubmit
    } = useAuthForm({
        type: "signup",
        endpoint: "/api/v1/auth/sign-up",
        onSuccess: onTrigger,
    })

    return (
        <CardContent className="p-0">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <InputField id="username" value={username} placeholder="Username" setEmail={setUsername} error={errors?.username} />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <InputField id="email" type="email" value={email} placeholder="example@gmail.com" setEmail={setEmail} error={errors?.email} />
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <PasswordField password={password} setPassword={setPassword} error={errors?.password} />
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <Label htmlFor="confirm password">Confirm Password</Label>
                        </div>
                        <PasswordField password={confirmPassword} setPassword={setConfirmPassword} error={errors?.confirmPassword} />
                    </div>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id="terms"
                            className={`${errors?.acceptPolicy ? "border-red" : ""}`}
                            checked={acceptPolicy}
                            onCheckedChange={(checked) => setAcceptPolicy(checked === true)} />
                        <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                            I have read and agree to the <a href="/terms" className="text-blue-500 underline">Terms & Conditions</a>
                        </Label>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-7">
                    <Button type="submit" className="w-full bg-[#086e57]">Sign Up</Button>
                    <Separator />
                    <Button type="button" variant="outline" className="w-full" onClick={() => window.location.href = "http://localhost:5500/api/v1/auth/google/sign-in"}>
                        <span><FcGoogle size={24} /></span> Continue with Google
                    </Button>
                </div>
            </form>
        </CardContent>
    );
}

export default SignupForm;