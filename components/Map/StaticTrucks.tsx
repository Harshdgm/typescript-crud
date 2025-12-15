"use client";

import { Marker } from "react-leaflet";
import { TRUCK_ICON } from "@/constant/truckIcon";

interface StaticTrucksProps {
  endPoint: [number, number] | null;
  startPoint: [number, number] | null;
  onTruckClick: (start: [number, number]) => void;
}

const STATIC_TRUCKS: [number, number][] = [
  [23.025, 72.57],
  [22.2410, 68.9680],
  [22.3072, 73.1812],
  [23.2411, 69.6669],
];

export default function StaticTrucks({ endPoint, startPoint, onTruckClick }: StaticTrucksProps) {
  if (!endPoint) return null;

  const visibleTrucks = STATIC_TRUCKS.filter(
    (pos) => !(startPoint && pos[0] === startPoint[0] && pos[1] === startPoint[1])
  );

  return (
    <>
      {visibleTrucks.map((pos, idx) => (
        <Marker
          key={idx}
          position={pos}
          icon={TRUCK_ICON}
          eventHandlers={{
            click: () => onTruckClick(pos),
          }}
        />
      ))}
    </>
  );
}
