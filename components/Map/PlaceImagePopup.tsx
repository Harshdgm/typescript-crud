"use client";

import Image from "next/image";
import { useReverseGeocode } from "@/hooks/useReverseGeoCode";
import { usePlaceImage } from "@/hooks/usePlaceImage";
import { useLabels } from "@/hooks/useLabels";

interface Props {
  coords: [number, number];
}

export default function PlaceImagePopup({ coords }: Props) {
  const labels = useLabels();
  const { placeName, loading: placeLoading } = useReverseGeocode(coords);
  const { image, loading: imageLoading } = usePlaceImage(placeName || undefined);

  return (
    <div className="w-64">
      <p className="font-semibold">
        {placeName || labels.loading_image}
      </p>

      {(placeLoading || imageLoading) && (
        <div className="h-32 flex items-center justify-center text-sm">
          {labels.loading_image}
        </div>
      )}

      {!imageLoading && image && (
        <Image
          src={image}
          alt={placeName || "Location"}
          width={256}
          height={160}
          className="rounded-lg object-cover"
        />
      )}

      {!imageLoading && !image && (
        <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-sm">
          {labels.no_image_available}
        </div>
      )}
    </div>
  );
}
