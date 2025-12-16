import { NextResponse } from "next/server";
import { getPlaceImage } from "@/lib/placeImage";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const place = searchParams.get("place");

  if (!place) {
    return NextResponse.json({ image: null });
  }

  const image = await getPlaceImage(place);
  return NextResponse.json({ image });
}
