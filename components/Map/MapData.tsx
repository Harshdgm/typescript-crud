'use client';

import { useState } from 'react';
import RouteMap from './RouteMap';
import { getGeocodeUrl, getRouteUrl } from '@/constant/mapData';

export default function MapData() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [startCoords, setStartCoords] = useState<[number, number] | null>(null);
  const [endCoords, setEndCoords] = useState<[number, number] | null>(null);
  const [routeData, setRouteData] = useState<any>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const geocode = async (location: string): Promise<[number, number]> => {
    const res = await fetch(getGeocodeUrl(location));
    const data = await res.json();

    return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
  };

  const handleSearch = async () => {
    const startC = await geocode(start);
    const endC = await geocode(end);

    setStartCoords(startC);
    setEndCoords(endC);

    const routeURL = getRouteUrl(startC, endC);

    const res = await fetch(routeURL);
    const json = await res.json();

    const route = json.routes[0];

    setDistance(route.distance / 1000); // km
    setDuration(route.duration / 60); // min
    setRouteData(route.geometry);
  };

  return (
    <div className='p-20'>
      <h2>Route Planner</h2>

      <div className='flex gap-10 align-center text-center'>
        <input
          type="text"
          placeholder="Start location..."
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="p-2 mb-10 border border-black"
        />

        <input
          type="text"
          placeholder="End location..."
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="p-2 mb-10 border border-black"
        />

        <button
          onClick={handleSearch}
          className="mb-10 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
        >
          Find Route
        </button>
      </div>

      {distance && duration && (
        <div className='mb-2'>
          <p><b>Distance:</b> {distance.toFixed(2)} km</p>
          {/* <p><b>Duration:</b> {duration.toFixed(2)} minutes</p> */}
        </div>
      )}

      <RouteMap start={startCoords} end={endCoords} routeData={routeData} />
    </div>
  );
}
