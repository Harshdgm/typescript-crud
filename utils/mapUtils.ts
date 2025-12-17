import { getLiveCoordinates, Coordinates } from "./getLiveCoordinates";

export async function routeFromLiveToMarker(
  coords: [number, number],
  setPathPoints?: (points: [number, number][]) => void
) {
  if (!setPathPoints) return;

  try {
    const live: Coordinates = await getLiveCoordinates();
    const start: [number, number] = [live.lat, live.lon];

    setPathPoints([start, coords]);
  } catch (err) {
    console.error("Failed to fetch live location:", err);
  }
}
