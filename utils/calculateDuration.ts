import { VEHICLE_SPEEDS } from "../constant/mapApi";

export type VehicleName = keyof typeof VEHICLE_SPEEDS;

export const calculateDurations = (distance: number): Record<VehicleName, number> => {
  const durations: Record<VehicleName, number> = {} as Record<VehicleName, number>;

  (Object.entries(VEHICLE_SPEEDS) as [VehicleName, number][]).forEach(
    ([vehicle, speed]) => {
      durations[vehicle] = (distance / speed) * 3600; 
    }
  );

  return durations;
};


// export const formatTime = (sec: number): string => {
//   if (sec >= 86400) { // 24 * 3600
//     const days = Math.floor(sec / 86400);
//     const hours = Math.floor((sec % 86400) / 3600);
//     return `${days} day${days > 1 ? "s" : ""} ${hours} hr`;
//   }
//   if (sec >= 3600) {
//     return `${Math.floor(sec / 3600)} hr ${Math.floor((sec / 60) % 60)} min`;
//   }
//   return `${Math.floor(sec / 60)} min`;
// };

export const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};
