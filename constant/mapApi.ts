// import L from "leaflet";

export const MAP_API = {
  BASE_URL: "https://nominatim.openstreetmap.org/search",
};

export const MAP_EXAMPLE_LINK =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0462954935084!2d72.8685079!3d21.2351106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f035606410b%3A0xfc5d05395aeb3f56!2sThe%20Moon%20Cafe!5e0!3m2!1sen!2sin!4v1709123456789";

export const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export const TILE_LAYER_URLS = {
  DEFAULT: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  OSM_EN: "https://tiles.wmflabs.org/osm-intl/{z}/{x}/{y}.png",
  DARK: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
  LIGHT: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  TOPOGRAPHIC: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  GOOGLE_NORMAL: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  GOOGLE_SATELLITE: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  GOOGLE_HYBRID: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
  GOOGLE_TERRAIN: "https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
};

// export const DEFAULT_LEAFLET_ICON = L.icon({
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

export const ORS_API = {
  BASE_URL: "https://api.openrouteservice.org/v2/directions/driving-car",
  KEY: "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjE0ZmM1NGQyZDNkOTRiNTQ5ZTg2ZDM3OTJmYTExYmEyIiwiaCI6Im11cm11cjY0In0=",
};

// export const TOMTOM_API = {
//   BASE_URL: "https://api.tomtom.com/routing/1/calculateRoute",
//   KEY: "rMJqWNMRqGIjrmiTbg5LwkxQLooozBYP",
// };

export const VEHICLE_SPEEDS: Record<string, number> = {
  car: 45000,    
  bike: 20000,   
  truck: 40000,  
  bus: 35000, 
};

export const GRAPH_HOPPER_API = {
  KEY: "024732a5-3224-4cf9-b33a-1b94d0f453e8",
  BASE_URL: "https://graphhopper.com/api/1/route",
};
