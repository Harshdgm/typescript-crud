"use client";

import { useState } from "react";

export interface Suggestion {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

import { NOMINATIM_BASE_URL } from "@/constant/mapApi";

export function usePlaceSearch() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
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

    const data: Suggestion[] = await res.json();
    return data;
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
