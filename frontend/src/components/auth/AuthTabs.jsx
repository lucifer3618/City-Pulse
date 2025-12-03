import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import LoginCard from "@/components/auth/LoginCard.jsx";
import SignupCard from "@/components/auth/SignupCard.jsx";

function AuthTabs({ onTrigger }) {
    return (
        <Tabs defaultValue="signin" className="flex justify-center items-center w-full p-13 pb-0">
            <TabsList className="w-full h-[40px]">
                <TabsTrigger value="signin" className="data-[state=active]:bg-[#086e57] data-[state=active]:text-white">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-[#086e57] data-[state=active]:text-white">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="flex justify-center items-center w-full">
                <LoginCard onTrigger={onTrigger} />
            </TabsContent>
            <TabsContent value="signup" className="flex justify-center items-center w-full">
                <SignupCard onTrigger={onTrigger} />
            </TabsContent>
        </Tabs>
    )
}

export default AuthTabs
