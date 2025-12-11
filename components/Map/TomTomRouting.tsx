"use client";

import { useEffect, useRef } from "react";
import L, { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";
import axios from "axios";
import { TOMTOM_API } from "@/constant/mapApi"; 

interface TomTomPoint {
  latitude: number;
  longitude: number;
}

interface TomTomLeg {
  points: TomTomPoint[];
}

interface TomTomSummary {
  lengthInMeters: number;
  travelTimeInSeconds: number;
  trafficDelayInSeconds: number;
  freeFlowTravelTimeInSeconds: number;
}

interface TomTomRoute {
  legs: TomTomLeg[];
  summary: TomTomSummary;
}

interface TomTomResponse {
  routes: TomTomRoute[];
}

interface TomTomRoutingProps {
  pathPoints: [number, number][];
  onDistance: (distance: number) => void;
  vehicleType?: "car" | "truck" | "bicycle" | "pedestrian" | "motorcycle";
}

export default function TomTomRouting({
  pathPoints,
  onDistance,
  vehicleType = "car",
}: TomTomRoutingProps) {
  const map = useMap();
  const polylinesRef = useRef<L.Polyline[]>([]);

  useEffect(() => {
    if (pathPoints.length < 2) return;

    const [start, end] = [pathPoints[0], pathPoints[pathPoints.length - 1]];

    const fetchAndDraw = async () => {
      try {
        polylinesRef.current.forEach((poly) => map.removeLayer(poly));
        polylinesRef.current = [];

       // const url = `${TOMTOM_API.BASE_URL}/${start[0]},${start[1]}:${end[0]},${end[1]}/json?key=${TOMTOM_API.KEY}&traffic=true&vehicleType=${vehicleType}`;
       const [start, end] = [
            [pathPoints[0][1], pathPoints[0][0]], 
            [pathPoints[pathPoints.length - 1][1], pathPoints[pathPoints.length - 1][0]], 
        ];

        const url = `${TOMTOM_API.BASE_URL}/${start[0]},${start[1]}:${end[0]},${end[1]}/json?key=${TOMTOM_API.KEY}&traffic=true&vehicleType=${vehicleType}`;


        const response = await axios.get<TomTomResponse>(url);
        const route = response.data.routes[0];

        if (!route || !route.legs.length) return;

        const coords: LatLngExpression[] = route.legs[0].points.map(
          (p) => [p.latitude, p.longitude] as LatLngExpression
        );

        if (!coords.length) return;

        const trafficPercent =
          route.summary.freeFlowTravelTimeInSeconds > 0
            ? route.summary.trafficDelayInSeconds /
              route.summary.freeFlowTravelTimeInSeconds
            : 0;

        let color = "green";
        if (trafficPercent > 0.5) color = "red";
        else if (trafficPercent > 0.2) color = "yellow";

        const polyline = L.polyline(coords, { color, weight: 5 }).addTo(map);
        polylinesRef.current.push(polyline);

        onDistance(route.summary.lengthInMeters);

        map.fitBounds(L.latLngBounds(coords));
      } catch (err) {
        console.error("TomTom Routing Error:", err);
      }
    };

    fetchAndDraw();
  }, [map, pathPoints, vehicleType, onDistance]);

  return null;
}
