"use client";

import React, { useState, useMemo } from "react";
import { VEHICLE_SPEEDS } from "../../constant/mapApi";
import { calculateDurations, VehicleName, formatTime } from "@/utils/calculateDuration";
import {
  FaCar,
  FaMotorcycle,
  FaTruck,
  FaBus,
  FaBicycle,
  FaWalking,
} from "react-icons/fa";

interface MapWithVehiclesProps {
  distance: number | null;
}

const VEHICLE_ICONS: Record<VehicleName, React.ReactNode> = {
  car: <FaCar />,
  bike: <FaMotorcycle />,
  truck: <FaTruck />,
  bus: <FaBus />,
  walk: <FaWalking />,
  bicycle: <FaBicycle />,
  scooty: <FaMotorcycle />,
};

export default function MapWithVehicles({ distance }: MapWithVehiclesProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleName>("car");

  const durationByVehicle = useMemo(() => {
    if (distance === null) return {} as Record<VehicleName, number>;
    return calculateDurations(distance);
  }, [distance]);

  if (distance === null) return null;

  return (
    <>
      <div className="absolute top-3 right-8 transform -translate-x-1/2 bg-white shadow px-6 py-3 font-semibold rounded z-9999">
        {(distance / 1000).toFixed(2)} km • {formatTime(durationByVehicle[selectedVehicle] || 0)}
      </div>
  
      <div className="absolute top-1/2 right-5 transform -translate-y-1/2 p-4 flex flex-col gap-3 z-9999">
        {(Object.keys(VEHICLE_SPEEDS) as VehicleName[]).map((vehicle) => {
          const active = selectedVehicle === vehicle;
          return (
            <button
              key={vehicle}
              onClick={() => setSelectedVehicle(vehicle)}
              className={`flex items-center justify-center p-3 rounded-full border transition-all ${
                active ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <span className="text-xl">{VEHICLE_ICONS[vehicle]}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
