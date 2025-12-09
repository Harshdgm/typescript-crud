// "use client";

// import { useState } from "react";

// interface RouteInfo {
//   distance: number; // in km
//   duration: number; // in minutes
// }

// export function useRouteDistance() {
//   const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
//   const [loading, setLoading] = useState(false);

//   const fetchDistanceAndTime = async (
//     start: [number, number],
//     end: [number, number],
//     mode: "driving-car" | "cycling-regular" | "foot-walking"
//   ) => {
//     setLoading(true);

//     try {
//       const res = await fetch(
//         `https://api.openrouteservice.org/v2/directions/${mode}`,
//         {
//           method: "POST",
//           headers: {
//             "Authorization": process.env.NEXT_PUBLIC_ORS_API_KEY!,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             coordinates: [
//               [start[1], start[0]],
//               [end[1], end[0]],
//             ],
//           }),
//         }
//       );

//       const data = await res.json();

//       const summary = data?.features?.[0]?.properties?.summary;

//       if (summary) {
//         setRouteInfo({
//           distance: summary.distance / 1000,
//           duration: summary.duration / 60,
//         });
//       }
//     } catch (err) {
//       console.error("Route error:", err);
//     }

//     setLoading(false);
//   };

//   return { routeInfo, loading, fetchDistanceAndTime };
// }
