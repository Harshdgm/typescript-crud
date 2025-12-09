"use client";

import { useState } from "react";
import { NOMINATIM_BASE_URL } from "@/constant/mapApi";
import { usePlaceSearch } from "@/hooks/usePlaceSearch";

interface PathInputProps {
  onPathChange: (path: [number, number][]) => void;
}

export default function PathInput({ onPathChange }: PathInputProps) {
  const [startPlace, setStartPlace] = useState("");
  const [endPlace, setEndPlace] = useState("");


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

  const fetchCoordinates = async (place: string) => {
    if (!place) return null;

    const url = `${NOMINATIM_BASE_URL}format=json&limit=1&q=${encodeURIComponent(
      place
    )}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)] as [
        number,
        number
      ];
    }
    return null;
  };

  const handleShowPath = async () => {
    const start = await fetchCoordinates(startPlace);
    const end = await fetchCoordinates(endPlace);

    if (start && end) {
      onPathChange([start, end]);
    } else {
      alert("Could not find coordinates for one or both places.");
    }
  };

  const handleSelect = (
    item: any,
    setValue: (v: string) => void,
    clearFn: () => void
  ) => {
    setValue(item.display_name);
    clearFn();
  };

  return (
    <div className="flex flex-col gap-3 mb-4 w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          placeholder="Start Place"
          value={startPlace}
          onChange={(e) => {
            setStartPlace(e.target.value);
            handleStartChange(e.target.value);
          }}
          className="border p-2 rounded w-full"
        />

        {startSuggestions.length > 0 && (
          <ul className="absolute bg-white border rounded w-full mt-1 max-h-48 overflow-auto shadow z-20">
            {startSuggestions.map((item) => (
              <li
                key={item.place_id}
                className="p-2 cursor-pointer hover:bg-gray-100"
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
        <input
          type="text"
          placeholder="End Place"
          value={endPlace}
          onChange={(e) => {
            setEndPlace(e.target.value);
            handleEndChange(e.target.value);
          }}
          className="border p-2 rounded w-full"
        />

        {endSuggestions.length > 0 && (
          <ul className="absolute bg-white border rounded w-full mt-1 max-h-48 overflow-auto shadow z-20">
            {endSuggestions.map((item) => (
              <li
                key={item.place_id}
                className="p-2 cursor-pointer hover:bg-gray-100"
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
        className="bg-blue-500 text-white p-2 rounded"
      >
        Show Path
      </button>
    </div>
  );
}
