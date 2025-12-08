"use client";

import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { useEffect, useRef } from "react";
import { DEFAULT_LEAFLET_ICON, TILE_LAYER_URLS } from "../../constant/mapApi";
import LRM from "leaflet-routing-machine";


L.Marker.prototype.options.icon = DEFAULT_LEAFLET_ICON;

interface CustomMapProps {
  pathPoints?: [number, number][];
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

function Routing({ pathPoints }: { pathPoints: [number, number][] }) {
  const map = useMap();
  const routingRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    if (pathPoints.length < 2) return;

    if (routingRef.current) {
      map.removeControl(routingRef.current);
    }

    routingRef.current = L.Routing.control({
      waypoints: pathPoints.map((p) => L.latLng(p[0], p[1])),
      lineOptions: {
        styles: [{ color: "red", weight: 5 }],
        extendToWaypoints: false,
        missingRouteTolerance: 0
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    } as any).addTo(map);

    return () => {
      if (routingRef.current) map.removeControl(routingRef.current);
    };
  }, [map, pathPoints]);

  return null;
}

export default function CustomMap({ pathPoints = [] }: CustomMapProps) {
  const center: [number, number] = pathPoints.length > 0 ? pathPoints[0] : [23.0225, 72.5714];

  return (
    <MapContainer
      center={center}
      zoom={8}
      style={{ height: "500px", width: "100%", borderRadius: "12px" }}
    >
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

      {pathPoints.length > 1 && <Routing pathPoints={pathPoints} />}
    </MapContainer>
  );

}


