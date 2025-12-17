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
import { useRouteTracking } from "@/hooks/useRouteTracking";
import { useLabels } from "@/hooks/useLabels";
import { TILE_LAYER_URLS } from "@/constant/mapApi";
import { DEFAULT_LEAFLET_ICON } from "@/constant/leafletClient";
import MapWithVehicles from "./MapWithVehicles";
import GraphHopperRouting from "./GraphHopperRouting";
import LiveTrackingLayer from "./LiveTrackingLayer";
import StaticTrucks from "./StaticTrucks";
import PlaceImagePopup from "./PlaceImagePopup";
import { useNearbyPlaces } from "@/hooks/useNearbyPlaces";
import PlaceCategorySelector from "./PlaceCategorySelector";
import { useMapEvents } from "react-leaflet";
import { PlaceCategory } from "@/constant/placeCategories";
import { getMarkerIcon } from "./placeMarkerIcons";

  L.Marker.prototype.options.icon = DEFAULT_LEAFLET_ICON;

  interface CustomMapProps {
    pathPoints?: [number, number][];
    setPathPoints?: (points: [number, number][]) => void; 
    pathColor?: string;
  }

  interface Layer {
    name: string;
    url: string;
    checked?: boolean;
  }

  export default function CustomMap({
    pathPoints = [],
    setPathPoints,
    pathColor = "red",
  }: CustomMapProps) {
    const center: [number, number] = pathPoints.length > 0 ? pathPoints[0] : [23.0225, 72.5714];
    const labels = useLabels();
    const [distance, setDistance] = useState<number | null>(null);
    const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
    const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | null>(null);
      // useState<PlaceCategory>(PLACE_CATEGORIES[0]);
    const [clickCoords, setClickCoords] = useState<[number, number]>([23.0225, 72.5714]);
      

    const layerList: Layer[] = [
      { name: labels.layer_default, url: TILE_LAYER_URLS.GOOGLE_NORMAL, checked: true },
      { name: labels.layer_google_normal, url: TILE_LAYER_URLS.DEFAULT },
      { name: labels.layer_dark, url: TILE_LAYER_URLS.DARK },
      { name: labels.layer_light, url: TILE_LAYER_URLS.LIGHT },
      { name: labels.layer_topographic, url: TILE_LAYER_URLS.TOPOGRAPHIC },
      { name: labels.layer_google_satellite, url: TILE_LAYER_URLS.GOOGLE_SATELLITE },
      { name: labels.layer_google_hybrid, url: TILE_LAYER_URLS.GOOGLE_HYBRID },
      { name: labels.layer_google_terrain, url: TILE_LAYER_URLS.GOOGLE_TERRAIN },
    ];

    const tracking = useRouteTracking(routeCoords, 2000);

    const handleStaticTruckClick = (newStart: [number, number]) => {
      if (pathPoints.length > 1 && setPathPoints) {
        setPathPoints([newStart, pathPoints[1]]);
        setRouteCoords([]);
        setDistance(null);
      }
    };

    const places = useNearbyPlaces(clickCoords, selectedCategory);

    function MapClickHandler({
        onClick,
      }: {
        onClick: (coords: [number, number]) => void;
      }) {
        useMapEvents({
          click(e) {
            console.log("MAP CLICK:", e.latlng.lat, e.latlng.lng);
            onClick([e.latlng.lat, e.latlng.lng]);
          },
        });
        return null;
      }

    return (
      <div className="relative w-full h-full">

         <PlaceCategorySelector
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        {distance !== null && <MapWithVehicles distance={distance} />}

        <MapContainer center={center} zoom={8} style={{ height: "100%", width: "100%" }}>
          <MapClickHandler onClick={setClickCoords} />

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
                <Popup>
                  <PlaceImagePopup
                    key={`${pathPoints[0][0]}-${pathPoints[0][1]}`}
                    coords={pathPoints[0]}
                  />
                </Popup>
              </Marker>

              {pathPoints.length > 1 && (
                <Marker position={pathPoints[1]}>
                  <Popup>
                    <PlaceImagePopup
                      key={`${pathPoints[1][0]}-${pathPoints[1][1]}`}
                      coords={pathPoints[1]}
                    />
                  </Popup>
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
          <StaticTrucks
            endPoint={pathPoints.length > 1 ? pathPoints[1] : null}
            startPoint={pathPoints[0] || null} 
            onTruckClick={handleStaticTruckClick}
          />

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

           {places.map((p) => (
            <Marker
              key={p.id}
              position={[p.lat, p.lon]}
              icon={getMarkerIcon(selectedCategory)}
            >
              <Popup>
                <strong>{p.name}</strong>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  }
