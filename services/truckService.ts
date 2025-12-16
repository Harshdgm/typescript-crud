import { API_ROUTES } from "@/constant/apiRoutes"

export type TruckPosition = [number, number];

export async function fetchTrucks(): Promise<TruckPosition[]> {
  const res = await fetch(`${API_ROUTES.TRUCK_DATA}`);

  if (!res.ok) {
    throw new Error("Failed to fetch trucks");
  }

  return res.json();
}
