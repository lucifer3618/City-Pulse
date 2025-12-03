import React, {useState} from 'react'
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Bell, DotIcon} from "lucide-react";

function NotificationPopover() {

    const [isNotification, setIsNotification] = useState(true);

    return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                        <div className="relative inline-block">
                            <Bell className="h-6 w-6" />
                            {isNotification && (<span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-600"></span>)}
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align={"end"} sideOffset={7}>
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="leading-none font-medium">Notifications</h4>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
    )
}

export default NotificationPopover
