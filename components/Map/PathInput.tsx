"use client";

import { useState, ChangeEvent } from "react";
import { NOMINATIM_BASE_URL } from "@/constant/mapApi";
import { usePlaceSearch } from "@/hooks/usePlaceSearch";

interface Suggestion {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

interface PathInputProps {
  onPathChange: (path: [number, number][]) => void;
}

export default function PathInput({ onPathChange }: PathInputProps) {
  const [startPlace, setStartPlace] = useState<string>("");
  const [endPlace, setEndPlace] = useState<string>("");

  const {
    suggestions: startSuggestions,
    handleSearchChange: handleStartChange,
    clearSuggestions: clearStartSuggestions,
  } = usePlaceSearch();

  const {
    suggestions: endSuggestions,
    handleSearchChange: handleEndChange,
    clearSuggestions: clearEndSuggestions,
  } = usePlaceSearch();

  const fetchCoordinates = async (
    place: string
  ): Promise<[number, number] | null> => {
    if (!place) return null;

    const url = `${NOMINATIM_BASE_URL}format=json&limit=1&q=${encodeURIComponent(
      place
    )}`;

    const res = await fetch(url);
    const data: Suggestion[] = await res.json();

    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
  };

  const handleShowPath = async () => {
    const startCoords = await fetchCoordinates(startPlace);
    const endCoords = await fetchCoordinates(endPlace);

    if (startCoords && endCoords) {
      onPathChange([startCoords, endCoords]);
    } else {
      alert("Could not find coordinates for one or both places.");
    }
  };

  const handleSelect = (
    item: Suggestion,
    setValue: (v: string) => void,
    clearFn: () => void
  ) => {
    setValue(item.display_name);
    clearFn();
  };

  return (
    <div className="w-full max-w-xl flex flex-col gap-3 mb-4">
      <div className="relative">
        <div className="flex bg-white shadow rounded-full px-4 py-2 border">
          <span className="text-gray-500 mr-3">📍</span>
          <input
            type="text"
            placeholder="Choose starting point"
            value={startPlace}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setStartPlace(e.target.value);
              handleStartChange(e.target.value);
            }}
            className="w-full outline-none bg-transparent"
          />
        </div>
        {startSuggestions.length > 0 && (
          <ul className="absolute bg-white rounded-xl w-full mt-2 max-h-64 overflow-auto shadow-lg border z-30">
            {startSuggestions.map((item: Suggestion) => (
              <li
                key={item.place_id}
                className="p-3 cursor-pointer hover:bg-gray-100"
                onClick={() =>
                  handleSelect(item, setStartPlace, clearStartSuggestions)
                }
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative">
        <div className="flex items-center bg-white shadow rounded-full px-4 py-2 border">
          <span className="text-gray-500 mr-3">🏁</span>
          <input
            type="text"
            placeholder="Choose destination"
            value={endPlace}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEndPlace(e.target.value);
              handleEndChange(e.target.value);
            }}
            className="w-full outline-none bg-transparent"
          />
        </div>
        {endSuggestions.length > 0 && (
          <ul className="absolute bg-white rounded-xl w-full mt-2 max-h-64 overflow-auto shadow-lg border z-30">
            {endSuggestions.map((item: Suggestion) => (
              <li
                key={item.place_id}
                className="p-3 cursor-pointer hover:bg-gray-100"
                onClick={() =>
                  handleSelect(item, setEndPlace, clearEndSuggestions)
                }
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleShowPath}
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full shadow text-lg font-medium"
      >
        Show Path
      </button>
    </div>
  );
}
