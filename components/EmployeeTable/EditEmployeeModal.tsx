"use client";

import { useState } from "react";
import { EmployeeData } from "@/types/user";
import { EmployeeError } from "@/types/user";

type Props = {
  user: EmployeeData;
  onClose: () => void;
  onSave: (updatedUser: EmployeeData) => void;
};

export default function EditEmployeeModal({ user, onClose, onSave }: Props) {
  const [editValues, setEditValues] = useState<EmployeeData>({
    ...user,
    status: user.status === "Active" ? "Active" : "Inactive",
  });

  const [errors, setErrors] = useState<EmployeeError>({
    id: "",
    name: "",
    email: "",
    age:0,
    role: "",
    salary:0,
    status: "",
    action: "",
  });

  const handleChange = <K extends keyof EmployeeData>(
    key: K,
    value: EmployeeData[K] | "Active" | "Inactive"  
  ) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSave = () => {
    const validationErrors: EmployeeError = {
      id: "",
      name: "",
      email: "",
      age:0 ,
      role: "",
      salary:0,
      status: "",
      action: "",
    };

    if (!editValues.name) validationErrors.name = "Name is required";
    if (!editValues.email) validationErrors.email = "Email is required";
    if (!editValues.role) validationErrors.role = "Role is required";

    const hasError = Object.values(validationErrors).some((v) => v !== "");
    if (hasError) {
      setErrors(validationErrors);
      return;
    }

    const updated: EmployeeData = {
      ...editValues,
      status: editValues.status === "Active" ? "Active" : "Inactive",
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>

      <div className="bg-white z-10 p-6 rounded-lg w-[400px] relative">
        <h2 className="text-xl font-bold mb-4">Edit Employee</h2>

        <div className="flex flex-col gap-3">
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={editValues.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`border p-2 rounded w-full ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

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
            <label>Role:</label>
            <select
              value={editValues.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className={`border p-2 rounded w-full ${errors.role ? "border-red-500" : ""}`}
            >
              <option value="">Select role</option>
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>

          <div className="flex items-center gap-3">
            <label>Status:</label>
            <input
              type="checkbox"
              checked={editValues.status === "Active"}
              onChange={(e) =>
                handleChange("status", e.target.checked ? "Active" : "Inactive")
              }
            />
            <span>{editValues.status}</span>
          </div>

          <div className="flex items-center gap-3">
            <label>Action Allowed:</label>
            <input
              type="checkbox"
              checked={editValues.action}
              onChange={(e) => handleChange("action", e.target.checked)}
            />
            <span>{editValues.action ? "Yes" : "No"}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
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
