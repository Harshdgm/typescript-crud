"use client";

import { useEffect, useRef, useState } from "react";
import L, { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";
import axios from "axios";
import polyline from "@mapbox/polyline";
import { GRAPH_HOPPER_API } from "@/constant/mapApi";

interface GraphHopperRoutingProps {
  pathPoints: [number, number][];
  onDistance: (distance: number) => void;
  onRouteReady?: (coords: [number, number][]) => void;
  color?: string;
}

interface GraphHopperRoute {
  points: string;
  distance: number;
}

interface GraphHopperResponse {
  paths: GraphHopperRoute[];
}

const GRAPH_HOPPER_KEY = GRAPH_HOPPER_API.KEY;

export default function GraphHopperRouting({
  pathPoints,
  onDistance,
  onRouteReady,
  color = "red",
}: GraphHopperRoutingProps) {
  const map = useMap();
  const polylinesRef = useRef<L.Polyline[]>([]);
  const routesRef = useRef<[number, number][][]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  useEffect(() => {
    if (pathPoints.length < 2) return;

    const fetchRoutes = async () => {
      try {
        polylinesRef.current.forEach((p) => map.removeLayer(p));
        polylinesRef.current = [];
        routesRef.current = [];

        const url = `${GRAPH_HOPPER_API.BASE_URL}?key=${GRAPH_HOPPER_KEY}`;

        const body = {
          points: [
            [pathPoints[0][1], pathPoints[0][0]],
            [pathPoints[1][1], pathPoints[1][0]],
          ],
          profile: "car",
          algorithm: "alternative_route",
          "alternative_route.max_paths": 3,
          points_encoded: true,
        };

        const res = await axios.post<GraphHopperResponse>(url, body);
        const routes = res.data.paths;

        routes.forEach((route, index) => {
          const coords = polyline
            .decode(route.points)
            .map(([lat, lng]) => [lat, lng]) as [number, number][];

          routesRef.current.push(coords);

          const poly = L.polyline(coords as LatLngExpression[], {
            color: index === 0 ? color : "black",
            weight: index === 0 ? 6 : 6,
            opacity: index === 0 ? 1 : 0.5,
          }).addTo(map);

          poly.on("click", () => {
            setSelectedRouteIndex(index);
            onDistance(route.distance);
            onRouteReady?.(coords);
          });

          polylinesRef.current.push(poly);

          if (index === 0) {
            onDistance(route.distance);
            onRouteReady?.(coords);
          }
        });

        map.fitBounds(polylinesRef.current[0].getBounds());
      } catch (err) {
        console.error("GraphHopper error:", err);
      }
    };

    fetchRoutes();
  }, [pathPoints, map, color, onDistance, onRouteReady]);

  useEffect(() => {
    polylinesRef.current.forEach((poly, idx) => {
      poly.setStyle({
        color: idx === selectedRouteIndex ? color : "gray",
        weight: idx === selectedRouteIndex ? 6 : 4,
        opacity: idx === selectedRouteIndex ? 1 : 0.5,
      });
    });
  }, [selectedRouteIndex, color]);

  return null;
}
