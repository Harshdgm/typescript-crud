"use client";

import React from "react";
import { OutputRange } from "@/types/dateType";

interface Props {
  outputLocal: OutputRange | null;
  outputZone: OutputRange | null;
  selectedZone: string;
}

export default function OutputPreview({
  outputLocal,
  outputZone,
  selectedZone,
}: Props) {
  if (!outputLocal || !outputZone) return null;

  return (
    <div className="mt-10 w-full max-w-4xl bg-white p-6 rounded-sm border border-gray-400">
      <h3 className="text-xl font-bold mb-4">Converted Time</h3>

      <div className="space-y-2 text-gray-800">
        <p>
          <b>Local Time:</b>
          <br />
          {outputLocal.start} → {outputLocal.end}
        </p>

        <p className="mt-4">
          <b>{selectedZone} Timezone:</b>
          <br />
          {outputZone.start} → {outputZone.end}
        </p>
      </div>
    </div>
  );
}
