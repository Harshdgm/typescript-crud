"use client";

import { useState } from "react";

interface PathInputProps {
  onPathChange: (path: [number, number][]) => void;
}

export default function PathInput({ onPathChange }: PathInputProps) {
  const [startPlace, setStartPlace] = useState("");
  const [endPlace, setEndPlace] = useState("");

 const fetchCoordinates = async (place: string) => {
    if (!place) return null;

    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(place)}`;
  
    const res = await fetch(url, {
        headers: {
        "User-Agent": "NextJS-Leaflet-App", 
        "Referer": window.location.origin,
        },
    });

    const data = await res.json();
    if (data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)] as [number, number];
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

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Start Place"
        value={startPlace}
        onChange={(e) => setStartPlace(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <input
        type="text"
        placeholder="End Place"
        value={endPlace}
        onChange={(e) => setEndPlace(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <button
        onClick={handleShowPath}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Show Path
      </button>
    </div>
  );
}