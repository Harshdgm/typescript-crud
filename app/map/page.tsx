"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import PathInput from "@/components/Map/PathInput";
import ShareLocation from "@/components/Map/ShareLocation";
import ColorPicker from "@/components/Map/ColorPicker"; 

const CustomMap = dynamic(() => import("@/components/Map/MapTable"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function MapPage() {
  const [pathPoints, setPathPoints] = useState<[number, number][]>([]);
  const [pathColor, setPathColor] = useState<string>("red");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const startLat = params.get("startLat");
    const startLng = params.get("startLng");
    const endLat = params.get("endLat");
    const endLng = params.get("endLng");

    const pts: [number, number][] = [];

    if (startLat && startLng) pts.push([+startLat, +startLng]);
    if (endLat && endLng) pts.push([+endLat, +endLng]);

    if (pts.length > 0) setPathPoints(pts);
  }, []);

  const updateURLWithPoints = (points: [number, number][]) => {
    if (!points || points.length === 0) {
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    const params = new URLSearchParams();
    params.set("startLat", String(points[0][0]));
    params.set("startLng", String(points[0][1]));

    if (points.length > 1) {
      params.set("endLat", String(points[1][0]));
      params.set("endLng", String(points[1][1]));
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  const handlePathChange = (pts: [number, number][]) => {
    setPathPoints(pts);
    updateURLWithPoints(pts);
  };

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-9999">
        <PathInput onPathChange={handlePathChange} />
      </div>
      <CustomMap pathPoints={pathPoints} pathColor={pathColor} />


      {pathPoints.length > 1 && (
        <div className="absolute bottom-5 left-5 z-9999 flex flex-col gap-2">
          <ColorPicker selectedColor={pathColor} onChange={setPathColor} />
          <ShareLocation pathPoints={pathPoints} />
        </div>
      )}

    </div>
  );
}
