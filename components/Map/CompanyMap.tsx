"use client";

import { MAP_EXAMPLE_LINK } from "@/constant/mapApi";

export default function CompanyMap() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <iframe
        title="company-location"
        src={MAP_EXAMPLE_LINK}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
