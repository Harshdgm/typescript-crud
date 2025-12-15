export type TruckPosition = [number, number];

export async function fetchTrucks(): Promise<TruckPosition[]> {
  const res = await fetch("/api/trucks");

  if (!res.ok) {
    throw new Error("Failed to fetch trucks");
  }

  return res.json();
}
