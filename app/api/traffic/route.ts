import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    trafficPoints: [
      // ===== Ankleshwar city exit =====
      { lat: 21.6264, lng: 73.0152, level: "heavy" },
      { lat: 21.6201, lng: 73.0214, level: "heavy" },
      { lat: 21.6148, lng: 73.0282, level: "slow" },

      // ===== Ankleshwar → Panoli =====
      { lat: 21.6072, lng: 73.0359, level: "heavy" },
      { lat: 21.6005, lng: 73.0436, level: "heavy" },
      { lat: 21.5938, lng: 73.0512, level: "slow" },
      { lat: 21.5869, lng: 73.0578, level: "slow" },
      { lat: 21.5801, lng: 73.0619, level: "moderate" },

      // ===== Panoli GIDC area =====
      { lat: 21.5765, lng: 73.0609, level: "heavy" },
      { lat: 21.5712, lng: 73.0563, level: "moderate" },

      // ===== Panoli → Kim =====
      { lat: 21.5558, lng: 73.0376, level: "moderate" },
      { lat: 21.5312, lng: 73.0094, level: "slow" },

      // ===== Kim → Surat outskirts =====
      { lat: 21.4458, lng: 72.9417, level: "moderate" },
      { lat: 21.3305, lng: 72.8843, level: "slow" },

      // ===== Surat city entry =====
      { lat: 21.2389, lng: 72.8632, level: "heavy" },
      { lat: 21.1702, lng: 72.8311, level: "heavy" },
    ],
  });
}
