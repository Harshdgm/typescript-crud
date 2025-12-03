"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { HOBBY_OPTIONS } from "@/constant/hobbies";
import { sortHobbies } from "@/utils/sortHobbies";

interface HobbySelectorProps {
  value: string[];
  onChange: (val: string[]) => void;
}

export default function HobbySelector({ value, onChange }: HobbySelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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


  const filtered = sortHobbies([...HOBBY_OPTIONS]).filter((h) =>
    h.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div ref={ref} className="w-full relative">
      <div
        className="border p-2 rounded cursor-text flex items-center flex-wrap gap-2 relative text-sm"
        onClick={() => setOpen(!open)}>
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          {open ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
        </div>
        {value.slice(0, 2).map((h) => (
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
              className="text-red-500"
            >
              <RxCross2 />
            </button>
          </span>
        ))}

        {value.length > 2 && (
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
            +{value.length - 2}
          </span>
        )}
        <input
          type="text"
          className="flex-1 outline-none min-w-20 text-sm"
          placeholder={value.length === 0 ? "Add hobby..." : ""}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

     
      {open && (
        <div className="absolute z-20 mt-1 w-full border bg-white rounded shadow max-h-60 overflow-auto">
          {filtered.length === 0 && (
            <p className="text-center py-2 text-gray-500">No hobby found</p>
          )}

          {filtered.map((hobby) => {
            const selected = value.includes(hobby);
            return (
              <div
                key={hobby}
                onClick={() => {
                  toggleSelect(hobby);
                  setSearch("");
                }}
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
