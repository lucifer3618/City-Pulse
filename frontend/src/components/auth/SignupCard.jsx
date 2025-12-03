import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card.jsx";
import SignupForm from "@/components/auth/SignupForm.jsx";

function SignupCard({ onTrigger }) {

    return (
        <Card className="w-full relative z-10 border-0 shadow-none">
            <CardHeader className="p-0">
                <CardTitle className="font-bold text-3xl">Create a new account</CardTitle>
                <CardDescription className="pb-2">
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>

            <SignupForm onTrigger={onTrigger} />
        </Card>
    );
}

export default SignupCard;