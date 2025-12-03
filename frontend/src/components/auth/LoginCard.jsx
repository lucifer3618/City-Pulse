import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card.jsx";
import LoginForm from "./LoginForm.jsx";

function LoginCard({ onTrigger }) {

    return (
        <Card className="w-full relative z-10 border-0 shadow-none">
            <CardHeader className="p-0">
                <CardTitle className="pb-1 font-bold text-3xl">Sign in to your account</CardTitle>
                <CardDescription className="pb-2">
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>

            <LoginForm onTrigger={onTrigger} />
        </Card>
    );
}

export default LoginCard;
