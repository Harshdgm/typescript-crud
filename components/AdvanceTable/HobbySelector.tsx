import React from "react";

const HOBBY_OPTIONS = [
  "Reading",
  "Gardening",
  "Brain Games",
  "Playing with Pet",
  "Sleeping",
] as const;

type HobbyOption = typeof HOBBY_OPTIONS[number];

interface HobbySelectorProps {
  value: string[];                  // now an array for multiple selections
  onChange: (value: string[]) => void;
}

export default function HobbySelector({ value, onChange }: HobbySelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    onChange(selectedOptions);
  };

  return (
    <select
      multiple
      className="border rounded p-2 w-full h-24"
      value={value}
      onChange={handleChange}
    >
      {HOBBY_OPTIONS.map((hobby) => (
        <option key={hobby} value={hobby}>
          {hobby}
        </option>
      ))}
    </select>
  );
}
