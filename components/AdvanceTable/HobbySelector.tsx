import React, { useState, useRef, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const HOBBY_OPTIONS = [
  "Reading",
  "Gardening",
  "Brain Games",
  "Playing with Pet",
  "Sleeping",
] as const;

type HobbyOption = typeof HOBBY_OPTIONS[number];

interface HobbySelectorProps {
  value: string[];
  onChange: (val: string[]) => void;
}

export default function HobbySelector({ value, onChange }: HobbySelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSelect = (hobby: string) => {
    if (value.includes(hobby)) {
      onChange(value.filter((v) => v !== hobby));
    } else {
      onChange([...value, hobby]);
    }
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((v) => v !== tag));
  };

  return (
    <div ref={ref} className="w-full relative">
      <div
        onClick={() => setOpen(!open)}
        className="border p-2 rounded cursor-pointer  flex items-center flex-wrap gap-2"
      >
        {value.length === 0 && (
          <span className="text-gray-400">Select hobby...</span>
        )}

        {value.map((h) => (
          <span
            key={h}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
          >
            {h}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTag(h);
              }}
              className="text-red-500 font-bold"
            >
              <RxCross2 />
            </button>
          </span>
        ))}
      </div>

      {open && (
        <div className="absolute z-20 mt-1 w-full border bg-white rounded shadow">
          {HOBBY_OPTIONS.map((hobby) => {
            const selected = value.includes(hobby);
            return (
              <div
                key={hobby}
                onClick={() => toggleSelect(hobby)}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                  selected ? "bg-blue-50 font-medium" : ""
                }`}
              >
                <span>{hobby}</span>
                {selected && <FiCheck className="text-blue-600" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
