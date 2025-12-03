export interface CityInfo {
  city: string;
  state: string;
  country: string;
}

export async function fetchCityDetails(cityName: string): Promise<CityInfo | null> {
  if (!cityName) return null;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    cityName
  )}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "CRUD", 
      },
    });

    const data = await res.json();

    if (data.length === 0) return null;

    const address = data[0].address;

    return {
      city: address.city || address.town || address.village || cityName,
      state: address.state || "",
      country: address.country || "",
    };
  } catch (err) {
    console.error("City API Error:", err);
    return null;
  }
}
