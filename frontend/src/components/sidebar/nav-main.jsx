// src/components/sidebar/nav-main.jsx

import { ChevronRight } from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar.jsx";
import { cn } from "@/lib/utils"; // A utility for combining class names

export function NavMain({ items, onSelect }) {
    return (
        <SidebarGroup className="mt-1">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            type="button"
                            className={cn(
                                "flex items-center h-13 my-1 px-3 w-full rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800",
                                item.isActive
                                    ? "bg-[#086e56] text-white"
                                    : "bg-transparent"
                            )}
                            onClick={() => onSelect(item.title.toLowerCase())}
                        >
                            {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                            <span className="flex-grow">{item.title}</span>
                            <ChevronRight className="h-4 w-4 ml-auto transition-transform duration-200" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}