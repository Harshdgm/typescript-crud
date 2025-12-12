// // New Version
// "use client";

// import { useEffect, useRef } from "react";
// import L, { LatLngExpression } from "leaflet";
// import { useMap } from "react-leaflet";
// import axios from "axios";
// import polyline from "@mapbox/polyline";
// import { ORS_API } from "../../constant/mapApi";

// interface ORSRoute {
//   summary: {
//     distance: number;
//     duration: number;
//   };
//   geometry: string; // encoded polyline
// }

// interface ORSResponse {
//   routes: ORSRoute[];
// }

// interface ORSRoutingProps {
//   pathPoints: [number, number][];
//   onDistance: (distance: number) => void;
//   color?: string;
// }

// export default function ORSRouting({
//   pathPoints,
//   onDistance,
//   color = "red",
// }: ORSRoutingProps) {
//   const map = useMap();
//   const polylinesRef = useRef<L.Polyline[]>([]);

//   useEffect(() => {
//     if (pathPoints.length < 2) return;

//     const start: [number, number] = pathPoints[0];
//     const end: [number, number] = pathPoints[pathPoints.length - 1];

//     const fetchAndDraw = async (): Promise<void> => {
//       try {
//         // Remove old routes
//         polylinesRef.current.forEach((poly) => map.removeLayer(poly));
//         polylinesRef.current = [];

//         const body = {
//           coordinates: [
//             [start[1], start[0]], // ORS expects [lng, lat]
//             [end[1], end[0]],
//           ],
//           alternative_routes: {
//             share_factor: 0.6,
//             target_count: 3,
//           },
//         };

//         const response = await axios.post<ORSResponse>(ORS_API.BASE_URL, body, {
//           headers: {
//             Authorization: ORS_API.KEY,
//             "Content-Type": "application/json",
//           },
//         });

//         const routes: ORSRoute[] = response.data.routes;

//         routes.forEach((route: ORSRoute, idx: number) => {
//           const coords: LatLngExpression[] = polyline
//             .decode(route.geometry)
//             .map(([lat, lng]) => [lat, lng] as LatLngExpression);

//           const polylineLayer = L.polyline(coords, {
//             color: idx === 0 ? color : "gray",
//             weight: idx === 0 ? 5 : 3,
//             opacity: idx === 0 ? 1 : 0.6,
//           }).addTo(map);

//           polylinesRef.current.push(polylineLayer);

//           if (idx === 0) {
//             onDistance(route.summary.distance);
//           }
//         });

//         const allCoords: L.LatLng[] = polylinesRef.current.flatMap(
//           (p) => p.getLatLngs() as L.LatLng[]
//         );
//         map.fitBounds(L.latLngBounds(allCoords));
//       } catch (error) {
//         console.error("ORS Routing Error:", error);
//       }
//     };

//     void fetchAndDraw();
//   }, [map, pathPoints, color, onDistance]);

//   return null;
// }



// // Updated Version
// "use client";

// import { useEffect, useRef } from "react";
// import L, { LatLngExpression } from "leaflet";
// import { useMap } from "react-leaflet";
// import axios from "axios";
// import polyline from "@mapbox/polyline";
// import { ORS_API } from "../../constant/mapApi";

// interface ORSRoute {
//   summary: {
//     distance: number;
//     duration: number;
//   };
//   geometry: string;
// }

// interface ORSResponsePOST {
//   routes?: ORSRoute[];
// }

// interface RouteFeature {
//   geometry: {
//     type: "LineString";
//     coordinates: [number, number][];
//   };
//   properties: {
//     summary: {
//       distance: number;
//     };
//   };
// }

// interface ORSResponseGET {
//   type: string;
//   features: RouteFeature[];
// }

// interface ORSRoutingProps {
//   pathPoints: [number, number][];
//   onDistance: (distance: number) => void;
//   color?: string;
// }

// export default function ORSRouting({
//   pathPoints,
//   onDistance,
//   color = "red",
// }: ORSRoutingProps) {
//   const map = useMap();
//   const polylinesRef = useRef<L.Polyline[]>([]);

//   useEffect(() => {
//     if (pathPoints.length < 2) return;

//     const start = pathPoints[0];
//     const end = pathPoints[pathPoints.length - 1];

//     const fetchAndDraw = async () => {
//       try {
//         // Remove old polylines
//         polylinesRef.current.forEach((poly) => map.removeLayer(poly));
//         polylinesRef.current = [];

//         // Try POST API first (short distance)
//         try {
//           const body = {
//             coordinates: [
//               [start[1], start[0]],
//               [end[1], end[0]],
//             ],
//             alternative_routes: { share_factor: 0.6, target_count: 3 },
//           };

//           const response = await axios.post<ORSResponsePOST>(ORS_API.BASE_URL, body, {
//             headers: {
//               Authorization: ORS_API.KEY,
//               "Content-Type": "application/json",
//             },
//           });

