"use client";

import React from "react";
import { ALL_TIMEZONES } from "../../constant/timezones";
import { useLabels } from "@/hooks/useLabels";

interface Props {
  selectedZone: string;
  onChange: (value: string) => void;
}

export default function TimeZoneModal({ selectedZone, onChange }: Props) {
  const labels = useLabels();
  return (
    <div className="col-span-1 bg-gray-50 border rounded-2xl p-6 shadow-inner">
      <h2 className="text-xl font-semibold pb-3">{labels.select_timezone}</h2>

      <select
        className="w-full p-3 border rounded-lg"
        value={selectedZone}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onChange(e.target.value)
        }
      >
        {ALL_TIMEZONES.map((zone: string) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>
    </div>
  );
}
