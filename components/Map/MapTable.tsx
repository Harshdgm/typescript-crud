"use client";

import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { DEFAULT_LEAFLET_ICON, TILE_LAYER_URLS } from "../../constant/mapApi";
import ORSRouting from "./ORSRouting";
import MapWithVehicles from "./MapWithVehicles"; // NEW COMPONENT

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
  { name: "Default", url: TILE_LAYER_URLS.DEFAULT, checked: true },
  { name: "Dark", url: TILE_LAYER_URLS.DARK },
  { name: "Light", url: TILE_LAYER_URLS.LIGHT },
  { name: "Topographic", url: TILE_LAYER_URLS.TOPOGRAPHIC },
  { name: "Google Normal", url: TILE_LAYER_URLS.GOOGLE_NORMAL },
  { name: "Google Satellite", url: TILE_LAYER_URLS.GOOGLE_SATELLITE },
  { name: "Google Hybrid", url: TILE_LAYER_URLS.GOOGLE_HYBRID },
  { name: "Google Terrain", url: TILE_LAYER_URLS.GOOGLE_TERRAIN },
];

export default function CustomMap({ pathPoints = [], pathColor = "red" }: CustomMapProps) {
  const center: [number, number] =
    pathPoints.length > 0 ? pathPoints[0] : [23.0225, 72.5714];

  const [distance, setDistance] = useState<number | null>(null);

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
            <Marker position={pathPoints[pathPoints.length - 1]}>
              <Popup>End</Popup>
            </Marker>
          </>
        )}
        
        {pathPoints.length > 1 && (
          <ORSRouting
            key={pathColor}
            pathPoints={pathPoints}
            onDistance={(dist) => {
              setDistance(dist); 
            }}
            color={pathColor}
          />
        )}
      </MapContainer>
    </div>
  );
}
