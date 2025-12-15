"use client";

import { Polyline, Marker } from "react-leaflet";
import { TRUCK_ICON } from "@/constant/truckIcon";

interface Props {
  completedPath: [number, number][];
  activeSegment: [number, number][];
  currentPosition: [number, number] | null;
  activeColor: string;
}

export default function LiveTrackingLayer({
  completedPath,
  activeSegment,
  currentPosition,
  activeColor
}: Props) {
  if (!currentPosition) return null;

  return (
    <>
      {completedPath.length > 1 && (
        <Polyline
          positions={completedPath}
          pathOptions={{ color: "gray", weight: 6 }}
        />
      )}

      {activeSegment.length === 2 && (
        <Polyline
          positions={activeSegment}
          pathOptions={{ color: activeColor, weight: 6 }}
        />
      )}

      <Marker position={currentPosition} icon={TRUCK_ICON}  />
    </>
  );
}
