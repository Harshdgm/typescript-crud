"use client";

import { useState } from "react";

export interface Coordinates {
  lat: number;
  lon: number;
}

export function useLiveLocation() {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [error, setError] = useState("");

  const fetchLiveLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setError("");
      },
      () => setError("Location access denied."),
      { enableHighAccuracy: true } 
    );
  };

  return { coords, error, fetchLiveLocation };
}
