"use client";

import { useState } from "react";
import { UserData, UserError } from "@/types/user";
import { validateRow } from "@/utils/validateRow"; 
import Image from "next/image";
import HobbySelector from "./HobbySelector";

type Props = {
  user: UserData;
  onClose: () => void;
  onSave: (updatedUser: UserData) => void;
};

export default function EditUserModal({ user, onClose, onSave }: Props) {
  const [editValues, setEditValues] = useState<UserData>({ ...user });

  const [errors, setErrors] = useState<UserError>({
    id: "",
    email: "",
    phone: "",
    city:"",
    state:"",
    country:"",
    image: "",
    hobby: "",
  });

  const handleChange = <K extends keyof UserData>(
    key: K,
    value: UserData[K]
  ) => {
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

    onSave(editValues);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>

      <div className="bg-white z-10 p-6 rounded-lg w-[420px] relative">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>

        <div className="flex flex-col gap-3">
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={editValues.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`border p-2 rounded w-full ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label>Phone:</label>
            <input
              type="text"
              value={editValues.phone}
              onChange={(e) => handleChange("phone", Number(e.target.value))}
              className={`border p-2 rounded w-full ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div>
            <label>Address:</label>
            <input
              type="text"
              value={editValues.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className={`border p-2 rounded w-full ${
                errors.address ? "border-red-500" : ""
              }`}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={editValues.image}
              onChange={(e) => handleChange("image", e.target.value)}
              className={`border p-2 rounded w-full ${
                errors.image ? "border-red-500" : ""
              }`}
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

            {editValues.image && !errors.image && (
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

          </div>

          <div>
          <HobbySelector
              value={editValues.hobby}
              onChange={(val) =>
                setEditValues((prev) => ({ ...prev, hobby: val }))
              }
          />
           {errors.hobby && <p className="text-red-500 text-sm">{errors.hobby}</p>}
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
