"use client";

import { Marker } from "react-leaflet";
import { TRUCK_ICON } from "@/constant/truckIcon";
import { useTrucks } from "@/hooks/useTruck";

interface StaticTrucksProps {
  endPoint: [number, number] | null;
  startPoint: [number, number] | null;
  onTruckClick: (start: [number, number]) => void;
}

export default function StaticTrucks({
  endPoint,
  startPoint,
  onTruckClick,
}: StaticTrucksProps) {
  const { trucks, loading } = useTrucks();

  if (!endPoint || loading) return null;

  const visibleTrucks = trucks.filter(
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
