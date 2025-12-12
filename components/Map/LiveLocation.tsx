"use client";

import { useEffect } from "react";
import { FaCrosshairs } from "react-icons/fa";
import { useLiveLocation } from "@/hooks/useLiveLocation";

interface LiveLocationProps {
  onSelect: (coords: [number, number]) => void;
}

export default function LiveLocation({ onSelect }: LiveLocationProps) {
  const { coords, error, fetchLiveLocation } = useLiveLocation();

  useEffect(() => {
    if (coords) onSelect([coords.lat, coords.lon]);
  }, [coords]);

  return (
    <div className="relative flex flex-col items-start">
        <button
          onClick={fetchLiveLocation}
          className="
            flex items-center gap-2 
            bg-blue-600 text-white 
            p-2 rounded-full shadow-md border 
            transition-all duration-200
            hover:bg-white hover:text-blue-600
          "
        >
          <FaCrosshairs
            size={16}
            className="transition-all duration-200"
          />
         
        </button>

        {error && (
          <p className="text-red-600 text-sm mt-1">
            {error}
          </p>
        )}
      </div>
  );
}
