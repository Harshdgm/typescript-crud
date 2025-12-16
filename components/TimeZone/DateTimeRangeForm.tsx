"use client";

import React from "react";
import { DateString, TimeString } from "@/types/dateType";
import { useLabels } from "@/hooks/useLabels";


interface Props {
  startDate: DateString | "";
  startTime: TimeString | "";
  endDate: DateString | "";
  endTime: TimeString | "";

  onStartDate: (v: DateString) => void;
  onStartTime: (v: TimeString) => void;
  onEndDate: (v: DateString) => void;
  onEndTime: (v: TimeString) => void;

  onSubmit: () => void;
}

export default function DateTimeRangeForm({
  startDate,
  startTime,
  endDate,
  endTime,
  onStartDate,
  onStartTime,
  onEndDate,
  onEndTime,
  onSubmit,
}: Props) {
  const labels = useLabels();
  return (
    <div className="col-span-2 bg-white p-8 rounded-xl border shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Select Date & Time Range
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-8"> 
        <div>
          <label className="block text-sm text-gray-600 mb-1">{labels.start_date}</label>
          <input
            type="date"
            className="w-full p-2 border rounded-md text-gray-800"
            value={startDate}
            onChange={(e) => onStartDate(e.target.value as DateString)}
          />

          <label className="block text-sm text-gray-600 mt-4 mb-1">
            {labels.start_time} (UTC)
          </label>
          <input
            type="time"
            className="w-full p-2 border rounded-md text-gray-800"
            value={startTime}
            onChange={(e) => onStartTime(e.target.value as TimeString)}
          />
        </div>

    
        <div>
          <label className="block text-sm text-gray-600 mb-1">{labels.end_date}</label>
          <input
            type="date"
            className="w-full p-2 border rounded-md text-gray-800"
            value={endDate}
            min={startDate || undefined} 
            onChange={(e) => onEndDate(e.target.value as DateString)}
          />

          <label className="block text-sm text-gray-600 mt-4 mb-1">
            {labels.end_time} (UTC)
          </label>
          <input
            type="time"
            className="w-full p-2 border rounded-md text-gray-800"
            value={endTime}
            onChange={(e) => onEndTime(e.target.value as TimeString)}
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
      >
        {labels.ok}
      </button>
    </div>
  );
}
