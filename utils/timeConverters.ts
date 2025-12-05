import { DateString, TimeString } from "@/types/dateType";

export const convertToLocal = (date: DateString, time: TimeString): string => {
  const utcString = `${date}T${time}:00Z`;
  const d = new Date(utcString);
  return d.toLocaleString();
};

export const convertToTimezone = (
  date: DateString,
  time: TimeString,
  zone: string
): string => {
  const utcString = `${date}T${time}:00Z`;
  const d = new Date(utcString);

  return new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(d);
};
