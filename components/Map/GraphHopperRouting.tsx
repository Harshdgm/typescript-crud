"use client";

import { useEffect, useRef } from "react";
import L, { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";
import axios from "axios";
import polyline from "@mapbox/polyline";
import { GRAPH_HOPPER_API } from "@/constant/mapApi";

interface GraphHopperRoutingProps {
  pathPoints: [number, number][]; // [lat, lng]
  onDistance: (distance: number) => void;
  color?: string;
}

interface GraphHopperRoute {
  points: string;
  distance: number;
  time: number;
  description: string[];
}

interface GraphHopperResponse {
  paths: GraphHopperRoute[];
}

const GRAPH_HOPPER_KEY = GRAPH_HOPPER_API.KEY;

export default function GraphHopperRouting({
  pathPoints,
  onDistance,
  color = "red",
}: GraphHopperRoutingProps) {
  const map = useMap();
  const polylinesRef = useRef<L.Polyline[]>([]);

  useEffect(() => {
    if (pathPoints.length < 2) return;

    const start = pathPoints[0];
    const end = pathPoints[pathPoints.length - 1];

    const fetchAndDraw = async () => {
      try {
        // Remove existing polylines
        polylinesRef.current.forEach((poly) => map.removeLayer(poly));
        polylinesRef.current = [];

        const url = `${GRAPH_HOPPER_API.BASE_URL}?key=${GRAPH_HOPPER_KEY}`;
        const body = {
          points: [
            [start[1], start[0]],
            [end[1], end[0]],
          ],
          profile: "car",
          algorithm: "alternative_route",
          "alternative_route.max_paths": 3,
          "alternative_route.max_weight_factor": 1.4,
          "alternative_route.max_share_factor": 0.6,
          points_encoded: true,
        };

        const response = await axios.post<GraphHopperResponse>(url, body, {
          headers: { "Content-Type": "application/json" },
        });

        const routes = response.data.paths;
        if (routes.length === 0) return;

        routes.forEach((route, idx) => {
          const coords: LatLngExpression[] = polyline
            .decode(route.points)
            .map(([lat, lng]) => [lat, lng]);

          const poly = L.polyline(coords, {
            color: idx === 0 ? color : "gray",
            weight: idx === 0 ? 5 : 3,
            opacity: idx === 0 ? 1 : 0.6,
          }).addTo(map);

          polylinesRef.current.push(poly);

          if (idx === 0) onDistance(route.distance); 
        });

        const allCoords = polylinesRef.current.flatMap(
          (p) => p.getLatLngs() as L.LatLng[]
        );
        map.fitBounds(L.latLngBounds(allCoords));
      } catch (err) {
        console.error("GraphHopper Routing Error:", err);
      }
    };

    void fetchAndDraw();
  }, [map, pathPoints, color, onDistance]);

  return null;
}
