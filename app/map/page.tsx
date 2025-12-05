"use client";

import "leaflet/dist/leaflet.css";
import CompanyMap from '@/components/Map/CompanyMap';
import CustomMap from '@/components/Map/MapTable';

export default function page() {
  return (
    <div className="p-20">
      <h1 className="text-center font-semibold text-xl pb-5">Company Map</h1>
      <CompanyMap/>
      
      <h1 className="text-center font-semibold text-xl py-5">Map Page</h1>
      <CustomMap/>
    </div>
  )
}
