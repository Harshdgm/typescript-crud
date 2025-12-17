"use client";
import { useMapEvents } from "react-leaflet";

export default function MapClickHandler({
  onClick,
}: {
  onClick: (coords: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      onClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}
