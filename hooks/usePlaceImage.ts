"use client";

import { useEffect, useState } from "react";
import { API_ROUTES } from "@/constant/apiRoutes";

export function usePlaceImage(place?: string) {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (!place) return;

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_ROUTES.PLACE_IMAGE}?place=${encodeURIComponent(place)}`);
      const data = await res.json();
      setImage(data.image);
    } finally {
      setLoading(false);
    }
  };

  load();
}, [place]);


  return { image, loading };
}
