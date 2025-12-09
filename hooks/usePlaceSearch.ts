"use client";

import { useState } from "react";
import { NOMINATIM_BASE_URL } from "@/constant/mapApi";

export function usePlaceSearch() {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) return [];

    const url = `${NOMINATIM_BASE_URL}format=json&q=${encodeURIComponent(
      query
    )}&addressdetails=1&limit=5`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "NextJS-Leaflet-App",
        "Referer": typeof window !== "undefined" ? window.location.origin : "",
      },
    });

    return res.json();
  };

  const handleSearchChange = (value: string) => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(async () => {
      const results = await fetchSuggestions(value);
      setSuggestions(results);
    }, 400);

    setDebounceTimer(timer);
  };

  const clearSuggestions = () => setSuggestions([]);

  return { suggestions, handleSearchChange, clearSuggestions };
}
