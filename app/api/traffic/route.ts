import { NextResponse } from "next/server";
import trafficData from "@/data/trafficData.json"; // direct import

export async function GET(req: Request) {
  try {
    return NextResponse.json(trafficData);
  } catch (err) {
    console.error("Failed to get traffic data:", err);
    return NextResponse.json({ trafficSegments: [] });
  }
}
