"use client";

import { useState } from "react";
import { FiShare2 } from "react-icons/fi";

interface ShareLocationProps {
  pathPoints: [number, number][];
  basePath?: string;
}

export default function ShareLocation({ pathPoints, basePath }: ShareLocationProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateShareLink = () => {
    if (!pathPoints || pathPoints.length === 0) return "";

    const params = new URLSearchParams();

    params.append("startLat", String(pathPoints[0][0]));
    params.append("startLng", String(pathPoints[0][1]));

    if (pathPoints.length > 1) {
      const last = pathPoints[pathPoints.length - 1];
      params.append("endLat", String(last[0]));
      params.append("endLng", String(last[1]));
    }

    const base = basePath ?? window.location.pathname;
    return `${window.location.origin}${base}?${params.toString()}`;
  };

  const shareURL = generateShareLink();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  if (!shareURL) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white rounded-full shadow-lg p-2 cursor-pointer"
      >
          <FiShare2 size={16} />
      </button>

      {open && (
        <div className="absolute bottom-14 left-0 bg-white shadow-xl p-4 rounded-xl w-72 border z-[9999]">
          <input
            type="text"
            readOnly
            value={shareURL}
            className="border p-2 rounded w-full bg-gray-50 text-sm"
          />

          <button
            onClick={copyToClipboard}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-3"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      )}
    </div>
  );
}
