"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

import { TILE_LAYER_URLS } from "@/constant/mapApi";
import { DEFAULT_LEAFLET_ICON } from "@/constant/leafletClient";

import MapWithVehicles from "./MapWithVehicles";
import GraphHopperRouting from "./GraphHopperRouting";
import LiveTrackingLayer from "./LiveTrackingLayer";
import { useRouteTracking } from "@/hooks/useRouteTracking";

L.Marker.prototype.options.icon = DEFAULT_LEAFLET_ICON;

interface CustomMapProps {
  pathPoints?: [number, number][];
  pathColor?: string;
}

interface Layer {
  name: string;
  url: string;
  checked?: boolean;
}

const layerList: Layer[] = [
  { name: "Default", url: TILE_LAYER_URLS.GOOGLE_NORMAL, checked: true },
  { name: "Google Normal", url: TILE_LAYER_URLS.DEFAULT },
  { name: "Dark", url: TILE_LAYER_URLS.DARK },
  { name: "Light", url: TILE_LAYER_URLS.LIGHT },
  { name: "Topographic", url: TILE_LAYER_URLS.TOPOGRAPHIC },
  { name: "Google Satellite", url: TILE_LAYER_URLS.GOOGLE_SATELLITE },
  { name: "Google Hybrid", url: TILE_LAYER_URLS.GOOGLE_HYBRID },
  { name: "Google Terrain", url: TILE_LAYER_URLS.GOOGLE_TERRAIN },
];

export default function CustomMap({
  pathPoints = [],
  pathColor = "red",
}: CustomMapProps) {
  const center: [number, number] =
    pathPoints.length > 0 ? pathPoints[0] : [23.0225, 72.5714];

  const [distance, setDistance] = useState<number | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

  const tracking = useRouteTracking(routeCoords, 2000);

  return (
    <div className="relative w-full h-full">
      {distance !== null && <MapWithVehicles distance={distance} />}

      <MapContainer center={center} zoom={8} style={{ height: "100%", width: "100%" }}>
        <LayersControl position="topright">
          {layerList.map((layer) => (
            <LayersControl.BaseLayer
              key={layer.name}
              name={layer.name}
              checked={layer.checked}
            >
              <TileLayer url={layer.url} />
            </LayersControl.BaseLayer>
          ))}
        </LayersControl>

        {pathPoints.length > 0 && (
          <>
            <Marker position={pathPoints[0]}>
              <Popup>Start</Popup>
            </Marker>
            {pathPoints.length > 1 && (
              <Marker position={pathPoints[1]}>
                <Popup>End</Popup>
              </Marker>
            )}
          </>
        )}

         {/* <ORSRouting
            key={pathColor}
            pathPoints={pathPoints}
            onDistance={(dist) => {
              setDistance(dist); 
            }}
            color={pathColor} /> */}
        {tracking.currentPosition && (
          <LiveTrackingLayer
            completedPath={tracking.completedPath}
            activeSegment={tracking.activeSegment}
            currentPosition={tracking.currentPosition}
            activeColor={pathColor}
          />
        )}

        {pathPoints.length > 1 && (
          <GraphHopperRouting
            pathPoints={pathPoints}
            onDistance={setDistance}
            onRouteReady={setRouteCoords}
            color={pathColor}
          />
        )}
      </MapContainer>
    </div>
  );
}
