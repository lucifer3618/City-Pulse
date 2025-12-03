import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input.jsx";
import { cn } from "@/lib/utils";
import {MapPin, Search, X} from "lucide-react";
import axios from "axios";
import {useDebounce} from "react-use";
import apiClient from "@/api/apiClient.js";

export default function SearchBar({ onSelect, onData, setLoading, query, setQuery }) {
    // support both controlled (query,setQuery) and uncontrolled usage
    const [internalQuery, setInternalQuery] = useState(typeof query === "string" ? query : "");
    const effectiveQuery = typeof query === "string" ? query : internalQuery;
    const setEffectiveQuery = typeof setQuery === "function" ? setQuery : setInternalQuery;

    const [showDropdown, setShowDropdown] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const ref = useRef(null);

    // Setup Deduce Search
    const [debounceSearchTerm, setDebounceSearchTerm] = useState(effectiveQuery);
    useDebounce(() => setDebounceSearchTerm(effectiveQuery), 500, [effectiveQuery]);

    useEffect(() => {
        let cancel = null;
        const q = (effectiveQuery ?? "").trim();
        if (q === "") {
            setFiltered([]);
            setShowDropdown(false);
        } else {
            apiClient.get(`/api/v1/cities/suggestions?q=${encodeURIComponent(debounceSearchTerm)}`)
            .then(res => {
                setFiltered(res.data || []);
                setShowDropdown((res.data || []).length > 0);
            })
            .catch(() => {
                setFiltered([]);
                setShowDropdown(false);
            });
        }
        return () => { if (cancel) cancel(); };
    }, [debounceSearchTerm, effectiveQuery]);

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleClear = () => {
        setEffectiveQuery("");
        setShowDropdown(false);
        onSelect?.(null);
    };

    const handleSuggestionClick = async (city) => {
        setLoading?.(true);
        setEffectiveQuery(city.name);
        setFiltered([]);
        setShowDropdown(false);
        onSelect?.(city);
        try {
            const res = await apiClient.get(`/api/v1/cities/${city.id}`);
            onData?.(res.data);
          // eslint-disable-next-line no-unused-vars
        } catch (e) {
            onData?.(null);
        } finally {
          setLoading?.(false);
        }
    };

    return (
        <div className="relative w-full max-w-md" ref={ref}>
            <div className="relative flex items-center">
                <span className="absolute left-2 text-gray-400 pointer-events-none">
                  <Search size={18} />
                </span>
                <Input
                    type="text"
                    placeholder="Search city..."
                    value={effectiveQuery}
                    onChange={e => setEffectiveQuery(e.target.value)}
                    onFocus={() => setShowDropdown(filtered.length > 0)}
                    className="pl-8 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {effectiveQuery && (
                    <button
                        type="button"
                        className="absolute right-2 text-gray-400 hover:text-gray-600"
                        onClick={handleClear}
                        tabIndex={0}
                        aria-label="Clear"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {showDropdown && (
                <div
                    className={cn(
                        "absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50",
                        "max-h-56 overflow-auto"
                    )}
                >
                    {filtered.map((item) => (
                        <div
                            key={item.id}
                            className="flex w-full justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSuggestionClick(item)}
                        >
                            <span>{item.name}</span>
                            <MapPin className="w-5 h-5 text-gray-500" />
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}
