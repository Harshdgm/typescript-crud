export const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
export const OSRM_BASE_URL = "https://router.project-osrm.org/route/v1/driving";

export const getGeocodeUrl = (location: string) =>
  `${NOMINATIM_URL}?q=${location}&format=json`;

export const getRouteUrl = (start: [number, number], end: [number, number]) =>
  `${OSRM_BASE_URL}/${start.join(",")};${end.join(
    ","
  )}?overview=full&geometries=geojson`;
