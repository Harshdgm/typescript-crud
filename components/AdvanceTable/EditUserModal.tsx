"use client";

import { useState } from "react";
import { UserData } from "@/types/user";

type Props = {
  user: UserData;
  onClose: () => void;
  onSave: (updatedUser: UserData) => void;
};

export default function EditUserModal({ user, onClose, onSave }: Props) {
  const [editValues, setEditValues] = useState<UserData>({ ...user });

  const handleChange = <K extends keyof UserData>(key: K, value: UserData[K]) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(editValues);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30"
        onClick={onClose}></div>

      <div className="bg-white z-10 p-6 rounded-lg w-[400px] relative">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>

        <div className="flex flex-col gap-2">
          <label>Email:</label>
          <input
            type="text"
            value={editValues.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="border p-2 rounded"
          />

          <label>Phone:</label>
          <input
            type="text"
            value={editValues.phone}
            onChange={(e) => handleChange("phone", Number(e.target.value))} 
            className="border p-2 rounded"
           />

          <label>Address:</label>
          <input
            type="text"
            value={editValues.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="border p-2 rounded"
          />

          <label>Hobby:</label>
          <input
            type="text"
            value={editValues.hobby}
            onChange={(e) => handleChange("hobby", e.target.value)}
            className="border p-2 rounded"
          />
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
