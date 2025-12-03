import React, { useEffect, useState } from "react";

const HOBBY_OPTIONS = [
  "Reading",
  "Gardening",
  "Brain Games",
  "Playing with Pet",
  "Sleeping",
] as const;

type HobbyOption = typeof HOBBY_OPTIONS[number];

interface HobbySelectorProps {
  value: string;                            
  onChange: (value: string) => void;        
}

export default function HobbySelector({ value, onChange }: HobbySelectorProps) {
  const [mode, setMode] = useState<"select" | "custom">("select");


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
    } else {
      setMode("select");
      onChange(selected);
    }
  };

  const removeOptions =()=>{
    setMode("select");
    onChange("");
  }

 
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
            <option key={hobby} value={hobby} onChange={removeOptions}>
              {hobby}
            </option>
          ))}
        </select>
      )}

    </div>
  );
}
