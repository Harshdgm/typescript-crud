export interface PlaceCategory {
  label: string;
  apiCategories: string;
  strictKeywords: string[];
}

export const PLACE_CATEGORIES: PlaceCategory[] = [
  {
    label: "Petrol",
    apiCategories: "service.vehicle.fuel",
    strictKeywords: ["petrol", "fuel", "gas", "cng", "diesel"],
  },
  {
    label: "Restaurant",
    apiCategories: "catering.restaurant",
    strictKeywords: ["restaurant", "hotel", "dhaba", "cafe", "eatery"],
  },
  {
    label: "Hospital",
    apiCategories: "healthcare.hospital",
    strictKeywords: ["hospital", "medical"],
  },
  {
    label: "ATM",
    apiCategories: "service.financial.atm",
    strictKeywords: ["atm", "bank"],
  },
];
