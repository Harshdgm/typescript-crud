export interface GeoapifyPlaceFeature {
  type: "Feature";
  properties: {
    place_id: string;
    name?: string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number]; 
  };
}

export interface GeoapifyPlacesResponse {
  type: "FeatureCollection";
  features: GeoapifyPlaceFeature[];
}



