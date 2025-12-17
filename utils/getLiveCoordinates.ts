export interface Coordinates {
  lat: number;
  lon: number;
}

export function getLiveCoordinates(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        console.log("Live coordinates fetched:", coords); 
        resolve(coords);
      },
      (err) => {
        console.error("Error fetching geolocation:", err);
        reject(err.message || "Location access denied.");
      },
      { enableHighAccuracy: true }
    );
  });
}
