'use client';

import { useEffect, useRef } from 'react';
import maplibregl, { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import {
  MAP_STYLE_URL,
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  ROUTE_LAYER_ID,
  ROUTE_SOURCE_ID,
  ROUTE_LINE_COLOR,
  ROUTE_LINE_WIDTH
} from '@/constant/mapConfig';

interface Props {
  start: [number, number] | null;
  end: [number, number] | null;
  routeData?: any;
}

export default function RouteMap({ routeData }: Props) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE_URL,
      center: MAP_DEFAULT_CENTER,
      zoom: MAP_DEFAULT_ZOOM,
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current || !routeData) return;

    const map = mapRef.current;

    if (map.getLayer(ROUTE_LAYER_ID)) map.removeLayer(ROUTE_LAYER_ID);
    if (map.getSource(ROUTE_SOURCE_ID)) map.removeSource(ROUTE_SOURCE_ID);

    map.addSource(ROUTE_SOURCE_ID, {
      type: 'geojson',
      data: routeData,
    });

    map.addLayer({
      id: ROUTE_LAYER_ID,
      type: 'line',
      source: ROUTE_SOURCE_ID,
      paint: {
        'line-color': ROUTE_LINE_COLOR,
        'line-width': ROUTE_LINE_WIDTH,
      },
    });

  }, [routeData]);

  return (
    <div ref={mapContainer} style={{ height: 500, width: '100%' }} />
  );
}
