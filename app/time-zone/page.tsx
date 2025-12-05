"use client";

import { useState } from "react";

import TimezoneSelector from "@/components/TimeZone/TimeZoneSelector";
import DateTimeRangeForm from "@/components/TimeZone/DateTimeRangeForm";
import OutputPreview from "@/components/TimeZone/OutputPreview";

import { convertToLocal, convertToTimezone } from "@/utils/timeConverters";
import { DateString, TimeString, OutputRange } from "@/types/dateType";

export default function TimezoneRangePage() {
  const [selectedZone, setSelectedZone] = useState<string>("Asia/Kolkata");

  const [startDate, setStartDate] = useState<DateString | "">("");
  const [startTime, setStartTime] = useState<TimeString | "">("");
  const [endDate, setEndDate] = useState<DateString | "">("");
  const [endTime, setEndTime] = useState<TimeString | "">("");

  const [outputLocal, setOutputLocal] = useState<OutputRange | null>(null);
  const [outputZone, setOutputZone] = useState<OutputRange | null>(null);

  const handleSubmit = () => {
    if (!startDate || !startTime || !endDate || !endTime) {
      alert("Please fill all fields");
      return;
    }

    const local: OutputRange = {
      start: convertToLocal(startDate, startTime),
      end: convertToLocal(endDate, endTime),
    };

    const zone: OutputRange = {
      start: convertToTimezone(startDate, startTime, selectedZone),
      end: convertToTimezone(endDate, endTime, selectedZone),
    };

    setOutputLocal(local);
    setOutputZone(zone);
  };

  return (
    <>
    <div className=" px-10 py-5 flex justify-center items-start">
      <div className="bg-white  rounded-sm p-10 w-full max-w-6xl grid grid-cols-3 gap-10">

        <TimezoneSelector
          selectedZone={selectedZone}
          onChange={setSelectedZone}
        />

        <DateTimeRangeForm
          startDate={startDate}
          startTime={startTime}
          endDate={endDate}
          endTime={endTime}
          onStartDate={setStartDate}
          onStartTime={setStartTime}
          onEndDate={setEndDate}
          onEndTime={setEndTime}
          onSubmit={handleSubmit}
        />
      </div>
      </div>

        <div className="flex flex-cols align-center justify-center  p-10">
          <OutputPreview
          outputLocal={outputLocal}
          outputZone={outputZone}
          selectedZone={selectedZone}
        />
      </div>
    </>
  );
}
