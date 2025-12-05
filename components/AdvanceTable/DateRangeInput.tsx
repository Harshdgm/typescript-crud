"use client";

import { useState } from "react";
import { DateRangeData } from "@/types/user";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
  value: DateRangeData;
  onChange: (range: DateRangeData) => void;
};

export default function DateRangeInput({ value, onChange }: Props) {
  const [show, setShow] = useState(false);

  const formatUTC = (date: Date) =>
    date.toLocaleString("en-US", {
      timeZone: "UTC",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const handleTimeChange = (
    key: "startDate" | "endDate",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const [h, m] = e.target.value.split(":").map(Number);

    const d = new Date(value[key]);
    d.setUTCHours(h, m); 

    onChange({
      ...value,
      [key]: d,
    });
  };

  const handleRangeSelect = (ranges: RangeKeyDict) => {
  const r = ranges.selection;

  if (r?.startDate && r?.endDate) {
    const start = r.startDate;
    const end = r.endDate;

    const startUTC = new Date(Date.UTC(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(), 
      0, 0, 0          
    ));

    const endUTC = new Date(Date.UTC(
      end.getFullYear(),
      end.getMonth(),
      end.getDate(),
      23, 59, 59  
    ));

    onChange({
          startDate: startUTC,
          endDate: endUTC,
          key: "selection",
        });
      }
    };


  return (
    <div className="relative">
      <input
        type="text"
        readOnly
        value={
          value.startDate && value.endDate
            ? `${formatUTC(value.startDate)} - ${formatUTC(value.endDate)}`
            : ""
        }
        onClick={() => setShow(!show)}
        className="border p-2 rounded w-full cursor-pointer"
      />

      {show && (
        <div className="absolute z-50 bg-white shadow-lg p-2">
          <DateRangePicker
            ranges={[value]}
            moveRangeOnFirstSelection={false}
            months={1}
            direction="horizontal"
            onChange={handleRangeSelect}
          />

          <div className="flex gap-2 mt-2">
            {(["startDate", "endDate"] as const).map((key) => (
              <div key={key}>
                <label className="text-sm">
                  {key === "startDate" ? "Start Time:" : "End Time:"}
                </label>
                <input
                  type="time"
                  value={`${value[key]
                    .getUTCHours()
                    .toString()
                    .padStart(2, "0")}:${value[key]
                    .getUTCMinutes()
                    .toString()
                    .padStart(2, "0")}`}
                  onChange={(e) => handleTimeChange(key, e)}
                  className="border p-1 rounded"
                />
              </div>
            ))}
          </div>

          <button
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
            onClick={() => setShow(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
