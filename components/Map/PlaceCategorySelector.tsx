"use client";

import { PLACE_CATEGORIES, PlaceCategory } from "@/constant/placeCategories";

interface Props {
  selected: PlaceCategory | null;
  onSelect: (value: PlaceCategory) => void;
}

export default function PlaceCategorySelector({
  selected,
  onSelect,
}: Props) {
  return (
    <div className="absolute top-4 left-4 z-1000 bg-white rounded-xl shadow-lg p-2 flex gap-2">
      {PLACE_CATEGORIES.map((cat) => (
        <button
          key={cat.label}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selected?.label === cat.label
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
