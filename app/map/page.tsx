"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import PathInput from "@/components/Map/PathInput";

// IMPORTANT: load map client-side only
const CustomMap = dynamic(() => import("@/components/Map/MapTable"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function MapPage() {
  const [pathPoints, setPathPoints] = useState<[number, number][]>([]);

  return (
    <div className="p-10">
      <h1 className="text-xl font-semibold mb-4">Dynamic Path Map</h1>
      <PathInput onPathChange={setPathPoints} />
      <CustomMap pathPoints={pathPoints} />
    </div>
  );
}
