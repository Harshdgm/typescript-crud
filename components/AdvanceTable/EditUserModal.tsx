"use client";

import { useState } from "react";
import { UserData, UserError } from "@/types/user";
import { validateRow } from "@/utils/validateRow";
import Image from "next/image";
import HobbySelector from "./HobbySelector";
import { DateRangePicker } from "react-date-range";

type Props = {
  user: UserData;
  onClose: () => void;
  onSave: (updatedUser: UserData) => void;
};

export default function EditUserModal({ user, onClose, onSave }: Props) {
  const [editValues, setEditValues] = useState<UserData>({ ...user });

  const [previewImage, setPreviewImage] = useState<string>(user.image); // <--- added
  const [imageFile, setImageFile] = useState<File | null>(null); // <--- added

  const [errors, setErrors] = useState<UserError>({
    id: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    image: "",     // now optional
    hobby: "",
    dateRange: "",
  });

  const handleChange = <K extends keyof UserData>(key: K, value: UserData[K]) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // -----------------------------
  // 🟦 HANDLE IMAGE UPLOAD
  // -----------------------------
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  // -----------------------------
  // 🟦 SAVE CHANGES
  // -----------------------------
  const handleSave = () => {
    const validationErrors = validateRow(editValues);
    const hasError = Object.values(validationErrors).some((v) => v !== "");

    if (hasError) {
      setErrors(validationErrors);
      return;
    }

    // if user uploaded a new file, convert to base64
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = {
          ...editValues,
          image: reader.result as string, // base64 image
        };
        onSave(updatedUser);
      };
      reader.readAsDataURL(imageFile);
    } else {
      // user did not upload, keep old image
      onSave({ ...editValues });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>

      <div className="bg-white z-10 p-6 rounded-lg w-[430px] relative overflow-y-auto max-h-[95vh]">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>

        <div className="flex flex-col gap-4">

          {/* Email */}
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

          {/* Phone */}
          <div>
            <label>Phone:</label>
            <input
              type="text"
              value={editValues.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`border p-2 rounded w-full ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* City */}
          <div>
            <label>City:</label>
            <input
              type="text"
              value={editValues.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className={`border p-2 rounded w-full ${errors.city ? "border-red-500" : ""}`}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          {/* State */}
          <div>
            <label>State:</label>
            <input
              type="text"
              value={editValues.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className={`border p-2 rounded w-full ${errors.state ? "border-red-500" : ""}`}
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>

          {/* Country */}
          <div>
            <label>Country:</label>
            <input
              type="text"
              value={editValues.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className={`border p-2 rounded w-full ${errors.country ? "border-red-500" : ""}`}
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>

          {/* Date Range */}
          <div>
            <label>Date Range:</label>
            <DateRangePicker
              ranges={[
                {
                  startDate: new Date(editValues.dateRange?.startDate || new Date()),
                  endDate: new Date(editValues.dateRange?.endDate || new Date()),
                  key: "selection",
                },
              ]}
              onChange={(ranges) => {
                const r = ranges.selection;
                handleChange("dateRange", {
                  startDate: r.startDate!,
                  endDate: r.endDate!,
                  key: "selection",
                });
              }}
            />
            {errors.dateRange && <p className="text-red-500 text-sm">{errors.dateRange}</p>}
          </div>

          {/* Hobby */}
          <div>
            <label>Hobby:</label>
            <HobbySelector
              value={editValues.hobby || []}
              onChange={(val) => handleChange("hobby", val)}
            />
            {errors.hobby && <p className="text-red-500 text-sm">{errors.hobby}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label>Image (optional):</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {previewImage && (
              <div className="mt-2 w-24 h-24 relative border rounded overflow-hidden">
                <Image
                  src={previewImage}
                  alt="preview"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            )}
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
