import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/context/AuthContext.js";
import SearchBar from "@/components/common/SearchBar.jsx";
import { LocationEdit } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import NotificationPopover from "@/components/notifications/NotificationPopover.jsx";
import HistoryTab from "@/components/dashboard/tabs/History/HistoryTab.jsx";
import DashboardTab from "@/components/dashboard/tabs/Dashboard/DashboardTab.jsx";
import Spinner from "@/components/common/Spinner.jsx";
import { getUserIP } from "@/utils/ip.utils.js";
import apiClient from "@/api/apiClient.js";

function SidebarWithContent(props) {
  const sidebar = useSidebar();
  return <AppSidebar {...props} state={sidebar.state} />;
}

function DashboardLayout() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(""); // Expose controlled query so parent can clear the SearchBar on Locate
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [fade, setFade] = useState(true);
  const [historyLocations, setHistoryLocations] = useState([]);

  const params = new URLSearchParams(location.search);
  const currentPage = params.get("tab") || "dashboard";
  const [displayedPage, setDisplayedPage] = useState(currentPage);

  // HanDle tab fade transition
  useEffect(() => {
    if (currentPage !== displayedPage) {
      setFade(false);
      const timeout = setTimeout(() => {
        setDisplayedPage(currentPage);
        setFade(true);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [currentPage, displayedPage]);

  // Reset city data when leaving dashbord
  useEffect(() => {
    if (currentPage !== "dashboard") {
      setSelectedSuggestion(null);
      setCityData(null);
    }
  }, [currentPage]);

  const handleTabChange = (page) => {
    navigate(`/dashboard?tab=${page}`);
  };

  // Fetch city by IP with fallback
  const fetchCityByIP = useCallback(async () => {
    if (displayedPage !== "dashboard") return;

    try {
      setLoading(true);

      // Try main backend endpoint
      const cityRes = await apiClient.get(`/api/v1/cities/by-ip`);

      if (cityRes?.data) {
        setCityData(cityRes.data);
        setSelectedSuggestion(cityRes.data);
      } else {
        console.warn("Empty response from /cities/by-ip");
        setCityData(null);
        setSelectedSuggestion(null);
      }
    } catch (err) {
      console.error("Initial /cities/by-ip failed:", err.response?.data || err.message || err);

      // Fallback: get public IP and retry
      try {
        const ip = await getUserIP();
        console.debug("Retrying /cities/by-ip with IP:", ip);

        const retryRes = await apiClient.get(`/api/v1/cities/by-ip`, {
          params: { ip },
        });

        if (retryRes?.data) {
          setCityData(retryRes.data);
          setSelectedSuggestion(retryRes.data);
        } else {
          console.warn("Retry /cities/by-ip returned empty");
          setCityData(null);
          setSelectedSuggestion(null);
        }
      } catch (retryErr) {
        console.error(
          "Retry /cities/by-ip with IP failed:",
          retryErr.response?.data || retryErr.message || retryErr
        );
        setCityData(null);
        setSelectedSuggestion(null);
      }
    } finally {
      setLoading(false);
    }
  }, [displayedPage]);

  const fetchHistory = useCallback(async () => {
    // Only run if actually on the history page
    if (displayedPage !== "history") return;

    try {
      setLoading(true);

      const response = await apiClient.get(`/api/v1/users/${user._id}/history`);

      if (response?.data) {
        setHistoryLocations(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  }, [displayedPage]);

  useEffect(() => {
    if (displayedPage === "dashboard") {
      fetchCityByIP();
    } else if (displayedPage === "history") {
    fetchHistory();
  }
  }, [displayedPage, fetchCityByIP, fetchHistory]);

  let Content;
  if (displayedPage === "history") Content = <HistoryTab locations={historyLocations.data} className="w-full h-full p-10 pt-0" />;
  else
    Content = (
      <DashboardTab
        selectedSuggestion={selectedSuggestion}
        cityData={cityData}
        loading={loading}
      />
    );

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarWithContent
          user={user}
          logout={logout}
          setCurrentPage={handleTabChange}
          currentPage={currentPage}
          calendarDate={calendarDate}
          setCalendarDate={setCalendarDate}
        />
      </Sidebar>
      <SidebarInset className="flex flex-col min-h-0 h-screen">
        <header className="sticky px-3 top-0 z-20 flex w-full h-20 shrink-0 items-center gap-2 mt-0 bg-background">
          <div className="flex w-full items-center justify-between gap-2 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <h2 className="text-black">
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1).toLowerCase()}
              </h2>
            </div>
            {currentPage === "dashboard" && (
              <SearchBar
                onSelect={setSelectedSuggestion}
                onData={setCityData}
                setLoading={setLoading}
                query={query}
                setQuery={setQuery}
              />
            )}
            <div className="flex items-center gap-2">
              <Button
                className="rounded-b-lg bg-[#086e56]"
                onClick={() => {
                  setQuery("");
                  setSelectedSuggestion(null);
                  fetchCityByIP();
                }}
              >
                <LocationEdit /> Locate
              </Button>
              <NotificationPopover />
            </div>
          </div>
        </header>
        <div className="flex-1 min-h-0 overflow-y-auto relative">
          <div
            className={`h-full w-full transition-opacity duration-300 ease-in-out ${
              fade ? "opacity-100" : "opacity-0"
            } ${loading ? "blur-sm pointer-events-none" : ""}`}
          >
            {Content}
          </div>

          {loading && (
            <div className="absolute z-100 inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm">
              <Spinner />
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
