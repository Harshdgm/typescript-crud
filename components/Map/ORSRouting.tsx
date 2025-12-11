"use client";

import { useEffect, useRef } from "react";
import L, { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";
import axios from "axios";
import { ORS_API } from "../../constant/mapApi";

interface RouteProperties {
  summary: {
    distance: number; 
    duration: number; 
  };
}

interface RouteFeature {
  type: "Feature";
  geometry: {
    type: "LineString";
    coordinates: [number, number][];
  };
  properties: RouteProperties;
}

interface ORSResponse {
  type: "FeatureCollection";
  features: RouteFeature[];
}

interface ORSRoutingProps {
  pathPoints: [number, number][];
  onDistance: (distance: number) => void;
  color?: string;
}

export default function ORSRouting({ pathPoints, onDistance, color }: ORSRoutingProps) {
  const map = useMap();
  const polylinesRef = useRef<L.Polyline[]>([]);

  useEffect(() => {
    if (pathPoints.length < 2) return;

    const start: [number, number] = pathPoints[0];
    const end: [number, number] = pathPoints[pathPoints.length - 1];

    const fetchRoutes = async () => {
      try {
        polylinesRef.current.forEach((poly) => map.removeLayer(poly));
        polylinesRef.current = [];

        const url = `${ORS_API.BASE_URL}?start=${start[1]},${start[0]}&end=${end[1]},${end[0]}&alternative_routes[share_factor]=0.6&alternative_routes[target_count]=3`;

        const response = await axios.get<ORSResponse>(url, {
          headers: { Authorization: ORS_API.KEY },
        });

        const routes: RouteFeature[] = response.data.features;

        routes.forEach((route, idx) => {
          const coords: LatLngExpression[] = route.geometry.coordinates.map(
            ([lng, lat]) => [lat, lng]
          );

          const polyline = L.polyline(coords, {
            color: idx === 0 ? "red" : "gray",
            weight: idx === 0 ? 5 : 3,
            opacity: idx === 0 ? 1 : 0.6,
          }).addTo(map);

          polylinesRef.current.push(polyline);

          if (idx === 0) {
            onDistance(route.properties.summary.distance);}
        });

        const allCoords = polylinesRef.current.flatMap((p) =>
          p.getLatLngs() as L.LatLng[]
        );
        const bounds = L.latLngBounds(allCoords);
        map.fitBounds(bounds);
      } catch (error) {
        console.error("ORS Routing Error:", error);
      }
    };

    fetchRoutes();
  }, [map, pathPoints, onDistance]);

  return null;
}
