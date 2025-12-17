import L from "leaflet";
import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  FaGasPump,
  FaUtensils,
  FaHospital,
  FaUniversity,
  FaHotel,
} from "@/icons/index";
import { PlaceCategory } from "@/constant/placeCategories";

type IconComponent = React.ComponentType<{
  size?: number | string;
  color?: string;
}>;

function createDivIcon(Icon: IconComponent, bgColor: string): L.DivIcon {
  return L.divIcon({
    html: ReactDOMServer.renderToString(
      <div
        style={{
          backgroundColor: bgColor,
          borderRadius: "50%",
          width: "34px",
          height: "34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
        }}
      >
        <Icon size={16} />
      </div>
    ),
    className: "custom-place-marker",
    iconSize: [24, 24],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
  });
}

export const CATEGORY_MARKER_ICONS: Record<
  PlaceCategory["label"],
  L.DivIcon
> = {
  Petrol: createDivIcon(FaGasPump, "#e11d48"),
  Restaurant: createDivIcon(FaUtensils, "#f97316"),
  Hospital: createDivIcon(FaHospital, "#dc2626"),
  ATM: createDivIcon(FaUniversity, "#2563eb"),
  Hotel: createDivIcon(FaHotel, "#16a34a"),
};

export function getMarkerIcon(
  category: PlaceCategory | null
): L.DivIcon | undefined {
  if (!category) return undefined;
  return CATEGORY_MARKER_ICONS[category.label];
}
