"use client";

import { useState } from "react";
import { UserData, UserError, DateRangeData, ImageType } from "@/types/user";
import { validateRow } from "@/utils/validateRow";
import Image from "next/image";
import HobbySelector from "./HobbySelector";
import DateRangeInput from "./DateRangeInput";
import { cityData } from "@/utils/locationData";
import { fileToBase64 } from "@/utils/fileToBase64";

type Props = {
  user: UserData;
  onClose: () => void;
  onSave: (updatedUser: UserData) => void;
};

export default function EditUserModal({ user, onClose, onSave }: Props) {
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

  const handleDateRangeChange = (range: DateRangeData) => {
    handleChange("dateRange", range);
  };

  const handleHobbyChange = (hobby: string[]) => {
    handleChange("hobby", hobby);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>

      <div className="bg-white z-10 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-[95vh] p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="text"
              value={editValues.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="text"
              value={editValues.phone}
              onChange={(e) => handleChange("phone", Number(e.target.value))}
              className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">City</label>
            <input
              type="text"
              value={editValues.city}
              onChange={(e) => {
                const input = e.target.value;
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
              className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">State</label>
            <input
              type="text"
              value={editValues.state}
              readOnly
              className="w-full border p-2 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Country</label>
            <input
              type="text"
              value={editValues.country}
              readOnly
              className="w-full border p-2 rounded-md bg-gray-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Date Range</label>
            <DateRangeInput
              value={{
                startDate: editValues.dateRange?.startDate || new Date(),
                endDate: editValues.dateRange?.endDate || new Date(),
                key: "selection",
              }}
              onChange={handleDateRangeChange}
            />
            {errors.dateRange && <p className="text-red-500 text-sm mt-1">{errors.dateRange}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={async (e) => {
                if (!e.target.files?.[0]) return;
                const base64 = await fileToBase64(e.target.files[0]);
                handleChange("image", base64 as ImageType);
              }}
              className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
            />
            {editValues.image && (
              <div className="mt-2 w-28 h-28 relative border rounded-lg overflow-hidden">
                <Image
                  src={editValues.image}
                  alt="preview"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            )}
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Hobbies</label>
            <HobbySelector
              value={editValues.hobby || []}
              onChange={handleHobbyChange}
            />
            {errors.hobby && <p className="text-red-500 text-sm mt-1">{errors.hobby}</p>}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="bg-gray-300 px-5 py-2 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
