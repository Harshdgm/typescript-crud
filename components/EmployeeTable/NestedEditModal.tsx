"use client";

import { useState } from "react";
import { EmployeeData, EmployeeError } from "@/types/user";
import HobbySelector from "@/components/AdvanceTable/HobbySelector";

type Props = {
  employee: EmployeeData;
  onClose: () => void;
  onSave: (updated: EmployeeData) => void;
};

export default function NestedEditModal({ employee, onClose, onSave }: Props) {
  const [values, setValues] = useState<EmployeeData>({ ...employee  , hobby: employee.hobby || [],});
  const [errors, setErrors] = useState<EmployeeError>({
    id: "", name: "", email: "", role: "", status: "", action: "",
    salary: "", city: "", phone: "", hobby: "", dob: "", age: 0
  });

  const handleChange = <K extends keyof EmployeeData>(key: K, value: EmployeeData[K]) => {
  setValues(prev => ({ ...prev, [key]: value }));
  setErrors(prev => ({ ...prev, [key]: "" } as EmployeeError));  
};


  const handleSave = () => {
    const validationErrors: EmployeeError = { ...errors };

    if (!values.salary) validationErrors.salary = "Salary required";
    if (!values.city) validationErrors.city = "City required";
    if (!values.phone) validationErrors.phone = "Phone required";
    if (!values.hobby) validationErrors.hobby = "Hobby required";
    if (!values.dob) validationErrors.dob = "DOB required";

    const hasError = Object.values(validationErrors).some(v => v !== "" && v !== 0);
    if (hasError) {
      setErrors(validationErrors);
      return;
    }

    onSave(values);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>
      <div className="bg-white z-10 p-6 rounded-lg w-[400px] relative">
        <h2 className="text-xl font-bold mb-4">Edit Nested Details</h2>
        <div className="flex flex-col gap-1 text-left">
          
          <div>
            <label>Salary:</label>
            <input
              type="number"
              value={values.salary}
              onChange={e => handleChange("salary", Number(e.target.value))}
              className={`border p-2 rounded w-full ${errors.salary ? "border-red-500" : ""}`}
            />
            {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
          </div>

          <div>
            <label>City:</label>
            <input
              type="text"
              value={values.city || ""}
              onChange={e => handleChange("city", e.target.value)}
              className={`border p-2 rounded w-full ${errors.city ? "border-red-500" : ""}`}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          <div>
            <label>Phone:</label>
            <input
              type="text"
              value={values.phone || ""}
              onChange={e => handleChange("phone", e.target.value)}
              className={`border p-2 rounded w-full ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div>
            <label>Hobby:</label>
            <HobbySelector
              value={values.hobby || []}
              onChange={(val: string[]) => handleChange("hobby", val)}
            />
            {errors.hobby && <p className="text-red-500 text-sm">{errors.hobby}</p>}
          </div>

          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              value={values.dob || ""}
              onChange={e => handleChange("dob", e.target.value)}
              className={`border p-2 rounded w-full ${errors.dob ? "border-red-500" : ""}`}
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
