import { FaGasPump, FaUtensils, FaHospital, FaUniversity, FaHotel } from "@/icons/index";

export interface PlaceCategory {
  label: string;
  apiCategories: string;
  strictKeywords: string[];
  icon?: React.ComponentType;
}

export const PLACE_CATEGORIES: PlaceCategory[] = [
  {
    label: "Petrol",
    apiCategories: "service.vehicle.fuel",
    strictKeywords: ["petrol", "fuel", "gas", "cng", "diesel"],
    icon: FaGasPump,
  },
  {
    label: "Restaurant",
    apiCategories: "catering.restaurant",
    strictKeywords: ["restaurant", "dhaba", "cafe", "eatery"],
    icon: FaUtensils,
  },
  {
    label: "Hospital",
    apiCategories: "healthcare.hospital",
    strictKeywords: ["hospital", "medical"],
    icon: FaHospital,
  },
  {
    label: "ATM",
    apiCategories: "service.financial.atm",
    strictKeywords: ["atm", "bank"],
    icon: FaUniversity,
  },
   {
    label: "Hotel", 
    apiCategories: "accommodation.hotel",
    strictKeywords: ["hotel", "motel", "inn", "resort"],
    icon: FaHotel,
  },
];
