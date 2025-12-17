"use client";

import { useEffect, useState } from "react";
import { GEOAPIFY_API_KEY } from "@/constant/mapApi";
import { PlaceCategory } from "@/constant/placeCategories";

export interface NearbyPlace {
  id: string;
  name: string;
  lat: number;
  lon: number;
  category: string;
}

interface GeoapifyFeature {
  properties: {
    place_id: string;
    name?: string;
    categories?: { id: string; name: string }[];
  };
  geometry: {
    coordinates: [number, number];
  };
}

interface GeoapifyResponse {
  features?: GeoapifyFeature[];
}

export function useNearbyPlaces(
  coords: [number, number],
  category: PlaceCategory | null
) {
  const [fetchedPlaces, setFetchedPlaces] = useState<NearbyPlace[]>([]);

  useEffect(() => {
    if (!category) return;

    let cancelled = false;

    const load = async () => {
      const [lat, lon] = coords;

      try {
        const url =
          `https://api.geoapify.com/v2/places?` +
          `categories=${category.apiCategories}` +
          `&filter=circle:${lon},${lat},3000` +
          `&limit=50` +
          `&apiKey=${GEOAPIFY_API_KEY}`;

        const res = await fetch(url);
        const data: GeoapifyResponse = await res.json();

        if (cancelled || !data.features) return;

        const formatted: NearbyPlace[] = data.features.map((f) => ({
          id: f.properties.place_id,
          name: f.properties.name ?? "Unnamed place",
          lat: f.geometry.coordinates[1],
          lon: f.geometry.coordinates[0],
          category: f.properties.categories?.[0]?.name ?? "",
        }));

        const strictlyMatched = formatted.filter((p) =>
          category.strictKeywords.some((k) =>
            p.name.toLowerCase().includes(k)
          )
        );

        if (!cancelled) {
          setFetchedPlaces(strictlyMatched);
        }
      } catch {
        if (!cancelled) setFetchedPlaces([]);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [coords, category]);

  return category ? fetchedPlaces : [];
}
