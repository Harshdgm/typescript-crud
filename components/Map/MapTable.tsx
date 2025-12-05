"use client";

import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface CustomMapProps {
  center?: LatLngExpression;
  markerLocation?: LatLngExpression;
  pathPoints?: LatLngExpression[];
  lineColor?: string;
  zoom?: number;
}

export default function CustomMap({
  center = [23.0225, 72.5714],
  markerLocation = [23.0225, 72.5714],
  pathPoints = [
    [23.0225, 72.5714],
    [22.3072, 73.1812],
    [21.1702, 72.8311],
  ],
  lineColor = "red",
  zoom = 8,
}: CustomMapProps) {
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png"/> {/* Dark theme */}
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"/> {/* Light theme */}   
        <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"/> {/* Topographic theme */}
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/> {/* Satellite theme */}
        <TileLayer url="https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=YOUR_API_KEY"/> {/* Transport theme */}
        <TileLayer url="https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=YOUR_API_KEY"/> {/* Cycle theme */} 
        <TileLayer url="https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=YOUR_API_KEY"/> {/* Landscape theme */}   
        <TileLayer url="https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=YOUR_API_KEY"/> {/* Outdoors theme */} 
        <TileLayer url="https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=YOUR_API_KEY"/> {/* Pioneer theme */}


        <TileLayer url={`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}`} attribution="Google Maps"/>

        {/* lyrs=m → normal
        lyrs=s → satellite
        lyrs=p → terrain
        lyrs=y → hybrid */}

        <Marker position={markerLocation}>
          <Popup>Marker Location</Popup>
        </Marker>

        <Polyline positions={pathPoints} color={lineColor} weight={5} />
      </MapContainer>
    </div>
  );
}
