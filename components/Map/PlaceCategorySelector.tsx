"use client";

import { PLACE_CATEGORIES, PlaceCategory } from "@/constant/placeCategories";

interface Props {
  selected: PlaceCategory | null;
  onSelect: (category: PlaceCategory | null) => void;
}

export default function PlaceCategorySelector({
  selected,
  onSelect,
}: Props) {
  return (
    <div
      className="max-w-[320px] absolute top-4 left-15 z-1000 bg-white rounded-sm shadow-lg p-1 flex gap-2 overflow-x-auto"
      style={{ scrollbarWidth: "none" }}>
      <button
        onClick={() => onSelect(null)}
        className={`flex items-center gap-1 px-4 py-1.5 my-1 rounded-full text-sm font-medium transition ${
          selected === null
            ? "bg-blue-600 text-white"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        None
      </button>

      {PLACE_CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        return (
          <button
            key={cat.label}
            onClick={() => onSelect(cat)}
            className={`flex items-center gap-1 px-4 py-1.5 my-1 rounded-full text-sm font-medium transition ${
              selected?.label === cat.label
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {Icon && <Icon />}
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
