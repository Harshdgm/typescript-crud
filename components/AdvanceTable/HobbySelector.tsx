import React, { useEffect, useState } from "react";

const HOBBY_OPTIONS = [
  "Reading",
  "Gardening",
  "Brain Games",
  "Playing with Pet",
  "Sleeping",
  "Custom",
] as const;

type HobbyOption = typeof HOBBY_OPTIONS[number];

interface HobbySelectorProps {
  value: string;                            
  onChange: (value: string) => void;        
}

export default function HobbySelector({ value, onChange }: HobbySelectorProps) {
  const [mode, setMode] = useState<"select" | "custom">("select");
  const [customValue, setCustomValue] = useState("");

  useEffect(() => {
    if (!value) {
      setMode("select");
      return;
    }

    if (HOBBY_OPTIONS.includes(value as HobbyOption)) {
      setMode("select");
    } else {
      setMode("custom");
      setCustomValue(value);
    }
  }, [value]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as HobbyOption;

    if (selected === "Custom") {
      setMode("custom");
      setCustomValue(value || "");
    } else {
      setMode("select");
      onChange(selected);
    }
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCustomValue(input);
    onChange(input);
  };

  return (
    <div>
      {mode === "select" && (
        <select
          className="border rounded p-2 w-full"
          value={HOBBY_OPTIONS.includes(value as HobbyOption) ? value : ""}
          onChange={handleSelect}
        >
          <option value="" disabled>
            Select Hobby
          </option>

          {HOBBY_OPTIONS.map((hobby) => (
            <option key={hobby} value={hobby}>
              {hobby}
            </option>
          ))}
        </select>
      )}

      {mode === "custom" && (
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder="Enter your hobby"
          value={customValue}
          onChange={handleCustomInput}
        />
      )}
    </div>
  );
}
