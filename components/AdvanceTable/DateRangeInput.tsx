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

  const formatDateTime = (date: Date) =>
    date.toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  return (
    <div className="relative">
      <input
        type="text"
        readOnly
        value={
          value.startDate && value.endDate
            ? `${formatDateTime(value.startDate)} - ${formatDateTime(
                value.endDate
              )}`
            : ""
        }
        onClick={() => setShow(!show)}
        className="border p-2 rounded w-full cursor-pointer"
      />

      {show && (
        <div className="absolute z-50 bg-white shadow-lg p-2">
          <DateRangePicker
            ranges={[value]}
            showSelectionPreview
            moveRangeOnFirstSelection={false}
            months={1}
            direction="horizontal"
            onChange={(ranges: RangeKeyDict) => {
              if (ranges.selection) {
                onChange({
                  startDate: ranges.selection.startDate,
                  endDate: ranges.selection.endDate,
                  key: "selection",
                });
              }
            }}
          />
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
