"use client";

import { MapContainer, TileLayer, Marker, Polyline, Popup, LayersControl } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const { BaseLayer } = LayersControl;

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
        <LayersControl position="topright">
          <BaseLayer checked name="Default">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </BaseLayer>

          <BaseLayer name="Dark">
            <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png" />
          </BaseLayer>

          <BaseLayer name="Light">
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          </BaseLayer>

          <BaseLayer name="Topographic">
            <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
          </BaseLayer>

          <BaseLayer name="Google Normal">
            <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />
          </BaseLayer>

          <BaseLayer name="Google Satellite">
            <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />
          </BaseLayer>

          <BaseLayer name="Google Hybrid">
            <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
          </BaseLayer>

          <BaseLayer name="Google Terrain">
            <TileLayer url="https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" />
          </BaseLayer>

        </LayersControl>

        <Marker position={markerLocation}>
          <Popup>Marker Location</Popup>
        </Marker>

        <Polyline positions={pathPoints} color={lineColor} weight={5} />
      </MapContainer>
    </div>
  );
}
