"use client";

import { useEffect, useRef, useMemo } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const MATCH_DISTANCE_METERS = 2000;

interface TrafficPoint {
  lat: number;
  lng: number;
  level: "slow" | "moderate" | "heavy";
}

interface Props {
  routeCoords: [number, number][];
  routeUpdateTrigger: string | number;
}

export default function RouteTrafficLayer({ routeCoords, routeUpdateTrigger }: Props) {
  const map = useMap();
  const layersRef = useRef<L.Polyline[]>([]);

  const memoRouteCoords = useMemo(() => routeCoords, [JSON.stringify(routeCoords)]);

 useEffect(() => {
  if (memoRouteCoords.length < 2) return;

  layersRef.current.forEach(l => map.removeLayer(l));
  layersRef.current = [];

  const drawTraffic = async () => {
    try {
      const res = await fetch("/api/traffic");
      if (!res.ok) throw new Error("Traffic API failed");
      const { trafficPoints }: { trafficPoints: TrafficPoint[] } = await res.json();

      let currentSegment: [number, number][] = [];
      let currentLevel: "slow" | "moderate" | "heavy" | null = null;

      for (let i = 0; i < memoRouteCoords.length; i++) {
        const routePoint = memoRouteCoords[i];
        const nearbyPoints = trafficPoints
          .map(tp => ({ ...tp, distance: map.distance(L.latLng(routePoint), L.latLng(tp.lat, tp.lng)) }))
          .filter(tp => tp.distance < MATCH_DISTANCE_METERS);

        const matched = nearbyPoints.length > 0
          ? nearbyPoints.reduce((prev, curr) => prev.distance < curr.distance ? prev : curr)
          : null;

        if (matched) {
          if (!currentLevel) currentLevel = matched.level;
          currentSegment.push(routePoint);
        } else {
          if (currentSegment.length > 1 && currentLevel) {
            const poly = L.polyline(currentSegment, {
              color: currentLevel === "heavy" ? "red" : currentLevel === "moderate" ? "orange" : "yellow",
              weight: 8,
              opacity: 0.9,
            }).addTo(map);

            layersRef.current.push(poly);
          }
          currentSegment = [];
          currentLevel = null;
        }
      }

      if (currentSegment.length > 1 && currentLevel) {
        const poly = L.polyline(currentSegment, {
          color: currentLevel === "heavy" ? "red" : currentLevel === "moderate" ? "orange" : "yellow",
          weight: 8,
          opacity: 0.9,
        }).addTo(map);

        layersRef.current.push(poly);
      }

      layersRef.current.forEach(poly => poly.bringToFront());
    } catch (err) {
      console.error("Failed to fetch traffic data:", err);
    }
  };

  drawTraffic();
}, [map, memoRouteCoords, routeUpdateTrigger]);

  return null;
}

