"use client";

import { useEffect, useState } from "react";
import { fetchTrucks, TruckPosition } from "@/services/truckService";

export function useTrucks() {
  const [trucks, setTrucks] = useState<TruckPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrucks()
      .then(setTrucks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { trucks, loading, error };
}
