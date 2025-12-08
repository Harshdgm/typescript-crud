'use client';

import { useEffect, useRef } from 'react';
import maplibregl, { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

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
      style: 'https://tiles.openfreemap.org/styles/bright',
      // style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [72.5714, 23.0225],
      zoom: 10,
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current || !routeData) return;

    const map = mapRef.current;

    if (map.getLayer('routeLine')) map.removeLayer('routeLine');
    if (map.getSource('routeSource')) map.removeSource('routeSource');

    map.addSource('routeSource', {
      type: 'geojson',
      data: routeData,
    });

    map.addLayer({
      id: 'routeLine',
      type: 'line',
      source: 'routeSource',
      paint: {
        'line-color': '#ff0000',
        'line-width': 5,
      },
    });

  }, [routeData]);

  return (
    <div ref={mapContainer} style={{ height: 500, width: '100%' }} />
  )
}
