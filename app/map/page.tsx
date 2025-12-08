// const CustomMap = dynamic(() => import("../../components/Map/CompanyMap"), {
//   ssr: false,
// });

"use client";

import { useState } from "react";
import "leaflet/dist/leaflet.css";
// import CompanyMap from "@/components/Map/CompanyMap";
import PathInput from "@/components/Map/PathInput";
import CustomMap from "@/components/Map/MapTable"; 

export default function MapPage() {
  const [pathPoints, setPathPoints] = useState<[number, number][]>([]);

  return (
    <div className="p-10">
      {/* <h1 className="text-center font-semibold text-xl pb-5">Company Map</h1>
      <CompanyMap /> */}

      <h1 className="text-xl font-semibold mb-4">Dynamic Path Map</h1>
      <PathInput onPathChange={setPathPoints} />
      <CustomMap pathPoints={pathPoints} />
    </div>
  );
}

