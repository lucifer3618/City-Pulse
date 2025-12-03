import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd, LogOutIcon,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main.jsx"
import { NavProjects } from "@/components/sidebar/nav-projects.jsx"
import { NavUser } from "@/components/sidebar/nav-user.jsx"
import { TeamSwitcher } from "@/components/sidebar/team-switcher.jsx"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar.jsx"
import { Calendar } from "@/components/ui/calendar.jsx";

export function AppSidebar({ user, logout, setCurrentPage, currentPage, state, calendarDate, setCalendarDate }) {
  const navItems = [
    { title: "Dashboard", icon: SquareTerminal },
    { title: "History", icon: Bot },
  ];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center mt-2">
          <img src="/logo.png" className="w-12" />
          <h2
              className="text-black font-sans mt-1 text-4xl transition-all duration-300 ease-in-out overflow-hidden"
              style={{
                maxWidth: state !== "collapsed" ? 190 : 0,
                opacity: state !== "collapsed" ? 1 : 0,
                marginLeft: state !== "collapsed" ? 8 : 0,
                whiteSpace: "nowrap",
              }}
          >
            City Pulse
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex h-full flex-col justify-between ">
          <NavMain
              items={navItems.map(item => ({
                  ...item,
                  isActive: item.title.toLowerCase() === currentPage
              }))}
              onSelect={setCurrentPage}
          />
          {/* Smoother calendar transition */}
          <div
            className="transition-[max-height,opacity] duration-450 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden"
            style={{
              maxHeight: state !== "collapsed" ? 420 : 0,
              opacity: state !== "collapsed" ? 1 : 0,
              pointerEvents: state !== "collapsed" ? "auto" : "none",
            }}
          >
            <Calendar
                mode="single"
                selected={calendarDate}
                onSelect={setCalendarDate}
                disabled={{
                    before: new Date(),
                }}
                className="rounded-lg w-full bg-transparent border-0"
            />
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} logout={logout} />
      </SidebarFooter>
    </>
  );
}

