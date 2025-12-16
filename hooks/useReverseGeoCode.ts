"use client";

import { useEffect, useState } from "react";
import { GEOAPIFY_REVERSE_URL, GEOAPIFY_API_KEY } from "@/constant/mapApi";

export function useReverseGeocode(coords?: [number, number]) {
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!coords) return;

    const load = async () => {
      setLoading(true);
      try {
        const [lat, lon] = coords;
        const url = `${GEOAPIFY_REVERSE_URL}lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        const feature = data.features?.[0]?.properties;
        if (!feature) {
          setPlaceName(null);
          return;
        }

        const candidates = [
          feature.name,
          feature.street,
          feature.city,
          feature.state,
          feature.country,
        ].filter(Boolean);

        setPlaceName(candidates.join("|"));
      } catch {
        setPlaceName(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [coords]);

  return { placeName, loading };
}