//           const routes = response.data.routes;

//           if (routes && routes.length > 0) {
//             routes.forEach((route, idx) => {
//               const coords: LatLngExpression[] = polyline
//                 .decode(route.geometry)
//                 .map(([lat, lng]) => [lat, lng]);

//               const poly = L.polyline(coords, {
//                 color: idx === 0 ? color : "gray",
//                 weight: idx === 0 ? 5 : 3,
//                 opacity: idx === 0 ? 1 : 0.6,
//               }).addTo(map);

//               polylinesRef.current.push(poly);
//               if (idx === 0) onDistance(route.summary.distance);
//             });

//             const allCoords = polylinesRef.current.flatMap((p) => p.getLatLngs() as L.LatLng[]);
//             map.fitBounds(L.latLngBounds(allCoords));
//             return; // done
//           }
//         } catch (err) {
//           console.warn("POST API failed, trying GET features API:", err);
//         }

//         // Fallback GET API (long distance)
//         const url = `${ORS_API.BASE_URL}?start=${start[1]},${start[0]}&end=${end[1]},${end[0]}&alternative_routes[share_factor]=0.6&alternative_routes[target_count]=3`;
//         const responseGet = await axios.get<ORSResponseGET>(url, {
//           headers: { Authorization: ORS_API.KEY },
//         });

//         const features = responseGet.data.features;
//         features.forEach((feature, idx) => {
//           const coords: LatLngExpression[] = feature.geometry.coordinates.map(
//             ([lng, lat]) => [lat, lng]
//           );

//           const poly = L.polyline(coords, {
//             color: idx === 0 ? color : "gray",
//             weight: idx === 0 ? 5 : 3,
//             opacity: idx === 0 ? 1 : 0.6,
//           }).addTo(map);

//           polylinesRef.current.push(poly);
//           if (idx === 0) onDistance(feature.properties.summary.distance);
//         });

//         const allCoords = polylinesRef.current.flatMap((p) => p.getLatLngs() as L.LatLng[]);
//         map.fitBounds(L.latLngBounds(allCoords));
//       } catch (error) {
//         console.error("ORS Routing Error:", error);
//       }
//     };

//     void fetchAndDraw();
//   }, [map, pathPoints, color, onDistance]);

//   return null;
// }

// // old vesion
// "use client";

// import { useEffect, useRef } from "react";
// import L, { LatLngExpression } from "leaflet";
// import { useMap } from "react-leaflet";
// import axios from "axios";
// import { ORS_API } from "../../constant/mapApi";

// interface RouteProperties {
//   summary: {
//     distance: number;
//     duration: number;
//   };
// }

// interface RouteFeature {
//   type: "Feature";
//   geometry: {
//     type: "LineString";
//     coordinates: [number, number][];
//   };
//   properties: RouteProperties;
// }

// interface ORSResponse {
//   type: "FeatureCollection";
//   features: RouteFeature[];
// }

// interface ORSRoutingProps {
//   pathPoints: [number, number][];
//   onDistance: (distance: number) => void;
//   color?: string;
// }

// export default function ORSRouting({ pathPoints, onDistance, color = "red" }: ORSRoutingProps) {
//   const map = useMap();
//   const polylinesRef = useRef<L.Polyline[]>([]);

//   useEffect(() => {
//     if (pathPoints.length < 2) return;

//     const start = pathPoints[0];
//     const end = pathPoints[pathPoints.length - 1];

//     const fetchAndDraw = async () => {
//       try {
//         polylinesRef.current.forEach((poly) => map.removeLayer(poly));
//         polylinesRef.current = [];

//         const url = `${ORS_API.BASE_URL}?start=${start[1]},${start[0]}&end=${end[1]},${end[0]}&alternative_routes[share_factor]=0.6&alternative_routes[target_count]=3`;
//         const response = await axios.get<ORSResponse>(url, {
//           headers: { Authorization: ORS_API.KEY },
//         });

//         const routes = response.data.features;

//         routes.forEach((route, idx) => {
//           const coords: LatLngExpression[] = route.geometry.coordinates.map(
//             ([lng, lat]) => [lat, lng]
//           );

//           const polyline = L.polyline(coords, {
//             color: idx === 0 ? color : "gray",
//             weight: idx === 0 ? 5 : 3,
//             opacity: idx === 0 ? 1 : 0.6,
//           }).addTo(map);

//           polylinesRef.current.push(polyline);

//           if (idx === 0) onDistance(route.properties.summary.distance);
//         });

//         const allCoords = polylinesRef.current.flatMap((p) => p.getLatLngs() as L.LatLng[]);
//         map.fitBounds(L.latLngBounds(allCoords));
//       } catch (err) {
//         console.error("ORS Routing Error:", err);
//       }
//     };

//     fetchAndDraw();
//   }, [map, pathPoints, color, onDistance]); 

//   return null;
// }

