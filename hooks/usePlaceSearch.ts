"use client";

import { useState } from "react";
import {
  GEOAPIFY_BASE_URL,
  GEOAPIFY_API_KEY,
} from "@/constant/mapApi";

export interface Suggestion {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

interface GeoapifyFeature {
  place_id: string;
  formatted: string;
  lat: number;
  lon: number;
}

interface GeoapifyResponse {
  results: GeoapifyFeature[];
}

export function usePlaceSearch() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [debounceTimer, setDebounceTimer] =
    useState<ReturnType<typeof setTimeout> | null>(null);

  const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
    if (!query.trim()) return [];

    const url = `${GEOAPIFY_BASE_URL}text=${encodeURIComponent(
      query
    )}&format=json&limit=5&apiKey=${GEOAPIFY_API_KEY}`;

    const res = await fetch(url);
    const result: GeoapifyResponse = await res.json();

    if (!result.results) return [];

    const data: Suggestion[] = result.results.map((item) => ({
      place_id: item.place_id,
      display_name: item.formatted,
      lat: String(item.lat),
      lon: String(item.lon),
    }));

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
