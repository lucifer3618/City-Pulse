import { Button } from "@/components/ui/button.jsx";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ className, onClick }) {
    return (
        <Button className={`${className} cursor-pointer hover:bg-[#086e57] hover:text-white`} variant="secondary" size="icon" onClick={onClick}>
            <ArrowLeft />
        </Button>
    );
}