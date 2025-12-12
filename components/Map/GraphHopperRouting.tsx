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
  color?: string;
}

interface GraphHopperRoute {
  points: string;
  distance: number;
  time: number;
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
  const routesRef = useRef<GraphHopperRoute[]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  const fetchedOnce = useRef(false);

  useEffect(() => {
    if (pathPoints.length < 2) return;

    fetchedOnce.current = false;

  }, [pathPoints]);

  useEffect(() => {
    if (pathPoints.length < 2) return;

    if (fetchedOnce.current) return; 
    fetchedOnce.current = true;     

    const start = pathPoints[0];
    const end = pathPoints[pathPoints.length - 1];

    const fetchRoutes = async () => {
      try {
        // Remove previous polylines
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

        console.log("GRAPH CALL:", body); // For debugging

        const response = await axios.post<GraphHopperResponse>(url, body);
        const routes = response.data.paths;

        routesRef.current = routes;

        routes.forEach((route, index) => {
          const coords: LatLngExpression[] = polyline
            .decode(route.points)
            .map(([lat, lng]) => [lat, lng]);

          const polylineLayer = L.polyline(coords, {
            color: index === 0 ? color : "gray",
            weight: index === 0 ? 6 : 3,
            opacity: index === 0 ? 1 : 0.4,
          }).addTo(map);

          polylineLayer.on("click", () => {
            setSelectedRouteIndex(index);
            onDistance(route.distance);
          });

          polylinesRef.current.push(polylineLayer);

          if (index === 0) onDistance(route.distance);
        });

        const allCoords = polylinesRef.current.flatMap(
          (p) => p.getLatLngs() as L.LatLng[]
        );

        map.fitBounds(L.latLngBounds(allCoords));
      } catch (error) {
        console.error("GraphHopper Routing Error:", error);
      }
    };

    fetchRoutes();
  }, [pathPoints, map, color]);

  // Highlight selected route
  useEffect(() => {
    polylinesRef.current.forEach((poly, index) => {
      const isSelected = index === selectedRouteIndex;
      poly.setStyle({
        color: isSelected ? color : "gray",
        weight: isSelected ? 6 : 3,
        opacity: isSelected ? 1 : 0.4,
      });
    });

    const selectedRoute = routesRef.current[selectedRouteIndex];
    if (selectedRoute) {
      onDistance(selectedRoute.distance);
    }
  }, [selectedRouteIndex, color]);

  return null;
}
