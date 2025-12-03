"use client";

import { useState } from "react";
import { UserData, UserError } from "@/types/user";
import { validateRow } from "@/utils/validateRow";
import Image from "next/image";
import HobbySelector from "./HobbySelector";
import { DateRangePicker } from "react-date-range";
import { cityData } from "@/utils/locationData";
import { fileToBase64 } from "@/utils/fileToBase64";
import DateRangeInput from "./DateRangeInput";

type Props = {
  user: UserData;
  onClose: () => void;
  onSave: (updatedUser: UserData) => void;
};

export default function EditUserModal({ user, onClose, onSave }: Props) {
  // const [editValues, setEditValues] = useState<UserData>({ ...user });
   const [editValues, setEditValues] = useState<UserData>({
      ...user,
      dateRange: user.dateRange
        ? {
            startDate: new Date(user.dateRange.startDate),
            endDate: new Date(user.dateRange.endDate),
            key: "selection",
          }
        : undefined,
    });

  const [errors, setErrors] = useState<UserError>({
    id: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    image: "",
    hobby: "",
    dateRange: "",
  });

  const handleChange = <K extends keyof UserData>(key: K, value: UserData[K]) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSave = () => {
    const validationErrors = validateRow(editValues);
    const hasError = Object.values(validationErrors).some((v) => v !== "");

    if (hasError) {
      setErrors(validationErrors);
      return;
    }

    onSave({ ...editValues });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>

      <div className="bg-white z-10 p-6 rounded-lg w-[430px] relative overflow-y-auto max-h-[95vh]">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>

        <div className="flex flex-col gap-4">
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={editValues.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`border p-2 rounded w-full ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label>Phone:</label>
            <input
              type="text"
              value={editValues.phone}
              onChange={(e) => handleChange("phone", Number(e.target.value))}
              className={`border p-2 rounded w-full ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* CITY (no numbers, auto-fill state/country) */}
          <div>
            <label>City:</label>
            <input
              type="text"
              value={editValues.city}
              onChange={(e) => {
                const input = e.target.value;

                // ❌ Prevent numbers
                if (/\d/.test(input)) return;

                const cityKey = input.trim().toLowerCase().replace(/\s+/g, "");

                if (cityData[cityKey]) {
                  handleChange("city", input);
                  handleChange("state", cityData[cityKey].state);
                  handleChange("country", cityData[cityKey].country);
                } else {
                  handleChange("city", input);
                  handleChange("state", "");
                  handleChange("country", "");
                }
              }}
              className={`border p-2 rounded w-full ${errors.city ? "border-red-500" : ""}`}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          {/* STATE */}
          <div>
            <label>State:</label>
            <input
              type="text"
              value={editValues.state}
              readOnly
              className="border p-2 rounded w-full bg-gray-100"
            />
          </div>

          {/* COUNTRY */}
          <div>
            <label>Country:</label>
            <input
              type="text"
              value={editValues.country}
              readOnly
              className="border p-2 rounded w-full bg-gray-100"
            />
          </div>

         <div>
            <label>Date Range:</label>
            <DateRangeInput
                value={{
                  startDate: new Date(editValues.dateRange?.startDate),
                  endDate: new Date(editValues.dateRange?.endDate),
                  key: "selection",
                }}
                onChange={(range) => handleChange("dateRange", range)}
              />
            {errors.dateRange && <p className="text-red-500 text-sm">{errors.dateRange}</p>}
          </div>


          {/* IMAGE FILE UPLOAD (MANDATORY) */}
          <div>
            <label>Image:</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={async (e) => {
                if (!e.target.files?.[0]) return;

                const base64 = await fileToBase64(e.target.files[0]);
                handleChange("image", base64);
              }}
              className={`border p-2 rounded w-full ${errors.image ? "border-red-500" : ""}`}
            />

            {/* Show existing preview */}
            {editValues.image && (
              <div className="mt-2 w-20 h-20 relative border rounded overflow-hidden">
                <Image
                  src={editValues.image}
                  alt="preview"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            )}

            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>

          {/* HOBBY SELECTOR */}
          <div>
            <HobbySelector
              value={editValues.hobby || []}
              onChange={(val) => handleChange("hobby", val)}
            />
            {errors.hobby && <p className="text-red-500 text-sm">{errors.hobby}</p>}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>

          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
