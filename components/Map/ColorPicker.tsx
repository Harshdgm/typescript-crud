"use client";

import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { FaPalette } from "@/icons/index";

interface ColorPickerProps {
  selectedColor: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ selectedColor, onChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <div
        className="w-8 h-8 flex items-center justify-center rounded-full border cursor-pointer shadow-md bg-blue-600"
        onClick={() => setOpen(!open)}
      >
        <FaPalette className="text-white" size={20} />
      </div>
     
      {open && (
        <div className="absolute left-0 right-0 bottom-10 z-50  rounded-xl shadow-xl ">
          <HexColorPicker color={selectedColor} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
