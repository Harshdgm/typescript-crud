import { NextResponse } from "next/server";

export async function GET() {
  const trucks: [number, number][] = [
    [23.025, 72.57],      
    [22.2410, 68.9680],   
    [22.3072, 73.1812],   
    [23.2411, 69.6669],   
  ];

  return NextResponse.json(trucks);
}
